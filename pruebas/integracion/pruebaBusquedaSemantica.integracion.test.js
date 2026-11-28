import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import { calibrarUmbralSimilitud } from '../../scripts/proveedorIaLocal/calibrarUmbralSimilitud.js';
import { consultarBusquedaSemantica } from '../../scripts/proveedorIaLocal/clienteBusquedaSemantica.js';
import { indexarArticulosParaPruebasDeBusqueda } from '../../scripts/proveedorIaLocal/indexarArticulosParaPruebasDeBusqueda.js';

const carpetaActual = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(carpetaActual, '../../.env') });

const COLECCION_PRUEBA = 'pruebasBusquedaSemantica';
const entorno = process.env;
const consultas = JSON.parse(
  fs.readFileSync(path.resolve(carpetaActual, '../datos/consultasEjemploBusqueda.json'), 'utf8'),
);
const CAMPOS_RESULTADO = ['idArticulo', 'titulo', 'categoria', 'similitud', 'problema', 'solucion', 'fecha'];

function buscar(cuerpo, cabecerasExtra = {}, tokenSecreto = entorno.N8N_TOKEN_SECRETO) {
  return consultarBusquedaSemantica({
    urlWebhook: entorno.N8N_URL_WEBHOOK_BUSQUEDA_SEMANTICA,
    tokenSecreto,
    cuerpo: { coleccion: COLECCION_PRUEBA, ...cuerpo },
    cabecerasExtra,
  });
}

async function prepararEscenario() {
  try {
    const sondeo = await buscar({ descripcion: '' });
    if (sondeo.codigoHttp !== 400) {
      return { motivoOmision: `el webhook de busqueda no esta activo (HTTP ${sondeo.codigoHttp})` };
    }
    const indexacion = await indexarArticulosParaPruebasDeBusqueda({ entorno, coleccion: COLECCION_PRUEBA });
    if (indexacion.articulosIndexados < 17) {
      return { motivoOmision: `faltan articulos elegibles (${indexacion.articulosIndexados})` };
    }
    const calibracion = await calibrarUmbralSimilitud({
      urlWebhook: entorno.N8N_URL_WEBHOOK_BUSQUEDA_SEMANTICA,
      tokenSecreto: entorno.N8N_TOKEN_SECRETO,
      coleccion: COLECCION_PRUEBA,
    });
    return { calibracion };
  } catch (error) {
    return { motivoOmision: `infraestructura no disponible: ${error.message}` };
  }
}

const { calibracion, motivoOmision } = await prepararEscenario();
const opciones = { skip: motivoOmision };

test('la calibracion separa las consultas relevantes de las que no tienen relacion', opciones, () => {
  assert.equal(calibracion.separable, true);
  assert.ok(calibracion.umbralSugerido > 0 && calibracion.umbralSugerido < 1);
});

test('cada consulta relevante devuelve su articulo esperado en primer lugar con metadatos', opciones, async () => {
  for (const { consulta, idArticuloEsperado } of consultas.consultasRelevantes) {
    const { codigoHttp, datos } = await buscar({ descripcion: consulta, umbralSimilitud: calibracion.umbralSugerido });
    assert.equal(codigoHttp, 200, consulta);
    assert.equal(datos.estado, 'Con resultados', consulta);
    assert.equal(datos.resultados[0].idArticulo, idArticuloEsperado, consulta);
    assert.ok(datos.resultados.length <= 5, consulta);
    for (const resultado of datos.resultados) {
      for (const campo of CAMPOS_RESULTADO) {
        assert.ok(campo in resultado, `${consulta}: falta ${campo}`);
      }
      assert.ok(resultado.similitud >= calibracion.umbralSugerido, consulta);
    }
  }
});

test('los resultados vienen ordenados por similitud descendente', opciones, async () => {
  const { datos } = await buscar({ descripcion: 'problema con la red y el internet', umbralSimilitud: 0, limiteResultados: 5 });
  const similitudes = datos.resultados.map((resultado) => resultado.similitud);
  assert.deepEqual(similitudes, [...similitudes].sort((a, b) => b - a));
});

