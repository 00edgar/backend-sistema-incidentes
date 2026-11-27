/**
 * CASO DE USO. Lista articulos de la base de conocimiento. Orquesta reglas de dominio y puertos; no conoce Express ni Prisma.
 *
 * Responsable: Dev3 | Historia ClickUp: 1.10.2 | RF02
 *
 * TODO: Implementar ejecutar(entrada). Hoy responde 501 (no implementado).
 */

import { ErrorNoImplementado } from '../../../dominio/errores/errorNoImplementado.js';

export class CasoDeUsoListarArticulos {
  constructor({ repositorioArticulos }) {
    this.repositorioArticulos = repositorioArticulos;
  }

  async ejecutar(entrada) {
    throw new ErrorNoImplementado('CasoDeUsoListarArticulos.ejecutar');
  }
}
