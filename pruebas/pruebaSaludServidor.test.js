/**
 * Prueba de humo: el servidor arranca y responde en /api/salud sin base de datos.
 *
 * Responsable: Dev3 | Historia ClickUp: 1.8.2 | Transversal
 */

import assert from 'node:assert/strict';
import { test } from 'node:test';
import { cargarConfiguracion } from '../src/configuracion/variablesEntorno.js';
import { construirContenedorDependencias } from '../src/configuracion/contenedorDependencias.js';
import { crearAplicacion } from '../src/aplicacion.js';

test('GET /api/salud responde ok', async () => {
  const configuracion = cargarConfiguracion({});
  const { controladores } = construirContenedorDependencias(configuracion);
  const aplicacion = crearAplicacion({ configuracion, controladores });
  const servidor = aplicacion.listen(0);
  try {
    const { port } = servidor.address();
    const respuesta = await fetch(`http://127.0.0.1:${port}/api/salud`);
    assert.equal(respuesta.status, 200);
    assert.equal((await respuesta.json()).estado, 'ok');
  } finally {
    servidor.close();
  }
});

test('un endpoint sin programar responde 501 (esqueleto)', async () => {
  const configuracion = cargarConfiguracion({});
  const { controladores } = construirContenedorDependencias(configuracion);
  const aplicacion = crearAplicacion({ configuracion, controladores });
  const servidor = aplicacion.listen(0);
  try {
    const { port } = servidor.address();
    const respuesta = await fetch(`http://127.0.0.1:${port}/api/usuarios`);
    assert.equal(respuesta.status, 501);
  } finally {
    servidor.close();
  }
});
