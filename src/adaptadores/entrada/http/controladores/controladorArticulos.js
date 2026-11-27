/**
 * ADAPTADOR DE ENTRADA (HTTP). Traduce peticiones Express a llamadas a casos de uso. Sin logica de negocio.
 *
 * Responsable: Dev3 | Historia ClickUp: 1.10.2 | RF02
 *
 * TODO: Ajustar codigos de estado o forma de la respuesta si el caso de uso lo requiere.
 */

export class ControladorArticulos {
  constructor({ listarArticulos, crearArticulo, editarArticulo, cambiarEstadoArticulo }) {
    this.casosDeUso = { listarArticulos, crearArticulo, editarArticulo, cambiarEstadoArticulo };
  }

  listar = async (req, res, next) => {
    try {
      const resultado = await this.casosDeUso.listarArticulos.ejecutar(req.query);
      res.status(200).json(resultado);
    } catch (error) {
      next(error);
    }
  };

  crear = async (req, res, next) => {
    try {
      const resultado = await this.casosDeUso.crearArticulo.ejecutar(req.body);
      res.status(201).json(resultado);
    } catch (error) {
      next(error);
    }
  };

  editar = async (req, res, next) => {
    try {
      const resultado = await this.casosDeUso.editarArticulo.ejecutar({ ...req.params, ...req.body });
      res.status(200).json(resultado);
    } catch (error) {
      next(error);
    }
  };

  cambiarEstado = async (req, res, next) => {
    try {
      const resultado = await this.casosDeUso.cambiarEstadoArticulo.ejecutar({ ...req.params, ...req.body });
      res.status(200).json(resultado);
    } catch (error) {
      next(error);
    }
  };
}
