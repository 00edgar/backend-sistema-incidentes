/**
 * ADAPTADOR DE SALIDA. Implementa PuertoRepositorioArticulos con Prisma + PostgreSQL.
 *
 * Responsable: Dev3 | Historia ClickUp: 1.10.2 | RF02
 */

import { PuertoRepositorioArticulos } from '../../../../aplicacion/puertos/salida/puertoRepositorioArticulos.js';
import { ErrorNoImplementado } from '../../../../dominio/errores/errorNoImplementado.js';

export class RepositorioArticulosPrisma extends PuertoRepositorioArticulos {
  constructor({ obtenerClientePrisma }) {
    super();
    this.obtenerClientePrisma = obtenerClientePrisma;
  }

  async listar(filtros) {
    // TODO: Lista articulos con filtros.
    // const prisma = await this.obtenerClientePrisma();
    throw new ErrorNoImplementado('RepositorioArticulosPrisma.listar');
  }

  async obtenerPorId(idArticulo) {
    // TODO: Devuelve un articulo o null.
    // const prisma = await this.obtenerClientePrisma();
    throw new ErrorNoImplementado('RepositorioArticulosPrisma.obtenerPorId');
  }

  async crear(datosArticulo) {
    // TODO: Crea un articulo.
    // const prisma = await this.obtenerClientePrisma();
    throw new ErrorNoImplementado('RepositorioArticulosPrisma.crear');
  }

  async editar(idArticulo, datosArticulo) {
    // TODO: Edita un articulo.
    // const prisma = await this.obtenerClientePrisma();
    throw new ErrorNoImplementado('RepositorioArticulosPrisma.editar');
  }

  async cambiarEstado(idArticulo, nuevoEstado) {
    // TODO: Activa o desactiva un articulo.
    // const prisma = await this.obtenerClientePrisma();
    throw new ErrorNoImplementado('RepositorioArticulosPrisma.cambiarEstado');
  }

  async obtenerElegiblesComoFuente(idsArticulos) {
    // TODO: Solo articulos existentes, activos y verificados.
    // const prisma = await this.obtenerClientePrisma();
    throw new ErrorNoImplementado('RepositorioArticulosPrisma.obtenerElegiblesComoFuente');
  }
}
