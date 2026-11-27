/**
 * Estados de una consulta inteligente (regla de negocio, RF05/RF08).
 *
 * Responsable: Dev3 | Historia ClickUp: 2.7.2 | RF05, RF08
 */

export const ESTADOS_CONSULTA_IA = Object.freeze({
  PENDIENTE: 'Pendiente',
  RESPONDIDA: 'Respondida',
  SIN_RESULTADOS: 'Sin resultados',
  ERROR: 'Error',
});

export const LISTA_ESTADOS_CONSULTA_IA = Object.freeze(Object.values(ESTADOS_CONSULTA_IA));
