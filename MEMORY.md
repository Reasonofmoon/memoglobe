# 🧠 MEMORY.md — Web Design Knowledge Base

> **Agent**: Antigravity (AG)
> **Sprint**: Learning Sprint #1 — Web Design Fundamentals
> **Date**: 2026-02-15
> **Protocol**: Prometheus v3.0 / Protocol 4: Continuous Learning

---

## 1. Core Design Principles (2025)

### 1.1 User-Centric Design
- 모든 디자인 결정은 사용자 중심으로 — 직관적 네비게이션, 명확한 CTA, 효율적 정보 전달
- Usability testing + data-driven decisions으로 지속 개선
- **접근성(Accessibility)** 은 부가가 아닌 기본 요구사항 → WCAG 준수, voice navigation, high-contrast, scalable typography

### 1.2 Mobile-First
- 모바일 화면부터 설계 → 점진적으로 데스크톱 확장
- `min-width` 미디어 쿼리로 상향 레이어링
- 터치 타겟 최소 48×48px, 간소화된 네비게이션

### 1.3 Minimalism with Purpose
- 불필요한 요소 제거 → 기능과 명확성 극대화
- 모든 요소는 목적이 있어야 한다 (decorative ≠ purpose)
- 브랜드 일관성: 색상·타이포·이미지 전 플랫폼 통일

### 1.4 Performance First
- 이미지 최적화 (WebP, AVIF), Lazy Loading, Code Minification, CDN
- 로딩 속도는 UX와 SEO 모두에 직결

---

## 2. Color System & Dark Mode

