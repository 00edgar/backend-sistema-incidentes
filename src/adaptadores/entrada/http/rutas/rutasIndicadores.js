/**
 * ADAPTADOR DE ENTRADA (HTTP). Define las rutas y conecta cada una con su esquema de validacion y su controlador.
 *
 * Responsable: Dev2 | Historia ClickUp: 2.5.1 | RF06, RF07
 */

import { Router } from 'express';
import { validarEsquema } from '../middlewares/validarEsquema.js';
import { esquemaFiltrosIndicadores } from '../esquemasValidacion/esquemaFiltrosIndicadores.js';

export function crearRutasIndicadores({ controladorIndicadores }) {
  const enrutador = Router();
  enrutador.get('/indicadores/total-por-periodo', validarEsquema(esquemaFiltrosIndicadores), controladorIndicadores.totalPorPeriodo);
  enrutador.get('/indicadores/por-categoria', validarEsquema(esquemaFiltrosIndicadores), controladorIndicadores.distribucionPorCategoria);
  enrutador.get('/indicadores/tendencia', validarEsquema(esquemaFiltrosIndicadores), controladorIndicadores.tendenciaTemporal);
  enrutador.get('/indicadores/tasa-resolucion', validarEsquema(esquemaFiltrosIndicadores), controladorIndicadores.tasaResolucion);
  enrutador.get('/indicadores/tiempo-promedio-resolucion', validarEsquema(esquemaFiltrosIndicadores), controladorIndicadores.tiempoPromedioResolucion);
  enrutador.get('/indicadores/categoria-mas-recurrente', validarEsquema(esquemaFiltrosIndicadores), controladorIndicadores.categoriaMasRecurrente);
  enrutador.get('/indicadores/por-prioridad', validarEsquema(esquemaFiltrosIndicadores), controladorIndicadores.distribucionPorPrioridad);
  return enrutador;
}
