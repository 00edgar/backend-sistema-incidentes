/**
 * ESQUEMA DE VALIDACION (DTO) del parametro idIncidente en el historial.
 *
 * Responsable: Dev2 | Historia ClickUp: 2.6.1 | RF08
 */

import { z } from 'zod';

export const esquemaIdIncidenteParaHistorial = {
  params: z.object({ idIncidente: z.coerce.number().int().positive() }),
};
