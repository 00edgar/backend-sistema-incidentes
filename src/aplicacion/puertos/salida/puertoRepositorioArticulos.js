/**
 * PUERTO DE SALIDA. Persistencia de articulos de conocimiento. Los casos de uso dependen de este contrato, nunca de la implementacion.
 *
 * Responsable: Dev3 | Historia ClickUp: 1.10.2 | RF02
 */

import { ErrorNoImplementado } from '../../../dominio/errores/errorNoImplementado.js';

export class PuertoRepositorioArticulos {
  /** Lista articulos con filtros (estado, verificado, categoria). */
  async listar(filtros) {
    throw new ErrorNoImplementado('PuertoRepositorioArticulos.listar');
  }

  /** Devuelve un articulo o null. */
  async obtenerPorId(idArticulo) {
    throw new ErrorNoImplementado('PuertoRepositorioArticulos.obtenerPorId');
  }

  /** Crea un articulo. */
  async crear(datosArticulo) {
    throw new ErrorNoImplementado('PuertoRepositorioArticulos.crear');
  }

  /** Edita un articulo. */
  async editar(idArticulo, datosArticulo) {
    throw new ErrorNoImplementado('PuertoRepositorioArticulos.editar');
  }

  /** Activa o desactiva un articulo. */
  async cambiarEstado(idArticulo, nuevoEstado) {
    throw new ErrorNoImplementado('PuertoRepositorioArticulos.cambiarEstado');
  }

  /** Devuelve solo los articulos existentes, activos y verificados entre los ids dados. */
  async obtenerElegiblesComoFuente(idsArticulos) {
    throw new ErrorNoImplementado('PuertoRepositorioArticulos.obtenerElegiblesComoFuente');
  }
}
