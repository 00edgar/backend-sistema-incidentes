/**
 * ADAPTADOR DE ENTRADA (HTTP). Traduce peticiones Express a llamadas a casos de uso. Sin logica de negocio.
 *
 * Responsable: Dev1 | Historia ClickUp: 2.1.3 | RF03
 *
 * TODO: Ajustar codigos de estado o forma de la respuesta si el caso de uso lo requiere.
 */

export class ControladorIndexacion {
  constructor({ solicitarIndexacionArticulos }) {
    this.casosDeUso = { solicitarIndexacionArticulos };
  }

  solicitarIndexacion = async (req, res, next) => {
    try {
      const resultado = await this.casosDeUso.solicitarIndexacionArticulos.ejecutar(req.body);
      res.status(202).json(resultado);
    } catch (error) {
      next(error);
    }
  };
}
