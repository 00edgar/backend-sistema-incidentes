import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import { consultarBusquedaSemantica } from './clienteBusquedaSemantica.js';

const carpetaActual = path.dirname(fileURLToPath(import.meta.url));

function leerConsultas() {
  const ruta = path.resolve(carpetaActual, '../../pruebas/datos/consultasEjemploBusqueda.json');
  return JSON.parse(fs.readFileSync(ruta, 'utf8'));
}

async function consultarSinUmbral({ urlWebhook, tokenSecreto, coleccion, consulta }) {
  const { codigoHttp, datos } = await consultarBusquedaSemantica({
    urlWebhook,
    tokenSecreto,
    cuerpo: { descripcion: consulta, umbralSimilitud: 0, limiteResultados: 5, coleccion },
  });
  if (codigoHttp !== 200) {
    throw new Error(`La busqueda respondio ${codigoHttp}: ${JSON.stringify(datos)}`);
  }
  return datos.resultados;
}

export async function calibrarUmbralSimilitud({ urlWebhook, tokenSecreto, coleccion }) {
  const consultas = leerConsultas();
  const filas = [];

  for (const { consulta, idArticuloEsperado } of consultas.consultasRelevantes) {
    const resultados = await consultarSinUmbral({ urlWebhook, tokenSecreto, coleccion, consulta });
    const encontrado = resultados.find((resultado) => resultado.idArticulo === idArticuloEsperado);
    filas.push({
      tipo: 'relevante',
      consulta,
      idArticuloEsperado,
      posicionEsperado: encontrado ? resultados.indexOf(encontrado) + 1 : null,
      similitudEsperado: encontrado?.similitud ?? null,
      mejorSimilitud: resultados[0]?.similitud ?? 0,
    });
  }

  for (const { consulta } of consultas.consultasSinRelacion) {
    const resultados = await consultarSinUmbral({ urlWebhook, tokenSecreto, coleccion, consulta });
    filas.push({ tipo: 'sin relacion', consulta, mejorSimilitud: resultados[0]?.similitud ?? 0 });
  }

  const similitudesRelevantes = filas
    .filter((fila) => fila.tipo === 'relevante')
    .map((fila) => fila.similitudEsperado ?? 0);
  const similitudesSinRelacion = filas.filter((fila) => fila.tipo === 'sin relacion').map((fila) => fila.mejorSimilitud);
  const minimoRelevante = Math.min(...similitudesRelevantes);
  const maximoSinRelacion = Math.max(...similitudesSinRelacion);
  const separable = minimoRelevante > maximoSinRelacion;

  return {
    filas,
    minimoRelevante,
    maximoSinRelacion,
    separable,
    umbralSugerido: separable ? Number(((minimoRelevante + maximoSinRelacion) / 2).toFixed(2)) : null,
  };
}

const esEjecucionDirecta = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (esEjecucionDirecta) {
  dotenv.config({ path: path.resolve(carpetaActual, '../../.env') });
  const indiceArgumento = process.argv.indexOf('--coleccion');
  const coleccion = indiceArgumento >= 0 ? process.argv[indiceArgumento + 1] : process.env.QDRANT_COLECCION;
  const resultado = await calibrarUmbralSimilitud({
    urlWebhook: process.env.N8N_URL_WEBHOOK_BUSQUEDA_SEMANTICA,
    tokenSecreto: process.env.N8N_TOKEN_SECRETO,
    coleccion,
  });
  console.log('tipo          | pos | similitud esperado | mejor similitud | consulta');
  for (const fila of resultado.filas) {
    console.log(
      [
        fila.tipo.padEnd(13),
        String(fila.posicionEsperado ?? '-').padStart(3),
        String(fila.similitudEsperado ?? '-').padStart(18),
        String(fila.mejorSimilitud).padStart(15),
        fila.consulta,
      ].join(' | '),
    );
  }
  console.log(`\nMinimo de similitud en consultas relevantes: ${resultado.minimoRelevante}`);
  console.log(`Maximo de similitud en consultas sin relacion: ${resultado.maximoSinRelacion}`);
  console.log(
    resultado.separable
      ? `Umbral sugerido (punto medio): ${resultado.umbralSugerido}`
      : 'Los grupos se traslapan: no hay un umbral que los separe con este proveedor de embeddings',
  );
}
