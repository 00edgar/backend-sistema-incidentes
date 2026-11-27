/**
 * Entidad de dominio Calificacion. Objeto simple, sin dependencias de Express ni de Prisma.
 *
 * Responsable: Dev2 | Historia ClickUp: 1.5.2 | RF08
 *
 * TODO: Agregar validaciones propias de la entidad (en el constructor o en metodos) y mantener los nombres alineados con schema.prisma.
 */

export class Calificacion {
  constructor({ id, idRespuesta, puntuacion, comentario }) {
    this.id = id;
    this.idRespuesta = idRespuesta;
    this.puntuacion = puntuacion;
    this.comentario = comentario;
  }
}
