# backend-sistema-incidentes

API REST (Node.js + Express + Prisma) del sistema inteligente de analisis de incidentes tecnologicos. Arquitectura hexagonal (puertos y adaptadores).

## Repositorios del proyecto
| Repositorio | Contenido |
|---|---|
| `backend-sistema-incidentes` (este) | API, flujos de n8n, documentacion transversal |
| `frontend-sistema-incidentes` | HTML, CSS y JavaScript |
| `base-datos-sistema-incidentes` | Scripts SQL: datos iniciales, consultas analiticas y verificaciones |

## Estructura
```
src/dominio/        entidades, constantes, reglas, errores
src/aplicacion/     casosDeUso/ y puertos/salida/
src/adaptadores/    entrada/http (rutas, controladores, esquemasValidacion, middlewares) y salida (prisma, n8n)
src/configuracion/  variablesEntorno, clientePrisma, contenedorDependencias
prisma/             schema.prisma (modelo de datos y migraciones)
n8n/flujos/         workflows exportados (Flujo 1 y Flujo 2)
docs/               arquitectura, contratos n8n, pruebas, informe, evidencias de API
```

## Puesta en marcha
1. Instalar PostgreSQL, Qdrant y n8n de forma local (ver `docs/instalacionLocal.md`).
2. Copiar `.env.example` a `.env` y completarlo.
3. `npm install`, `npm run prisma:generar`, `npm run prisma:migrar`.
4. Cargar los datos iniciales desde el repositorio de base de datos.
5. `npm run desarrollo` y abrir http://localhost:3000/api/salud.

Los endpoints sin programar responden `501`. Cada archivo indica su responsable y su historia de ClickUp en la cabecera; el mapa esta en `docs/mapaArchivosPorTarea.md`.

## Normas
- Nombres en camelCase y autodescriptivos (`docs/convencionesNombres.md`).
- Flujo de ramas y PR en `docs/flujoGit.md`. Uso de IA en `AI_USAGE.md`.
- Credenciales solo en variables de entorno.
