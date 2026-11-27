/**
 * ADAPTADOR DE SALIDA. Implementa PuertoRepositorioConsultasIA con Prisma + PostgreSQL.
 *
 * Responsable: Dev3 | Historia ClickUp: 2.7.3 (escritura) y 2.6.1 (historial, Dev2) | RF05, RF08
 */

import { PuertoRepositorioConsultasIA } from '../../../../aplicacion/puertos/salida/puertoRepositorioConsultasIA.js';
import { ErrorNoImplementado } from '../../../../dominio/errores/errorNoImplementado.js';

export class RepositorioConsultasIAPrisma extends PuertoRepositorioConsultasIA {
  constructor({ obtenerClientePrisma }) {
    super();
    this.obtenerClientePrisma = obtenerClientePrisma;
  }

  async crearPendiente(datosConsulta) {
    // TODO: Guarda la consulta con estado Pendiente.
    // const prisma = await this.obtenerClientePrisma();
    throw new ErrorNoImplementado('RepositorioConsultasIAPrisma.crearPendiente');
  }

  async registrarRespuesta(datosRespuesta) {
    // TODO: Guarda respuesta y fuentes y fija el estado final.
    // const prisma = await this.obtenerClientePrisma();
    throw new ErrorNoImplementado('RepositorioConsultasIAPrisma.registrarRespuesta');
  }

  async actualizarEstado(idConsulta, nuevoEstado) {
    // TODO: Cambia el estado de la consulta.
    // const prisma = await this.obtenerClientePrisma();
    throw new ErrorNoImplementado('RepositorioConsultasIAPrisma.actualizarEstado');
  }

  async listarPorIncidente(idIncidente) {
    // TODO: Historial con respuestas y fuentes.
    // const prisma = await this.obtenerClientePrisma();
    throw new ErrorNoImplementado('RepositorioConsultasIAPrisma.listarPorIncidente');
  }
}
