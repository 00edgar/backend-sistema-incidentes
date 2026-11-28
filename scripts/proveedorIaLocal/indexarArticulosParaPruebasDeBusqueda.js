import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import pg from 'pg';

function construirTextoParaEmbedding(articulo) {
  return [articulo.titulo, articulo.problema, articulo.sintomas, articulo.causa, articulo.solucion].join('\n');
}

async function solicitarJson(url, opciones) {
  const respuesta = await fetch(url, { signal: AbortSignal.timeout(60000), ...opciones });
  const texto = await respuesta.text();
  if (!respuesta.ok) {
    throw new Error(`${opciones?.method ?? 'GET'} ${url} respondio ${respuesta.status}: ${texto}`);
  }
  return JSON.parse(texto);
}

export async function generarEmbedding({ urlBaseProveedor, modelo, claveApi, texto }) {
  const datos = await solicitarJson(`${urlBaseProveedor}/v1/embeddings`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: `Bearer ${claveApi || 'sin-clave'}` },
    body: JSON.stringify({ model: modelo, input: texto }),
  });
  return datos.data[0].embedding;
}

export async function indexarArticulosParaPruebasDeBusqueda({ entorno, coleccion }) {
  if (!coleccion) {
    throw new Error('Indicar el nombre de la coleccion de prueba');
  }
  if (coleccion === entorno.QDRANT_COLECCION) {
    throw new Error('Esta herramienta no puede escribir en la coleccion real; usar otro nombre');
  }
  const cliente = new pg.Client({ connectionString: entorno.DATABASE_URL });
  await cliente.connect();
  let articulos;
  try {
    const resultado = await cliente.query(
      `SELECT "id", "titulo", "problema", "sintomas", "causa", "solucion", "fecha"
       FROM "ArticuloConocimiento"
       WHERE "estado" = 'Activo' AND "verificado" = true
       ORDER BY "id"`,
    );
    articulos = resultado.rows;
  } finally {
    await cliente.end();
  }

  const puntos = [];
  for (const articulo of articulos) {
    const vector = await generarEmbedding({
      urlBaseProveedor: entorno.PROVEEDOR_IA_URL_BASE,
      modelo: entorno.PROVEEDOR_IA_MODELO_EMBEDDINGS,
      claveApi: entorno.PROVEEDOR_IA_API_KEY,
      texto: construirTextoParaEmbedding(articulo),
    });
    const categoria = articulo.titulo.match(/^\[([^\]]+)\]/)?.[1] ?? null;
    puntos.push({
      id: articulo.id,
      vector,
      payload: {
        idArticulo: articulo.id,
        titulo: articulo.titulo,
        categoria,
        problema: articulo.problema,
        solucion: articulo.solucion,
        fecha: articulo.fecha.toISOString(),
      },
    });
  }

  const urlColeccion = `${entorno.QDRANT_URL}/collections/${coleccion}`;
  await fetch(urlColeccion, { method: 'DELETE' });
  await solicitarJson(urlColeccion, {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ vectors: { size: puntos[0].vector.length, distance: 'Cosine' } }),
  });
  await solicitarJson(`${urlColeccion}/points?wait=true`, {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ points: puntos }),
  });
  return { coleccion, articulosIndexados: puntos.length };
}

const esEjecucionDirecta = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (esEjecucionDirecta) {
  const carpetaActual = path.dirname(fileURLToPath(import.meta.url));
  dotenv.config({ path: path.resolve(carpetaActual, '../../.env') });
  const indiceArgumento = process.argv.indexOf('--coleccion');
  const coleccion = indiceArgumento >= 0 ? process.argv[indiceArgumento + 1] : undefined;
  const resultado = await indexarArticulosParaPruebasDeBusqueda({ entorno: process.env, coleccion });
  console.log(`Coleccion ${resultado.coleccion}: ${resultado.articulosIndexados} articulos indexados`);
}
