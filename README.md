# BatchCooking MMG

Meal prep planner and batch cooking manager: web front‑end, back‑end API, and batch jobs.

- **Repo**: [https://github.com/BatchCookingMMG/BatchCooking_MMG](https://github.com/BatchCookingMMG/BatchCooking_MMG)
- **Modules**:

  - [Front](https://github.com/BatchCookingMMG/BatchCooking_MMG/tree/dev/FRONT) – React + TypeScript (Vite)
  - [Back](https://github.com/BatchCookingMMG/BatchCooking_MMG/tree/dev/BACK) – Java (Spring Boot)
  - [Batch](https://github.com/BatchCookingMMG/BatchCooking_MMG/tree/dev/BATCH) – Python scripts

## Architecture

```
BatchCooking_MMG/
├─ BACK/   # API and business logic
├─ FRONT/  # Web app
├─ BATCH/  # Batch scripts
├─ docker-compose.yml
└─ README.md
```

## Requirements

- **Docker** (recommended)
- Or manually:

  - Node.js ≥ 18 for FRONT
  - JDK ≥ 17 + Maven for BACK
  - Python ≥ 3.11 for BATCH

## Quick Start (Docker)

```bash
docker compose up --build
```

- Front: [http://localhost:5173](http://localhost:5173)
- API: [http://localhost:8080](http://localhost:8080)

## Manual Start

### Front

```bash
cd FRONT
npm install
npm run dev
```

### Back

```bash
cd BACK
./mvnw spring-boot:run
```

### Batch

```bash
cd BATCH
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python scripts/<your_script>.py
```

## Environment Variables

- **Front (`FRONT/.env`)**

  ```
  VITE_API_URL=http://localhost:8080
  ```

- **Back (`BACK/.env` or app config)**

  ```
  SERVER_PORT=8080
  SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/batchcooking
  ```

- **Batch (`BATCH/.env`)**

  ```
  API_BASE_URL=http://localhost:8080
  ```

## Scripts

- **Front**: `npm run dev`, `npm run build`, `npm test`
- **Back**: `mvn spring-boot:run`, `mvn test`
- **Batch**: run scripts in `scripts/`, use `pytest` for tests

## CI

This repository uses **GitHub Actions** for Continuous Integration.

Current pipeline runs:

- **Front**: install, lint, build, and run tests (Node.js)
- **Back**: build and run tests (Maven/Java)
- **Batch**: install dependencies and run tests (Python)

Status badge: [![CI/CD Pipeline](https://github.com/BatchCookingMMG/BatchCooking_MMG/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/BatchCookingMMG/BatchCooking_MMG/actions/workflows/ci-cd.yml)
