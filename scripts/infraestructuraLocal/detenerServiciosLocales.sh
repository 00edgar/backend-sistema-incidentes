#!/usr/bin/env bash
set -euo pipefail

. "$(dirname "${BASH_SOURCE[0]}")/cargarEntornoLocal.sh"

for nombre in qdrant n8n; do
  archivo_pid="$CARPETA_PROCESOS/$nombre.pid"
  if [ -f "$archivo_pid" ]; then
    pid="$(cat "$archivo_pid")"
    if kill -0 "$pid" 2>/dev/null; then
      kill "$pid"
      echo "$nombre detenido (pid $pid)."
    fi
    rm -f "$archivo_pid"
  fi
done
