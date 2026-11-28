import http from 'node:http';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { DIMENSIONES_EMBEDDING, generarEmbeddingLexico } from './generadorEmbeddingsLexicos.js';

const MODELO_LOCAL = 'embeddings-lexicos-local';
const TAMANO_MAXIMO_CUERPO_BYTES = 1_000_000;

function leerCuerpo(peticion) {
  return new Promise((resolver, rechazar) => {
    const fragmentos = [];
    let tamanoAcumulado = 0;
    peticion.on('data', (fragmento) => {
      tamanoAcumulado += fragmento.length;
      if (tamanoAcumulado > TAMANO_MAXIMO_CUERPO_BYTES) {
        rechazar(new Error('cuerpo demasiado grande'));
        peticion.destroy();
        return;
      }
      fragmentos.push(fragmento);
    });
    peticion.on('end', () => resolver(Buffer.concat(fragmentos).toString('utf8')));
    peticion.on('error', rechazar);
  });
}

function responderJson(respuesta, codigo, cuerpo) {
  respuesta.writeHead(codigo, { 'content-type': 'application/json' });
  respuesta.end(JSON.stringify(cuerpo));
}

function responderError(respuesta, codigo, mensaje) {
  responderJson(respuesta, codigo, { error: { message: mensaje, type: 'invalid_request_error' } });
}

async function atenderEmbeddings(peticion, respuesta) {
  let solicitud;
  try {
    solicitud = JSON.parse(await leerCuerpo(peticion));
  } catch {
    responderError(respuesta, 400, 'El cuerpo debe ser JSON valido');
    return;
  }
  const entradas = Array.isArray(solicitud?.input) ? solicitud.input : [solicitud?.input];
  if (entradas.length === 0 || entradas.some((entrada) => typeof entrada !== 'string')) {
    responderError(respuesta, 400, 'input debe ser un texto o una lista de textos');
    return;
  }
  const embeddings = entradas.map((entrada) => generarEmbeddingLexico(entrada));
  if (embeddings.some((embedding) => embedding === null)) {
    responderError(respuesta, 400, 'input no contiene palabras con significado');
    return;
  }
  responderJson(respuesta, 200, {
    object: 'list',
    model: solicitud.model || MODELO_LOCAL,
    data: embeddings.map((embedding, indice) => ({ object: 'embedding', index: indice, embedding })),
    usage: { prompt_tokens: 0, total_tokens: 0 },
  });
}

export function crearServidorEmbeddingsLocal() {
  return http.createServer(async (peticion, respuesta) => {
    const ruta = new URL(peticion.url, 'http://localhost').pathname;
    if (peticion.method === 'GET' && ruta === '/salud') {
      responderJson(respuesta, 200, { estado: 'ok', modelo: MODELO_LOCAL, dimensiones: DIMENSIONES_EMBEDDING });
      return;
    }
    if (peticion.method === 'POST' && ruta === '/v1/embeddings') {
      await atenderEmbeddings(peticion, respuesta);
      return;
    }
    responderError(respuesta, 404, 'Ruta no encontrada');
  });
}

const esEjecucionDirecta = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (esEjecucionDirecta) {
  const puerto = Number(process.env.EMBEDDINGS_LOCAL_PUERTO ?? 11434);
  crearServidorEmbeddingsLocal().listen(puerto, '127.0.0.1', () => {
    console.log(`Proveedor de embeddings local escuchando en http://127.0.0.1:${puerto}`);
  });
}
