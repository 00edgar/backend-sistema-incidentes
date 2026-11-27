/**
 * ADAPTADOR DE ENTRADA (HTTP). Define las rutas y conecta cada una con su esquema de validacion y su controlador.
 *
 * Responsable: Dev1 | Historia ClickUp: 2.1.3 | RF03
 */

import { Router } from 'express';
import { validarEsquema } from '../middlewares/validarEsquema.js';
import { esquemaSolicitarIndexacion } from '../esquemasValidacion/esquemaSolicitarIndexacion.js';

export function crearRutasIndexacion({ controladorIndexacion }) {
  const enrutador = Router();
  enrutador.post('/articulos/indexacion', validarEsquema(esquemaSolicitarIndexacion), controladorIndexacion.solicitarIndexacion);
  return enrutador;
}
