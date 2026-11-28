import assert from 'node:assert/strict';
import http from 'node:http';
import { test } from 'node:test';
import {
  formatearResultados,
  verificarInfraestructura,
  verificarN8n,
  verificarPostgresql,
  verificarQdrant,
} from '../scripts/infraestructuraLocal/verificarInfraestructura.js';

function levantarServidor(manejador) {
  return new Promise((resolver) => {
    const servidor = http.createServer(manejador);
    servidor.listen(0, '127.0.0.1', () => {
      resolver({ servidor, url: `http://127.0.0.1:${servidor.address().port}` });
    });
  });
}

async function obtenerUrlDePuertoCerrado() {
  const { servidor, url } = await levantarServidor(() => {});
  await new Promise((resolver) => servidor.close(resolver));
  return url;
}

function responderJson(respuesta, cuerpo, codigo = 200) {
  respuesta.writeHead(codigo, { 'content-type': 'application/json' });
  respuesta.end(JSON.stringify(cuerpo));
}

test('Qdrant cumple cuando /healthz y /collections responden', async () => {
  const { servidor, url } = await levantarServidor((peticion, respuesta) => {
    if (peticion.url === '/healthz') {
      respuesta.end('healthz check passed');
      return;
    }
    responderJson(respuesta, { result: { collections: [{ name: 'articulosConocimiento' }] }, status: 'ok' });
  });
  try {
    const resultado = await verificarQdrant(url);
    assert.equal(resultado.cumple, true);
    assert.match(resultado.detalle, /colecciones: 1/);
  } finally {
    servidor.close();
  }
});

test('Qdrant no cumple cuando /healthz responde con error', async () => {
  const { servidor, url } = await levantarServidor((peticion, respuesta) => {
    respuesta.writeHead(503).end();
  });
  try {
    const resultado = await verificarQdrant(url);
    assert.equal(resultado.cumple, false);
    assert.match(resultado.detalle, /503/);
  } finally {
    servidor.close();
  }
});

test('Qdrant no cumple cuando el puerto esta cerrado', async () => {
  const resultado = await verificarQdrant(await obtenerUrlDePuertoCerrado());
  assert.equal(resultado.cumple, false);
});

test('Qdrant no cumple sin URL configurada', async () => {
  const resultado = await verificarQdrant('');
  assert.equal(resultado.cumple, false);
  assert.match(resultado.detalle, /QDRANT_URL/);
});

test('n8n cumple cuando /healthz devuelve status ok', async () => {
  const { servidor, url } = await levantarServidor((peticion, respuesta) => responderJson(respuesta, { status: 'ok' }));
  try {
    const resultado = await verificarN8n(url);
    assert.equal(resultado.cumple, true);
  } finally {
    servidor.close();
  }
});

test('n8n no cumple cuando /healthz devuelve un estado distinto de ok', async () => {
  const { servidor, url } = await levantarServidor((peticion, respuesta) => responderJson(respuesta, { status: 'error' }));
  try {
    const resultado = await verificarN8n(url);
    assert.equal(resultado.cumple, false);
  } finally {
    servidor.close();
  }
});

test('n8n no cumple cuando el puerto esta cerrado', async () => {
  const resultado = await verificarN8n(await obtenerUrlDePuertoCerrado());
  assert.equal(resultado.cumple, false);
});

test('PostgreSQL no cumple sin DATABASE_URL', async () => {
  const resultado = await verificarPostgresql('');
  assert.equal(resultado.cumple, false);
  assert.match(resultado.detalle, /DATABASE_URL/);
});

test('PostgreSQL no cumple cuando el puerto esta cerrado', async () => {
  const urlCerrada = await obtenerUrlDePuertoCerrado();
  const puerto = new URL(urlCerrada).port;
  const resultado = await verificarPostgresql(`postgresql://usuario:clave@127.0.0.1:${puerto}/base`);
  assert.equal(resultado.cumple, false);
});

test('verificarInfraestructura agrega los tres servicios y formatearResultados marca Cumple y No cumple', async () => {
  const { servidor, url } = await levantarServidor((peticion, respuesta) => {
    if (peticion.url === '/healthz' && peticion.headers.host) {
      responderJson(respuesta, { status: 'ok' });
      return;
    }
    responderJson(respuesta, { result: { collections: [] } });
  });
  try {
    const resultados = await verificarInfraestructura({
      DATABASE_URL: '',
      QDRANT_URL: url,
      N8N_URL_BASE: url,
    });
    assert.deepEqual(resultados.map((resultado) => resultado.servicio), ['PostgreSQL', 'Qdrant', 'n8n']);
    const salida = formatearResultados(resultados);
    assert.match(salida, /No cumple\s+PostgreSQL/);
    assert.match(salida, /Cumple\s+Qdrant/);
    assert.match(salida, /Cumple\s+n8n/);
  } finally {
    servidor.close();
  }
});
