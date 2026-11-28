# Busqueda semantica con umbral configurable (historia 2.2, RF04)

Flujo de n8n `n8n/flujos/flujoBusquedaSemantica.json` (webhook `POST /webhook/busqueda-semantica`). Recibe la descripcion de un incidente, genera su embedding y devuelve de 3 a 5 articulos parecidos con su similitud y metadatos. El contrato completo esta en `docs/contratosN8n.md`.

## Como funciona
1. Valida el token (`x-token-secreto`), la descripcion, el umbral, el limite y el nombre de la coleccion.
2. Pide el embedding a `PROVEEDOR_IA_URL_BASE/v1/embeddings` (API compatible con OpenAI, que tambien ofrece Ollama) con el modelo `PROVEEDOR_IA_MODELO_EMBEDDINGS`.
3. Busca en Qdrant (`QDRANT_URL`, coleccion `QDRANT_COLECCION`) con distancia coseno, `limit` y `score_threshold`.
4. Responde con `idArticulo`, `titulo`, `categoria`, `similitud`, `problema`, `solucion` y `fecha`, de mayor a menor similitud. Si nada supera el umbral responde `Sin resultados` sin inventar fuentes.

## Configuracion por variables de entorno
| Variable | Uso | Valor por defecto |
|---|---|---|
| `UMBRAL_SIMILITUD` | Similitud minima (0 a 1) para que un articulo cuente como resultado | 0.6 |
| `LIMITE_MINIMO_FUENTES` | Cantidad que marca `suficientes: true` y limite inferior de `limiteResultados` | 3 |
| `LIMITE_MAXIMO_FUENTES` | Maximo de resultados y valor por defecto de `limiteResultados` | 5 |
| `QDRANT_COLECCION` | Coleccion consultada | `articulosConocimiento` |
| `N8N_TOKEN_SECRETO` | Token que debe enviar quien llama | sin valor (rechaza todo) |

n8n lee estas variables al arrancar: despues de cambiarlas en `.env` hay que reiniciar con `npm run infraestructura:detener && npm run infraestructura:iniciar`. Una solicitud puede sobrescribir el umbral con `umbralSimilitud`, que sirve para calibrar.

## Justificacion del umbral con consultas de ejemplo
Se probaron 17 consultas redactadas como las escribiria un usuario (cada una describe un articulo de la base de 25) y 4 consultas sin relacion con soporte tecnico, contra los 17 articulos elegibles (activos y verificados) indexados en una coleccion de prueba. Las consultas estan en `pruebas/datos/consultasEjemploBusqueda.json`.

| Grupo | Resultado |
|---|---|
| 17 consultas relevantes | El articulo esperado salio en 1.er lugar en las 17. Similitud del esperado: minimo 0.149, maximo 0.637 |
| 4 consultas sin relacion | Mejor similitud entre 0.041 y 0.102 |
| Punto medio entre el minimo relevante y el maximo sin relacion | **0.13** |

Ejemplos medidos:

| Consulta | Articulo esperado | Similitud |
|---|---|---|
| Mi cuenta de usuario quedo bloqueada por intentos fallidos de contrasena | 21 | 0.637 |
| La impresora se atasca y saca las hojas arrugadas | 7 | 0.366 |
| El wifi de la oficina se corta cada pocos minutos | 12 | 0.149 |
| Receta de pastel de chocolate con fresas | ninguno | 0.102 |
| Resultado del partido de futbol de ayer | ninguno | 0.041 |

Con 0.13 las 17 consultas relevantes devuelven su articulo y las 4 sin relacion devuelven `Sin resultados`. Un umbral mas bajo deja pasar ruido; uno mas alto (por ejemplo 0.3) pierde consultas reales como la del wifi.

### Alcance de esta calibracion
Estos numeros se midieron con el **proveedor de embeddings local de pruebas** (`scripts/proveedorIaLocal`), que representa el texto por palabras y fragmentos de palabras (similitud lexica, 4096 dimensiones). No entiende sinonimos y sus similitudes son bajas. **El valor 0.13 no es valido para un modelo de embeddings real**: con Ollama u otro proveedor hay que repetir la calibracion y fijar `UMBRAL_SIMILITUD` con el resultado.

Procedimiento para recalibrar con el modelo real:
1. Configurar `PROVEEDOR_IA_*` en `.env` y arrancar los servicios (`docs/instalacionLocal.md`).
2. Cargar los articulos de ejemplo (repositorio de base de datos) y exportar `DATABASE_URL`.
3. `npm run busquedaSemantica:indexarPrueba` crea la coleccion `pruebasBusquedaSemantica` con los articulos activos y verificados (nunca escribe en `QDRANT_COLECCION`).
4. `npm run busquedaSemantica:calibrar` imprime la similitud de cada consulta y el umbral sugerido (punto medio). Si los grupos se traslapan lo indica.
5. Poner el valor en `UMBRAL_SIMILITUD`, reiniciar n8n y repetir con consultas propias del equipo.

## Proveedor de embeddings local de pruebas
Para desarrollar sin proveedor de IA real:
```bash
npm run proveedorIaLocal:iniciar
```
Escucha en `http://127.0.0.1:11434` (cambiar con `EMBEDDINGS_LOCAL_PUERTO`) y atiende `POST /v1/embeddings`. En `.env`: `PROVEEDOR_IA_URL_BASE=http://localhost:11434` y `PROVEEDOR_IA_MODELO_EMBEDDINGS=embeddings-lexicos-local`. No sustituye a un modelo real: solo sirve para probar el flujo de punta a punta.

## Pruebas
- `npm run probar` ejecuta las pruebas unitarias del flujo (validaciones, armado de la respuesta, errores, ausencia de credenciales en el JSON) y del proveedor local.
- Si n8n, Qdrant, el proveedor de embeddings y la base con los articulos estan arriba, tambien corre `pruebas/integracion/pruebaBusquedaSemantica.integracion.test.js`: indexa la coleccion de prueba, calibra y verifica relevancia, orden, limites 3 a 5, umbral por variable de entorno, articulos excluidos, errores 400, 401 y 502. Si falta algun servicio, esas pruebas se omiten y el motivo aparece en el resultado.

## Dependencia con la indexacion
Esta historia solo lee de Qdrant. La coleccion real `articulosConocimiento` la llena el Flujo 1 (historia 2.1, pendiente). Hasta entonces la busqueda sobre esa coleccion responde `502` con el mensaje de ejecutar primero la indexacion.