test('una consulta sin relacion devuelve Sin resultados y no inventa fuentes', opciones, async () => {
  for (const { consulta } of consultas.consultasSinRelacion) {
    const { codigoHttp, datos } = await buscar({ descripcion: consulta, umbralSimilitud: calibracion.umbralSugerido });
    assert.equal(codigoHttp, 200, consulta);
    assert.equal(datos.estado, 'Sin resultados', consulta);
    assert.equal(datos.total, 0, consulta);
    assert.equal(datos.mensaje, 'No hay informacion suficiente', consulta);
  }
});

test('los articulos inactivos o no verificados nunca aparecen', opciones, async () => {
  for (const { consulta, idArticuloExcluido } of consultas.consultasSobreArticulosExcluidos) {
    const { datos } = await buscar({ descripcion: consulta, umbralSimilitud: 0, limiteResultados: 5 });
    const ids = datos.resultados.map((resultado) => resultado.idArticulo);
    assert.ok(!ids.includes(idArticuloExcluido), `${consulta}: aparecio el articulo ${idArticuloExcluido}`);
  }
});

test('el limite de resultados se respeta entre el minimo y el maximo configurados', opciones, async () => {
  const con5 = await buscar({ descripcion: 'equipo con problemas', umbralSimilitud: 0, limiteResultados: 5 });
  assert.equal(con5.datos.resultados.length, 5);
  assert.equal(con5.datos.suficientes, true);
  const con3 = await buscar({ descripcion: 'equipo con problemas', umbralSimilitud: 0, limiteResultados: 3 });
  assert.equal(con3.datos.resultados.length, 3);
  for (const limiteInvalido of [2, 6, 0, 3.5, '4']) {
    const { codigoHttp } = await buscar({ descripcion: 'equipo', limiteResultados: limiteInvalido });
    assert.equal(codigoHttp, 400, `limite ${limiteInvalido}`);
  }
});

test('el umbral por defecto sale de la variable de entorno UMBRAL_SIMILITUD', opciones, async () => {
  const { datos } = await buscar({ descripcion: 'equipo lento' });
  assert.equal(datos.umbralSimilitud, Number(entorno.UMBRAL_SIMILITUD));
});

test('un umbral mas alto devuelve menos o igual cantidad de resultados', opciones, async () => {
  const consulta = 'la impresora tiene problemas con el papel';
  const bajo = await buscar({ descripcion: consulta, umbralSimilitud: 0.05, limiteResultados: 5 });
  const alto = await buscar({ descripcion: consulta, umbralSimilitud: 0.5, limiteResultados: 5 });
  assert.ok(alto.datos.total <= bajo.datos.total);
  assert.ok(bajo.datos.total > 0);
});

test('solicitudes invalidas responden 400 con mensaje claro', opciones, async () => {
  const vacia = await buscar({ descripcion: '   ' });
  assert.equal(vacia.codigoHttp, 400);
  assert.equal(vacia.datos.mensaje, 'La descripcion no puede estar vacia');
  const sinDescripcion = await buscar({});
  assert.equal(sinDescripcion.codigoHttp, 400);
  for (const umbralInvalido of [-0.1, 1.5, 'alto']) {
    const { codigoHttp } = await buscar({ descripcion: 'equipo', umbralSimilitud: umbralInvalido });
    assert.equal(codigoHttp, 400, `umbral ${umbralInvalido}`);
  }
  const coleccionInvalida = await buscar({ descripcion: 'equipo', coleccion: '../otra/ruta' });
  assert.equal(coleccionInvalida.codigoHttp, 400);
});

test('sin token o con token incorrecto responde 401', opciones, async () => {
  const incorrecto = await buscar({ descripcion: 'equipo lento' }, {}, 'token-incorrecto');
  assert.equal(incorrecto.codigoHttp, 401);
  const respuestaSinCabecera = await fetch(entorno.N8N_URL_WEBHOOK_BUSQUEDA_SEMANTICA, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ descripcion: 'equipo lento', coleccion: COLECCION_PRUEBA }),
  });
  assert.equal(respuestaSinCabecera.status, 401);
});

test('una coleccion inexistente responde 502 con la indicacion de indexar primero', opciones, async () => {
  const { codigoHttp, datos } = await buscar({ descripcion: 'equipo lento', coleccion: 'coleccionQueNoExiste' });
  assert.equal(codigoHttp, 502);
  assert.equal(datos.estado, 'Error');
  assert.match(datos.mensaje, /indexacion/);
});
