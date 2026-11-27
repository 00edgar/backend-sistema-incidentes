/**
 * El recurso solicitado no existe.
 *
 * Responsable: Dev3 | Historia ClickUp: 1.8.2 | Transversal
 */

import { ErrorDeDominio } from './errorDeDominio.js';

export class ErrorNoEncontrado extends ErrorDeDominio {
  constructor(mensaje = 'El recurso solicitado no existe.', detalles = null) {
    super(mensaje, { codigoHttp: 404, codigoError: 'NO_ENCONTRADO', detalles });
  }
}
