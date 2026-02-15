# MemoGlobe — Design System (AG)

> Owner: ANTIGRAVITY | Version: 1.0

## Color Palette

### Core Theme — "Deep Space Learning"

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-primary` | `#0a0e1a` | Main background (deep navy) |
| `--bg-secondary` | `#111827` | Card/panel backgrounds |
| `--bg-tertiary` | `#1f2937` | Interactive surfaces |
| `--surface-glass` | `rgba(255,255,255,0.05)` | Glassmorphism panels |
| `--text-primary` | `#f9fafb` | Headings, body text |
| `--text-secondary` | `#9ca3af` | Muted/label text |
| `--text-accent` | `#60a5fa` | Links, highlights |
| `--border-subtle` | `rgba(255,255,255,0.08)` | Card borders |

### Semantic Pin Colors (from §5.4)

| Token | Hex | Meaning |
|-------|-----|---------|
| `--pin-mastered` | `#22c55e` | 🟢 Concept mastered |
| `--pin-gap` | `#ef4444` | 🔴 Knowledge gap |
| `--pin-review` | `#eab308` | 🟡 Due for review |
| `--pin-path` | `#3b82f6` | 🔵 Learning path stop |
| `--pin-personal` | `#a855f7` | 🟣 Personal anchor |

### Accent Gradient

```css
--gradient-primary: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #a855f7 100%);
--gradient-warm: linear-gradient(135deg, #f97316 0%, #ef4444 100%);
--gradient-cool: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);
```

## Typography

| Role | Font | Weight | Size |
|------|------|--------|------|
| Display | Inter | 800 | 48px |
| H1 | Inter | 700 | 32px |
| H2 | Inter | 600 | 24px |
| H3 | Inter | 600 | 20px |
| Body | Inter | 400 | 16px |
| Label | Inter | 500 | 14px |
| Caption | Inter | 400 | 12px |
| Code | JetBrains Mono | 400 | 14px |

## Layout Strategy

- **Globe-Centric**: Globe is always visible as the primary canvas
- **Side Panels**: Slide-in panels for notes, analysis, quest detail
- **Bottom Drawer**: Mobile quest/nav interface
- **Floating Cards**: Metacog feedback overlays on globe

## Component Inventory

1. `GlobeViewer` — CesiumJS 3D globe container
2. `PinMarker` — Color-coded concept pin on globe
3. `RoutePolyline` — Animated learning path between pins
4. `HeatmapOverlay` — Coverage density layer
5. `LocationDetailPanel` — Slide-in with Street View + concept info
6. `NoteEditor` — TipTap wrapper with 4 template modes
7. `BloomChart` — 6-level bar chart (Recharts)
8. `CoverageMeter` — Circular progress for KCS
9. `CLITrendLine` — Weekly cognitive load chart
10. `EvolutionBadge` — Animated growth index display
11. `QuestCard` — Daily quest item (gap_review, bloom_push, new_explore)
12. `StreakCounter` — Flame icon + consecutive days
13. `HintOverlay` — Tooltip with guiding question
14. `DecomposeAnimation` — Pin split animation
15. `SimplifyImmersion` — Street View + simplified card

## Animation Guidelines (Framer Motion)

- **Enter**: `fadeIn` + `slideUp` (200ms ease-out)
- **Exit**: `fadeOut` (150ms ease-in)
- **Globe rotation**: `spring(stiffness: 100, damping: 20)`
- **Pin pulse**: `scale 1→1.2→1` loop for review-due pins
- **Route draw**: `pathLength 0→1` (1000ms ease-in-out)
- **XP earned**: `pop` scale + particle burst

## Responsiveness

| Breakpoint | Layout |
|-----------|--------|
| `≥1280px` | Globe + side panel (70/30 split) |
| `1024-1279px` | Globe + bottom sheet |
| `768-1023px` | Tabbed view (Globe / Notes / Dashboard) |
| `<768px` | Full-screen globe + bottom nav + drawer |
