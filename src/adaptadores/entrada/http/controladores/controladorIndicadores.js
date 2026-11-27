/**
 * ADAPTADOR DE ENTRADA (HTTP). Traduce peticiones Express a llamadas a casos de uso. Sin logica de negocio.
 *
 * Responsable: Dev2 | Historia ClickUp: 2.5.1 | RF06, RF07
 *
 * TODO: Ajustar codigos de estado o forma de la respuesta si el caso de uso lo requiere.
 */

export class ControladorIndicadores {
  constructor({ obtenerTotalPorPeriodo, obtenerDistribucionPorCategoria, obtenerTendenciaTemporal, obtenerTasaResolucion, obtenerTiempoPromedioResolucion, obtenerCategoriaMasRecurrente, obtenerDistribucionPorPrioridad }) {
    this.casosDeUso = { obtenerTotalPorPeriodo, obtenerDistribucionPorCategoria, obtenerTendenciaTemporal, obtenerTasaResolucion, obtenerTiempoPromedioResolucion, obtenerCategoriaMasRecurrente, obtenerDistribucionPorPrioridad };
  }

  totalPorPeriodo = async (req, res, next) => {
    try {
      const resultado = await this.casosDeUso.obtenerTotalPorPeriodo.ejecutar(req.query);
      res.status(200).json(resultado);
    } catch (error) {
      next(error);
    }
  };

  distribucionPorCategoria = async (req, res, next) => {
    try {
      const resultado = await this.casosDeUso.obtenerDistribucionPorCategoria.ejecutar(req.query);
      res.status(200).json(resultado);
    } catch (error) {
      next(error);
    }
  };

  tendenciaTemporal = async (req, res, next) => {
    try {
      const resultado = await this.casosDeUso.obtenerTendenciaTemporal.ejecutar(req.query);
      res.status(200).json(resultado);
    } catch (error) {
      next(error);
    }
  };

  tasaResolucion = async (req, res, next) => {
    try {
      const resultado = await this.casosDeUso.obtenerTasaResolucion.ejecutar(req.query);
      res.status(200).json(resultado);
    } catch (error) {
      next(error);
    }
  };

  tiempoPromedioResolucion = async (req, res, next) => {
    try {
      const resultado = await this.casosDeUso.obtenerTiempoPromedioResolucion.ejecutar(req.query);
      res.status(200).json(resultado);
    } catch (error) {
      next(error);
    }
  };

  categoriaMasRecurrente = async (req, res, next) => {
    try {
      const resultado = await this.casosDeUso.obtenerCategoriaMasRecurrente.ejecutar(req.query);
      res.status(200).json(resultado);
    } catch (error) {
      next(error);
    }
  };

  distribucionPorPrioridad = async (req, res, next) => {
    try {
      const resultado = await this.casosDeUso.obtenerDistribucionPorPrioridad.ejecutar(req.query);
      res.status(200).json(resultado);
    } catch (error) {
      next(error);
    }
  };
}
