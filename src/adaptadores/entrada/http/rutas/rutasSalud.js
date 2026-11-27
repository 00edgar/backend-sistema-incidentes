/**
 * Ruta de verificacion: GET /api/salud (no usa base de datos).
 *
 * Responsable: Dev3 | Historia ClickUp: 1.8.2 | Transversal
 */

import { Router } from 'express';

export function crearRutasSalud() {
  const enrutador = Router();
  enrutador.get('/salud', (req, res) => {
    res.json({ estado: 'ok', servicio: 'backend-sistema-incidentes', fecha: new Date().toISOString() });
  });
  return enrutador;
}
