/**
 * Clase base de todos los errores controlados del sistema.
 *
 * Responsable: Dev3 | Historia ClickUp: 1.8.2 | Transversal
 */

export class ErrorDeDominio extends Error {
  constructor(mensaje, { codigoHttp = 500, codigoError = 'ERROR_DE_DOMINIO', detalles = null } = {}) {
    super(mensaje);
    this.name = this.constructor.name;
    this.codigoHttp = codigoHttp;
    this.codigoError = codigoError;
    this.detalles = detalles;
  }
}
