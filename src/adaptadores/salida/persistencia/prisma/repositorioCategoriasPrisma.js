/**
 * ADAPTADOR DE SALIDA. Implementa PuertoRepositorioCategorias con Prisma + PostgreSQL.
 *
 * Responsable: Dev3 | Historia ClickUp: 1.10.1 | RF01
 */

import { PuertoRepositorioCategorias } from '../../../../aplicacion/puertos/salida/puertoRepositorioCategorias.js';
import { ErrorNoImplementado } from '../../../../dominio/errores/errorNoImplementado.js';

export class RepositorioCategoriasPrisma extends PuertoRepositorioCategorias {
  constructor({ obtenerClientePrisma }) {
    super();
    this.obtenerClientePrisma = obtenerClientePrisma;
  }

  async listar() {
    // TODO: Lista categorias.
    // const prisma = await this.obtenerClientePrisma();
    throw new ErrorNoImplementado('RepositorioCategoriasPrisma.listar');
  }

  async obtenerPorId(idCategoria) {
    // TODO: Devuelve una categoria o null.
    // const prisma = await this.obtenerClientePrisma();
    throw new ErrorNoImplementado('RepositorioCategoriasPrisma.obtenerPorId');
  }
}
