#!/usr/bin/env bash
set -euo pipefail

. "$(dirname "${BASH_SOURCE[0]}")/cargarEntornoLocal.sh"

esperar_respuesta() {
  local nombre="$1" url="$2" intentos=90
  until curl -fs -o /dev/null "$url"; do
    intentos=$((intentos - 1))
    if [ "$intentos" -le 0 ]; then
      echo "$nombre no respondio en $url. Revisar $CARPETA_REGISTROS" >&2
      exit 1
    fi
    sleep 2
  done
  echo "$nombre responde en $url"
}

esperar_linea_en_registro() {
  local nombre="$1" patron="$2" intentos=90
  until grep -q "$patron" "$CARPETA_REGISTROS/$nombre.log" 2>/dev/null; do
    intentos=$((intentos - 1))
    if [ "$intentos" -le 0 ]; then
      echo "$nombre no termino de arrancar. Revisar $CARPETA_REGISTROS/$nombre.log" >&2
      exit 1
    fi
    sleep 2
  done
}

iniciar_en_segundo_plano() {
  local nombre="$1" script="$2"
  local archivo_pid="$CARPETA_PROCESOS/$nombre.pid"
  if [ -f "$archivo_pid" ] && kill -0 "$(cat "$archivo_pid")" 2>/dev/null; then
    echo "$nombre ya esta en ejecucion (pid $(cat "$archivo_pid"))."
    return
  fi
  nohup "$CARPETA_SCRIPTS/$script" > "$CARPETA_REGISTROS/$nombre.log" 2>&1 &
  echo $! > "$archivo_pid"
}

iniciar_en_segundo_plano qdrant iniciarQdrant.sh
iniciar_en_segundo_plano n8n iniciarN8n.sh

esperar_respuesta Qdrant "${QDRANT_URL%/}/healthz"
esperar_respuesta n8n "${N8N_URL_BASE%/}/healthz"
esperar_linea_en_registro n8n "Editor is now accessible"
echo "n8n con los flujos activos registrados"
