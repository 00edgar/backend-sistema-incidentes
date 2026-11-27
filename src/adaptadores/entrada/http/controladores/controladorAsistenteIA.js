/**
 * ADAPTADOR DE ENTRADA (HTTP). Traduce peticiones Express a llamadas a casos de uso. Sin logica de negocio.
 *
 * Responsable: Dev3 | Historia ClickUp: 2.7.2 | RF05
 *
 * TODO: Ajustar codigos de estado o forma de la respuesta si el caso de uso lo requiere.
 */

export class ControladorAsistenteIA {
  constructor({ solicitarAsistenciaIA }) {
    this.casosDeUso = { solicitarAsistenciaIA };
  }

  solicitarAsistencia = async (req, res, next) => {
    try {
      const resultado = await this.casosDeUso.solicitarAsistenciaIA.ejecutar({ ...req.params, ...req.body });
      res.status(201).json(resultado);
    } catch (error) {
      next(error);
    }
  };
}
