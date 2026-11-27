/**
 * RAIZ DE COMPOSICION. Unico lugar donde se conectan adaptadores con puertos y casos de uso.
 *
 * Responsable: Dev3 | Historia ClickUp: 1.8.2 | Transversal
 *
 * TODO: Cuando crees un caso de uso, repositorio o controlador nuevo, registralo aqui.
 */

import { RepositorioIncidentesPrisma } from '../adaptadores/salida/persistencia/prisma/repositorioIncidentesPrisma.js';
import { RepositorioUsuariosPrisma } from '../adaptadores/salida/persistencia/prisma/repositorioUsuariosPrisma.js';
import { RepositorioCategoriasPrisma } from '../adaptadores/salida/persistencia/prisma/repositorioCategoriasPrisma.js';
import { RepositorioArticulosPrisma } from '../adaptadores/salida/persistencia/prisma/repositorioArticulosPrisma.js';
import { RepositorioConsultasIAPrisma } from '../adaptadores/salida/persistencia/prisma/repositorioConsultasIAPrisma.js';
import { RepositorioCalificacionesPrisma } from '../adaptadores/salida/persistencia/prisma/repositorioCalificacionesPrisma.js';
import { RepositorioIndicadoresPrisma } from '../adaptadores/salida/persistencia/prisma/repositorioIndicadoresPrisma.js';
import { ClienteN8nAsistenteRag } from '../adaptadores/salida/orquestadorN8n/clienteN8nAsistenteRag.js';
import { ClienteN8nIndexacion } from '../adaptadores/salida/orquestadorN8n/clienteN8nIndexacion.js';
import { crearObtenerClientePrisma } from './clientePrisma.js';
import { CasoDeUsoRegistrarIncidente } from '../aplicacion/casosDeUso/incidentes/casoDeUsoRegistrarIncidente.js';
import { CasoDeUsoListarIncidentes } from '../aplicacion/casosDeUso/incidentes/casoDeUsoListarIncidentes.js';
import { CasoDeUsoObtenerIncidentePorId } from '../aplicacion/casosDeUso/incidentes/casoDeUsoObtenerIncidentePorId.js';
import { CasoDeUsoActualizarEstadoIncidente } from '../aplicacion/casosDeUso/incidentes/casoDeUsoActualizarEstadoIncidente.js';
import { CasoDeUsoListarUsuarios } from '../aplicacion/casosDeUso/catalogos/casoDeUsoListarUsuarios.js';
import { CasoDeUsoListarCategorias } from '../aplicacion/casosDeUso/catalogos/casoDeUsoListarCategorias.js';
import { CasoDeUsoListarArticulos } from '../aplicacion/casosDeUso/articulos/casoDeUsoListarArticulos.js';
import { CasoDeUsoCrearArticulo } from '../aplicacion/casosDeUso/articulos/casoDeUsoCrearArticulo.js';
import { CasoDeUsoEditarArticulo } from '../aplicacion/casosDeUso/articulos/casoDeUsoEditarArticulo.js';
import { CasoDeUsoCambiarEstadoArticulo } from '../aplicacion/casosDeUso/articulos/casoDeUsoCambiarEstadoArticulo.js';
import { CasoDeUsoSolicitarIndexacionArticulos } from '../aplicacion/casosDeUso/articulos/casoDeUsoSolicitarIndexacionArticulos.js';
import { CasoDeUsoSolicitarAsistenciaIA } from '../aplicacion/casosDeUso/asistenteIA/casoDeUsoSolicitarAsistenciaIA.js';
import { CasoDeUsoObtenerHistorialAsistencias } from '../aplicacion/casosDeUso/asistenteIA/casoDeUsoObtenerHistorialAsistencias.js';
import { CasoDeUsoCalificarRespuestaIA } from '../aplicacion/casosDeUso/asistenteIA/casoDeUsoCalificarRespuestaIA.js';
import { CasoDeUsoObtenerTotalPorPeriodo } from '../aplicacion/casosDeUso/indicadores/casoDeUsoObtenerTotalPorPeriodo.js';
import { CasoDeUsoObtenerDistribucionPorCategoria } from '../aplicacion/casosDeUso/indicadores/casoDeUsoObtenerDistribucionPorCategoria.js';
import { CasoDeUsoObtenerTendenciaTemporal } from '../aplicacion/casosDeUso/indicadores/casoDeUsoObtenerTendenciaTemporal.js';
import { CasoDeUsoObtenerTasaResolucion } from '../aplicacion/casosDeUso/indicadores/casoDeUsoObtenerTasaResolucion.js';
import { CasoDeUsoObtenerTiempoPromedioResolucion } from '../aplicacion/casosDeUso/indicadores/casoDeUsoObtenerTiempoPromedioResolucion.js';
import { CasoDeUsoObtenerCategoriaMasRecurrente } from '../aplicacion/casosDeUso/indicadores/casoDeUsoObtenerCategoriaMasRecurrente.js';
import { CasoDeUsoObtenerDistribucionPorPrioridad } from '../aplicacion/casosDeUso/indicadores/casoDeUsoObtenerDistribucionPorPrioridad.js';
import { ControladorIncidentes } from '../adaptadores/entrada/http/controladores/controladorIncidentes.js';
import { ControladorCatalogos } from '../adaptadores/entrada/http/controladores/controladorCatalogos.js';
import { ControladorArticulos } from '../adaptadores/entrada/http/controladores/controladorArticulos.js';
import { ControladorIndexacion } from '../adaptadores/entrada/http/controladores/controladorIndexacion.js';
import { ControladorAsistenteIA } from '../adaptadores/entrada/http/controladores/controladorAsistenteIA.js';
import { ControladorHistorialAsistencias } from '../adaptadores/entrada/http/controladores/controladorHistorialAsistencias.js';
import { ControladorCalificaciones } from '../adaptadores/entrada/http/controladores/controladorCalificaciones.js';
import { ControladorIndicadores } from '../adaptadores/entrada/http/controladores/controladorIndicadores.js';

