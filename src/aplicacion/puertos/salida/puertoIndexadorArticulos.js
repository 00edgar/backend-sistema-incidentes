/**
 * PUERTO DE SALIDA. Flujo 1 de n8n: indexacion de articulos en la base vectorial. Los casos de uso dependen de este contrato, nunca de la implementacion.
 *
 * Responsable: Dev1 | Historia ClickUp: 2.1.3 | RF03
 */

import { ErrorNoImplementado } from '../../../dominio/errores/errorNoImplementado.js';

export class PuertoIndexadorArticulos {
  /** Pide a n8n indexar, actualizar o eliminar articulos del indice. El backend NO habla con Qdrant. */
  async solicitarIndexacion(solicitud) {
    throw new ErrorNoImplementado('PuertoIndexadorArticulos.solicitarIndexacion');
  }
}
