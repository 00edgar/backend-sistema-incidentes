/**
 * CASO DE USO. Cambia el estado aplicando las reglas de transicion. Orquesta reglas de dominio y puertos; no conoce Express ni Prisma.
 *
 * Responsable: Dev3 | Historia ClickUp: 1.9.2 | RF01
 *
 * TODO: Implementar ejecutar(entrada). Hoy responde 501 (no implementado).
 */

import { ErrorNoImplementado } from '../../../dominio/errores/errorNoImplementado.js';

export class CasoDeUsoActualizarEstadoIncidente {
  constructor({ repositorioIncidentes }) {
    this.repositorioIncidentes = repositorioIncidentes;
  }

  async ejecutar(entrada) {
    throw new ErrorNoImplementado('CasoDeUsoActualizarEstadoIncidente.ejecutar');
  }
}
