# Mapa de archivos del backend por responsable

Archivos agrupados por responsable. Los que contienen `TODO` o lanzan `ErrorNoImplementado` son los que hay que programar.

## Dev1

| Archivo | Historia ClickUp | RF |
|---|---|---|
| `src/adaptadores/entrada/http/controladores/controladorIndexacion.js` | 2.1.3 | RF03 |
| `src/adaptadores/entrada/http/esquemasValidacion/esquemaSolicitarIndexacion.js` | 2.1.3 | RF03 |
| `src/adaptadores/entrada/http/rutas/rutasIndexacion.js` | 2.1.3 | RF03 |
| `src/adaptadores/salida/orquestadorN8n/clienteN8nIndexacion.js` | 2.1.3 | RF03 |
| `src/aplicacion/casosDeUso/articulos/casoDeUsoSolicitarIndexacionArticulos.js` | 2.1.3 | RF03 |
| `src/aplicacion/puertos/salida/puertoIndexadorArticulos.js` | 2.1.3 | RF03 |
| `src/dominio/constantes/modosIndexacion.js` | 2.1.3 | RF03 |

## Dev2

| Archivo | Historia ClickUp | RF |
|---|---|---|
| `prisma/schema.prisma` | 1.5.2 | RF01-RF08 |
| `scripts/ejecutarScriptsSql.js` | 1.7.2 | RF01, RF06 |
| `src/adaptadores/entrada/http/controladores/controladorCalificaciones.js` | 2.6.2 | RF08 |
| `src/adaptadores/entrada/http/controladores/controladorHistorialAsistencias.js` | 2.6.1 | RF08 |
| `src/adaptadores/entrada/http/controladores/controladorIndicadores.js` | 2.5.1 | RF06, RF07 |
| `src/adaptadores/entrada/http/esquemasValidacion/esquemaCalificarRespuestaIA.js` | 2.6.2 | RF08 |
| `src/adaptadores/entrada/http/esquemasValidacion/esquemaFiltrosIndicadores.js` | 2.5.1 | RF06, RF07 |
| `src/adaptadores/entrada/http/esquemasValidacion/esquemaIdIncidenteParaHistorial.js` | 2.6.1 | RF08 |
| `src/adaptadores/entrada/http/rutas/rutasCalificaciones.js` | 2.6.2 | RF08 |
| `src/adaptadores/entrada/http/rutas/rutasHistorialAsistencias.js` | 2.6.1 | RF08 |
| `src/adaptadores/entrada/http/rutas/rutasIndicadores.js` | 2.5.1 | RF06, RF07 |
| `src/adaptadores/salida/persistencia/prisma/repositorioCalificacionesPrisma.js` | 2.6.2 | RF08 |
| `src/adaptadores/salida/persistencia/prisma/repositorioIndicadoresPrisma.js` | 2.4 / 2.5 | RF06, RF07 |
| `src/aplicacion/casosDeUso/asistenteIA/casoDeUsoCalificarRespuestaIA.js` | 2.6.2 | RF08 |
| `src/aplicacion/casosDeUso/asistenteIA/casoDeUsoObtenerHistorialAsistencias.js` | 2.6.1 | RF08 |
| `src/aplicacion/casosDeUso/indicadores/casoDeUsoObtenerCategoriaMasRecurrente.js` | 2.5.1 | RF06, RF07 |
| `src/aplicacion/casosDeUso/indicadores/casoDeUsoObtenerDistribucionPorCategoria.js` | 2.5.1 | RF06, RF07 |
| `src/aplicacion/casosDeUso/indicadores/casoDeUsoObtenerDistribucionPorPrioridad.js` | 2.5.1 | RF06, RF07 |
| `src/aplicacion/casosDeUso/indicadores/casoDeUsoObtenerTasaResolucion.js` | 2.5.1 | RF06, RF07 |
| `src/aplicacion/casosDeUso/indicadores/casoDeUsoObtenerTendenciaTemporal.js` | 2.5.1 | RF06, RF07 |
| `src/aplicacion/casosDeUso/indicadores/casoDeUsoObtenerTiempoPromedioResolucion.js` | 2.5.1 | RF06, RF07 |
| `src/aplicacion/casosDeUso/indicadores/casoDeUsoObtenerTotalPorPeriodo.js` | 2.5.1 | RF06, RF07 |
| `src/aplicacion/puertos/salida/puertoRepositorioCalificaciones.js` | 2.6.2 | RF08 |
| `src/aplicacion/puertos/salida/puertoRepositorioIndicadores.js` | 2.4 / 2.5 | RF06, RF07 |
| `src/dominio/constantes/estadosIncidente.js` | 1.5.2 | RF01 |
| `src/dominio/constantes/prioridadesIncidente.js` | 1.5.2 | RF01 |
| `src/dominio/entidades/articuloConocimiento.js` | 1.5.2 | RF02 |
| `src/dominio/entidades/calificacion.js` | 1.5.2 | RF08 |
| `src/dominio/entidades/categoria.js` | 1.5.2 | RF01 |
| `src/dominio/entidades/consultaIA.js` | 1.5.2 | RF05, RF08 |
| `src/dominio/entidades/fuenteRespuesta.js` | 1.5.2 | RF05, RF08 |
| `src/dominio/entidades/incidente.js` | 1.5.2 | RF01 |
| `src/dominio/entidades/respuestaIA.js` | 1.5.2 | RF05, RF08 |
| `src/dominio/entidades/usuario.js` | 1.5.2 | RF01 |
| `src/dominio/reglas/reglaPuntuacionCalificacion.js` | 2.6.2 | RF08 |

