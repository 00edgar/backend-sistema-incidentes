import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  DIMENSIONES_EMBEDDING,
  calcularSimilitudCoseno,
  extraerPalabras,
  generarEmbeddingLexico,
  normalizarTexto,
} from '../scripts/proveedorIaLocal/generadorEmbeddingsLexicos.js';
import { crearServidorEmbeddingsLocal } from '../scripts/proveedorIaLocal/servidorEmbeddingsLocal.js';

test('normalizarTexto quita tildes, mayusculas y signos', () => {
  assert.equal(normalizarTexto('  ¡Conexión CAÍDA, sin Internet!  '), 'conexion caida sin internet');
});

test('extraerPalabras descarta palabras vacias y palabras de una letra', () => {
  assert.deepEqual(extraerPalabras('El equipo de la oficina y a su red'), ['equipo', 'oficina', 'red']);
});

test('el embedding tiene la dimension configurada y norma 1', () => {
  const embedding = generarEmbeddingLexico('impresora con atasco de papel');
  assert.equal(embedding.length, DIMENSIONES_EMBEDDING);
  const norma = Math.sqrt(embedding.reduce((suma, valor) => suma + valor * valor, 0));
  assert.ok(Math.abs(norma - 1) < 1e-9);
});

test('el embedding es determinista', () => {
  assert.deepEqual(generarEmbeddingLexico('vpn no conecta'), generarEmbeddingLexico('vpn no conecta'));
});

test('un texto sin palabras con significado no genera embedding', () => {
  assert.equal(generarEmbeddingLexico('   de la el   '), null);
  assert.equal(generarEmbeddingLexico(''), null);
});

test('textos del mismo tema son mas similares que textos de otro tema', () => {
  const consulta = generarEmbeddingLexico('la impresora tiene atascos de papel');
  const mismoTema = generarEmbeddingLexico('Impresora láser con atascos de papel recurrentes');
  const otroTema = generarEmbeddingLexico('Cuenta bloqueada en el directorio por intentos fallidos');
  assert.ok(calcularSimilitudCoseno(consulta, mismoTema) > calcularSimilitudCoseno(consulta, otroTema) + 0.2);
});

test('la similitud de un texto consigo mismo es 1', () => {
  const embedding = generarEmbeddingLexico('disco duro con ruidos');
  assert.ok(Math.abs(calcularSimilitudCoseno(embedding, embedding) - 1) < 1e-9);
});

async function conServidor(accion) {
  const servidor = crearServidorEmbeddingsLocal();
  await new Promise((resolver) => servidor.listen(0, '127.0.0.1', resolver));
  try {
    await accion(`http://127.0.0.1:${servidor.address().port}`);
  } finally {
    await new Promise((resolver) => servidor.close(resolver));
  }
}

test('POST /v1/embeddings responde con el formato compatible con OpenAI', async () => {
  await conServidor(async (urlBase) => {
    const respuesta = await fetch(`${urlBase}/v1/embeddings`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ model: 'modelo-x', input: ['wifi lento', 'vpn caida'] }),
    });
    assert.equal(respuesta.status, 200);
    const cuerpo = await respuesta.json();
    assert.equal(cuerpo.object, 'list');
    assert.equal(cuerpo.model, 'modelo-x');
    assert.equal(cuerpo.data.length, 2);
    assert.equal(cuerpo.data[1].index, 1);
    assert.equal(cuerpo.data[0].embedding.length, DIMENSIONES_EMBEDDING);
  });
});

test('POST /v1/embeddings acepta un texto simple', async () => {
  await conServidor(async (urlBase) => {
    const respuesta = await fetch(`${urlBase}/v1/embeddings`, {
      method: 'POST',
      body: JSON.stringify({ input: 'monitor parpadea' }),
    });
    assert.equal(respuesta.status, 200);
    assert.equal((await respuesta.json()).data.length, 1);
  });
});

test('POST /v1/embeddings rechaza entradas invalidas con 400', async () => {
  await conServidor(async (urlBase) => {
    const casos = ['no es json', JSON.stringify({}), JSON.stringify({ input: 5 }), JSON.stringify({ input: [] }), JSON.stringify({ input: 'de la el' })];
    for (const cuerpo of casos) {
      const respuesta = await fetch(`${urlBase}/v1/embeddings`, { method: 'POST', body: cuerpo });
      assert.equal(respuesta.status, 400, cuerpo);
    }
  });
});

test('las rutas desconocidas responden 404 y /salud responde ok', async () => {
  await conServidor(async (urlBase) => {
    assert.equal((await fetch(`${urlBase}/otra`)).status, 404);
    const salud = await fetch(`${urlBase}/salud`);
    assert.equal(salud.status, 200);
    assert.equal((await salud.json()).estado, 'ok');
  });
});
