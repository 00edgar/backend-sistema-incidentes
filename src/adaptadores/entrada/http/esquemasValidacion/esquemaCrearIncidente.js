/**
 * ESQUEMA DE VALIDACION (DTO) para registrar un incidente.
 *
 * Responsable: Dev3 | Historia ClickUp: 1.8.1 | RF01
 *
 * TODO: Revisar que los campos coincidan con la tabla Incidente.
 */

import { z } from 'zod';
import { LISTA_PRIORIDADES_INCIDENTE } from '../../../../dominio/constantes/prioridadesIncidente.js';

export const esquemaCrearIncidente = {
  body: z.object({
    // TODO: afinar longitudes y mensajes de error.
    titulo: z.string().trim().min(1),
    descripcion: z.string().trim().min(1),
    idCategoria: z.coerce.number().int().positive(),
    prioridad: z.enum(LISTA_PRIORIDADES_INCIDENTE),
    idUsuarioResponsable: z.coerce.number().int().positive(),
  }),
};
