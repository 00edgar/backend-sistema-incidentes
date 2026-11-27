/**
 * Entidad de dominio Categoria. Objeto simple, sin dependencias de Express ni de Prisma.
 *
 * Responsable: Dev2 | Historia ClickUp: 1.5.2 | RF01
 *
 * TODO: Agregar validaciones propias de la entidad (en el constructor o en metodos) y mantener los nombres alineados con schema.prisma.
 */

export class Categoria {
  constructor({ id, nombre, descripcion }) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
  }
}
