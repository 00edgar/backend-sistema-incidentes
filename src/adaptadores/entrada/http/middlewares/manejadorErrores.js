/**
 * Middleware final: convierte cualquier error en una respuesta JSON con formato consistente.
 *
 * Responsable: Dev3 | Historia ClickUp: 1.8.2 | Transversal
 */

import { ErrorDeDominio } from '../../../../dominio/errores/errorDeDominio.js';

export function rutaNoEncontrada(req, res) {
  res.status(404).json({ error: { codigo: 'RUTA_NO_ENCONTRADA', mensaje: `No existe ${req.method} ${req.originalUrl}` } });
}

// eslint-disable-next-line no-unused-vars
export function manejadorErrores(error, req, res, next) {
  if (error instanceof ErrorDeDominio) {
    return res.status(error.codigoHttp).json({
      error: { codigo: error.codigoError, mensaje: error.message, detalles: error.detalles },
    });
  }
  console.error(error);
  return res.status(500).json({ error: { codigo: 'ERROR_INTERNO', mensaje: 'Error interno del servidor' } });
}
