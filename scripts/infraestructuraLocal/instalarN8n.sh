#!/usr/bin/env bash
set -euo pipefail

. "$(dirname "${BASH_SOURCE[0]}")/cargarEntornoLocal.sh"

VERSION_N8N="${VERSION_N8N:-2.35.7}"
CARPETA_N8N="$CARPETA_HERRAMIENTAS/n8n"

if ! node -e "const [mayor, menor] = process.versions.node.split('.').map(Number); process.exit(mayor > 22 || (mayor === 22 && menor >= 22) ? 0 : 1)"; then
  echo "n8n ${VERSION_N8N} requiere Node.js 22.22 o superior; version actual: $(node -v)" >&2
  exit 1
fi

mkdir -p "$CARPETA_N8N"
npm install --prefix "$CARPETA_N8N" --no-audit --no-fund "n8n@${VERSION_N8N}"
"$CARPETA_N8N/node_modules/.bin/n8n" --version
