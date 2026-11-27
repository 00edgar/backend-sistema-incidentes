/**
 * Los datos de entrada no son validos.
 *
 * Responsable: Dev3 | Historia ClickUp: 1.8.2 | Transversal
 */

import { ErrorDeDominio } from './errorDeDominio.js';

export class ErrorDeValidacion extends ErrorDeDominio {
  constructor(mensaje = 'Los datos de entrada no son validos.', detalles = null) {
    super(mensaje, { codigoHttp: 400, codigoError: 'VALIDACION_FALLIDA', detalles });
  }
}
