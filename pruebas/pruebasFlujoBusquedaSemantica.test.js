import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const carpetaActual = path.dirname(fileURLToPath(import.meta.url));
const textoFlujo = fs.readFileSync(path.resolve(carpetaActual, '../n8n/flujos/flujoBusquedaSemantica.json'), 'utf8');
const flujo = JSON.parse(textoFlujo);

function buscarNodo(nombre) {
  return flujo.nodes.find((nodo) => nodo.name === nombre);
}

test('el flujo expone un webhook POST con respuesta controlada por nodo', () => {
  const webhook = flujo.nodes.find((nodo) => nodo.type === 'n8n-nodes-base.webhook');
  assert.equal(webhook.parameters.httpMethod, 'POST');
  assert.equal(webhook.parameters.path, 'busqueda-semantica');
  assert.equal(webhook.parameters.responseMode, 'responseNode');
});

test('todas las conexiones apuntan a nodos existentes', () => {
  const nombres = new Set(flujo.nodes.map((nodo) => nodo.name));
  for (const [origen, salidas] of Object.entries(flujo.connections)) {
    assert.ok(nombres.has(origen), `origen inexistente: ${origen}`);
    for (const destinos of salidas.main) {
      for (const destino of destinos) {
        assert.ok(nombres.has(destino.node), `destino inexistente: ${destino.node}`);
      }
    }
  }
});

test('todo nodo, salvo el webhook, recibe al menos una conexion', () => {
  const destinosConectados = new Set(
    Object.values(flujo.connections).flatMap((salidas) => salidas.main.flat().map((destino) => destino.node)),
  );
  for (const nodo of flujo.nodes) {
    if (nodo.type !== 'n8n-nodes-base.webhook') {
      assert.ok(destinosConectados.has(nodo.name), `nodo huerfano: ${nodo.name}`);
    }
  }
});

test('el umbral y los limites se leen de variables de entorno', () => {
  const codigoValidacion = buscarNodo('Validar solicitud').parameters.jsCode;
  assert.match(codigoValidacion, /\$env\.UMBRAL_SIMILITUD/);
  assert.match(codigoValidacion, /\$env\.LIMITE_MINIMO_FUENTES/);
  assert.match(codigoValidacion, /\$env\.LIMITE_MAXIMO_FUENTES/);
  assert.match(codigoValidacion, /\$env\.QDRANT_COLECCION/);
});

test('el flujo exige el token secreto y no lo deja escrito', () => {
  const codigoValidacion = buscarNodo('Validar solicitud').parameters.jsCode;
  assert.match(codigoValidacion, /x-token-secreto/);
  assert.match(codigoValidacion, /\$env\.N8N_TOKEN_SECRETO/);
  assert.doesNotMatch(textoFlujo, /token-local-pruebas|cambiar-por-un-valor-secreto/);
});

test('las llamadas a embeddings y Qdrant usan variables de entorno y tienen salida de error', () => {
  const embeddings = buscarNodo('Generar embedding de la consulta');
  const qdrant = buscarNodo('Buscar en Qdrant');
  assert.match(embeddings.parameters.url, /\$env\.PROVEEDOR_IA_URL_BASE/);
  assert.match(embeddings.parameters.jsonBody, /\$env\.PROVEEDOR_IA_MODELO_EMBEDDINGS/);
  assert.match(qdrant.parameters.url, /\$env\.QDRANT_URL/);
  assert.match(qdrant.parameters.jsonBody, /score_threshold/);
  assert.equal(embeddings.onError, 'continueErrorOutput');
  assert.equal(qdrant.onError, 'continueErrorOutput');
});

test('no hay credenciales, claves ni direcciones fijas en el flujo exportado', () => {
  assert.doesNotMatch(textoFlujo, /localhost|127\.0\.0\.1/);
  assert.doesNotMatch(textoFlujo, /"credentials"/);
  assert.doesNotMatch(textoFlujo, /sk-[A-Za-z0-9]{10,}/);
});

function ejecutarNodoCodigo(nombreNodo, { entrada, entorno = {}, nodosPrevios = {} }) {
  const codigo = buscarNodo(nombreNodo).parameters.jsCode;
  const funcion = new Function('$input', '$env', '$', codigo);
  const obtenerNodoPrevio = (nombre) => ({ first: () => ({ json: nodosPrevios[nombre] }) });
  return funcion({ first: () => ({ json: entrada }) }, entorno, obtenerNodoPrevio);
}

const ENTORNO_BASE = {
  N8N_TOKEN_SECRETO: 'secreto',
  UMBRAL_SIMILITUD: '0.6',
  LIMITE_MINIMO_FUENTES: '3',
  LIMITE_MAXIMO_FUENTES: '5',
  QDRANT_COLECCION: 'articulosConocimiento',
};

function validar(cuerpo, { token = 'secreto', entorno = ENTORNO_BASE } = {}) {
  const cabeceras = token === null ? {} : { 'x-token-secreto': token };
  return ejecutarNodoCodigo('Validar solicitud', { entrada: { headers: cabeceras, body: cuerpo }, entorno })[0].json;
}

test('Validar solicitud toma los valores por defecto de las variables de entorno', () => {
  const resultado = validar({ descripcion: '  equipo lento  ' });
  assert.deepEqual(resultado, {
    valida: true,
    descripcion: 'equipo lento',
    umbral: 0.6,
    limite: 5,
    limiteMinimo: 3,
    coleccion: 'articulosConocimiento',
  });
});

