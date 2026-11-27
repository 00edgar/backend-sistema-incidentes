/**
 * Construye la aplicacion Express: middlewares globales, rutas /api y manejo de errores.
 *
 * Responsable: Dev3 | Historia ClickUp: 1.8.2 | Transversal
 *
 * TODO: Anadir cada nuevo enrutador aqui al crearlo.
 */

import cors from 'cors';
import express from 'express';
import { manejadorErrores, rutaNoEncontrada } from './adaptadores/entrada/http/middlewares/manejadorErrores.js';
import { crearRutasSalud } from './adaptadores/entrada/http/rutas/rutasSalud.js';
import { crearRutasIncidentes } from './adaptadores/entrada/http/rutas/rutasIncidentes.js';
import { crearRutasCatalogos } from './adaptadores/entrada/http/rutas/rutasCatalogos.js';
import { crearRutasArticulos } from './adaptadores/entrada/http/rutas/rutasArticulos.js';
import { crearRutasIndexacion } from './adaptadores/entrada/http/rutas/rutasIndexacion.js';
import { crearRutasAsistenteIA } from './adaptadores/entrada/http/rutas/rutasAsistenteIA.js';
import { crearRutasHistorialAsistencias } from './adaptadores/entrada/http/rutas/rutasHistorialAsistencias.js';
import { crearRutasCalificaciones } from './adaptadores/entrada/http/rutas/rutasCalificaciones.js';
import { crearRutasIndicadores } from './adaptadores/entrada/http/rutas/rutasIndicadores.js';

export function crearAplicacion({ configuracion, controladores }) {
  const aplicacion = express();
  aplicacion.use(cors({ origin: configuracion.origenPermitidoFrontend }));
  aplicacion.use(express.json());

  // Regla de negocio: el frontend solo habla con este backend (nunca con n8n, Qdrant ni el proveedor de IA).
  const api = express.Router();
  api.use(crearRutasSalud());
  api.use(crearRutasIncidentes(controladores));
  api.use(crearRutasCatalogos(controladores));
  api.use(crearRutasArticulos(controladores));
  api.use(crearRutasIndexacion(controladores));
  api.use(crearRutasAsistenteIA(controladores));
  api.use(crearRutasHistorialAsistencias(controladores));
  api.use(crearRutasCalificaciones(controladores));
  api.use(crearRutasIndicadores(controladores));
  aplicacion.use('/api', api);

  aplicacion.use(rutaNoEncontrada);
  aplicacion.use(manejadorErrores);
  return aplicacion;
}
