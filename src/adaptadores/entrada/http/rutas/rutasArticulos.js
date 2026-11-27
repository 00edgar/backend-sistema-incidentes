/**
 * ADAPTADOR DE ENTRADA (HTTP). Define las rutas y conecta cada una con su esquema de validacion y su controlador.
 *
 * Responsable: Dev3 | Historia ClickUp: 1.10.2 | RF02
 */

import { Router } from 'express';
import { validarEsquema } from '../middlewares/validarEsquema.js';
import { esquemaCambiarEstadoArticulo } from '../esquemasValidacion/esquemaCambiarEstadoArticulo.js';
import { esquemaCrearArticulo } from '../esquemasValidacion/esquemaCrearArticulo.js';
import { esquemaEditarArticulo } from '../esquemasValidacion/esquemaEditarArticulo.js';
import { esquemaFiltrosArticulos } from '../esquemasValidacion/esquemaFiltrosArticulos.js';

export function crearRutasArticulos({ controladorArticulos }) {
  const enrutador = Router();
  enrutador.get('/articulos', validarEsquema(esquemaFiltrosArticulos), controladorArticulos.listar);
  enrutador.post('/articulos', validarEsquema(esquemaCrearArticulo), controladorArticulos.crear);
  enrutador.put('/articulos/:idArticulo', validarEsquema(esquemaEditarArticulo), controladorArticulos.editar);
  enrutador.patch('/articulos/:idArticulo/estado', validarEsquema(esquemaCambiarEstadoArticulo), controladorArticulos.cambiarEstado);
  return enrutador;
}
