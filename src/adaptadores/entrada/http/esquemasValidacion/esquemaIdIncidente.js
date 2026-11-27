/**
 * ESQUEMA DE VALIDACION (DTO) del parametro idIncidente.
 *
 * Responsable: Dev3 | Historia ClickUp: 1.8.1 | RF01
 */

import { z } from 'zod';

export const esquemaIdIncidente = {
  params: z.object({ idIncidente: z.coerce.number().int().positive() }),
};
