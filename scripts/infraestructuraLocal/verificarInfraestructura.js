import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import pg from 'pg';

const TIEMPO_MAXIMO_MILISEGUNDOS = 5000;

async function consultarJson(urlCompleta) {
  const respuesta = await fetch(urlCompleta, { signal: AbortSignal.timeout(TIEMPO_MAXIMO_MILISEGUNDOS) });
  if (!respuesta.ok) {
    throw new Error(`respuesta HTTP ${respuesta.status} en ${urlCompleta}`);
  }
  const texto = await respuesta.text();
  try {
    return JSON.parse(texto);
  } catch {
    return { texto };
  }
}

export async function verificarPostgresql(urlConexion) {
  if (!urlConexion) {
    return { servicio: 'PostgreSQL', cumple: false, detalle: 'DATABASE_URL no esta definida' };
  }
  const cliente = new pg.Client({
    connectionString: urlConexion,
    connectionTimeoutMillis: TIEMPO_MAXIMO_MILISEGUNDOS,
  });
  try {
    await cliente.connect();
    const resultado = await cliente.query('SELECT current_database() AS "baseDatos", current_user AS "usuario", version() AS "version"');
    const { baseDatos, usuario, version } = resultado.rows[0];
    return {
      servicio: 'PostgreSQL',
      cumple: true,
      detalle: `base ${baseDatos}, usuario ${usuario}, ${version.split(',')[0]}`,
    };
  } catch (error) {
    return { servicio: 'PostgreSQL', cumple: false, detalle: error.message };
  } finally {
    await cliente.end().catch(() => {});
  }
}

export async function verificarQdrant(urlBase) {
  if (!urlBase) {
    return { servicio: 'Qdrant', cumple: false, detalle: 'QDRANT_URL no esta definida' };
  }
  try {
    const salud = await fetch(`${urlBase}/healthz`, { signal: AbortSignal.timeout(TIEMPO_MAXIMO_MILISEGUNDOS) });
    if (!salud.ok) {
      return { servicio: 'Qdrant', cumple: false, detalle: `/healthz respondio HTTP ${salud.status}` };
    }
    const colecciones = await consultarJson(`${urlBase}/collections`);
    const cantidadColecciones = colecciones?.result?.collections?.length ?? 0;
    return { servicio: 'Qdrant', cumple: true, detalle: `${urlBase} responde, colecciones: ${cantidadColecciones}` };
  } catch (error) {
    return { servicio: 'Qdrant', cumple: false, detalle: error.message };
  }
}

export async function verificarN8n(urlBase) {
  if (!urlBase) {
    return { servicio: 'n8n', cumple: false, detalle: 'N8N_URL_BASE no esta definida' };
  }
  try {
    const salud = await consultarJson(`${urlBase}/healthz`);
    if (salud.status !== 'ok') {
      return { servicio: 'n8n', cumple: false, detalle: `/healthz devolvio ${JSON.stringify(salud)}` };
    }
    return { servicio: 'n8n', cumple: true, detalle: `${urlBase} responde` };
  } catch (error) {
    return { servicio: 'n8n', cumple: false, detalle: error.message };
  }
}

export async function verificarInfraestructura(entorno = process.env) {
  return Promise.all([
    verificarPostgresql(entorno.DATABASE_URL),
    verificarQdrant(entorno.QDRANT_URL),
    verificarN8n(entorno.N8N_URL_BASE),
  ]);
}

export function formatearResultados(resultados) {
  return resultados
    .map(({ servicio, cumple, detalle }) => `${cumple ? 'Cumple   ' : 'No cumple'}  ${servicio}: ${detalle}`)
    .join('\n');
}

const esEjecucionDirecta = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (esEjecucionDirecta) {
  const carpetaActual = path.dirname(fileURLToPath(import.meta.url));
  dotenv.config({ path: path.resolve(carpetaActual, '../../.env') });
  const resultados = await verificarInfraestructura();
  console.log(formatearResultados(resultados));
  process.exit(resultados.every((resultado) => resultado.cumple) ? 0 : 1);
}
