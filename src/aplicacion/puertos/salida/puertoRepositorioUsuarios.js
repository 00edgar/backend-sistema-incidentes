/**
 * PUERTO DE SALIDA. Persistencia de usuarios. Los casos de uso dependen de este contrato, nunca de la implementacion.
 *
 * Responsable: Dev3 | Historia ClickUp: 1.10.1 | RF01
 */

import { ErrorNoImplementado } from '../../../dominio/errores/errorNoImplementado.js';

export class PuertoRepositorioUsuarios {
  /** Lista usuarios. */
  async listar() {
    throw new ErrorNoImplementado('PuertoRepositorioUsuarios.listar');
  }

  /** Devuelve un usuario o null. */
  async obtenerPorId(idUsuario) {
    throw new ErrorNoImplementado('PuertoRepositorioUsuarios.obtenerPorId');
  }
}
