#!/usr/bin/env bash
set -euo pipefail

. "$(dirname "${BASH_SOURCE[0]}")/cargarEntornoLocal.sh"

EJECUTABLE_QDRANT="$CARPETA_HERRAMIENTAS/qdrant/qdrant"
if [ ! -x "$EJECUTABLE_QDRANT" ]; then
  echo "Qdrant no esta instalado. Ejecutar scripts/infraestructuraLocal/instalarQdrant.sh" >&2
  exit 1
fi

export QDRANT__SERVICE__HOST="${QDRANT_DIRECCION_ESCUCHA:-127.0.0.1}"
export QDRANT__SERVICE__HTTP_PORT="$(puerto_de_url "${QDRANT_URL:-http://localhost:6333}")"
export QDRANT__SERVICE__GRPC_PORT="${QDRANT_PUERTO_GRPC:-6334}"
export QDRANT__STORAGE__STORAGE_PATH="$CARPETA_DATOS/qdrant/almacenamiento"
export QDRANT__STORAGE__SNAPSHOTS_PATH="$CARPETA_DATOS/qdrant/instantaneas"
export QDRANT__TELEMETRY_DISABLED=true

mkdir -p "$QDRANT__STORAGE__STORAGE_PATH" "$QDRANT__STORAGE__SNAPSHOTS_PATH"
cd "$CARPETA_HERRAMIENTAS/qdrant"
exec "$EJECUTABLE_QDRANT"
