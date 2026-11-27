/**
 * ADAPTADOR DE SALIDA. Llama al webhook del Flujo 1 (indexacion) de n8n desde el servidor.
 *
 * Responsable: Dev1 | Historia ClickUp: 2.1.3 | RF03
 *
 * TODO: Hacer POST JSON a configuracion.n8n.urlWebhookIndexacion con fetch, cabecera de token y AbortController usando n8n.timeoutMilisegundos.
 * TODO: Convertir timeouts y respuestas no 2xx en ErrorServicioExterno.
 * TODO: Mantener el contrato descrito en docs/contratosN8n.md.
 */

import { PuertoIndexadorArticulos } from '../../../aplicacion/puertos/salida/puertoIndexadorArticulos.js';
import { ErrorNoImplementado } from '../../../dominio/errores/errorNoImplementado.js';

export class ClienteN8nIndexacion extends PuertoIndexadorArticulos {
  constructor({ configuracionN8n }) {
    super();
    this.configuracionN8n = configuracionN8n;
  }

  async solicitarIndexacion(solicitud) {
    throw new ErrorNoImplementado('ClienteN8nIndexacion.solicitarIndexacion');
  }
}
