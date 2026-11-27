# Contratos backend <-> n8n

Reglas: el backend llama a n8n del lado servidor, con timeout y token (`N8N_TOKEN_SECRETO`). El frontend no llama a n8n.

## Flujo 1 - Indexacion (Dev1, RF03)
`POST N8N_URL_WEBHOOK_INDEXACION`
```json
{ "modo": "indexarTodos | indexarSeleccionados | eliminarDelIndice", "idsArticulos": [1, 2] }
```
Respuesta:
```json
{ "indexados": 0, "actualizados": 0, "eliminados": 0 }
```
- n8n consulta los articulos en PostgreSQL (solo activos y verificados), genera embeddings y hace upsert en Qdrant con id determinista (sin duplicados).
- Los articulos desactivados se eliminan del indice.

## Flujo 2 - Asistencia RAG (Dev3, RF04 y RF05)
`POST N8N_URL_WEBHOOK_ASISTENTE_RAG`
```json
{ "idConsulta": 10, "idIncidente": 5, "descripcion": "texto", "umbralSimilitud": 0.6, "limiteResultados": 5 }
```
Respuesta exitosa:
```json
{
  "estado": "Respondida",
  "solucionSugerida": "texto",
  "pasos": ["paso 1", "paso 2"],
  "fuentes": [{ "idArticulo": 3, "titulo": "texto", "similitud": 0.82 }]
}
```
Sin fuentes relevantes: `{ "estado": "Sin resultados", "mensaje": "No hay informacion suficiente" }` (sin inventar soluciones).
Error del servicio (embeddings, proveedor): codigo HTTP 5xx o `{ "estado": "Error", "mensaje": "..." }`.

## Validaciones que hace el backend
- Descripcion vacia: no se llama a n8n.
- Cada `idArticulo` de las fuentes debe existir y estar activo y verificado.
- Se guarda la consulta como Pendiente y luego Respondida, Sin resultados o Error.
