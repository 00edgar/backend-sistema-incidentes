/**
 * Lee y valida las variables de entorno. Unico lugar donde se toca process.env.
 *
 * Responsable: Dev3 | Historia ClickUp: 1.8.2 | Transversal
 *
 * TODO: Agregar aqui cualquier variable nueva y declararla tambien en .env.example.
 */

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import { z } from 'zod';

const carpetaActual = path.dirname(fileURLToPath(import.meta.url));
// El archivo .env vive en la raiz de este repositorio (dos niveles arriba de src/configuracion).
dotenv.config({ path: path.resolve(carpetaActual, '../../.env') });

const esquemaVariablesEntorno = z.object({
  PUERTO_BACKEND: z.coerce.number().int().positive().default(3000),
  DATABASE_URL: z.string().default(''),
  ORIGEN_PERMITIDO_FRONTEND: z.string().default('http://localhost:5500'),
  N8N_URL_WEBHOOK_ASISTENTE_RAG: z.string().default(''),
  N8N_URL_WEBHOOK_INDEXACION: z.string().default(''),
  N8N_TOKEN_SECRETO: z.string().default(''),
  N8N_TIMEOUT_MILISEGUNDOS: z.coerce.number().int().positive().default(30000),
  UMBRAL_SIMILITUD: z.coerce.number().min(0).max(1).default(0.6),
  LIMITE_MINIMO_FUENTES: z.coerce.number().int().positive().default(3),
  LIMITE_MAXIMO_FUENTES: z.coerce.number().int().positive().default(5),
});

export function cargarConfiguracion(entorno = process.env) {
  const v = esquemaVariablesEntorno.parse(entorno);
  return Object.freeze({
    puerto: v.PUERTO_BACKEND,
    urlBaseDatos: v.DATABASE_URL,
    origenPermitidoFrontend: v.ORIGEN_PERMITIDO_FRONTEND,
    n8n: {
      urlWebhookAsistenteRag: v.N8N_URL_WEBHOOK_ASISTENTE_RAG,
      urlWebhookIndexacion: v.N8N_URL_WEBHOOK_INDEXACION,
      tokenSecreto: v.N8N_TOKEN_SECRETO,
      timeoutMilisegundos: v.N8N_TIMEOUT_MILISEGUNDOS,
    },
    asistente: {
      umbralSimilitud: v.UMBRAL_SIMILITUD,
      limiteMinimoFuentes: v.LIMITE_MINIMO_FUENTES,
      limiteMaximoFuentes: v.LIMITE_MAXIMO_FUENTES,
    },
  });
}
