/**
 * ADAPTADOR DE SALIDA. Implementa PuertoRepositorioUsuarios con Prisma + PostgreSQL.
 *
 * Responsable: Dev3 | Historia ClickUp: 1.10.1 | RF01
 */

import { PuertoRepositorioUsuarios } from '../../../../aplicacion/puertos/salida/puertoRepositorioUsuarios.js';
import { ErrorNoImplementado } from '../../../../dominio/errores/errorNoImplementado.js';

export class RepositorioUsuariosPrisma extends PuertoRepositorioUsuarios {
  constructor({ obtenerClientePrisma }) {
    super();
    this.obtenerClientePrisma = obtenerClientePrisma;
  }

  async listar() {
    // TODO: Lista usuarios.
    // const prisma = await this.obtenerClientePrisma();
    throw new ErrorNoImplementado('RepositorioUsuariosPrisma.listar');
  }

  async obtenerPorId(idUsuario) {
    // TODO: Devuelve un usuario o null.
    // const prisma = await this.obtenerClientePrisma();
    throw new ErrorNoImplementado('RepositorioUsuariosPrisma.obtenerPorId');
  }
}
