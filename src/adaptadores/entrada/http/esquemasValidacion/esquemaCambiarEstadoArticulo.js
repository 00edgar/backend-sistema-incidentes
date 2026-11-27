/**
 * ESQUEMA DE VALIDACION (DTO) para activar o desactivar un articulo.
 *
 * Responsable: Dev3 | Historia ClickUp: 1.8.3 | RF02
 */

import { z } from 'zod';
import { LISTA_ESTADOS_ARTICULO } from '../../../../dominio/constantes/estadosArticulo.js';

export const esquemaCambiarEstadoArticulo = {
  params: z.object({ idArticulo: z.coerce.number().int().positive() }),
  body: z.object({ estado: z.enum(LISTA_ESTADOS_ARTICULO) }),
};
