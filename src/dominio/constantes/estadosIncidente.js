/**
 * Los 4 estados de un incidente (RF01).
 *
 * Responsable: Dev2 | Historia ClickUp: 1.5.2 | RF01
 */

export const ESTADOS_INCIDENTE = Object.freeze({
  ABIERTO: 'Abierto',
  EN_PROGRESO: 'En progreso',
  RESUELTO: 'Resuelto',
  CERRADO: 'Cerrado',
});

export const LISTA_ESTADOS_INCIDENTE = Object.freeze(Object.values(ESTADOS_INCIDENTE));
