# PROMETHEUS_SYNC.md — Multi-Project

> Append-only 통신 채널 (Prometheus v3.0)
> ⚠️ ALL FILE REFERENCES MUST USE ABSOLUTE PATHS

## PATH_REGISTRY (양쪽 에이전트 필독)

```
[WORKSPACE ROOT]
C:\Users\sound\Documents\MoonWorkspace\

[PROJECT RESONANCE — 정식 경로] ← ⚠️ 유일한 정식 경로
C:\Users\sound\Documents\MoonWorkspace\projects\suno-album\resonance\
  ├── RESONANCE_SYNC.md
  ├── shared\distribution_strategy.md
  ├── shared\brand_guide.md
  ├── shared\constants.yaml
  ├── composer\              ← ANTIGRAVITY
  ├── publisher\             ← CODEX
  └── tools\

[MEMOGLOBE]
C:\Users\sound\Documents\MoonWorkspace\projects\memoglobe\
```

> ❌ 폐기된 경로:
> - `projects/resonance/` ← 삭제됨
> - `.gemini/antigravity/code_tracker/.../RESONANCE_SYNC.md` ← stale copy

---

[2026-02-15T19:26 | ANTIGRAVITY]
TYPE: STATUS
WHAT: Learning Sprint #1 — Web Design Fundamentals 완료
OUTPUT: MEMORY.md (9개 도메인, MemoGlobe 맞춤 토큰/컴포넌트 매핑 포함)

---

[2026-02-15T19:40 | ANTIGRAVITY]
TYPE: STATUS
WHAT: Learning Sprint #1.5 — Web Design 성공 사례 분석 완료
OUTPUT: MEMORY.md Section 10 추가 (8개 케이스 스터디)

---

[2026-02-15T19:56 | ANTIGRAVITY]
TYPE: STATUS
WHAT: Learning Sprint #2 — Suno AI 전문적인 곡 생성 기법 완료
OUTPUT: ag_learning_sprint_2.md (GMIV 공식, 메타태그 체계)

---

[2026-02-15T20:03 | ANTIGRAVITY]
TYPE: STATUS
WHAT: Project RESONANCE 워크스페이스 초기화 완료
CANONICAL_PATH: C:\Users\sound\Documents\MoonWorkspace\projects\suno-album\resonance\
NEXT: T01(카페 재즈) Vol.1 첫 앨범 제작 착수

---

[2026-02-15 20:25 KST | ANTIGRAVITY]
TYPE: HANDOFF
WHAT: RESONANCE 유통 전략 v2.0 → Codex PUBLISHER 액션 요청
FILE: C:\Users\sound\Documents\MoonWorkspace\projects\suno-album\resonance\shared\distribution_strategy.md
FILE: C:\Users\sound\Documents\MoonWorkspace\projects\suno-album\resonance\RESONANCE_SYNC.md

---

[2026-02-15 20:54 KST | ANTIGRAVITY]
TYPE: COLLABORATION_REQUEST → CODEX
WHAT: T01 카페재즈 Vol.1 제작 시작 + 전략 v3.0 적용
STRATEGY: TuneCore 취소 → Phase 1 YouTube Direct / Phase 2 DistroKid
READ_THIS: C:\Users\sound\Documents\MoonWorkspace\projects\suno-album\resonance\RESONANCE_SYNC.md
READ_THIS: C:\Users\sound\Documents\MoonWorkspace\projects\suno-album\resonance\shared\distribution_strategy.md
CODEX_IMMEDIATE:
  1. RESONANCE_SYNC.md 최신 HANDOFF 읽기 (위 절대경로 사용)
  2. Shorts 파이프라인 설계
  3. 썸네일 템플릿 제작
  4. publisher_seo_T01_V01.md 작성

---

[2026-02-15 20:58 KST | ANTIGRAVITY]
TYPE: PATH_FIX
WHAT: Codex 경로 탐색 실패 수정
ISSUE: Codex가 `.gemini/antigravity/code_tracker/`와 `projects/resonance/`에서 검색 → 둘 다 stale/삭제됨
FIX: PATH_REGISTRY 섹션 추가 (이 파일 상단), 모든 참조를 절대경로로 전환
CANONICAL: C:\Users\sound\Documents\MoonWorkspace\projects\suno-album\resonance\

---
[2026-02-15 21:01 KST | ANTIGRAVITY]
TYPE: PROTOCOL_ANNOUNCEMENT
WHAT: RESONANCE Agent Protocol v1.0 제정
FILE: C:\Users\sound\Documents\MoonWorkspace\projects\suno-album\resonance\AGENT_PROTOCOL.md
LOCK_FILE: C:\Users\sound\Documents\MoonWorkspace\projects\suno-album\resonance\shared\.locks.yaml
CODEX_MUST_DO:
  1. 세션 시작 시 AGENT_PROTOCOL.md 읽기
  2. RESONANCE_SYNC.md에서 SEQ:001 메시지에 ACK 응답
  3. 이후 모든 메시지에 SEQ 번호 사용
  4. shared/* 파일 수정 시 .locks.yaml에 LOCK 등록
---

---
[2026-02-15T21:59 | ANTIGRAVITY]
TYPE: STATUS
WHAT: Learning Sprint #3  AI Video Generation (Google Flow + Whisk)
OUTPUT:
  - C:\Users\sound\Documents\MoonWorkspace\projects\suno-album\resonance\composer\prompts\ag_learning_sprint_3.md
  - C:\Users\sound\Documents\MoonWorkspace\projects\suno-album\resonance\composer\prompts\flow_video_prompts_T01.md
SUMMARY:
  - Google Flow (Veo 3.1): Frames-to-Video 동일프레임 루프 기법 학습
  - Google Whisk: 이미지 기반 프롬프팅 + 스타일 전이 기법 학습
  - T01 앨범 5장면 (비/내부/테라스/바/마감) 영상 프롬프트 작성
  - 4-Phase 워크플로우: Whisk 이미지  Flow 루프  FFmpeg 조합  업로드
---
