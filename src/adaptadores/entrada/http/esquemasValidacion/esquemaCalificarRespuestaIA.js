/**
 * ESQUEMA DE VALIDACION (DTO) para calificar una respuesta (1 a 5).
 *
 * Responsable: Dev2 | Historia ClickUp: 2.6.2 | RF08
 */

import { z } from 'zod';
import { PUNTUACION_MINIMA, PUNTUACION_MAXIMA } from '../../../../dominio/reglas/reglaPuntuacionCalificacion.js';

export const esquemaCalificarRespuestaIA = {
  params: z.object({ idRespuestaIA: z.coerce.number().int().positive() }),
  body: z.object({
    puntuacion: z.coerce.number().int().min(PUNTUACION_MINIMA).max(PUNTUACION_MAXIMA),
    comentario: z.string().trim().max(1000).optional(),
  }),
};
