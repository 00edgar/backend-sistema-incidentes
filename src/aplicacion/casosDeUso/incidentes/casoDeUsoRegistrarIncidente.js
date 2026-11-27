/**
 * CASO DE USO. Registra un incidente validando que existan la categoria y el usuario. Orquesta reglas de dominio y puertos; no conoce Express ni Prisma.
 *
 * Responsable: Dev3 | Historia ClickUp: 1.9.1 | RF01
 *
 * TODO: Implementar ejecutar(entrada). Hoy responde 501 (no implementado).
 */

import { ErrorNoImplementado } from '../../../dominio/errores/errorNoImplementado.js';

export class CasoDeUsoRegistrarIncidente {
  constructor({ repositorioIncidentes, repositorioUsuarios, repositorioCategorias }) {
    this.repositorioIncidentes = repositorioIncidentes;
    this.repositorioUsuarios = repositorioUsuarios;
    this.repositorioCategorias = repositorioCategorias;
  }

  async ejecutar(entrada) {
    throw new ErrorNoImplementado('CasoDeUsoRegistrarIncidente.ejecutar');
  }
}
