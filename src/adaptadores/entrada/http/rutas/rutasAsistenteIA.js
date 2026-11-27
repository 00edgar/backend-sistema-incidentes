/**
 * ADAPTADOR DE ENTRADA (HTTP). Define las rutas y conecta cada una con su esquema de validacion y su controlador.
 *
 * Responsable: Dev3 | Historia ClickUp: 2.7.2 | RF05
 */

import { Router } from 'express';
import { validarEsquema } from '../middlewares/validarEsquema.js';
import { esquemaSolicitarAsistenciaIA } from '../esquemasValidacion/esquemaSolicitarAsistenciaIA.js';

export function crearRutasAsistenteIA({ controladorAsistenteIA }) {
  const enrutador = Router();
  enrutador.post('/incidentes/:idIncidente/asistencias', validarEsquema(esquemaSolicitarAsistenciaIA), controladorAsistenteIA.solicitarAsistencia);
  return enrutador;
}
