/**
 * ADAPTADOR DE SALIDA. Llama al webhook del Flujo 2 (RAG) de n8n desde el servidor.
 *
 * Responsable: Dev3 | Historia ClickUp: 2.7.2 | RF05
 *
 * TODO: Hacer POST JSON a configuracion.n8n.urlWebhookAsistenteRag con fetch, cabecera de token y AbortController usando n8n.timeoutMilisegundos.
 * TODO: Convertir timeouts y respuestas no 2xx en ErrorServicioExterno.
 * TODO: Mantener el contrato descrito en docs/contratosN8n.md.
 */

import { PuertoAsistenteRag } from '../../../aplicacion/puertos/salida/puertoAsistenteRag.js';
import { ErrorNoImplementado } from '../../../dominio/errores/errorNoImplementado.js';

export class ClienteN8nAsistenteRag extends PuertoAsistenteRag {
  constructor({ configuracionN8n }) {
    super();
    this.configuracionN8n = configuracionN8n;
  }

  async solicitarOrientacion(solicitud) {
    throw new ErrorNoImplementado('ClienteN8nAsistenteRag.solicitarOrientacion');
  }
}
