/**
 * Entidad de dominio ConsultaIA. Objeto simple, sin dependencias de Express ni de Prisma.
 *
 * Responsable: Dev2 | Historia ClickUp: 1.5.2 | RF05, RF08
 *
 * TODO: Agregar validaciones propias de la entidad (en el constructor o en metodos) y mantener los nombres alineados con schema.prisma.
 */

export class ConsultaIA {
  constructor({ id, idIncidente, pregunta, fecha, estado }) {
    this.id = id;
    this.idIncidente = idIncidente;
    this.pregunta = pregunta;
    this.fecha = fecha;
    this.estado = estado;
  }
}
