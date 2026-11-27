/**
 * Entidad de dominio RespuestaIA. Objeto simple, sin dependencias de Express ni de Prisma.
 *
 * Responsable: Dev2 | Historia ClickUp: 1.5.2 | RF05, RF08
 *
 * TODO: Agregar validaciones propias de la entidad (en el constructor o en metodos) y mantener los nombres alineados con schema.prisma.
 */

export class RespuestaIA {
  constructor({ id, idConsulta, respuesta, fecha }) {
    this.id = id;
    this.idConsulta = idConsulta;
    this.respuesta = respuesta;
    this.fecha = fecha;
  }
}
