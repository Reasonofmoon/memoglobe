# Learning Sprint #2 — 2026-02-15

## 🎯 주제: Suno AI로 전문적인 곡 생성하기

> Suno AI v4.5/v5의 프롬프트 엔지니어링, 메타태그 시스템, DAW 통합 워크플로우를 체계적으로 학습

---

## 🔍 탐색 소스

| Tier | 소스 | 핵심 내용 |
|------|------|----------|
| Tier 3 | [Suno 공식 문서](https://suno.com) | Song Editor, Stem Extraction, Custom Mode |
| Tier 4 | Medium / Reddit / Brunch.co.kr | 프롬프트 공식(GMIV), 메타태그 치트시트 |
| Tier 4 | jackrighteous.com | v5 프롬프팅 규율, Seed & Reseed 기법 |
| Tier 4 | howtopromptsuno.com | 보컬 톤/텍스처 제어, 네거티브 프롬프트 |
| Tier 4 | sunoarchitect.com / sunometatagcreator.com | 구조 태그 완전 가이드 |
| Tier 4 | 한국 블로그 (Tistory, Brunch, NomadLab) | 한국어 프롬프트 팁, GMIV 공식, 쉼표 규칙 |

---

## 💡 핵심 인사이트

### 1. GMIV 공식 — 프롬프트의 4대 기둥

Suno AI에서 전문적인 곡을 만들기 위한 핵심 프레임워크:

```
G (Genre & Style)  — 세부 장르 + 시대/분위기 수식어
M (Mood & Emotion)  — 감정의 궤적(단일 감정 X, 전개 O)
I (Instrumentation) — 구체적 악기 + 프로덕션 스타일
V (Vocals)          — 성별, 톤, 딜리버리, 이펙트
```

**나쁜 프롬프트 예시:**
```
슬픈 록 노래 만들어줘
```

**좋은 프롬프트 예시:**
```
melancholic indie folk, fingerpicked acoustic guitar, gentle female vocals,
slow tempo 72 BPM, tape-saturated lo-fi warmth, hopeful chorus about
overcoming anxiety, atmospheric reverb
```

### 2. 메타태그 시스템 — 곡 구조 제어의 핵심

#### 구조 태그 (Structure Tags)

```
[Intro]            — 곡의 시작 (수식 가능: [Soft Intro], [Instrumental Intro])
[Verse] / [Verse 1] — 벌스 (넘버링 또는 수식: [Sad Verse])
[Pre-Chorus]       — 코러스 전 빌드업
[Chorus]           — 메인 훅 ([Powerful Chorus], [Chorus x2])
[Post-Chorus]      — 코러스 후 여운
[Bridge]           — 대비 섹션 (하모니/리듬 변화)
[Outro]            — 곡의 마무리 ([Fade Out], [Powerful Outro])
[Hook]             — 캐치한 파트 강조
[Break]            — 쉼 / 리듬 변화
[Instrumental Break] — 보컬 없는 악기 섹션
[Build] / [Build-Up] — 점진적 에너지 상승
[Drop]             — 임팩트 있는 비트 포인트
[Breakdown]        — 악기 줄이고 텐션 집중
[Solo Section]     — 솔로 악기 피처링
```

#### 보컬 태그 (Vocal Tags)

```
── 성별/유형 ──
[Male Vocals]     [Female Vocals]     [Duet]
[Choir]           [Harmonies]         [Spoken Word]
[Rapped Vocals]   [Melodic Vocals]    [Announcer]

── 딜리버리 스타일 ──
[Whispered]       [Powerful Vocals]   [Smooth Vocals]
[Falsetto]        [Vibrato]           [Melismatic]
[Staccato Vocals] [Legato Vocals]     [Raspy Voice]
[Clear Voice]     [Soulful Voice]     [Vulnerable Vocals]

── 톤/텍스처 ──
Airy, Breathy, Crisp, Deep, Gritty, Smooth

── 이펙트 ──
[Auto-tune]   [Echo]   [Reverb]   [Vocal stacking]
```

#### 프로덕션/분위기 태그

```
── 프로덕션 ──
[Tape-saturated]    [Glossy modern mix]    [Lo-fi warmth]
[Stadium reverb]    [Live-room acoustics]  [Hifi]

── 분위기 ──
[Melancholic]   [Uplifting]   [Dark cinematic]
[Dreamy]        [Aggressive]  [Eerie Whispers]

── 사운드 이펙트 ──
(Heavy rain sounds)  (distant sirens)  (Birds chirping)
(Applause)           (Silence)
```

### 3. 프롬프트 작성 규칙 — 한국어 소스에서 발견한 핵심 원칙

1. **Suno는 프롬프트를 "조건 목록"으로 해석한다** — 문장이 아니라 메타데이터
2. **쉼표(,)로 구분된 키워드가 최소 단위** — `and`, `with` 등 연결어는 무의미
3. **4~7개 핵심 요소** 유지 — 너무 많으면 충돌, 너무 적으면 기본값
4. **처음 20~30단어가 가장 중요** — 핵심 태그를 앞에 배치
5. **아티스트 이름 사용 금지** — 저작권 제한, 대신 음악적 특성으로 묘사
6. **자연어 > 구조화 명령어** — v4.5+에서 `[STYLE=Rock]`보다 자연어가 효과적

### 4. Custom Mode 활용법

```
┌─────────────────────────────────────────┐
│         Custom Mode 워크플로우           │
├─────────────────────────────────────────┤
│                                         │
│  Style of Music (장르/분위기/BPM)        │
│  ┌─────────────────────────────────┐    │
│  │ melancholic indie folk, finger- │    │
│  │ picked acoustic guitar, 72 BPM,│    │
│  │ tape-saturated, gentle female   │    │
│  │ vocals, lo-fi warmth           │    │
│  └─────────────────────────────────┘    │
│                                         │
│  Lyrics + 메타태그 (구조 제어)          │
│  ┌─────────────────────────────────┐    │
│  │ [Intro: Piano, soft rain]      │    │
│  │                                 │    │
│  │ [Verse 1]                      │    │
│  │ Walking through the quiet...    │    │
│  │                                 │    │
│  │ [Pre-Chorus]                   │    │
│  │ But maybe there's a light...    │    │
│  │                                 │    │
│  │ [Chorus]                       │    │
│  │ We'll find our way ho-o-ome... │    │
│  │                                 │    │
│  │ [Bridge]                       │    │
│  │ (Whispered) Let it go...       │    │
│  │                                 │    │
│  │ [Outro: Fade Out]              │    │
│  └─────────────────────────────────┘    │
│                                         │
│  ⚙️ Advanced: Weirdness 20-40%         │
│  ⚙️ Style Influence 80-90%             │
└─────────────────────────────────────────┘
```

### 5. 전문가급 프로덕션 워크플로우

```
Phase 1: 생성 (Suno AI)
  ├── Custom Mode로 Style + Lyrics 입력
  ├── 4마디 단위로 짧게 생성 → 품질 확인
  ├── Continue 기능으로 확장 (스타일 일관성 유지)
  └── 여러 변형 생성 (BPM, 보컬 스타일 미세 조정)

Phase 2: 편집 (Suno Song Editor / Studio)
  ├── 파형에서 섹션 리오더, 리라이트, 리메이크
  ├── Replace Section으로 특정 구간 재생성
  ├── 발음 오류 수정 (해당 구간만 가사 수정 후 재생성)
  └── Extend로 곡 길이 조절 (최대 8분)

Phase 3: 스템 추출 & DAW 통합
  ├── Get Stems → 2트랙(Vocals+Inst) 또는 12트랙 분리
  ├── WAV 포맷으로 다운로드 (최고 품질)
  ├── Tempo-Locked WAV로 BPM 동기화
  ├── DAW(Ableton/Logic/FL Studio)에 드래그&드롭
  └── 개별 스템 EQ/컴프/이펙트 처리

Phase 4: 마스터링
  ├── 저/고주파 부스트, 스테레오 분리
  ├── 공간감(Spatial Width) 향상
  ├── 리미팅/노멀라이징
  └── 최종 포맷 출력 (WAV 24bit / MP3 320kbps)
```

### 6. 고급 기법 모음

| 기법 | 설명 | 예시 |
|------|------|------|
| **Seed & Reseed** | 좋은 보컬 스니펫을 씨앗으로 나머지 빌드 | 보컬 프롬프트로 시작 → 추출 → 전체곡 확장 |
| **모음 늘리기** | 캐치한 멜로디를 위해 모음 연장 | `lo-o-o-ve`, `ho-o-ome` |
| **대문자 강조** | 특정 단어를 더 크게/강하게 | `I will NEVER stop` |
| **괄호 애드리브** | 배경 보컬/텍스처 추가 | `(adlibs)`, `(oh yeah)` |
| **장르 블렌딩** | 2~3개 장르 조합으로 독특한 사운드 | `Jazz + death metal`, `Country trap` |
| **시대 키워드** | 특정 시대의 사운드 재현 | `1990s R&B`, `80s vibe`, `Y2K pop` |
| **품질 프리셋** | 가사 상단에 품질 메타 삽입 | `[Radio ready mix, hifi, wide stereo]` |
| **네거티브 배제** | 원치 않는 요소 명시적 제거 | Style에 `no choir, no heavy distortion` |
| **인스트 먼저** | 사운드 아이덴티티 확인 후 보컬 추가 | Instrumental → Add Vocals 기능 활용 |
| **페르소나 저장** | 일관된 보컬 톤 유지를 위한 설정 저장 | 특정 보컬 스타일을 템플릿화 |

### 7. 흔한 실수 & 회피법

| ❌ 실수 | ✅ 해결법 |
|---------|----------|
| 모호한 프롬프트 ("좋은 노래 만들어줘") | GMIV 공식으로 구체적 명시 |
| 한 번에 전체 곡 생성 | 4마디/훅 단위로 분할 생성 |
| 장르 5개+ 나열 | 2~3개로 제한, 핵심 특성 집중 |
| 메타태그 미사용 | [Verse], [Chorus] 등 구조 태그 필수 |
| 모순된 스타일 키워드 | "upbeat" + "melancholic" 동시 사용 금지 |
| 가사에 단어 너무 많음 | 악기가 숨 쉴 공간 확보 |
| 첫 생성에 완벽 기대 | 반복 생성 + 리파인이 핵심 |
| 쉼표 남용 (무시될 수 있음) | 마침표(.)로 명확히 구분 |
| "자판기 마인드셋" | 음악적 분석 + 구조화된 워크플로우 필요 |

---

## 🔗 스트림 연결

### 기존 프로젝트 연결점

| 프로젝트 | 연결 가능성 | 아이디어 |
|----------|------------|----------|
| **MemoGlobe** | ★★★★★ | 학습 완료 시 축하 BGM 자동 생성, "Learning Wrapped" 연간 요약에 맞춤 OST |
| **ConnectEdu** | ★★★★☆ | 교육 콘텐츠별 맞춤 배경음악, 모듈 완료 시 보상 사운드 |
| **Reason Moon Album** | ★★★★★ | `/suno` 워크플로우에 이 Learning Sprint의 고급 기법 즉시 적용 |
| **Dark Moon Subtitler** | ★★★☆☆ | 생성된 음악에 대한 자막/가사 동기화 |

### Firebase Media Pipeline 연결

기존 KI `Firebase Generative Media Pipeline Architecture`의 sunoapi.org 통합 패턴과 직접 연결:
- **Phase 1**: Suno의 Custom Mode 프롬프트를 Firebase Function에서 자동 조합
- **Phase 2**: GMIV 공식 기반 프롬프트 생성기를 API 엔드포인트로 구현
- **Phase 3**: Stem 추출 → Cloud Storage 저장 → Remotion으로 뮤직비디오 자동 생성

---

## 💡 새 아이디어

### 1. "Suno Prompt Architect" 도구
GMIV 공식 + 메타태그를 UI로 조합하는 웹 도구 — ConnectEdu 스타일의 폼 기반 프롬프트 빌더

### 2. "Learning OST" 시스템 (MemoGlobe)
- 사용자의 학습 패턴(시간대, 과목, 연속 일수)을 분석
- Suno API로 개인화된 학습 배경음악 자동 생성
- "오늘의 학습 OST" → Study Lo-fi / Focus Mode 장르 자동 선택

### 3. 프로덕션 품질 체크리스트 자동화
- 생성된 곡의 구조(Intro→Verse→Chorus→Bridge→Outro) 자동 검증
- 메타태그 삽입 위치 자동 제안
- DAW 내보내기 전 품질 스코어링

---

## 📊 자기 평가

| 항목 | 점수 |
|------|------|
| 학습 깊이 | ★★★★★ (5/5) — GMIV 공식, 메타태그 전체 체계, DAW 워크플로우까지 포괄 |
| 적용 가능성 | ★★★★★ (5/5) — Reason Moon Album 워크플로우에 즉시 적용 가능 |
| 새 아이디어 발견 | ★★★★☆ (4/5) — Learning OST, Prompt Architect 도구 발상 |
| 프로젝트 연결 | ★★★★★ (5/5) — Firebase Pipeline, MemoGlobe, ConnectEdu 모두 연결됨 |

---

*Sprint by: Antigravity (AG) | Mode B: Learning Sprint | Prometheus v3.0*
