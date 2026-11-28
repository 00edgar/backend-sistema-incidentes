# Instalacion local (sin contenedores)

Historia 1.2. PostgreSQL, Qdrant y n8n corren directamente en el equipo, sin Docker ni contenedores. Las credenciales viven solo en el archivo `.env` (nunca se sube a GitHub).

## Versiones y puertos
| Servicio | Version probada | Puerto | Como se instala | Como se verifica |
|---|---|---|---|---|
| PostgreSQL | 16 | 5432 | Paquete del sistema operativo | Conexion con `DATABASE_URL` |
| Qdrant | 1.12.4 (ejecutable) | 6333 HTTP, 6334 gRPC | `instalarQdrant.sh` descarga el ejecutable a `.herramientasLocales/` | `GET /healthz` y `GET /collections` |
| n8n | 2.35.7 | 5678 | `instalarN8n.sh` lo instala con npm en `.herramientasLocales/` | `GET /healthz` |
| Backend (Express) | - | 3000 | `npm run desarrollo` | `GET /api/salud` |
| Frontend (estatico) | - | 5500 | Desde su propio repositorio | Abrir en el navegador |

Los puertos salen de `.env` (`DATABASE_URL`, `QDRANT_URL`, `N8N_URL_BASE`, `PUERTO_BACKEND`). Si se cambian, los scripts los respetan.

## Requisitos previos
- Node.js 22.22 o superior y npm (n8n 2.35 exige Node 22.22 o mas; las versiones de n8n posteriores a la 2.35 exigen Node 24).
- `bash`, `curl` y `tar`. Los scripts de `scripts/infraestructuraLocal` son bash: se probaron en Linux. En macOS deberian funcionar; en Windows usar WSL2 o Git Bash (no probado).
- Para instalar n8n por npm se compila un modulo nativo (`isolated-vm`): hacen falta `python3`, `make` y `g++` (en Ubuntu: `sudo apt-get install -y build-essential python3`).
- PostgreSQL 16 con el cliente `psql`.
  - Ubuntu o Debian: `sudo apt-get install -y postgresql-16` y `sudo systemctl enable --now postgresql`.
  - macOS: `brew install postgresql@16 && brew services start postgresql@16` (definir `COMANDO_ADMINISTRADOR_POSTGRESQL="psql -d postgres"` en `.env`).
  - Windows: instalador oficial de PostgreSQL (no probado con estos scripts).

## Pasos desde un clon limpio
1. Clonar `backend-sistema-incidentes` y entrar a la carpeta.
2. `cp .env.example .env` y editar: cambiar `POSTGRES_CLAVE`, la clave dentro de `DATABASE_URL` (deben coincidir), `N8N_TOKEN_SECRETO` y las variables del proveedor de IA.
3. `npm install`.
4. `npm run infraestructura:prepararBaseDatos`: crea el usuario y la base de `.env`. Se puede repetir sin problema.
5. `npm run infraestructura:instalar`: descarga Qdrant e instala n8n en `.herramientasLocales/` (carpeta ignorada por git). Tarda varios minutos la primera vez.
6. `npm run infraestructura:iniciar`: arranca Qdrant y n8n en segundo plano y espera a que respondan. Los registros quedan en `.herramientasLocales/registros/`.
7. Proveedor de IA (embeddings): usar Ollama u otro servicio con API compatible con OpenAI y configurar `PROVEEDOR_IA_URL_BASE`, `PROVEEDOR_IA_API_KEY` y `PROVEEDOR_IA_MODELO_EMBEDDINGS`. Para desarrollar sin proveedor real: `npm run proveedorIaLocal:iniciar` (ver `docs/busquedaSemantica.md`).
8. `npm run infraestructura:verificar`: debe imprimir `Cumple` para PostgreSQL, Qdrant y n8n.
9. Modelo de datos (Dev2): `npm run prisma:generar` y `npm run prisma:migrar`.
10. Datos iniciales: repositorio `base-datos-sistema-incidentes` (`docs/instalacionLocal.md`).
11. `npm run desarrollo` y abrir http://localhost:3000/api/salud, que responde `{"estado":"ok"}`.

Para detener Qdrant y n8n: `npm run infraestructura:detener`.

## Salida esperada de la verificacion
```
Cumple     PostgreSQL: base incidentes, usuario incidentes_app, PostgreSQL 16.x
Cumple     Qdrant: http://localhost:6333 responde, colecciones: 0
Cumple     n8n: http://localhost:5678 responde
```
El comando termina con codigo 0 si todo cumple y con 1 si algun servicio no responde (`No cumple` y el motivo).

## Credenciales
- Todo secreto esta en `.env`: clave de PostgreSQL, token compartido con n8n y clave del proveedor de IA.
- `.env` esta en `.gitignore`. `.env.example` solo lleva valores de ejemplo.
- n8n recibe las variables del `.env` al arrancar con `iniciarN8n.sh`; los flujos exportados leen `$env.*` y no guardan credenciales.

## Problemas frecuentes
- `password authentication failed`: la clave de `DATABASE_URL` no coincide con `POSTGRES_CLAVE`; volver a ejecutar el paso 4 despues de corregir `.env`.
- Qdrant o n8n no responden: revisar `.herramientasLocales/registros/qdrant.log` y `n8n.log`, y que el puerto no este ocupado.
- La instalacion de n8n falla compilando `isolated-vm`: instalar `build-essential` y `python3`; si la red bloquea la descarga de cabeceras de Node, ejecutar con `npm_config_nodedir=<carpeta de instalacion de Node>`.
