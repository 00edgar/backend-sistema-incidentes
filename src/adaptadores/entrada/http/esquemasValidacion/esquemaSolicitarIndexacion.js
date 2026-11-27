/**
 * ESQUEMA DE VALIDACION (DTO) para pedir la indexacion de articulos.
 *
 * Responsable: Dev1 | Historia ClickUp: 2.1.3 | RF03
 */

import { z } from 'zod';
import { LISTA_MODOS_INDEXACION } from '../../../../dominio/constantes/modosIndexacion.js';

export const esquemaSolicitarIndexacion = {
  body: z.object({
    modo: z.enum(LISTA_MODOS_INDEXACION),
    idsArticulos: z.array(z.coerce.number().int().positive()).optional(),
  }),
};
