/**
 * Entidad de dominio ArticuloConocimiento. Objeto simple, sin dependencias de Express ni de Prisma.
 *
 * Responsable: Dev2 | Historia ClickUp: 1.5.2 | RF02
 *
 * TODO: Agregar validaciones propias de la entidad (en el constructor o en metodos) y mantener los nombres alineados con schema.prisma.
 */

export class ArticuloConocimiento {
  constructor({ id, titulo, problema, sintomas, causa, solucion, fecha, estado, verificado }) {
    this.id = id;
    this.titulo = titulo;
    this.problema = problema;
    this.sintomas = sintomas;
    this.causa = causa;
    this.solucion = solucion;
    this.fecha = fecha;
    this.estado = estado;
    this.verificado = verificado;
  }
}
