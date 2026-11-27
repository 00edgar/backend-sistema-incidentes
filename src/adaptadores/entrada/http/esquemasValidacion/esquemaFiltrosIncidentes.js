/**
 * ESQUEMA DE VALIDACION (DTO) de filtros al listar incidentes.
 *
 * Responsable: Dev3 | Historia ClickUp: 1.8.1 | RF01
 */

import { z } from 'zod';

export const esquemaFiltrosIncidentes = {
  query: z.object({
    // TODO: filtros opcionales: idCategoria, prioridad, estado, fechaDesde, fechaHasta, pagina, tamanoPagina.
  }).passthrough(),
};
