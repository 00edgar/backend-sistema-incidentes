/**
 * Entidad de dominio Incidente. Objeto simple, sin dependencias de Express ni de Prisma.
 *
 * Responsable: Dev2 | Historia ClickUp: 1.5.2 | RF01
 *
 * TODO: Agregar validaciones propias de la entidad (en el constructor o en metodos) y mantener los nombres alineados con schema.prisma.
 */

export class Incidente {
  constructor({ id, titulo, descripcion, idCategoria, prioridad, estado, fechaCreacion, fechaCierre, idUsuarioResponsable }) {
    this.id = id;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.idCategoria = idCategoria;
    this.prioridad = prioridad;
    this.estado = estado;
    this.fechaCreacion = fechaCreacion;
    this.fechaCierre = fechaCierre;
    this.idUsuarioResponsable = idUsuarioResponsable;
  }
}