## Dev3

| Archivo | Historia ClickUp | RF |
|---|---|---|
| `package.json` | 1.8.2 | Transversal |
| `pruebas/pruebaSaludServidor.test.js` | 1.8.2 | Transversal |
| `pruebas/pruebasReglasDeDominio.test.js` | 1.9.2 / 1.10.2 | RF01, RF02 |
| `src/adaptadores/entrada/http/controladores/controladorArticulos.js` | 1.10.2 | RF02 |
| `src/adaptadores/entrada/http/controladores/controladorAsistenteIA.js` | 2.7.2 | RF05 |
| `src/adaptadores/entrada/http/controladores/controladorCatalogos.js` | 1.10.1 | RF01 |
| `src/adaptadores/entrada/http/controladores/controladorIncidentes.js` | 1.9 | RF01 |
| `src/adaptadores/entrada/http/esquemasValidacion/esquemaActualizarEstadoIncidente.js` | 1.8.1 | RF01 |
| `src/adaptadores/entrada/http/esquemasValidacion/esquemaCambiarEstadoArticulo.js` | 1.8.3 | RF02 |
| `src/adaptadores/entrada/http/esquemasValidacion/esquemaCrearArticulo.js` | 1.8.3 | RF02 |
| `src/adaptadores/entrada/http/esquemasValidacion/esquemaCrearIncidente.js` | 1.8.1 | RF01 |
| `src/adaptadores/entrada/http/esquemasValidacion/esquemaEditarArticulo.js` | 1.8.3 | RF02 |
| `src/adaptadores/entrada/http/esquemasValidacion/esquemaFiltrosArticulos.js` | 1.8.3 | RF02 |
| `src/adaptadores/entrada/http/esquemasValidacion/esquemaFiltrosIncidentes.js` | 1.8.1 | RF01 |
| `src/adaptadores/entrada/http/esquemasValidacion/esquemaIdIncidente.js` | 1.8.1 | RF01 |
| `src/adaptadores/entrada/http/esquemasValidacion/esquemaSolicitarAsistenciaIA.js` | 2.7.1 | RF05 |
| `src/adaptadores/entrada/http/middlewares/manejadorErrores.js` | 1.8.2 | Transversal |
| `src/adaptadores/entrada/http/middlewares/validarEsquema.js` | 1.8.2 | Transversal |
| `src/adaptadores/entrada/http/rutas/rutasArticulos.js` | 1.10.2 | RF02 |
| `src/adaptadores/entrada/http/rutas/rutasAsistenteIA.js` | 2.7.2 | RF05 |
| `src/adaptadores/entrada/http/rutas/rutasCatalogos.js` | 1.10.1 | RF01 |
| `src/adaptadores/entrada/http/rutas/rutasIncidentes.js` | 1.9 | RF01 |
| `src/adaptadores/entrada/http/rutas/rutasSalud.js` | 1.8.2 | Transversal |
| `src/adaptadores/salida/orquestadorN8n/clienteN8nAsistenteRag.js` | 2.7.2 | RF05 |
| `src/adaptadores/salida/persistencia/prisma/repositorioArticulosPrisma.js` | 1.10.2 | RF02 |
| `src/adaptadores/salida/persistencia/prisma/repositorioCategoriasPrisma.js` | 1.10.1 | RF01 |
| `src/adaptadores/salida/persistencia/prisma/repositorioConsultasIAPrisma.js` | 2.7.3 (escritura) y 2.6.1 (historial, Dev2) | RF05, RF08 |
| `src/adaptadores/salida/persistencia/prisma/repositorioIncidentesPrisma.js` | 1.9 | RF01 |
| `src/adaptadores/salida/persistencia/prisma/repositorioUsuariosPrisma.js` | 1.10.1 | RF01 |
| `src/aplicacion.js` | 1.8.2 | Transversal |
| `src/aplicacion/casosDeUso/articulos/casoDeUsoCambiarEstadoArticulo.js` | 1.10.2 | RF02, RF03 |
| `src/aplicacion/casosDeUso/articulos/casoDeUsoCrearArticulo.js` | 1.10.2 | RF02 |
| `src/aplicacion/casosDeUso/articulos/casoDeUsoEditarArticulo.js` | 1.10.2 | RF02 |
| `src/aplicacion/casosDeUso/articulos/casoDeUsoListarArticulos.js` | 1.10.2 | RF02 |
| `src/aplicacion/casosDeUso/asistenteIA/casoDeUsoSolicitarAsistenciaIA.js` | 2.7.1 / 2.7.2 / 2.7.3 | RF05, RF08 |
| `src/aplicacion/casosDeUso/catalogos/casoDeUsoListarCategorias.js` | 1.10.1 | RF01 |
| `src/aplicacion/casosDeUso/catalogos/casoDeUsoListarUsuarios.js` | 1.10.1 | RF01 |
| `src/aplicacion/casosDeUso/incidentes/casoDeUsoActualizarEstadoIncidente.js` | 1.9.2 | RF01 |
| `src/aplicacion/casosDeUso/incidentes/casoDeUsoListarIncidentes.js` | 1.9.1 | RF01 |
| `src/aplicacion/casosDeUso/incidentes/casoDeUsoObtenerIncidentePorId.js` | 1.9.1 | RF01 |
| `src/aplicacion/casosDeUso/incidentes/casoDeUsoRegistrarIncidente.js` | 1.9.1 | RF01 |
| `src/aplicacion/puertos/salida/puertoAsistenteRag.js` | 2.7.2 | RF05 |
| `src/aplicacion/puertos/salida/puertoRepositorioArticulos.js` | 1.10.2 | RF02 |
| `src/aplicacion/puertos/salida/puertoRepositorioCategorias.js` | 1.10.1 | RF01 |
| `src/aplicacion/puertos/salida/puertoRepositorioConsultasIA.js` | 2.7.3 (escritura) y 2.6.1 (historial, Dev2) | RF05, RF08 |
| `src/aplicacion/puertos/salida/puertoRepositorioIncidentes.js` | 1.9 | RF01 |
| `src/aplicacion/puertos/salida/puertoRepositorioUsuarios.js` | 1.10.1 | RF01 |
| `src/configuracion/clientePrisma.js` | 1.8.2 | Transversal |
| `src/configuracion/contenedorDependencias.js` | 1.8.2 | Transversal |
| `src/configuracion/variablesEntorno.js` | 1.8.2 | Transversal |
| `src/dominio/constantes/estadosArticulo.js` | 1.10.2 | RF02 |
| `src/dominio/constantes/estadosConsultaIA.js` | 2.7.2 | RF05, RF08 |
| `src/dominio/errores/errorDeDominio.js` | 1.8.2 | Transversal |
| `src/dominio/errores/errorDeValidacion.js` | 1.8.2 | Transversal |
| `src/dominio/errores/errorNoEncontrado.js` | 1.8.2 | Transversal |
| `src/dominio/errores/errorNoImplementado.js` | 1.8.2 | Transversal |
| `src/dominio/errores/errorReglaDeNegocio.js` | 1.8.2 | Transversal |
| `src/dominio/errores/errorServicioExterno.js` | 1.8.2 | Transversal |
| `src/dominio/reglas/reglaArticuloElegibleComoFuente.js` | 1.10.2 | RF02 |
| `src/dominio/reglas/reglasTransicionEstadoIncidente.js` | 1.9.2 | RF01 |
| `src/servidor.js` | 1.8.2 | Transversal |

