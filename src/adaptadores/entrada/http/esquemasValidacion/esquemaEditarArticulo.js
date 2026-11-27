/**
 * ESQUEMA DE VALIDACION (DTO) para editar un articulo.
 *
 * Responsable: Dev3 | Historia ClickUp: 1.8.3 | RF02
 */

import { z } from 'zod';

export const esquemaEditarArticulo = {
  params: z.object({ idArticulo: z.coerce.number().int().positive() }),
  body: z.object({
    // TODO: mismos campos que al crear, todos opcionales.
  }).passthrough(),
};
