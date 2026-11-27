/**
 * ADAPTADOR DE SALIDA. Implementa PuertoRepositorioIndicadores con Prisma + PostgreSQL. Los calculos deben salir de SQL real, nunca de la IA.
 *
 * Responsable: Dev2 | Historia ClickUp: 2.4 / 2.5 | RF06, RF07
 */

import { PuertoRepositorioIndicadores } from '../../../../aplicacion/puertos/salida/puertoRepositorioIndicadores.js';
import { ErrorNoImplementado } from '../../../../dominio/errores/errorNoImplementado.js';

export class RepositorioIndicadoresPrisma extends PuertoRepositorioIndicadores {
  constructor({ obtenerClientePrisma }) {
    super();
    this.obtenerClientePrisma = obtenerClientePrisma;
  }

  async totalPorPeriodo(filtros) {
    // TODO: Ejecutar la consulta real (ver database/analitica/consultasIndicadores.sql) con prisma.$queryRaw.
    // const prisma = await this.obtenerClientePrisma();
    throw new ErrorNoImplementado('RepositorioIndicadoresPrisma.totalPorPeriodo');
  }

  async distribucionPorCategoria(filtros) {
    // TODO: Consulta real con porcentajes.
    // const prisma = await this.obtenerClientePrisma();
    throw new ErrorNoImplementado('RepositorioIndicadoresPrisma.distribucionPorCategoria');
  }

  async tendenciaTemporal(filtros) {
    // TODO: Consulta real agrupada por dia o semana.
    // const prisma = await this.obtenerClientePrisma();
    throw new ErrorNoImplementado('RepositorioIndicadoresPrisma.tendenciaTemporal');
  }

  async tasaResolucion(filtros) {
    // TODO: Resueltos sobre total.
    // const prisma = await this.obtenerClientePrisma();
    throw new ErrorNoImplementado('RepositorioIndicadoresPrisma.tasaResolucion');
  }

  async tiempoPromedioResolucionPorCategoria(filtros) {
    // TODO: Promedio de (fechaCierre - fechaCreacion) por categoria.
    // const prisma = await this.obtenerClientePrisma();
    throw new ErrorNoImplementado('RepositorioIndicadoresPrisma.tiempoPromedioResolucionPorCategoria');
  }

  async categoriaMasRecurrente(filtros) {
    // TODO: Categoria con mas incidentes.
    // const prisma = await this.obtenerClientePrisma();
    throw new ErrorNoImplementado('RepositorioIndicadoresPrisma.categoriaMasRecurrente');
  }

  async distribucionPorPrioridad(filtros) {
    // TODO: Conteo por prioridad.
    // const prisma = await this.obtenerClientePrisma();
    throw new ErrorNoImplementado('RepositorioIndicadoresPrisma.distribucionPorPrioridad');
  }
}
