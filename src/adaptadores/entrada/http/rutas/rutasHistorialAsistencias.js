/**
 * ADAPTADOR DE ENTRADA (HTTP). Define las rutas y conecta cada una con su esquema de validacion y su controlador.
 *
 * Responsable: Dev2 | Historia ClickUp: 2.6.1 | RF08
 */

import { Router } from 'express';
import { validarEsquema } from '../middlewares/validarEsquema.js';
import { esquemaIdIncidenteParaHistorial } from '../esquemasValidacion/esquemaIdIncidenteParaHistorial.js';

export function crearRutasHistorialAsistencias({ controladorHistorialAsistencias }) {
  const enrutador = Router();
  enrutador.get('/incidentes/:idIncidente/asistencias', validarEsquema(esquemaIdIncidenteParaHistorial), controladorHistorialAsistencias.obtenerHistorial);
  return enrutador;
}
