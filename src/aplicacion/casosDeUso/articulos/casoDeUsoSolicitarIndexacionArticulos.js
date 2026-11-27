/**
 * CASO DE USO. Dispara el Flujo 1 de n8n para indexar o actualizar articulos. Orquesta reglas de dominio y puertos; no conoce Express ni Prisma.
 *
 * Responsable: Dev1 | Historia ClickUp: 2.1.3 | RF03
 *
 * TODO: Implementar ejecutar(entrada). Hoy responde 501 (no implementado).
 */

import { ErrorNoImplementado } from '../../../dominio/errores/errorNoImplementado.js';

export class CasoDeUsoSolicitarIndexacionArticulos {
  constructor({ indexadorArticulos }) {
    this.indexadorArticulos = indexadorArticulos;
  }

  async ejecutar(entrada) {
    throw new ErrorNoImplementado('CasoDeUsoSolicitarIndexacionArticulos.ejecutar');
  }
}
