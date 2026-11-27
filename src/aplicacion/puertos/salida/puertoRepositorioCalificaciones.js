/**
 * PUERTO DE SALIDA. Persistencia de calificaciones de utilidad. Los casos de uso dependen de este contrato, nunca de la implementacion.
 *
 * Responsable: Dev2 | Historia ClickUp: 2.6.2 | RF08
 */

import { ErrorNoImplementado } from '../../../dominio/errores/errorNoImplementado.js';

export class PuertoRepositorioCalificaciones {
  /** Guarda la calificacion de una respuesta. */
  async crear(datosCalificacion) {
    throw new ErrorNoImplementado('PuertoRepositorioCalificaciones.crear');
  }

  /** Devuelve la calificacion de una respuesta o null. */
  async obtenerPorRespuesta(idRespuestaIA) {
    throw new ErrorNoImplementado('PuertoRepositorioCalificaciones.obtenerPorRespuesta');
  }
}
