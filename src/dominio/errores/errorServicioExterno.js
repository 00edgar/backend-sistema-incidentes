/**
 * Fallo un servicio externo (n8n, proveedor de IA).
 *
 * Responsable: Dev3 | Historia ClickUp: 1.8.2 | Transversal
 */

import { ErrorDeDominio } from './errorDeDominio.js';

export class ErrorServicioExterno extends ErrorDeDominio {
  constructor(mensaje = 'Fallo un servicio externo (n8n, proveedor de IA).', detalles = null) {
    super(mensaje, { codigoHttp: 502, codigoError: 'SERVICIO_EXTERNO', detalles });
  }
}
