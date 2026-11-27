/**
 * CASO DE USO. Lista usuarios. Orquesta reglas de dominio y puertos; no conoce Express ni Prisma.
 *
 * Responsable: Dev3 | Historia ClickUp: 1.10.1 | RF01
 *
 * TODO: Implementar ejecutar(entrada). Hoy responde 501 (no implementado).
 */

import { ErrorNoImplementado } from '../../../dominio/errores/errorNoImplementado.js';

export class CasoDeUsoListarUsuarios {
  constructor({ repositorioUsuarios }) {
    this.repositorioUsuarios = repositorioUsuarios;
  }

  async ejecutar(entrada) {
    throw new ErrorNoImplementado('CasoDeUsoListarUsuarios.ejecutar');
  }
}
