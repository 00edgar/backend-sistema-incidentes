/**
 * PUERTO DE SALIDA. Persistencia de consultas inteligentes, respuestas y fuentes (historial). Los casos de uso dependen de este contrato, nunca de la implementacion.
 *
 * Responsable: Dev3 | Historia ClickUp: 2.7.3 (escritura) y 2.6.1 (historial, Dev2) | RF05, RF08
 */

import { ErrorNoImplementado } from '../../../dominio/errores/errorNoImplementado.js';

export class PuertoRepositorioConsultasIA {
  /** Guarda la consulta con estado Pendiente. */
  async crearPendiente(datosConsulta) {
    throw new ErrorNoImplementado('PuertoRepositorioConsultasIA.crearPendiente');
  }

  /** Guarda respuesta y fuentes, y fija el estado final de la consulta. */
  async registrarRespuesta(datosRespuesta) {
    throw new ErrorNoImplementado('PuertoRepositorioConsultasIA.registrarRespuesta');
  }

  /** Cambia el estado de la consulta (por ejemplo a Error). */
  async actualizarEstado(idConsulta, nuevoEstado) {
    throw new ErrorNoImplementado('PuertoRepositorioConsultasIA.actualizarEstado');
  }

  /** Historial de consultas de un incidente, con respuestas y fuentes. */
  async listarPorIncidente(idIncidente) {
    throw new ErrorNoImplementado('PuertoRepositorioConsultasIA.listarPorIncidente');
  }
}
