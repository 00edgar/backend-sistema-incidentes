/**
 * CASO DE USO. Guarda la calificacion de 1 a 5 de una respuesta. Orquesta reglas de dominio y puertos; no conoce Express ni Prisma.
 *
 * Responsable: Dev2 | Historia ClickUp: 2.6.2 | RF08
 *
 * TODO: Implementar ejecutar(entrada). Hoy responde 501 (no implementado).
 */

import { ErrorNoImplementado } from '../../../dominio/errores/errorNoImplementado.js';

export class CasoDeUsoCalificarRespuestaIA {
  constructor({ repositorioCalificaciones }) {
    this.repositorioCalificaciones = repositorioCalificaciones;
  }

  async ejecutar(entrada) {
    throw new ErrorNoImplementado('CasoDeUsoCalificarRespuestaIA.ejecutar');
  }
}
