# Flujos de n8n

Aqui se guardan los workflows exportados (JSON). El contrato de entrada y salida esta en [docs/contratosN8n.md](../docs/contratosN8n.md).

- `flujos/flujoIndexacionArticulos.json` (Dev1, RF03)
- `flujos/flujoBusquedaSemantica.json` (Dev1, RF04)
- `flujos/flujoAsistenciaRag.json` (Dev3, RF04 y RF05)

Reglas: las credenciales del proveedor de IA, PostgreSQL y Qdrant se configuran en n8n a partir de variables de entorno; nunca se guardan en el JSON exportado.
