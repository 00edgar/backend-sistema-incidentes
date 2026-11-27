# Evidencias de la API (Postman o Swagger)

> Responsable: Dev2 (historia 3.9). Guardar aqui la coleccion exportada y capturas de los endpoints principales.

Endpoints del backend:
| Metodo | Ruta | Descripcion |
|---|---|---|
| GET | /api/salud | Verificacion del servidor |
| POST, GET | /api/incidentes | Registrar y listar incidentes |
| GET | /api/incidentes/:idIncidente | Detalle |
| PATCH | /api/incidentes/:idIncidente/estado | Cambiar estado |
| GET | /api/usuarios, /api/categorias | Catalogos |
| GET, POST | /api/articulos | Base de conocimiento |
| PUT | /api/articulos/:idArticulo | Editar articulo |
| PATCH | /api/articulos/:idArticulo/estado | Activar o desactivar |
| POST | /api/articulos/indexacion | Disparar Flujo 1 |
| POST | /api/incidentes/:idIncidente/asistencias | Pedir asistencia IA |
| GET | /api/incidentes/:idIncidente/asistencias | Historial de asistencias |
| POST | /api/respuestas/:idRespuestaIA/calificaciones | Calificar 1 a 5 |
| GET | /api/indicadores/total-por-periodo, por-categoria, tendencia, tasa-resolucion, tiempo-promedio-resolucion, categoria-mas-recurrente, por-prioridad | Los 7 indicadores |
