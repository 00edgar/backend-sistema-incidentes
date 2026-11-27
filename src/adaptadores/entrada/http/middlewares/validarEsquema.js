/**
 * Middleware que valida body, params y query con un esquema zod y responde 400 si fallan.
 *
 * Responsable: Dev3 | Historia ClickUp: 1.8.2 | Transversal
 */

import { ErrorDeValidacion } from '../../../../dominio/errores/errorDeValidacion.js';

export function validarEsquema(esquemas) {
  return (req, res, next) => {
    try {
      for (const parte of ['params', 'query', 'body']) {
        if (!esquemas[parte]) continue;
        const resultado = esquemas[parte].safeParse(req[parte]);
        if (!resultado.success) {
          const detalles = resultado.error.issues.map((i) => ({ campo: i.path.join('.'), mensaje: i.message }));
          throw new ErrorDeValidacion('Datos de entrada invalidos', detalles);
        }
        req[parte] = resultado.data;
      }
      next();
    } catch (error) {
      next(error);
    }
  };
}
