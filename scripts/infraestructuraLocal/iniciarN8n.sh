#!/usr/bin/env bash
set -euo pipefail

. "$(dirname "${BASH_SOURCE[0]}")/cargarEntornoN8n.sh"

exec "$EJECUTABLE_N8N" start
