#!/usr/bin/env bash
set -euo pipefail

CARPETA_SCRIPTS="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
RAIZ_REPOSITORIO="$(cd "$CARPETA_SCRIPTS/../.." && pwd)"
CARPETA_HERRAMIENTAS="$RAIZ_REPOSITORIO/.herramientasLocales"
CARPETA_DATOS="$CARPETA_HERRAMIENTAS/datos"
CARPETA_REGISTROS="$CARPETA_HERRAMIENTAS/registros"
CARPETA_PROCESOS="$CARPETA_HERRAMIENTAS/procesos"

if [ ! -f "$RAIZ_REPOSITORIO/.env" ]; then
  echo "No existe .env. Copiar .env.example a .env y completarlo." >&2
  exit 1
fi

set -a
. "$RAIZ_REPOSITORIO/.env"
set +a

mkdir -p "$CARPETA_DATOS" "$CARPETA_REGISTROS" "$CARPETA_PROCESOS"

puerto_de_url() {
  local url="${1%/}"
  echo "${url##*:}"
}
