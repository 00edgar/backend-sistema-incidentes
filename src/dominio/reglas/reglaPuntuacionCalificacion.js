/**
 * Regla de negocio: la calificacion de utilidad es un entero entre 1 y 5.
 *
 * Responsable: Dev2 | Historia ClickUp: 2.6.2 | RF08
 *
 * TODO: Implementar validarPuntuacion y lanzar ErrorDeValidacion si no cumple.
 */

import { ErrorNoImplementado } from '../errores/errorNoImplementado.js';

export const PUNTUACION_MINIMA = 1;
export const PUNTUACION_MAXIMA = 5;

export function validarPuntuacion(puntuacion) {
  throw new ErrorNoImplementado('validarPuntuacion');
}
