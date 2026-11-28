# Contratos backend <-> n8n

Reglas: el backend llama a n8n del lado servidor, con timeout y token (`N8N_TOKEN_SECRETO`). El frontend no llama a n8n.

El token viaja en la cabecera `x-token-secreto`. Los flujos que exponen webhook responden `401` si falta o no coincide con la variable `N8N_TOKEN_SECRETO` del entorno de n8n (si esa variable esta vacia rechazan todo).

## Coleccion de Qdrant
Coleccion `QDRANT_COLECCION` (por defecto `articulosConocimiento`), distancia `Cosine`, un punto por articulo con `id` igual al id del articulo en PostgreSQL. El payload que escribe el Flujo 1 y lee la busqueda es:
```json
{ "idArticulo": 3, "titulo": "[Hardware] Disco duro con ruidos y lectura lenta", "categoria": "Hardware", "problema": "texto", "solucion": "texto", "fecha": "2026-10-09T10:00:00.000Z" }
```

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

## Flujo de busqueda semantica (Dev1, RF04)
`POST N8N_URL_WEBHOOK_BUSQUEDA_SEMANTICA` (`/webhook/busqueda-semantica`). Embebe la descripcion y busca los articulos mas parecidos en Qdrant. Lo usa el Flujo 2 como primer paso.
```json
{ "descripcion": "texto", "umbralSimilitud": 0.6, "limiteResultados": 5, "coleccion": "articulosConocimiento" }
```
Solo `descripcion` es obligatoria. Sin `umbralSimilitud` se usa `UMBRAL_SIMILITUD`; sin `limiteResultados` se usa `LIMITE_MAXIMO_FUENTES`; sin `coleccion` se usa `QDRANT_COLECCION`. `limiteResultados` debe estar entre `LIMITE_MINIMO_FUENTES` y `LIMITE_MAXIMO_FUENTES` (3 y 5 por defecto).

Respuesta `200` con resultados:
```json
{
  "estado": "Con resultados",
  "umbralSimilitud": 0.6,
  "limiteResultados": 5,
  "total": 3,
  "suficientes": true,
  "resultados": [
    { "idArticulo": 8, "titulo": "texto", "categoria": "Hardware", "similitud": 0.82, "problema": "texto", "solucion": "texto", "fecha": "2026-10-09T10:00:00.000Z" }
  ]
}
```
Ordenados de mayor a menor similitud. `suficientes` es `true` cuando hay al menos `LIMITE_MINIMO_FUENTES` resultados. Sin resultados por encima del umbral: `{ "estado": "Sin resultados", "total": 0, "resultados": [], "mensaje": "No hay informacion suficiente", ... }` (nunca se inventan fuentes).

Errores: `400` (descripcion vacia, umbral fuera de 0 a 1, limite fuera de rango o nombre de coleccion no valido), `401` (token), `502` con `{ "estado": "Error", "mensaje": "..." }` si falla el servicio de embeddings, Qdrant no responde o la coleccion no existe.

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
