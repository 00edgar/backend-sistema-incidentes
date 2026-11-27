/**
 * Reglas de transicion del estado de un incidente.
 *
 * Responsable: Dev3 | Historia ClickUp: 1.9.2 | RF01
 *
 * TODO: Definir que transiciones son validas (por ejemplo Abierto -> En progreso -> Resuelto -> Cerrado).
 * TODO: Implementar esTransicionPermitida y usarla desde CasoDeUsoActualizarEstadoIncidente.
 */

import { ESTADOS_INCIDENTE } from '../constantes/estadosIncidente.js';
import { ErrorNoImplementado } from '../errores/errorNoImplementado.js';

export const TRANSICIONES_PERMITIDAS = Object.freeze({
  [ESTADOS_INCIDENTE.ABIERTO]: [],
  [ESTADOS_INCIDENTE.EN_PROGRESO]: [],
  [ESTADOS_INCIDENTE.RESUELTO]: [],
  [ESTADOS_INCIDENTE.CERRADO]: [],
});

export function esTransicionPermitida(estadoActual, estadoNuevo) {
  throw new ErrorNoImplementado('esTransicionPermitida');
}
