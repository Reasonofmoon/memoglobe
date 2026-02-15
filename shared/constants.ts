// ─── MemoGlobe Shared Constants ─────────────────────
// Both CODEX (Python) and ANTIGRAVITY (TypeScript) must keep in sync.
// Source of truth: Directive §5.4

// ─── Thresholds ─────────────────────────────────────
export const SRS_REDUNDANCY_THRESHOLD = 0.15;
export const KCS_COVERAGE_TARGET = 0.90;
export const CLI_OVERLOAD_THRESHOLD = 0.70;
export const ZPD_READINESS_THRESHOLD = 0.75;
export const BLOOM_IMBALANCE_THRESHOLD = 0.80;

// ─── ZPD Weights ────────────────────────────────────
export const ZPD_W1_BLOOM = 0.35;
export const ZPD_W2_KCS = 0.40;
export const ZPD_W3_CLI = 0.25;

// ─── Quest Configuration ────────────────────────────
export const DAILY_QUEST_COUNT = 3;
export const QUEST_TYPES = ["gap_review", "bloom_push", "new_explore"] as const;

// ─── SRS Review Intervals (Leitner-inspired, days) ──
export const SRS_INTERVALS = [1, 3, 7, 14, 30, 90] as const;

// ─── Anchor Strength Decay ──────────────────────────
export const ANCHOR_DECAY_RATE = 0.02;

// ─── Pin Colors (Globe Rendering) ───────────────────
export const PIN_COLORS = {
  mastered: "#22c55e",
  gap: "#ef4444",
  review: "#eab308",
  path: "#3b82f6",
  personal: "#a855f7",
} as const;

// ─── Bloom Taxonomy Levels ──────────────────────────
export const BLOOM_LEVELS = [
  "remember",
  "understand",
  "apply",
  "analyze",
  "evaluate",
  "create",
] as const;

// ─── Note Template Types ────────────────────────────
export const TEMPLATE_TYPES = [
  "cornell",
  "zettelkasten",
  "outline",
  "concept_map",
] as const;

// ─── Anchor Strategies ──────────────────────────────
export const ANCHOR_STRATEGIES = [
  "historical",
  "cultural",
  "personal",
] as const;

// ─── Feedback Card Types ────────────────────────────
export const FEEDBACK_TYPES = [
  "gap_alert",
  "redundancy_warning",
  "bloom_imbalance",
  "cognitive_overload",
  "growth_ready",
] as const;

// ─── Scaffolding Levels ─────────────────────────────
export const SCAFFOLDING_LEVELS = ["hint", "decompose", "simplify"] as const;

// ─── API Configuration ─────────────────────────────
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/v1";

// ─── Type Exports ───────────────────────────────────
export type BloomLevel = (typeof BLOOM_LEVELS)[number];
export type TemplateType = (typeof TEMPLATE_TYPES)[number];
export type AnchorStrategy = (typeof ANCHOR_STRATEGIES)[number];
export type QuestType = (typeof QUEST_TYPES)[number];
export type FeedbackType = (typeof FEEDBACK_TYPES)[number];
export type ScaffoldingLevel = (typeof SCAFFOLDING_LEVELS)[number];
export type PinStatus = keyof typeof PIN_COLORS;