### 2.1 Dark Mode Design Rules
| 규칙 | 설명 |
|------|------|
| **순수 검정(#000) 금지** | 눈의 피로 유발 → Deep gray (#0a0e1a, #121212) 사용 |
| **순수 흰색(#FFF) 금지** | Off-white (#E0E0E0, #F5F5F5) 사용 |
| **채도 낮추기** | 밝은 색은 채도 20-30% 감소 (진동 방지) |
| **대비율** | WCAG 4.5:1 이상 유지 (일반 텍스트) |
| **고도(Elevation)** | 그레이 명도로 z-depth 표현 (밝을수록 높음) |

### 2.2 MemoGlobe Token System
```typescript
const DESIGN_TOKENS = {
  // Surfaces
  background:       '#0a0e1a',  // 최하위 레이어
  surface:          '#111827',  // 카드, 패널
  surfaceElevated:  '#1a2332',  // 팝오버, 모달
  surfaceGlass:     '#111827',  // 글래스모피즘 기반

  // Borders
  border:           '#1f2937',  // 기본 구분선
  borderHover:      '#374151',  // 호버 시 강조

  // Accents
  accentBlue:       '#3b82f6',  // Primary (CTA, 활성 상태)
  accentBlueLt:     '#60a5fa',  // Secondary (호버, 하이라이트)
  accentGreen:      '#22c55e',  // 긍정 (Mastered, 성공)
  accentYellow:     '#eab308',  // 주의 (Review Due, 경고)
  accentRed:        '#ef4444',  // 부정 (Gap, 오류)
  accentPurple:     '#a855f7',  // 특수 (Personal, 카테고리)

  // Text
  textPrimary:      '#ffffff',  // 주요 텍스트
  textMuted:        '#9ca3af',  // 보조 텍스트
} as const;
```

### 2.3 Semantic Token Architecture (3-Tier)
```
Core Tokens     → 원시 값 (color.blue.500 = #3b82f6)
  ↓
Semantic Tokens → 의도 (color.accent.primary = core.blue.500)
  ↓
Component Tokens → 용도 (button.primary.bg = semantic.accent.primary)
```
- 테마 전환 시 Semantic → Core 매핑만 변경하면 전체 반영

---

## 3. Typography

### 3.1 Font Strategy
| 용도 | Font | Weight | 이유 |
|------|------|--------|------|
| UI 텍스트 | Inter | 400-700 | 가독성 최고, 다국어 지원 |
| 숫자/데이터 | JetBrains Mono | 500-600 | Monospace로 정렬 정확 |
| 한국어 제목 | Pretendard | 600-800 | 한글 최적화 sans-serif |

### 3.2 Type Scale (rem 기반)
```css
--text-xs:   0.75rem;   /* 12px — 보조, 라벨 */
--text-sm:   0.875rem;  /* 14px — 본문 보조 */
--text-base: 1rem;      /* 16px — 기본 본문 */
--text-lg:   1.125rem;  /* 18px — 소제목 */
--text-xl:   1.25rem;   /* 20px — 섹션 제목 */
--text-2xl:  1.5rem;    /* 24px — 페이지 부제 */
--text-3xl:  1.875rem;  /* 30px — 페이지 제목 */
--text-4xl:  2.25rem;   /* 36px — Hero */
```

### 3.3 2025 Typography Trends
- **Variable Fonts**: 하나의 폰트 파일로 다양한 weight/width/slant → 로딩 최적화
- **Futuristic Fonts**: 기하학적 형태, 넓은 자간 → 테크 브랜드
- **Organic/Handwritten**: 디지털 세계에서의 인간적 터치

---

## 4. Layout System

### 4.1 CSS Grid vs Flexbox
| | CSS Grid | Flexbox |
|---|---|---|
| **차원** | 2D (행 + 열) | 1D (행 또는 열) |
| **용도** | 페이지 레이아웃, 복잡한 그리드 | 네비게이션, 요소 정렬, 컴포넌트 내부 |
| **정렬** | 두 축 모두 제어 | 주축 + 교차축 |
| **Best for** | 전체 페이지 구조 | 컴포넌트 내 아이템 배치 |

**Best Practice**: Grid = 페이지 레이아웃, Flexbox = 컴포넌트 내부 정렬. 둘을 함께 사용.

### 4.2 Spacing System (8px Grid)
```
4px  = 미세 조정 (dense UI)
8px  = xs
16px = sm (기본 패딩)
24px = md (카드 간격)
32px = lg (섹션 간격)
48px = xl (페이지 마진)
64px = 2xl (히어로 섹션)
```

### 4.3 Breakpoints (Mobile-First)
```css
/* Base: 모바일 (0px~) */
@media (min-width: 640px)  { /* sm: 태블릿 세로 */ }
@media (min-width: 768px)  { /* md: 태블릿 가로 */ }
@media (min-width: 1024px) { /* lg: 노트북 */ }
@media (min-width: 1280px) { /* xl: 데스크톱 */ }
@media (min-width: 1536px) { /* 2xl: 와이드 모니터 */ }
```
- min-width로 상향 확장 → 모바일 CSS가 기본
- 콘텐츠 기반 브레이크포인트 우선 (디바이스 기준 X)

---

## 5. Component Architecture (Atomic Design)

### 5.1 Brad Frost의 Atomic Design 5단계
```
Atoms     → 최소 단위 (Button, Input, Label, Icon)
  ↓
Molecules → Atom 결합 (SearchBar = Input + Button)
  ↓
Organisms → Molecule 결합 (Header = Logo + Nav + SearchBar)
  ↓
Templates → Organism 배치 (PageLayout = Header + Sidebar + Content)
  ↓
Pages     → 실제 콘텐츠 주입 (HomePage = Template + Real Data)
```

### 5.2 MemoGlobe Component Map
```
Atoms:
  ├── PinMarker (색상별 원형 마커)
  ├── StatBadge (수치 표시 뱃지)
  ├── NavIcon (네비게이션 아이콘)
  ├── ProgressBar (데이터 진행률)
  └── StatusDot (상태 표시 점)

Molecules:
  ├── PinTooltip (PinMarker + 상세 정보 카드)
  ├── MetricCard (StatBadge + 라벨 + 변화율)
  ├── NavItem (NavIcon + 라벨)
  ├── DomainRow (이름 + ProgressBar + 카운트)
  └── ActivityItem (아이콘 + 제목 + 타임스탬프)

Organisms:
  ├── GlobeOverlay (Globe + PinMarkers + Legend + Tooltip)
  ├── TopBar (Logo + Branding + StatBadges)
  ├── BottomNav (NavItem × 4)
  ├── MetricsRow (MetricCard × 4)
  └── DomainBreakdown (DomainRow × N)

Templates:
  ├── GlobeViewLayout (TopBar + GlobeOverlay + BottomNav)
  └── DashboardLayout (TopBar + MetricsRow + TwoColumn + BottomNav)
```

---

## 6. Visual Effects & Animation

### 6.1 Glassmorphism
```css
.glass-panel {
  background: rgba(17, 24, 39, 0.7);     /* 반투명 배경 */
  backdrop-filter: blur(16px);             /* 블러 효과 */
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08); /* 미세 테두리 */
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
}
```
- 다크 모드 + 글래스모피즘은 최고의 궁합
- 핵심 UI 요소에만 선택적 적용 (과용 금지)

### 6.2 Micro-Interactions 원칙
1. **목적**: 피드백 제공, 사용자 안내, 직관성 향상
2. **절제**: 미묘하고 자연스럽게 — 과도한 애니메이션은 UX 해침
3. **성능**: GPU 가속 가능한 속성만 (transform, opacity)
4. **일관성**: 전체 사이트에서 동일한 이징/타이밍 패턴

### 6.3 Animation Libraries 선택 가이드
| 라이브러리 | 강점 | 적합 케이스 |
|-----------|------|------------|
| **CSS Transitions** | 경량, GPU 가속 | 호버, 페이드, 슬라이드 |
| **Framer Motion** | React 네이티브, 선언적 API | UI 마이크로인터랙션, 페이지 전환 |
| **GSAP** | 고성능, 프레임워크 무관 | 복잡한 타임라인, SVG, 스크롤 트리거 |

### 6.4 MemoGlobe 애니메이션 계획
```
Globe:
  - 회전: requestAnimationFrame (Canvas)
  - 핀 등장: scale(0→1) + opacity 300ms ease-out
  - 핀 호버: scale(1→1.2) 150ms

Tooltip:
  - 등장: translateY(8→0) + opacity 200ms ease-out
  - 나갈 때: opacity 150ms ease-in

Navigation:
  - 탭 전환: 하이라이트 배경 pill 슬라이드 300ms

Dashboard:
  - 메트릭 카드: 카운트업 애니메이션 (숫자 증가 효과)
  - 프로그레스 바: width 0→target 600ms ease-out
```

---

## 7. Modern UI/UX Trends (2025)

### 7.1 Dark Mode → 필수
- 전용 다크 팔레트 설계 (라이트 모드 반전이 아님)
- OLED 배터리 절약, 저조도 환경 가독성

### 7.2 AI + Personalization
- 사용자 행동 기반 콘텐츠/인터페이스 맞춤화
- MemoGlobe: 학습 패턴 → 핀 추천, 복습 스케줄 AI

### 7.3 3D & Immersive Experiences
- WebGL/Three.js/Canvas로 인터랙티브 3D 콘텐츠
- MemoGlobe: Canvas 지구본 = 이 트렌드의 핵심 구현

### 7.4 Voice & Gesture Interfaces
- 핸즈프리 네비게이션, 접근성 확대
- 장기 로드맵: 음성으로 핀 검색 "Show me Physics pins"

---

## 8. Responsive Design Cheat Sheet

### 8.1 필수 패턴
```css
/* 유연한 이미지 */
img { max-width: 100%; height: auto; }

/* 유연한 타이포 */
html { font-size: clamp(14px, 2vw, 18px); }

/* 컨테이너 쿼리 (2025 표준) */
@container (min-width: 400px) { /* 컨테이너 기반 반응형 */ }
```

### 8.2 MemoGlobe 반응형 전략
| 디바이스 | Globe | Dashboard | Nav |
|---------|-------|-----------|-----|
| **모바일** (<640px) | 전체화면 Globe, 오버레이 축소 | 세로 스택 메트릭 | 하단 탭바 |
| **태블릿** (640-1024px) | 80% 너비, 사이드 패널 | 2열 메트릭 | 하단 탭바 |
| **데스크톱** (>1024px) | 중앙 배치, 좌우 패널 | 4열 메트릭 + 2열 | 하단 floating bar |

---

## 9. Design System Best Practices

### 9.1 Design-to-Code Handoff 체크리스트
- [ ] 컬러 토큰 → CSS Variables / TypeScript const
- [ ] 타이포 스케일 → CSS Variables
- [ ] 스페이싱 → 8px 그리드 기반 상수
- [ ] 컴포넌트 → Storybook 문서화
- [ ] 아이콘 → Lucide 아이콘 세트 (일관성)
- [ ] 상태 → 각 컴포넌트별 hover/active/disabled/focus

### 9.2 코드 품질 원칙
- **DRY**: 토큰 재사용, 하드코딩 금지
- **일관성**: 전 페이지 동일한 spacing/font/color
- **접근성**: aria-label, role, keyboard navigation
- **성능**: Font subset, Image optimization, Lazy loading

---

## 10. 성공 사례 분석 (Case Studies)

### 10.1 🟣 Stripe — "개발자를 위한 예술"
**카테고리**: B2B SaaS / 결제 인프라
**수상**: Awwwards Site of the Day

| 성공 요인 | 분석 |
|-----------|------|
| **시각적 계층 구조** | 크기·색상·여백·정렬·그룹핑으로 시선 유도 — 정보 과부하 없이 복잡한 API를 설명 |
| **맞춤 타이포** | Camphor 폰트 + 다양한 weight/color → 깔끔하면서도 개성 있는 브랜드 아이덴티티 |
| **SVG 기반 일러스트** | 래스터 이미지 대신 벡터 → 어떤 해상도에서도 선명, 로딩 빠름 |
| **인터랙티브 피드백** | 마우스 이동 시 미묘한 요소 반응 → "살아있는" 느낌 |
| **디자인 원칙** | "Users first", "Create with craft and beauty" — 기능과 미학의 균형 |

**🎯 MemoGlobe 적용**: 핀 호버 시 미묘한 시각적 피드백 + SVG 아이콘 일관성

---

### 10.2 🍎 Apple — "스크롤이 곧 내러티브"
**카테고리**: 프리미엄 제품 마케팅
**기법**: Scroll-Driven 3D Animation

| 기법 | 구현 방식 |
|------|----------|
| **이미지 시퀀스 스크롤** | 수백 장의 프리렌더 이미지를 스크롤 위치에 따라 빠르게 전환 → 3D 영상 착시 |
| **GLTF 모델 변형** | 3D 모델을 스크롤에 따라 transform → 제품이 회전/분리되는 효과 |
| **Cinema 4D + After Effects** | 전문 3D 도구로 프레임 렌더 → Bodymovin/JS로 웹 변환 |
| **성능 관리** | 고사양 기기엔 풀 애니메이션, 저사양엔 정적 이미지 폴백 |

**🎯 MemoGlobe 적용**: Globe 회전을 스크롤 인터랙션과 연결하는 미래 가능성. 랜딩 페이지에서 "스크롤하면 지구가 회전하며 핀이 나타나는" 온보딩 경험

---

### 10.3 🟢 Duolingo — "중독의 과학"
**카테고리**: EdTech / 언어 학습
**MAU**: 1억+ 사용자

| 게이미피케이션 요소 | 효과 |
|-------------------|------|
| **XP + 레벨** | 완료감 → 내재적 동기 유발 |
| **스트릭(연속 학습일)** | 매일 접속 습관 형성 → 이탈률 감소 |
| **리더보드** | 경쟁심 + 커뮤니티 → 참여 지속 |
| **마이크로러닝** | 5-10분 짧은 레슨 → 부담 없는 시작 |
| **예측 불가 보상** | 무작위 보상 → 도파민 루프 |

**UX 디자인 특징**:
- 밝은 초록 마스코트 → 강한 브랜드 인식
- 미니멀 인터페이스 → 콘텐츠 집중
- 빠른 온보딩 (2분 내 첫 레슨 시작)

**🎯 MemoGlobe 적용 (최고 우선순위!)**:
- 학습 스트릭 시스템 → **이미** Top Bar에 구현 (7일 연속)
- XP → 핀 mastery strength 수치로 대체
- 마이크로러닝 → 퀴즈 모듈 한 세션 5문제 이내
- 리더보드 → 장기 로드맵 (소셜 기능 추가 시)

---

### 10.4 📓 Notion — "유연한 단순함"
**카테고리**: Productivity SaaS
**특징**: 다크 모드 + 블록 기반 편집

| 디자인 전략 | 분석 |
|------------|------|
| **블록 기반 UI** | 모든 콘텐츠가 이동 가능한 블록 → 자유로운 구성 |
| **토글 다크 모드** | 사용자 선택권 존중 — 라이트/다크 즉시 전환 |
| **일관된 디자인 시스템** | 전체 플랫폼 동일한 컴포넌트 → 학습 비용 최소화 |
| **대시보드 커스터마이징** | 위젯 + 커버 → 개인화된 작업 공간 |
| **Figma 변수 활용** | 디자인 토큰 + 변수로 확장 가능한 다크 모드 구축 |

**🎯 MemoGlobe 적용**: 대시보드 위젯 배치 자유도 (장기), 토글 기반 라이트/다크 전환

---

### 10.5 🎵 Spotify Wrapped — "데이터가 이야기가 되는 순간"
**카테고리**: Data Storytelling / 바이럴 마케팅
**실적**: 2025년 출시 24시간 내 2억+ 사용자 참여

| 성공 요인 | 분석 |
|-----------|------|
| **개인화된 내러티브** | 청취 데이터 → 감정적 스토리 변환 (추억, 정체성) |
| **9×16 레이아웃** | Instagram Stories 최적화 → 공유 용이 |
| **대담한 타이포** | 한 화면에 하나의 메시지 → 강렬한 인상 |
| **진화하는 디자인** | 매년 다른 비주얼 → 2025년은 레트로/그런지 |
| **FOMO 효과** | "나도 봐야지!" → 신규 가입 + 기존 사용자 참여 증가 |

**디자인 핵심**: 복잡한 데이터를 그래프가 아닌 **감정적 스토리**로 변환

**🎯 MemoGlobe 적용 — "Learning Wrapped"**:
- 월간/연간 "나의 학습 여정" 리포트 자동 생성
- "올해 가장 많이 복습한 핀", "새로 마스터한 도메인 Top 3"
- 공유 가능한 카드 이미지 → SNS 확산
- 감정적 스토리텔링: "당신은 127개의 지식 핀으로 지구를 채웠습니다 🌍"

---

### 10.6 🌐 GitHub Globe — "코드로 지구를 밝히다"
**카테고리**: Interactive Data Visualization
**기술**: Three.js + WebGL

| 기법 | 구현 |
|------|------|
| **3D 지구 렌더링** | Three.js로 텍스처 매핑 + 위경도 좌표 기반 데이터 포인트 |
| **실시간 데이터** | Git push 이벤트를 빛의 아크로 시각화 |
| **반응형** | 화면 크기에 따라 카메라 거리 + 해상도 자동 조절 |
| **별 필드** | 배경에 동적 별 파티클 → 우주 분위기 |
| **위경도 핀** | lat/lng → 3D 구 표면 좌표 변환 |

**🎯 MemoGlobe 직접 영감**:
- 현재 Canvas 2D → 미래 Three.js 3D 업그레이드 시 참조 아키텍처
- lat/lng 핀 매핑 로직 동일 패턴
- 빛의 아크 → "학습 연결선" (핀 간 관계 시각화)

---

### 10.7 ⚡ Linear — "속도가 곧 디자인"
**카테고리**: Developer Tool SaaS
**수상**: Awwwards Honorable Mention

| 디자인 특징 | 분석 |
|------------|------|
| **즉각적 반응** | 입력 즉시 결과 — 체감 속도가 UX의 핵심 |
| **어두운 기본 테마** | 개발자 친화적 다크 UI |
| **키보드 퍼스트** | Cmd+K 명령 팔레트 → 마우스 없이 전체 탐색 |
| **미니멀 데이터 차트** | 진동색 차트 + 다크 배경 = 데이터 돋보임 |
| **그리드 깨기** | 전통적 그리드에서 벗어난 포트폴리오형 쇼케이스 |

**🎯 MemoGlobe 적용**: Cmd+K 검색 팔레트 (핀 빠른 검색), 키보드 네비게이션

---

### 10.8 ▲ Vercel — "웹 표준을 만드는 웹사이트"
**카테고리**: 개발 플랫폼
**수상**: Awwwards Honorable Mention (Vercel Ship 2025)

| Web Interface Guidelines | 내용 |
|-------------------------|------|
| **키보드 접근성** | 모든 인터랙티브 요소 탭/엔터 가능 |
| **모션 최적화** | `prefers-reduced-motion` 미디어 쿼리 존중 |
| **반응형 레이아웃** | 광학 정렬(Optical Alignment) + Safe Area 고려 |
| **폼 검증** | 인라인 유효성 검사 + 명확한 에러 메시지 |
| **카피라이팅** | 능동태, 행동 지향적 언어, 일관된 용어 |

**🎯 MemoGlobe 적용**: Vercel에 배포 예정 → 이 가이드라인을 코드 표준으로 채택

---

### 📋 Case Study 종합: MemoGlobe 적용 우선순위

| 순위 | 영감 출처 | 적용 아이템 | 난이도 |
|------|-----------|------------|--------|
| 🥇 | Duolingo | 스트릭/XP/마이크로러닝 게이미피케이션 | ★★☆ |
| 🥈 | Spotify Wrapped | "나의 학습 Wrapped" 월간 리포트 | ★★★ |
| 🥉 | GitHub Globe | 3D 지구본 업그레이드 (Three.js) | ★★★★ |
| 4 | Stripe | 미묘한 인터랙티브 피드백 + SVG 아이콘 | ★★☆ |
| 5 | Linear | Cmd+K 핀 검색 팔레트 | ★★★ |
| 6 | Apple | 스크롤 드리븐 온보딩 애니메이션 | ★★★★ |
| 7 | Notion | 대시보드 위젯 커스터마이징 | ★★★★ |
| 8 | Vercel | 접근성 + 폼 검증 표준 | ★★☆ |

---

## 📊 자기 평가

| 항목 | Sprint #1 | Sprint #1.5 (사례) |
|------|-----------|-------------------|
| 학습 깊이 | ★★★★☆ | ★★★★★ |
| 적용 가능성 | ★★★★★ | ★★★★★ |
| MemoGlobe 연결 | ★★★★★ | ★★★★★ |
| 새 아이디어 발견 | ★★★☆☆ | ★★★★★ |

---

## 🔗 스트림 연결

- **MemoGlobe Pencil 디자인** → 이 MEMORY의 토큰/컴포넌트 구조가 즉시 적용됨
- **ConnectEdu Design** → Dark mode 토큰 패턴 재사용 가능
- **Codex 협업** → MEMORY.md를 공유 참조 문서로 사용
- **Learning Wrapped** → Spotify Wrapped 패턴의 MemoGlobe 버전 (신규 로드맵)

---

*Prometheus v3.0 — Learning Sprint #1 + #1.5 완료*
*Agent: Antigravity | Date: 2026-02-15*
