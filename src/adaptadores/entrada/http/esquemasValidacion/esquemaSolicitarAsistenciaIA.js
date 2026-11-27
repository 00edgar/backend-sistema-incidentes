/**
 * ESQUEMA DE VALIDACION (DTO) para pedir asistencia de IA sobre un incidente.
 *
 * Responsable: Dev3 | Historia ClickUp: 2.7.1 | RF05
 */

import { z } from 'zod';

export const esquemaSolicitarAsistenciaIA = {
  params: z.object({ idIncidente: z.coerce.number().int().positive() }),
  body: z.object({
    // TODO (regla de negocio): una descripcion/pregunta vacia debe ser rechazada ANTES de ejecutar el flujo inteligente.
    pregunta: z.string().trim().min(1),
  }),
};
