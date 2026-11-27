/**
 * Estados de un articulo de conocimiento. Solo los activos y verificados pueden ser fuentes (RF02).
 *
 * Responsable: Dev3 | Historia ClickUp: 1.10.2 | RF02
 */

export const ESTADOS_ARTICULO = Object.freeze({
  ACTIVO: 'Activo',
  INACTIVO: 'Inactivo',
});

export const LISTA_ESTADOS_ARTICULO = Object.freeze(Object.values(ESTADOS_ARTICULO));
