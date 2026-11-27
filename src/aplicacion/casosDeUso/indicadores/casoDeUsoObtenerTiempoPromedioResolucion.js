/**
 * CASO DE USO. Indicador 5. Orquesta reglas de dominio y puertos; no conoce Express ni Prisma.
 *
 * Responsable: Dev2 | Historia ClickUp: 2.5.1 | RF06, RF07
 *
 * TODO: Implementar ejecutar(entrada). Hoy responde 501 (no implementado).
 */

import { ErrorNoImplementado } from '../../../dominio/errores/errorNoImplementado.js';

export class CasoDeUsoObtenerTiempoPromedioResolucion {
  constructor({ repositorioIndicadores }) {
    this.repositorioIndicadores = repositorioIndicadores;
  }

  async ejecutar(entrada) {
    throw new ErrorNoImplementado('CasoDeUsoObtenerTiempoPromedioResolucion.ejecutar');
  }
}
