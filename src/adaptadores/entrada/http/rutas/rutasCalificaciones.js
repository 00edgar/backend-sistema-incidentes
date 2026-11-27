/**
 * ADAPTADOR DE ENTRADA (HTTP). Define las rutas y conecta cada una con su esquema de validacion y su controlador.
 *
 * Responsable: Dev2 | Historia ClickUp: 2.6.2 | RF08
 */

import { Router } from 'express';
import { validarEsquema } from '../middlewares/validarEsquema.js';
import { esquemaCalificarRespuestaIA } from '../esquemasValidacion/esquemaCalificarRespuestaIA.js';

export function crearRutasCalificaciones({ controladorCalificaciones }) {
  const enrutador = Router();
  enrutador.post('/respuestas/:idRespuestaIA/calificaciones', validarEsquema(esquemaCalificarRespuestaIA), controladorCalificaciones.calificar);
  return enrutador;
}
