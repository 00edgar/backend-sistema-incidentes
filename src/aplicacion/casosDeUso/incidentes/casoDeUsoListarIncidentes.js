/**
 * CASO DE USO. Lista incidentes con filtros. Orquesta reglas de dominio y puertos; no conoce Express ni Prisma.
 *
 * Responsable: Dev3 | Historia ClickUp: 1.9.1 | RF01
 *
 * TODO: Implementar ejecutar(entrada). Hoy responde 501 (no implementado).
 */

import { ErrorNoImplementado } from '../../../dominio/errores/errorNoImplementado.js';

export class CasoDeUsoListarIncidentes {
  constructor({ repositorioIncidentes }) {
    this.repositorioIncidentes = repositorioIncidentes;
  }

  async ejecutar(entrada) {
    throw new ErrorNoImplementado('CasoDeUsoListarIncidentes.ejecutar');
  }
}
