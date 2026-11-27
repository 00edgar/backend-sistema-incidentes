/**
 * Entidad de dominio FuenteRespuesta. Objeto simple, sin dependencias de Express ni de Prisma.
 *
 * Responsable: Dev2 | Historia ClickUp: 1.5.2 | RF05, RF08
 *
 * TODO: Agregar validaciones propias de la entidad (en el constructor o en metodos) y mantener los nombres alineados con schema.prisma.
 */

export class FuenteRespuesta {
  constructor({ id, idRespuesta, idArticulo, similitud }) {
    this.id = id;
    this.idRespuesta = idRespuesta;
    this.idArticulo = idArticulo;
    this.similitud = similitud;
  }
}
