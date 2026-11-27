/**
 * CASO DE USO. Flujo completo: valida la descripcion, crea consulta Pendiente, llama a n8n, valida las fuentes y persiste respuesta y estado final. Orquesta reglas de dominio y puertos; no conoce Express ni Prisma.
 *
 * Responsable: Dev3 | Historia ClickUp: 2.7.1 / 2.7.2 / 2.7.3 | RF05, RF08
 *
 * TODO: Implementar ejecutar(entrada). Hoy responde 501 (no implementado).
 */

import { ErrorNoImplementado } from '../../../dominio/errores/errorNoImplementado.js';

export class CasoDeUsoSolicitarAsistenciaIA {
  constructor({ repositorioIncidentes, repositorioConsultasIA, repositorioArticulos, asistenteRag, configuracionAsistente }) {
    this.repositorioIncidentes = repositorioIncidentes;
    this.repositorioConsultasIA = repositorioConsultasIA;
    this.repositorioArticulos = repositorioArticulos;
    this.asistenteRag = asistenteRag;
    this.configuracionAsistente = configuracionAsistente;
  }

  async ejecutar(entrada) {
    throw new ErrorNoImplementado('CasoDeUsoSolicitarAsistenciaIA.ejecutar');
  }
}
