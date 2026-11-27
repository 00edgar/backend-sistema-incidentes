/**
 * CASO DE USO. Historial de consultas de un incidente con sus fuentes. Orquesta reglas de dominio y puertos; no conoce Express ni Prisma.
 *
 * Responsable: Dev2 | Historia ClickUp: 2.6.1 | RF08
 *
 * TODO: Implementar ejecutar(entrada). Hoy responde 501 (no implementado).
 */

import { ErrorNoImplementado } from '../../../dominio/errores/errorNoImplementado.js';

export class CasoDeUsoObtenerHistorialAsistencias {
  constructor({ repositorioIncidentes, repositorioConsultasIA }) {
    this.repositorioIncidentes = repositorioIncidentes;
    this.repositorioConsultasIA = repositorioConsultasIA;
  }

  async ejecutar(entrada) {
    throw new ErrorNoImplementado('CasoDeUsoObtenerHistorialAsistencias.ejecutar');
  }
}
