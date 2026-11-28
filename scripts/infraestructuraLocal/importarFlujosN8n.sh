#!/usr/bin/env bash
set -euo pipefail

. "$(dirname "${BASH_SOURCE[0]}")/cargarEntornoN8n.sh"

cantidad_de_nodos() {
  node -p "JSON.parse(require('fs').readFileSync(process.argv[1], 'utf8')).nodes.length" "$1"
}

identificador_del_flujo() {
  node -p "JSON.parse(require('fs').readFileSync(process.argv[1], 'utf8')).id" "$1"
}

for archivo in "$RAIZ_REPOSITORIO"/n8n/flujos/*.json; do
  cantidad_nodos="$(cantidad_de_nodos "$archivo")"
  if [ "$cantidad_nodos" -eq 0 ]; then
    echo "Omitido (sin nodos todavia): $(basename "$archivo")"
    continue
  fi
  identificador="$(identificador_del_flujo "$archivo")"
  "$EJECUTABLE_N8N" import:workflow --input="$archivo"
  "$EJECUTABLE_N8N" publish:workflow --id="$identificador"
  echo "Importado y publicado: $(basename "$archivo") (id $identificador)"
done

echo "Reiniciar n8n para registrar los webhooks: npm run infraestructura:detener && npm run infraestructura:iniciar"
