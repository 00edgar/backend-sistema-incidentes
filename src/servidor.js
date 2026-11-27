/**
 * Punto de entrada: carga configuracion, arma dependencias y levanta el servidor HTTP.
 *
 * Responsable: Dev3 | Historia ClickUp: 1.8.2 | Transversal
 */

import { cargarConfiguracion } from './configuracion/variablesEntorno.js';
import { construirContenedorDependencias } from './configuracion/contenedorDependencias.js';
import { crearAplicacion } from './aplicacion.js';

const configuracion = cargarConfiguracion();
const { controladores } = construirContenedorDependencias(configuracion);
const aplicacion = crearAplicacion({ configuracion, controladores });

aplicacion.listen(configuracion.puerto, () => {
  console.log(`Backend escuchando en http://localhost:${configuracion.puerto}`);
});
