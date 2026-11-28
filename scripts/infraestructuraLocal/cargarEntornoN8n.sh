#!/usr/bin/env bash
set -euo pipefail

. "$(dirname "${BASH_SOURCE[0]}")/cargarEntornoLocal.sh"

EJECUTABLE_N8N="$CARPETA_HERRAMIENTAS/n8n/node_modules/.bin/n8n"
if [ ! -x "$EJECUTABLE_N8N" ]; then
  echo "n8n no esta instalado. Ejecutar scripts/infraestructuraLocal/instalarN8n.sh" >&2
  exit 1
fi

export N8N_PORT="$(puerto_de_url "${N8N_URL_BASE:-http://localhost:5678}")"
export N8N_RUNNERS_BROKER_PORT="$((N8N_PORT + 1))"
export N8N_USER_FOLDER="$CARPETA_DATOS/n8n"
export N8N_BLOCK_ENV_ACCESS_IN_NODE=false
export N8N_DIAGNOSTICS_ENABLED=false
export N8N_VERSION_NOTIFICATIONS_ENABLED=false
export N8N_PERSONALIZATION_ENABLED=false
export N8N_SECURE_COOKIE=false
export N8N_HOST=localhost
export N8N_LISTEN_ADDRESS="${N8N_DIRECCION_ESCUCHA:-127.0.0.1}"
export WEBHOOK_URL="${N8N_URL_BASE:-http://localhost:5678}/"

mkdir -p "$N8N_USER_FOLDER"
