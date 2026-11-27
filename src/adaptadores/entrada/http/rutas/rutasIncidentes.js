/**
 * ADAPTADOR DE ENTRADA (HTTP). Define las rutas y conecta cada una con su esquema de validacion y su controlador.
 *
 * Responsable: Dev3 | Historia ClickUp: 1.9 | RF01
 */

import { Router } from 'express';
import { validarEsquema } from '../middlewares/validarEsquema.js';
import { esquemaActualizarEstadoIncidente } from '../esquemasValidacion/esquemaActualizarEstadoIncidente.js';
import { esquemaCrearIncidente } from '../esquemasValidacion/esquemaCrearIncidente.js';
import { esquemaFiltrosIncidentes } from '../esquemasValidacion/esquemaFiltrosIncidentes.js';
import { esquemaIdIncidente } from '../esquemasValidacion/esquemaIdIncidente.js';

export function crearRutasIncidentes({ controladorIncidentes }) {
  const enrutador = Router();
  enrutador.post('/incidentes', validarEsquema(esquemaCrearIncidente), controladorIncidentes.registrar);
  enrutador.get('/incidentes', validarEsquema(esquemaFiltrosIncidentes), controladorIncidentes.listar);
  enrutador.get('/incidentes/:idIncidente', validarEsquema(esquemaIdIncidente), controladorIncidentes.obtenerPorId);
  enrutador.patch('/incidentes/:idIncidente/estado', validarEsquema(esquemaActualizarEstadoIncidente), controladorIncidentes.actualizarEstado);
  return enrutador;
}
