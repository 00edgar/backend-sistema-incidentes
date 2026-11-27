/**
 * ADAPTADOR DE SALIDA. Implementa PuertoRepositorioCalificaciones con Prisma + PostgreSQL.
 *
 * Responsable: Dev2 | Historia ClickUp: 2.6.2 | RF08
 */

import { PuertoRepositorioCalificaciones } from '../../../../aplicacion/puertos/salida/puertoRepositorioCalificaciones.js';
import { ErrorNoImplementado } from '../../../../dominio/errores/errorNoImplementado.js';

export class RepositorioCalificacionesPrisma extends PuertoRepositorioCalificaciones {
  constructor({ obtenerClientePrisma }) {
    super();
    this.obtenerClientePrisma = obtenerClientePrisma;
  }

  async crear(datosCalificacion) {
    // TODO: Guarda la calificacion.
    // const prisma = await this.obtenerClientePrisma();
    throw new ErrorNoImplementado('RepositorioCalificacionesPrisma.crear');
  }

  async obtenerPorRespuesta(idRespuestaIA) {
    // TODO: Devuelve la calificacion o null.
    // const prisma = await this.obtenerClientePrisma();
    throw new ErrorNoImplementado('RepositorioCalificacionesPrisma.obtenerPorRespuesta');
  }
}