test('Validar solicitud respeta el umbral, el limite y la coleccion de la solicitud', () => {
  const resultado = validar({ descripcion: 'x', umbralSimilitud: 0.3, limiteResultados: 4, coleccion: 'otra_coleccion-1' });
  assert.equal(resultado.valida, true);
  assert.equal(resultado.umbral, 0.3);
  assert.equal(resultado.limite, 4);
  assert.equal(resultado.coleccion, 'otra_coleccion-1');
});

test('Validar solicitud lee un umbral distinto cuando cambia la variable de entorno', () => {
  const resultado = validar({ descripcion: 'x' }, { entorno: { ...ENTORNO_BASE, UMBRAL_SIMILITUD: '0.25' } });
  assert.equal(resultado.umbral, 0.25);
});

test('Validar solicitud rechaza con 401 sin token, con token incorrecto o sin token configurado', () => {
  assert.equal(validar({ descripcion: 'x' }, { token: null }).codigoHttp, 401);
  assert.equal(validar({ descripcion: 'x' }, { token: 'otro' }).codigoHttp, 401);
  assert.equal(validar({ descripcion: 'x' }, { entorno: { ...ENTORNO_BASE, N8N_TOKEN_SECRETO: '' }, token: '' }).codigoHttp, 401);
});

test('Validar solicitud rechaza con 400 las descripciones vacias o que no son texto', () => {
  for (const descripcion of [undefined, '', '   ', 5, null, ['a']]) {
    const resultado = validar({ descripcion });
    assert.equal(resultado.valida, false);
    assert.equal(resultado.codigoHttp, 400);
    assert.equal(resultado.respuesta.mensaje, 'La descripcion no puede estar vacia');
  }
});

test('Validar solicitud rechaza con 400 umbrales, limites y colecciones invalidos', () => {
  for (const umbralSimilitud of [-0.01, 1.01, 'alto', NaN]) {
    assert.equal(validar({ descripcion: 'x', umbralSimilitud }).codigoHttp, 400, `umbral ${umbralSimilitud}`);
  }
  for (const limiteResultados of [0, 2, 6, 3.5, '4']) {
    assert.equal(validar({ descripcion: 'x', limiteResultados }).codigoHttp, 400, `limite ${limiteResultados}`);
  }
  for (const coleccion of ['../x', 'a b', '', 'a'.repeat(65), 7]) {
    assert.equal(validar({ descripcion: 'x', coleccion }).codigoHttp, 400, `coleccion ${coleccion}`);
  }
});

test('Armar respuesta ordena por similitud, redondea y conserva los metadatos', () => {
  const nodosPrevios = { 'Validar solicitud': { umbral: 0.4, limite: 5, limiteMinimo: 3 } };
  const entrada = {
    result: [
      { id: 2, score: 0.5123456, payload: { idArticulo: 2, titulo: 'B', categoria: 'Hardware', problema: 'p', solucion: 's', fecha: 'f' } },
      { id: 9, score: 0.9, payload: { idArticulo: 9, titulo: 'A', categoria: 'Software', problema: 'p', solucion: 's', fecha: 'f' } },
    ],
  };
  const { codigoHttp, respuesta } = ejecutarNodoCodigo('Armar respuesta', { entrada, nodosPrevios })[0].json;
  assert.equal(codigoHttp, 200);
  assert.equal(respuesta.estado, 'Con resultados');
  assert.deepEqual(respuesta.resultados.map((resultado) => resultado.idArticulo), [9, 2]);
  assert.equal(respuesta.resultados[1].similitud, 0.5123);
  assert.equal(respuesta.total, 2);
  assert.equal(respuesta.suficientes, false);
  assert.equal(respuesta.umbralSimilitud, 0.4);
});

test('Armar respuesta marca suficientes cuando hay al menos el minimo de resultados', () => {
  const nodosPrevios = { 'Validar solicitud': { umbral: 0.1, limite: 5, limiteMinimo: 3 } };
  const entrada = { result: [1, 2, 3].map((id) => ({ id, score: 0.5, payload: { idArticulo: id, titulo: 't' } })) };
  const { respuesta } = ejecutarNodoCodigo('Armar respuesta', { entrada, nodosPrevios })[0].json;
  assert.equal(respuesta.suficientes, true);
});

test('Armar respuesta sin puntos devuelve Sin resultados con mensaje y lista vacia', () => {
  const nodosPrevios = { 'Validar solicitud': { umbral: 0.6, limite: 5, limiteMinimo: 3 } };
  const { codigoHttp, respuesta } = ejecutarNodoCodigo('Armar respuesta', { entrada: { result: [] }, nodosPrevios })[0].json;
  assert.equal(codigoHttp, 200);
  assert.equal(respuesta.estado, 'Sin resultados');
  assert.equal(respuesta.mensaje, 'No hay informacion suficiente');
  assert.deepEqual(respuesta.resultados, []);
  assert.equal(respuesta.total, 0);
});

test('los errores de embeddings y de Qdrant responden 502 con mensaje controlado', () => {
  const errorEmbeddings = ejecutarNodoCodigo('Error de embeddings', { entrada: {} })[0].json;
  assert.equal(errorEmbeddings.codigoHttp, 502);
  assert.equal(errorEmbeddings.respuesta.estado, 'Error');
  const coleccionInexistente = ejecutarNodoCodigo('Error de Qdrant', { entrada: { error: { message: '404 - "{\"status\":{}}"' } } })[0].json;
  assert.match(coleccionInexistente.respuesta.mensaje, /indexacion/);
  const otroError = ejecutarNodoCodigo('Error de Qdrant', { entrada: { error: { message: 'connect ECONNREFUSED 127.0.0.1:6333' } } })[0].json;
  assert.equal(otroError.codigoHttp, 502);
  assert.match(otroError.respuesta.mensaje, /no esta disponible/);
});
