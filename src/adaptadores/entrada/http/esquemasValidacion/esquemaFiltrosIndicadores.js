/**
 * ESQUEMA DE VALIDACION (DTO) de filtros para los indicadores (fechas, categoria y prioridad).
 *
 * Responsable: Dev2 | Historia ClickUp: 2.5.1 | RF06, RF07
 */

import { z } from 'zod';

export const esquemaFiltrosIndicadores = {
  query: z.object({
    fechaDesde: z.string().optional(),
    fechaHasta: z.string().optional(),
    idCategoria: z.coerce.number().int().positive().optional(),
    prioridad: z.string().optional(),
    // TODO: agrupacion ('dia' | 'semana') para la tendencia temporal.
  }),
};
