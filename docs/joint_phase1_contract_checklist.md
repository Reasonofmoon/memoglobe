# Joint Phase 1 Checklist (Contract)

## Goals
- Lock API contract.
- Lock cross-language constants.
- Enable parallel development with mocks.

## Checklist
- [ ] `shared/openapi.yaml` reviewed by CODEX and ANTIGRAVITY
- [ ] Contract ACK appended to `MEMOGLOBE_SYNC.md` by both agents
- [ ] `shared/constants.ts` and `shared/constants.py` parity verified
- [ ] Prism mock server configured (backend side)
- [ ] MSW handlers generated/implemented (frontend side)
- [ ] Auth claim mapping (`sub -> user_id`) documented
- [ ] i18n key conventions established in `shared/i18n/`
