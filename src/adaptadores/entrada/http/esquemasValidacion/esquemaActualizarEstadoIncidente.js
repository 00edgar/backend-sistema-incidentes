/**
 * ESQUEMA DE VALIDACION (DTO) para cambiar el estado de un incidente.
 *
 * Responsable: Dev3 | Historia ClickUp: 1.8.1 | RF01
 */

import { z } from 'zod';
import { LISTA_ESTADOS_INCIDENTE } from '../../../../dominio/constantes/estadosIncidente.js';

export const esquemaActualizarEstadoIncidente = {
  params: z.object({ idIncidente: z.coerce.number().int().positive() }),
  body: z.object({ estado: z.enum(LISTA_ESTADOS_INCIDENTE) }),
};
