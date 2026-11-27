/**
 * ESQUEMA DE VALIDACION (DTO) de filtros al listar articulos.
 *
 * Responsable: Dev3 | Historia ClickUp: 1.8.3 | RF02
 */

import { z } from 'zod';

export const esquemaFiltrosArticulos = {
  query: z.object({
    // TODO: filtros opcionales: estado, verificado, texto.
  }).passthrough(),
};
