/**
 * PUERTO DE SALIDA. Consultas SQL analiticas (los 7 indicadores). Los casos de uso dependen de este contrato, nunca de la implementacion.
 *
 * Responsable: Dev2 | Historia ClickUp: 2.4 / 2.5 | RF06, RF07
 */

import { ErrorNoImplementado } from '../../../dominio/errores/errorNoImplementado.js';

export class PuertoRepositorioIndicadores {
  /** Indicador 1: total de incidentes y distribucion por periodo. */
  async totalPorPeriodo(filtros) {
    throw new ErrorNoImplementado('PuertoRepositorioIndicadores.totalPorPeriodo');
  }

  /** Indicador 2: frecuencia y porcentaje por categoria. */
  async distribucionPorCategoria(filtros) {
    throw new ErrorNoImplementado('PuertoRepositorioIndicadores.distribucionPorCategoria');
  }

  /** Indicador 3: evolucion diaria o semanal. */
  async tendenciaTemporal(filtros) {
    throw new ErrorNoImplementado('PuertoRepositorioIndicadores.tendenciaTemporal');
  }

  /** Indicador 4: resueltos sobre total. */
  async tasaResolucion(filtros) {
    throw new ErrorNoImplementado('PuertoRepositorioIndicadores.tasaResolucion');
  }

  /** Indicador 5: tiempo promedio de resolucion por categoria. */
  async tiempoPromedioResolucionPorCategoria(filtros) {
    throw new ErrorNoImplementado('PuertoRepositorioIndicadores.tiempoPromedioResolucionPorCategoria');
  }

  /** Indicador 6: categoria con mas incidentes. */
  async categoriaMasRecurrente(filtros) {
    throw new ErrorNoImplementado('PuertoRepositorioIndicadores.categoriaMasRecurrente');
  }

  /** Indicador 7: incidentes por prioridad. */
  async distribucionPorPrioridad(filtros) {
    throw new ErrorNoImplementado('PuertoRepositorioIndicadores.distribucionPorPrioridad');
  }
}
