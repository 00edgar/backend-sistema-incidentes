/**
 * ADAPTADOR DE ENTRADA (HTTP). Define las rutas y conecta cada una con su esquema de validacion y su controlador.
 *
 * Responsable: Dev3 | Historia ClickUp: 1.10.1 | RF01
 */

import { Router } from 'express';

export function crearRutasCatalogos({ controladorCatalogos }) {
  const enrutador = Router();
  enrutador.get('/usuarios', controladorCatalogos.listarUsuarios);
  enrutador.get('/categorias', controladorCatalogos.listarCategorias);
  return enrutador;
}
