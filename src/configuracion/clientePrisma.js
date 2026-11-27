/**
 * Crea el cliente Prisma de forma perezosa (solo cuando un repositorio lo necesita).
 *
 * Responsable: Dev3 | Historia ClickUp: 1.8.2 | Transversal
 *
 * TODO: Dev2: ejecutar "npm run prisma:generar" despues de definir schema.prisma (historia 1.5.2).
 */

export function crearObtenerClientePrisma(configuracion) {
  let cliente = null;
  return async function obtenerClientePrisma() {
    if (cliente) return cliente;
    const { PrismaClient } = await import('@prisma/client');
    cliente = new PrismaClient({ datasources: { db: { url: configuracion.urlBaseDatos } } });
    return cliente;
  };
}
