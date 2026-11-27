/**
 * ADAPTADOR DE ENTRADA (HTTP). Traduce peticiones Express a llamadas a casos de uso. Sin logica de negocio.
 *
 * Responsable: Dev3 | Historia ClickUp: 1.10.1 | RF01
 *
 * TODO: Ajustar codigos de estado o forma de la respuesta si el caso de uso lo requiere.
 */

export class ControladorCatalogos {
  constructor({ listarUsuarios, listarCategorias }) {
    this.casosDeUso = { listarUsuarios, listarCategorias };
  }

  listarUsuarios = async (req, res, next) => {
    try {
      const resultado = await this.casosDeUso.listarUsuarios.ejecutar({});
      res.status(200).json(resultado);
    } catch (error) {
      next(error);
    }
  };

  listarCategorias = async (req, res, next) => {
    try {
      const resultado = await this.casosDeUso.listarCategorias.ejecutar({});
      res.status(200).json(resultado);
    } catch (error) {
      next(error);
    }
  };
}
