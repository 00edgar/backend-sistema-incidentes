/**
 * ESQUEMA DE VALIDACION (DTO) para crear un articulo de conocimiento.
 *
 * Responsable: Dev3 | Historia ClickUp: 1.8.3 | RF02
 */

import { z } from 'zod';

export const esquemaCrearArticulo = {
  body: z.object({
    // TODO: titulo, problema, sintomas, causa, solucion (obligatorios) y verificado (booleano).
  }).passthrough(),
};
