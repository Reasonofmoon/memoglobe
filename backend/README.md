# MemoGlobe Backend (CODEX Namespace)

Owner: CODEX

## Scope
- FastAPI application and all endpoints in `shared/openapi.yaml`
- Analysis engines: SRS, KCS, Bloom, CLI, DAG
- GeoAnchoring engine (GAE)
- Quest generation, journey optimization, scaffolding API
- PostgreSQL/pgvector + Neo4j + Redis integration

## Recommended Next Steps
1. Initialize Python project (`pyproject.toml`, Ruff, Pyright).
2. Create app skeleton:
   - `app/main.py`
   - `app/config.py`
   - `app/routers/*`
   - `app/engines/*`
3. Add migration baseline for core entities.
4. Implement Prism mock server parity tests against `shared/openapi.yaml`.
