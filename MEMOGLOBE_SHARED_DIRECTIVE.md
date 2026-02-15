# MemoGlobe Shared Directive v1.0

Project Codename: MemoGlobe  
Subtitle: Geo-Metacognitive Self-Evolution Learning Platform  
Directive Authority: Reason of Moon (달의이성)  
Effective Date: 2026-02-15  
Agents: CODEX (Backend/Execution) x ANTIGRAVITY (Frontend/Knowledge)

## 1. Vision

One-line pitch:
- Write notes on a globe. AI finds your blind spots. Places make you remember.

Core thesis:
- Semantic memory reinforcement via note analysis.
- Spatial memory reinforcement via geo-anchoring.
- Episodic memory reinforcement via journey-based learning.

## 2. Core Engines

Required 5 engines from NoteEvol:
- SRS: Semantic Redundancy Score
- KCS: Knowledge Coverage Score
- Bloom: Bloom's Taxonomy Classifier
- CLI: Cognitive Load Index
- DAG: Prerequisite Dependency Graph

MemoGlobe unique engine:
- GAE: GeoAnchoring Engine

## 3. System Architecture (6-layer loop)

1. Note-taking layer
- Templates: Cornell, Zettelkasten, Outline, Concept Map
- Output: raw note data

2. AI analysis layer
- SRS, KCS, Bloom, CLI, DAG
- Output: analysis report

3. GeoAnchoring layer
- Concept to location mapping (historical, cultural, personal)
- Output: geo anchors

4. Metacognitive feedback layer
- Gap alert, redundancy warning, bloom imbalance, overload, growth-ready signal
- Output: feedback cards

5. Constructivist growth layer
- ZPD scoring, scaffolding, journey generation, peer matching
- Output: daily quests, journey routes

6. Globe dashboard layer
- 3D globe, pins, heatmap, routes, journal
- Output feeds next note session context

## 4. Role Assignment

CODEX owns:
- FastAPI backend and all API endpoints
- SRS/KCS/Bloom/CLI/DAG implementation
- GeoAnchoring engine and Google Maps metadata pipeline
- ZPD, scaffolding, quest generation, journey optimization
- PostgreSQL/pgvector + Neo4j data layer
- Async analysis jobs

ANTIGRAVITY owns:
- Next.js frontend and UX flows
- Cesium globe rendering and overlays
- TipTap editor with 4 templates
- Metacognitive dashboard UI
- Daily quest and scaffolding UX
- Responsive + accessibility quality

Shared:
- `shared/openapi.yaml`
- `shared/i18n/*`
- `shared/constants.ts` and `shared/constants.py`

## 5. Tech Stack

- Frontend: Next.js 14 + Tailwind + Framer Motion + CesiumJS
- Backend: FastAPI (Python 3.12+)
- AI pipeline: LangChain + Claude API + HuggingFace
- Data: PostgreSQL 16 + pgvector, Neo4j, Redis
- Maps: Google Maps Platform
- Edge inference: ONNX Runtime

## 6. Canonical Threshold Constants

These constants are mandatory and must remain synchronized across languages.

- `SRS_REDUNDANCY_THRESHOLD = 0.15`
- `KCS_COVERAGE_TARGET = 0.90`
- `CLI_OVERLOAD_THRESHOLD = 0.70`
- `ZPD_READINESS_THRESHOLD = 0.75`
- `BLOOM_IMBALANCE_THRESHOLD = 0.80`
- `ZPD_W1_BLOOM = 0.35`
- `ZPD_W2_KCS = 0.40`
- `ZPD_W3_CLI = 0.25`
- `DAILY_QUEST_COUNT = 3`
- `QUEST_TYPES = ["gap_review", "bloom_push", "new_explore"]`
- `SRS_INTERVALS = [1, 3, 7, 14, 30, 90]`
- `ANCHOR_DECAY_RATE = 0.02`

Pin colors:
- `PIN_COLOR_MASTERED = "#22c55e"`
- `PIN_COLOR_GAP = "#ef4444"`
- `PIN_COLOR_REVIEW = "#eab308"`
- `PIN_COLOR_PATH = "#3b82f6"`
- `PIN_COLOR_PERSONAL = "#a855f7"`

## 7. Communication Contract

Inter-agent communication must use `MEMOGLOBE_SYNC.md` in append-only mode.

Allowed message types:
- `STATUS`
- `REQUEST`
- `HANDOFF`
- `CONSTRAINT`
- `CONFLICT`
- `PROPOSAL`
- `EXPLORE`
- `EXPLORE_RESPONSE`
- `CONTRACT`
- `REVIEW`

Hard rules:
- Never modify the other agent's code directly.
- API contract changes require CONTRACT message and approval.
- Scope/code changes require PROPOSAL then approval before execution.
- On conflict: stop, log `CONFLICT`, wait for directive authority.

## 8. Directory Contract

```text
memoglobe/
├── backend/                   # CODEX namespace
├── frontend/                  # ANTIGRAVITY namespace
├── shared/
│   ├── openapi.yaml
│   ├── constants.ts
│   └── constants.py
├── docs/
│   ├── codex_*.md
│   ├── ag_*.md
│   └── joint_*.md
└── MEMOGLOBE_SYNC.md
```

## 9. Phase Plan

- Phase 1 (Week 1-2): Contract, schema, mocks, i18n keys
- Phase 2 (Week 3-6): Parallel implementation (backend + frontend)
- Phase 3 (Week 7): Merge and integration testing
- Phase 4 (Week 8): Review and final approval

## 10. Definition of Done

- Lint/type checks pass
- Unit tests for new code (target >=80% for touched modules)
- Integration tests for API/UI contracts
- Public interfaces documented
- No hardcoded secrets
- SYNC entry appended after major milestones

## 11. Immutability Rule

This directive file is treated as immutable baseline for v1.0.  
Any semantic changes require explicit approval from directive authority.
