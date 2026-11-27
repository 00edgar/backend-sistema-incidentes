/**
 * ADAPTADOR DE ENTRADA (HTTP). Traduce peticiones Express a llamadas a casos de uso. Sin logica de negocio.
 *
 * Responsable: Dev3 | Historia ClickUp: 1.9 | RF01
 *
 * TODO: Ajustar codigos de estado o forma de la respuesta si el caso de uso lo requiere.
 */

export class ControladorIncidentes {
  constructor({ registrarIncidente, listarIncidentes, obtenerIncidentePorId, actualizarEstadoIncidente }) {
    this.casosDeUso = { registrarIncidente, listarIncidentes, obtenerIncidentePorId, actualizarEstadoIncidente };
  }

  registrar = async (req, res, next) => {
    try {
      const resultado = await this.casosDeUso.registrarIncidente.ejecutar(req.body);
      res.status(201).json(resultado);
    } catch (error) {
      next(error);
    }
  };

  listar = async (req, res, next) => {
    try {
      const resultado = await this.casosDeUso.listarIncidentes.ejecutar(req.query);
      res.status(200).json(resultado);
    } catch (error) {
      next(error);
    }
  };

  obtenerPorId = async (req, res, next) => {
    try {
      const resultado = await this.casosDeUso.obtenerIncidentePorId.ejecutar(req.params);
      res.status(200).json(resultado);
    } catch (error) {
      next(error);
    }
  };

  actualizarEstado = async (req, res, next) => {
    try {
      const resultado = await this.casosDeUso.actualizarEstadoIncidente.ejecutar({ ...req.params, ...req.body });
      res.status(200).json(resultado);
    } catch (error) {
      next(error);
    }
  };
}
