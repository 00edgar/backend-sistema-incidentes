/**
 * PUERTO DE SALIDA. Persistencia de categorias. Los casos de uso dependen de este contrato, nunca de la implementacion.
 *
 * Responsable: Dev3 | Historia ClickUp: 1.10.1 | RF01
 */

import { ErrorNoImplementado } from '../../../dominio/errores/errorNoImplementado.js';

export class PuertoRepositorioCategorias {
  /** Lista categorias. */
  async listar() {
    throw new ErrorNoImplementado('PuertoRepositorioCategorias.listar');
  }

  /** Devuelve una categoria o null. */
  async obtenerPorId(idCategoria) {
    throw new ErrorNoImplementado('PuertoRepositorioCategorias.obtenerPorId');
  }
}
