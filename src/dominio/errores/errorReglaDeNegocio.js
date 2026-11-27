/**
 * La operacion viola una regla de negocio.
 *
 * Responsable: Dev3 | Historia ClickUp: 1.8.2 | Transversal
 */

import { ErrorDeDominio } from './errorDeDominio.js';

export class ErrorReglaDeNegocio extends ErrorDeDominio {
  constructor(mensaje = 'La operacion viola una regla de negocio.', detalles = null) {
    super(mensaje, { codigoHttp: 409, codigoError: 'REGLA_DE_NEGOCIO', detalles });
  }
}
