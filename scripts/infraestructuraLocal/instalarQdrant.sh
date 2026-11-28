#!/usr/bin/env bash
set -euo pipefail

. "$(dirname "${BASH_SOURCE[0]}")/cargarEntornoLocal.sh"

VERSION_QDRANT="${VERSION_QDRANT:-1.12.4}"
CARPETA_QDRANT="$CARPETA_HERRAMIENTAS/qdrant"

sistema="$(uname -s)"
arquitectura="$(uname -m)"
case "$sistema-$arquitectura" in
  Linux-x86_64) paquete="x86_64-unknown-linux-gnu" ;;
  Linux-aarch64) paquete="aarch64-unknown-linux-musl" ;;
  Darwin-arm64) paquete="aarch64-apple-darwin" ;;
  Darwin-x86_64) paquete="x86_64-apple-darwin" ;;
  *) echo "Sistema no soportado por este script: $sistema-$arquitectura" >&2; exit 1 ;;
esac

if [ -x "$CARPETA_QDRANT/qdrant" ] && "$CARPETA_QDRANT/qdrant" --version | grep -q "$VERSION_QDRANT"; then
  echo "Qdrant $VERSION_QDRANT ya esta instalado."
  exit 0
fi

mkdir -p "$CARPETA_QDRANT"
archivo_descargado="$CARPETA_QDRANT/qdrant.tar.gz"
curl -fsSL --retry 3 -o "$archivo_descargado" \
  "https://github.com/qdrant/qdrant/releases/download/v${VERSION_QDRANT}/qdrant-${paquete}.tar.gz"
tar -xzf "$archivo_descargado" -C "$CARPETA_QDRANT"
rm -f "$archivo_descargado"
"$CARPETA_QDRANT/qdrant" --version
