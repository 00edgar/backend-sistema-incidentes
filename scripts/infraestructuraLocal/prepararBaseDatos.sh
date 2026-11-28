#!/usr/bin/env bash
set -euo pipefail

. "$(dirname "${BASH_SOURCE[0]}")/cargarEntornoLocal.sh"

: "${POSTGRES_USUARIO:?Definir POSTGRES_USUARIO en .env}"
: "${POSTGRES_CLAVE:?Definir POSTGRES_CLAVE en .env}"
: "${POSTGRES_BASE_DATOS:?Definir POSTGRES_BASE_DATOS en .env}"

ARCHIVO_SQL="$CARPETA_SCRIPTS/crearBaseDatosYUsuario.sql"

if [ -n "${COMANDO_ADMINISTRADOR_POSTGRESQL:-}" ]; then
  ejecutar_como_administrador() { $COMANDO_ADMINISTRADOR_POSTGRESQL "$@"; }
elif [ "$(id -u)" -eq 0 ]; then
  ejecutar_como_administrador() { runuser -u postgres -- "$@"; }
else
  ejecutar_como_administrador() { sudo -u postgres "$@"; }
fi

ejecutar_como_administrador psql -p "${POSTGRES_PUERTO:-5432}" -v ON_ERROR_STOP=1 \
  -v usuario="$POSTGRES_USUARIO" \
  -v clave="$POSTGRES_CLAVE" \
  -v baseDatos="$POSTGRES_BASE_DATOS" \
  -f "$ARCHIVO_SQL"

echo "Base ${POSTGRES_BASE_DATOS} y usuario ${POSTGRES_USUARIO} listos."
