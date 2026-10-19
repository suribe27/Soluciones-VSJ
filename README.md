# Soluciones VSJ — Alerta Temprana

Aplicación web que calcula el nivel de riesgo académico-emocional de un estudiante de la
Universidad de Medellín (notas + encuesta de bienestar) y lo dirige a Bienestar
Universitario cuando el riesgo es Alto o Crítico.

Proyecto académico del curso **Gestión de la configuración** (Semestre 6, UdeM) —
código `VSJ-AT-2026-2`.

## Aplicaciones y tecnologías

Este repositorio contiene dos aplicaciones (monorepo) más su definición de
infraestructura local:

| Carpeta | Aplicación | Tecnologías principales |
| --- | --- | --- |
| `frontend/` | SPA de React | React 19, TypeScript, Vite 6, TailwindCSS 4 |
| `backend/` | API REST | Node.js 22, Express 4, TypeScript 5.8, PostgreSQL (`pg`), JWT (`jsonwebtoken`), Swagger/OpenAPI |
| `db/` | Esquema de base de datos | PostgreSQL 16 (`schema.sql`) |

Orquestación local: Docker + Docker Compose.

## Despliegue en producción

| Servicio | Plataforma | URL |
| --- | --- | --- |
| Frontend | Vercel | https://soluciones-vsj.vercel.app |
| Backend / API | Railway | https://soluciones-vsj-production.up.railway.app |
| Documentación de la API (Swagger) | Railway | https://soluciones-vsj-production.up.railway.app/api-docs |
| Base de datos | Railway (PostgreSQL) | — (acceso interno, no pública) |

## Cómo clonar

```bash
git clone https://github.com/suribe27/Soluciones-VSJ.git
cd Soluciones-VSJ
```

## Cómo ejecutar todo junto con Docker (recomendado)

Requisitos: [Docker](https://www.docker.com/) y Docker Compose (incluido en Docker Desktop).

```bash
docker compose up --build
```

Esto construye y levanta los tres servicios:

- **Frontend** → http://localhost:3000
- **Backend / API** → http://localhost:4000 (documentación en http://localhost:4000/api-docs)
- **Base de datos** PostgreSQL → `localhost:5432` (el esquema de `db/schema.sql` se aplica automáticamente la primera vez)

Para detenerlo: `docker compose down` (agrega `-v` si además quieres borrar los datos de la base de datos).

## Cómo ejecutar cada app por separado (desarrollo)

Requisitos: [Node.js 22+](https://nodejs.org/) y una base de datos PostgreSQL accesible
(local o con `docker compose up db`).

### Backend

```bash
cd backend
npm install
cp .env.example .env   # completa DATABASE_URL, JWT_SECRET, etc.
npm run db:migrate     # crea las tablas
npm run db:seed        # (opcional) crea usuarios de prueba — contraseña: VSJ2026!
npm run dev            # http://localhost:4000
```

Pruebas unitarias del backend:

```bash
npm test
```

### Frontend

```bash
cd frontend
npm install
npm run dev             # http://localhost:3000
```

Variable de entorno relevante: `VITE_API_URL` (URL del backend; por defecto `http://localhost:4000`).

## Historias de usuario

Las historias de usuario (HU-01 a HU-05), sus criterios de aceptación y el responsable
de cada módulo están documentados en el **Modelo de análisis del proyecto** (entregado
junto con la ficha técnica del curso).

## Estructura del repositorio

```
Soluciones-VSJ/
├── docker-compose.yml   # Orquesta los 3 servicios para desarrollo local
├── db/
│   └── schema.sql       # Esquema de la base de datos PostgreSQL
├── backend/
│   ├── Dockerfile
│   └── src/             # API Express + TypeScript
└── frontend/
    ├── Dockerfile
    ├── nginx.conf        # Sirve el build de producción
    └── src/              # SPA de React + TypeScript
```
