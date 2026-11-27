/**
 * PUERTO DE SALIDA. Flujo 2 de n8n: orientacion fundamentada (RAG). Los casos de uso dependen de este contrato, nunca de la implementacion.
 *
 * Responsable: Dev3 | Historia ClickUp: 2.7.2 | RF05
 */

import { ErrorNoImplementado } from '../../../dominio/errores/errorNoImplementado.js';

export class PuertoAsistenteRag {
  /** Envia { idConsulta, idIncidente, descripcion, umbralSimilitud, limiteResultados } a n8n y devuelve { estado, solucionSugerida, pasos, fuentes }. */
  async solicitarOrientacion(solicitud) {
    throw new ErrorNoImplementado('PuertoAsistenteRag.solicitarOrientacion');
  }
}
