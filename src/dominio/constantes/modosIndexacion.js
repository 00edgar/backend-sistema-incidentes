/**
 * Modos que el backend puede pedir al Flujo 1 de n8n (RF03).
 *
 * Responsable: Dev1 | Historia ClickUp: 2.1.3 | RF03
 */

export const MODOS_INDEXACION = Object.freeze({
  TODOS: 'indexarTodos',
  UNO_O_VARIOS: 'indexarSeleccionados',
  ELIMINAR: 'eliminarDelIndice',
});

export const LISTA_MODOS_INDEXACION = Object.freeze(Object.values(MODOS_INDEXACION));
