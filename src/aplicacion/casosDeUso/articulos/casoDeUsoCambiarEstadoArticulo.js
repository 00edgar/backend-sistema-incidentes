/**
 * CASO DE USO. Activa o desactiva un articulo; al desactivar pide al Flujo 1 sacarlo del indice. Orquesta reglas de dominio y puertos; no conoce Express ni Prisma.
 *
 * Responsable: Dev3 | Historia ClickUp: 1.10.2 | RF02, RF03
 *
 * TODO: Implementar ejecutar(entrada). Hoy responde 501 (no implementado).
 */

import { ErrorNoImplementado } from '../../../dominio/errores/errorNoImplementado.js';

export class CasoDeUsoCambiarEstadoArticulo {
  constructor({ repositorioArticulos, indexadorArticulos }) {
    this.repositorioArticulos = repositorioArticulos;
    this.indexadorArticulos = indexadorArticulos;
  }

  async ejecutar(entrada) {
    throw new ErrorNoImplementado('CasoDeUsoCambiarEstadoArticulo.ejecutar');
  }
}
