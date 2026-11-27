/**
 * Los 4 niveles de prioridad de un incidente (RF01).
 *
 * Responsable: Dev2 | Historia ClickUp: 1.5.2 | RF01
 */

export const PRIORIDADES_INCIDENTE = Object.freeze({
  BAJA: 'Baja',
  MEDIA: 'Media',
  ALTA: 'Alta',
  CRITICA: 'Critica',
});

export const LISTA_PRIORIDADES_INCIDENTE = Object.freeze(Object.values(PRIORIDADES_INCIDENTE));