export function construirContenedorDependencias(configuracion) {
  const obtenerClientePrisma = crearObtenerClientePrisma(configuracion);

  // Adaptadores de salida (implementan los puertos)
  const repositorioIncidentes = new RepositorioIncidentesPrisma({ obtenerClientePrisma });
  const repositorioUsuarios = new RepositorioUsuariosPrisma({ obtenerClientePrisma });
  const repositorioCategorias = new RepositorioCategoriasPrisma({ obtenerClientePrisma });
  const repositorioArticulos = new RepositorioArticulosPrisma({ obtenerClientePrisma });
  const repositorioConsultasIA = new RepositorioConsultasIAPrisma({ obtenerClientePrisma });
  const repositorioCalificaciones = new RepositorioCalificacionesPrisma({ obtenerClientePrisma });
  const repositorioIndicadores = new RepositorioIndicadoresPrisma({ obtenerClientePrisma });
  const asistenteRag = new ClienteN8nAsistenteRag({ configuracionN8n: configuracion.n8n });
  const indexadorArticulos = new ClienteN8nIndexacion({ configuracionN8n: configuracion.n8n });
  const configuracionAsistente = configuracion.asistente;

  // Casos de uso (nucleo de aplicacion)
  const registrarIncidente = new CasoDeUsoRegistrarIncidente({ repositorioIncidentes, repositorioUsuarios, repositorioCategorias });
  const listarIncidentes = new CasoDeUsoListarIncidentes({ repositorioIncidentes });
  const obtenerIncidentePorId = new CasoDeUsoObtenerIncidentePorId({ repositorioIncidentes });
  const actualizarEstadoIncidente = new CasoDeUsoActualizarEstadoIncidente({ repositorioIncidentes });
  const listarUsuarios = new CasoDeUsoListarUsuarios({ repositorioUsuarios });
  const listarCategorias = new CasoDeUsoListarCategorias({ repositorioCategorias });
  const listarArticulos = new CasoDeUsoListarArticulos({ repositorioArticulos });
  const crearArticulo = new CasoDeUsoCrearArticulo({ repositorioArticulos });
  const editarArticulo = new CasoDeUsoEditarArticulo({ repositorioArticulos });
  const cambiarEstadoArticulo = new CasoDeUsoCambiarEstadoArticulo({ repositorioArticulos, indexadorArticulos });
  const solicitarIndexacionArticulos = new CasoDeUsoSolicitarIndexacionArticulos({ indexadorArticulos });
  const solicitarAsistenciaIA = new CasoDeUsoSolicitarAsistenciaIA({ repositorioIncidentes, repositorioConsultasIA, repositorioArticulos, asistenteRag, configuracionAsistente });
  const obtenerHistorialAsistencias = new CasoDeUsoObtenerHistorialAsistencias({ repositorioIncidentes, repositorioConsultasIA });
  const calificarRespuestaIA = new CasoDeUsoCalificarRespuestaIA({ repositorioCalificaciones });
  const obtenerTotalPorPeriodo = new CasoDeUsoObtenerTotalPorPeriodo({ repositorioIndicadores });
  const obtenerDistribucionPorCategoria = new CasoDeUsoObtenerDistribucionPorCategoria({ repositorioIndicadores });
  const obtenerTendenciaTemporal = new CasoDeUsoObtenerTendenciaTemporal({ repositorioIndicadores });
  const obtenerTasaResolucion = new CasoDeUsoObtenerTasaResolucion({ repositorioIndicadores });
  const obtenerTiempoPromedioResolucion = new CasoDeUsoObtenerTiempoPromedioResolucion({ repositorioIndicadores });
  const obtenerCategoriaMasRecurrente = new CasoDeUsoObtenerCategoriaMasRecurrente({ repositorioIndicadores });
  const obtenerDistribucionPorPrioridad = new CasoDeUsoObtenerDistribucionPorPrioridad({ repositorioIndicadores });

  // Adaptadores de entrada (controladores HTTP)
  const controladores = {
    controladorIncidentes: new ControladorIncidentes({ registrarIncidente, listarIncidentes, obtenerIncidentePorId, actualizarEstadoIncidente }),
    controladorCatalogos: new ControladorCatalogos({ listarUsuarios, listarCategorias }),
    controladorArticulos: new ControladorArticulos({ listarArticulos, crearArticulo, editarArticulo, cambiarEstadoArticulo }),
    controladorIndexacion: new ControladorIndexacion({ solicitarIndexacionArticulos }),
    controladorAsistenteIA: new ControladorAsistenteIA({ solicitarAsistenciaIA }),
    controladorHistorialAsistencias: new ControladorHistorialAsistencias({ obtenerHistorialAsistencias }),
    controladorCalificaciones: new ControladorCalificaciones({ calificarRespuestaIA }),
    controladorIndicadores: new ControladorIndicadores({ obtenerTotalPorPeriodo, obtenerDistribucionPorCategoria, obtenerTendenciaTemporal, obtenerTasaResolucion, obtenerTiempoPromedioResolucion, obtenerCategoriaMasRecurrente, obtenerDistribucionPorPrioridad }),
  };

  return { controladores };
}
