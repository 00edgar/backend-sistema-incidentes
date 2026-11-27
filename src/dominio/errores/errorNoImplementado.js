/**
 * Funcionalidad pendiente de programar (marca de esqueleto).
 *
 * Responsable: Dev3 | Historia ClickUp: 1.8.2 | Transversal
 */

import { ErrorDeDominio } from './errorDeDominio.js';

export class ErrorNoImplementado extends ErrorDeDominio {
  constructor(mensaje = 'Funcionalidad pendiente de programar (marca de esqueleto).', detalles = null) {
    super(mensaje, { codigoHttp: 501, codigoError: 'NO_IMPLEMENTADO', detalles });
  }
}
