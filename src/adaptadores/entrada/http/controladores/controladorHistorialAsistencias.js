/**
 * ADAPTADOR DE ENTRADA (HTTP). Traduce peticiones Express a llamadas a casos de uso. Sin logica de negocio.
 *
 * Responsable: Dev2 | Historia ClickUp: 2.6.1 | RF08
 *
 * TODO: Ajustar codigos de estado o forma de la respuesta si el caso de uso lo requiere.
 */

export class ControladorHistorialAsistencias {
  constructor({ obtenerHistorialAsistencias }) {
    this.casosDeUso = { obtenerHistorialAsistencias };
  }

  obtenerHistorial = async (req, res, next) => {
    try {
      const resultado = await this.casosDeUso.obtenerHistorialAsistencias.ejecutar(req.params);
      res.status(200).json(resultado);
    } catch (error) {
      next(error);
    }
  };
}
