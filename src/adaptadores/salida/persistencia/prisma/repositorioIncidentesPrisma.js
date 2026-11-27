/**
 * ADAPTADOR DE SALIDA. Implementa PuertoRepositorioIncidentes con Prisma + PostgreSQL.
 *
 * Responsable: Dev3 | Historia ClickUp: 1.9 | RF01
 */

import { PuertoRepositorioIncidentes } from '../../../../aplicacion/puertos/salida/puertoRepositorioIncidentes.js';
import { ErrorNoImplementado } from '../../../../dominio/errores/errorNoImplementado.js';

export class RepositorioIncidentesPrisma extends PuertoRepositorioIncidentes {
  constructor({ obtenerClientePrisma }) {
    super();
    this.obtenerClientePrisma = obtenerClientePrisma;
  }

  async crear(datosIncidente) {
    // TODO: Guarda un incidente nuevo y lo devuelve.
    // const prisma = await this.obtenerClientePrisma();
    throw new ErrorNoImplementado('RepositorioIncidentesPrisma.crear');
  }

  async listar(filtros) {
    // TODO: Lista incidentes con filtros (categoria, prioridad, estado, fechas).
    // const prisma = await this.obtenerClientePrisma();
    throw new ErrorNoImplementado('RepositorioIncidentesPrisma.listar');
  }

  async obtenerPorId(idIncidente) {
    // TODO: Devuelve un incidente o null.
    // const prisma = await this.obtenerClientePrisma();
    throw new ErrorNoImplementado('RepositorioIncidentesPrisma.obtenerPorId');
  }

  async actualizarEstado(idIncidente, nuevoEstado) {
    // TODO: Cambia el estado y la fecha de cierre si corresponde.
    // const prisma = await this.obtenerClientePrisma();
    throw new ErrorNoImplementado('RepositorioIncidentesPrisma.actualizarEstado');
  }
}
