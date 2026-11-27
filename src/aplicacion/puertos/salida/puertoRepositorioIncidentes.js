/**
 * PUERTO DE SALIDA. Persistencia de incidentes. Los casos de uso dependen de este contrato, nunca de la implementacion.
 *
 * Responsable: Dev3 | Historia ClickUp: 1.9 | RF01
 */

import { ErrorNoImplementado } from '../../../dominio/errores/errorNoImplementado.js';

export class PuertoRepositorioIncidentes {
  /** Guarda un incidente nuevo y lo devuelve. */
  async crear(datosIncidente) {
    throw new ErrorNoImplementado('PuertoRepositorioIncidentes.crear');
  }

  /** Lista incidentes con filtros (categoria, prioridad, estado, fechas). */
  async listar(filtros) {
    throw new ErrorNoImplementado('PuertoRepositorioIncidentes.listar');
  }

  /** Devuelve un incidente o null si no existe. */
  async obtenerPorId(idIncidente) {
    throw new ErrorNoImplementado('PuertoRepositorioIncidentes.obtenerPorId');
  }

  /** Cambia el estado (y la fecha de cierre si corresponde). */
  async actualizarEstado(idIncidente, nuevoEstado) {
    throw new ErrorNoImplementado('PuertoRepositorioIncidentes.actualizarEstado');
  }
}
