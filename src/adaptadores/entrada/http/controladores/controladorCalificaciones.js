/**
 * ADAPTADOR DE ENTRADA (HTTP). Traduce peticiones Express a llamadas a casos de uso. Sin logica de negocio.
 *
 * Responsable: Dev2 | Historia ClickUp: 2.6.2 | RF08
 *
 * TODO: Ajustar codigos de estado o forma de la respuesta si el caso de uso lo requiere.
 */

export class ControladorCalificaciones {
  constructor({ calificarRespuestaIA }) {
    this.casosDeUso = { calificarRespuestaIA };
  }

  calificar = async (req, res, next) => {
    try {
      const resultado = await this.casosDeUso.calificarRespuestaIA.ejecutar({ ...req.params, ...req.body });
      res.status(201).json(resultado);
    } catch (error) {
      next(error);
    }
  };
}
