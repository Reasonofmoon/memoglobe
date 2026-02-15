"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════
   Constants & Types
   ═══════════════════════════════════════════ */

const NAV_ITEMS = [
  { id: "globe", label: "🌍 Globe", emoji: "🌍" },
  { id: "notes", label: "📝 Notes", emoji: "📝" },
  { id: "dashboard", label: "📊 Dashboard", emoji: "📊" },
  { id: "quests", label: "⚔️ Quests", emoji: "⚔️" },
];

const SAMPLE_PINS = [
  { id: 1, name: "Copenhagen", concept: "Quantum Mechanics", status: "mastered" as const, x: 52, y: 28, domain: "Physics", strength: 92 },
  { id: 2, name: "Cambridge", concept: "DNA Structure", status: "review" as const, x: 48, y: 29, domain: "Biology", strength: 65 },
  { id: 3, name: "Athens", concept: "Democracy", status: "mastered" as const, x: 53, y: 38, domain: "History", strength: 88 },
  { id: 4, name: "MIT", concept: "Constructivism", status: "gap" as const, x: 26, y: 32, domain: "Education", strength: 23 },
  { id: 5, name: "CERN", concept: "Higgs Boson", status: "path" as const, x: 50, y: 34, domain: "Physics", strength: 45 },
  { id: 6, name: "Seoul", concept: "한글 (Hangul)", status: "personal" as const, x: 79, y: 36, domain: "한국어", strength: 78 },
];

const STATUS_COLORS: Record<string, string> = {
  mastered: "bg-green-500",
  gap: "bg-red-500",
  review: "bg-yellow-500",
  path: "bg-blue-500",
  personal: "bg-purple-500",
};

const STATUS_GLOW: Record<string, string> = {
  mastered: "shadow-green-500/50",
  gap: "shadow-red-500/50",
  review: "shadow-yellow-500/50",
  path: "shadow-blue-500/50",
  personal: "shadow-purple-500/50",
};

const STATUS_HEX: Record<string, string> = {
  mastered: "#22c55e",
  gap: "#ef4444",
  review: "#eab308",
  path: "#3b82f6",
  personal: "#a855f7",
};

const METRICS = [
  { label: "Total Pins", value: 127, emoji: "📌", accent: "accent-blue", suffix: "" },
  { label: "Mastery Rate", value: 68, emoji: "🎯", accent: "accent-green", suffix: "%" },
  { label: "Review Queue", value: 23, emoji: "📋", accent: "accent-yellow", suffix: "" },
  { label: "Study Streak", value: 7, emoji: "🔥", accent: "accent-red", suffix: "d" },
];

const DOMAINS = [
  { name: "Physics", progress: 78, color: "#3b82f6" },
  { name: "Biology", progress: 65, color: "#22c55e" },
  { name: "History", progress: 82, color: "#a855f7" },
  { name: "한국어", progress: 45, color: "#eab308" },
];

const QUESTS = [
  { id: "q1", title: "3개 핀 복습하기", desc: "Review 상태 핀을 복습하세요", xp: 30, progress: 1, total: 3, emoji: "🔄" },
  { id: "q2", title: "새 핀 1개 추가", desc: "새로운 학습 위치를 지구에 고정하세요", xp: 20, progress: 0, total: 1, emoji: "📍" },
  { id: "q3", title: "요약 노트 작성", desc: "오늘 배운 내용을 요약하세요", xp: 25, progress: 0, total: 1, emoji: "✍️" },
];

const ACTIVITIES = [
  { action: "Mastered", concept: "Quantum Mechanics", time: "2시간 전", emoji: "✅", bg: "rgba(34,197,94,0.15)" },
  { action: "New Pin", concept: "한글 (Hangul)", time: "5시간 전", emoji: "📍", bg: "rgba(59,130,246,0.15)" },
  { action: "Review", concept: "DNA Structure", time: "어제", emoji: "🔄", bg: "rgba(234,179,8,0.15)" },
  { action: "Gap Found", concept: "Constructivism", time: "2일 전", emoji: "🔍", bg: "rgba(239,68,68,0.15)" },
];

type MobileSheetTab = "input" | "feedback";

/* ═══════════════════════════════════════════
   Animated Counter Hook (Stripe Inspiration)
   ═══════════════════════════════════════════ */
function useCountUp(target: number, duration = 1200) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  const start = useCallback(() => {
    if (hasStarted) return;
    setHasStarted(true);
    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, hasStarted]);

  return { count, start };
}

/* ═══════════════════════════════════════════
   Star Field (GitHub Globe Inspiration)
   ═══════════════════════════════════════════ */

// Deterministic pseudo-random to avoid React purity lint
function seededRandom(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

const STAR_DATA = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  x: seededRandom(i * 3 + 1) * 100,
  y: seededRandom(i * 3 + 2) * 100,
  size: ["star-sm", "star-sm", "star-md", "star-lg"][Math.floor(seededRandom(i * 3 + 3) * 4)],
  delay: seededRandom(i * 7) * 5,
  duration: 2 + seededRandom(i * 11) * 4,
}));

function StarField() {
  return (
    <>
      {STAR_DATA.map((s) => (
        <div
          key={s.id}
          className={`star ${s.size}`}
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
    </>
  );
}

/* ═══════════════════════════════════════════
   Metric Card (Stripe + Spotify Wrapped)
   ═══════════════════════════════════════════ */
function MetricCard({ label, value, emoji, accent, suffix }: { label: string; value: number; emoji: string; accent: string; suffix: string }) {
  const { count, start } = useCountUp(value);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) start(); },
      { threshold: 0.5 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [start]);

  return (
    <motion.div
      ref={ref}
      className={`metric-card ${accent}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-2xl">{emoji}</span>
        <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">{label}</span>
      </div>
      <p className="text-3xl font-bold tracking-tight">
        {count}
        <span className="text-lg text-gray-400 ml-1">{suffix}</span>
      </p>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   Main Page Component
   ═══════════════════════════════════════════ */
export default function HomePage() {
  const [activeTab, setActiveTab] = useState("globe");
  const [hoveredPin, setHoveredPin] = useState<number | null>(null);
  const [selectedPin, setSelectedPin] = useState<typeof SAMPLE_PINS[0] | null>(null);
  const [mobileSheetTab, setMobileSheetTab] = useState<MobileSheetTab>("input");
  const [noteSubject, setNoteSubject] = useState("Physics");
  const [noteCue, setNoteCue] = useState("");
  const [noteMain, setNoteMain] = useState("");
  const [noteSummary, setNoteSummary] = useState("");
  const [draftSavedAt, setDraftSavedAt] = useState<string | null>(null);
  const [showCmdPalette, setShowCmdPalette] = useState(false);
  const [cmdQuery, setCmdQuery] = useState("");

  // ─── Note Feedback Calculator ───
  const noteFeedback = useMemo(() => {
    const cueCount = noteCue.split("\n").map((l) => l.trim()).filter(Boolean).length;
    const mainLength = noteMain.trim().length;
    const summaryLength = noteSummary.trim().length;
    const qualityScore = Math.max(0, Math.min(100,
      cueCount * 12 + Math.min(55, Math.floor(mainLength / 8)) + (summaryLength > 30 ? 21 : 9)
    ));
    return {
      qualityScore,
      items: [
        cueCount >= 2 ? "Cue quality looks good. Questions are diversified." : "Add at least 2 cue questions to strengthen recall.",
        mainLength >= 140 ? "Main notes are substantial enough for meaningful analysis." : "Main notes are too short. Add examples and key terms.",
        summaryLength >= 30 ? "Summary is concise and useful for review." : "Write a one-sentence summary for better retention.",
      ],
    };
  }, [noteCue, noteMain, noteSummary]);

  // ─── Command Palette filtered results ───
  const cmdResults = useMemo(() => {
    if (!cmdQuery.trim()) return SAMPLE_PINS;
    const q = cmdQuery.toLowerCase();
    return SAMPLE_PINS.filter(
      (p) => p.name.toLowerCase().includes(q) || p.concept.toLowerCase().includes(q) || p.domain.toLowerCase().includes(q)
    );
  }, [cmdQuery]);

  // ─── Keyboard: Cmd+K (Linear Inspiration) ───
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setShowCmdPalette((v) => !v);
        setCmdQuery("");
      }
      if (e.key === "Escape") {
        setShowCmdPalette(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const saveMobileDraft = () => {
    setDraftSavedAt(new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" }));
  };

  const selectCmdPin = (pin: typeof SAMPLE_PINS[0]) => {
    setSelectedPin(pin);
    setActiveTab("globe");
    setShowCmdPalette(false);
    setCmdQuery("");
  };

  /* ═══════════════════════════════════════════
     Render
     ═══════════════════════════════════════════ */
  return (
    <main className="globe-container">
      {/* ─── Ambient Background + Star Field ─── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[800px] h-[800px] -top-40 -right-40 rounded-full bg-blue-900/10 blur-3xl" />
        <div className="absolute w-[600px] h-[600px] -bottom-20 -left-20 rounded-full bg-purple-900/10 blur-3xl" />
        <div className="absolute w-[400px] h-[400px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-900/5 blur-3xl" />
        <StarField />
      </div>

      {/* ─── Top Bar ─── */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
               style={{ background: 'var(--gradient-primary)' }}>
            🌍
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">MemoGlobe</h1>
            <p className="text-xs text-gray-500">지구 위에 필기하라</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Cmd+K hint */}
          <button
            onClick={() => { setShowCmdPalette(true); setCmdQuery(""); }}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs text-gray-500 border border-white/10 hover:border-white/20 transition-colors"
          >
            <span>🔍 검색</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px]">⌘K</kbd>
          </button>
          <div className="stat-badge">
            <span className="text-yellow-500">🔥</span>
            <span>7일 연속</span>
          </div>
          <div className="stat-badge">
            <span className="text-blue-400">📈</span>
            <span>진화지수 0.68</span>
          </div>
        </div>
      </motion.header>

      {/* ═══════════════════════════════════════════
          Tab: Globe View
          ═══════════════════════════════════════════ */}
      <AnimatePresence mode="wait">
        {activeTab === "globe" && (
          <motion.div
            key="globe"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            {/* Globe Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative w-[600px] h-[600px] rounded-full"
                style={{
                  background: 'radial-gradient(ellipse at 40% 40%, #1e3a5f 0%, #0a1628 50%, #050b16 100%)',
                  boxShadow: '0 0 80px rgba(59, 130, 246, 0.15), inset 0 0 60px rgba(59, 130, 246, 0.05)',
                }}
              >
                {/* Grid overlay */}
                <div className="absolute inset-0 rounded-full overflow-hidden opacity-10"
                     style={{
                       backgroundImage: `
                         linear-gradient(0deg, rgba(255,255,255,0.1) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                       `,
                       backgroundSize: '40px 40px',
                     }}
                />
                {/* Glowing edge */}
                <div className="absolute inset-0 rounded-full"
                     style={{
                       background: 'radial-gradient(ellipse at 30% 30%, rgba(96, 165, 250, 0.08) 0%, transparent 70%)',
                     }}
                />

                {/* Pins */}
                {SAMPLE_PINS.map((pin) => (
                  <motion.div
                    key={pin.id}
                    className={`absolute cursor-pointer ${pin.status === 'review' ? 'pin-needs-review' : ''}`}
                    style={{ left: `${pin.x}%`, top: `${pin.y}%`, transform: 'translate(-50%, -50%)' }}
                    onHoverStart={() => setHoveredPin(pin.id)}
                    onHoverEnd={() => setHoveredPin(null)}
                    onClick={() => setSelectedPin(selectedPin?.id === pin.id ? null : pin)}
                    whileHover={{ scale: 1.5 }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 + pin.id * 0.15, type: "spring", stiffness: 200 }}
                  >
                    <div className={`w-3 h-3 rounded-full ${STATUS_COLORS[pin.status]} shadow-lg ${STATUS_GLOW[pin.status]}`} />

                    {/* Tooltip */}
                    <AnimatePresence>
                      {hoveredPin === pin.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 4, scale: 0.95 }}
                          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 whitespace-nowrap glass-card px-3 py-2 text-xs"
                        >
                          <div className="font-semibold text-white">{pin.name}</div>
                          <div className="text-gray-400">{pin.concept}</div>
                          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rotate-45"
                               style={{ background: 'var(--surface-glass)', borderRight: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}

                {/* Center label */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5, duration: 1 }}
                >
                  <div className="text-center">
                    <p className="text-xs text-gray-500 mb-1 tracking-widest uppercase">Canvas Globe</p>
                    <p className="text-sm text-gray-400">6 Concept Pins</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Selected Pin Detail */}
            <AnimatePresence>
              {selectedPin && (
                <motion.div
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 100, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="fixed right-6 top-24 w-80 glass-card p-6 z-50"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">{selectedPin.name}</h3>
                    <button onClick={() => setSelectedPin(null)}
                            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors text-gray-400">
                      ✕
                    </button>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-2.5 h-2.5 rounded-full ${STATUS_COLORS[selectedPin.status]}`} />
                      <span className="text-sm text-gray-300 capitalize">{selectedPin.status}</span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Anchored Concept</p>
                      <p className="text-sm font-medium">{selectedPin.concept}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Domain</p>
                      <p className="text-sm font-medium">{selectedPin.domain}</p>
                    </div>
                    <div className="pt-3 border-t border-white/5">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs text-gray-500">Memory Strength</p>
                        <p className="text-xs font-mono text-gray-400">{selectedPin.strength}%</p>
                      </div>
                      <div className="progress-track">
                        <motion.div
                          className="progress-fill"
                          style={{ background: STATUS_HEX[selectedPin.status] || '#3b82f6' }}
                          initial={{ width: 0 }}
                          animate={{ width: `${selectedPin.strength}%` }}
                          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                    <button className="w-full mt-3 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:brightness-110"
                            style={{ background: 'var(--gradient-primary)' }}>
                      🔍 Review This Concept
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Legend */}
            <motion.div
              className="fixed left-6 bottom-24 glass-card p-4 z-40"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 }}
            >
              <p className="text-xs text-gray-500 mb-3 font-medium tracking-wider uppercase">Pin Legend</p>
              <div className="space-y-2">
                {Object.entries(STATUS_COLORS).map(([status, color]) => (
                  <div key={status} className="flex items-center gap-2.5">
                    <div className={`w-2.5 h-2.5 rounded-full ${color}`} />
                    <span className="text-xs text-gray-400 capitalize">{status}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* ═══════════════════════════════════════════
            Tab: Notes (Mobile Sheet)
            ═══════════════════════════════════════════ */}
        {activeTab === "notes" && (
          <motion.div
            key="notes"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Desktop Notes View */}
            <div className="tab-content hidden md:block">
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                <h2 className="text-2xl font-bold mb-6">📝 Note Input Studio</h2>
                <div className="grid grid-cols-2 gap-6">
                  {/* Input side */}
                  <div className="glass-card p-6 space-y-4">
                    <h3 className="text-sm font-semibold text-gray-300 mb-2">Write Your Notes</h3>
                    <div>
                      <p className="mb-1 text-xs text-gray-400">Subject</p>
                      <input value={noteSubject} onChange={(e) => setNoteSubject(e.target.value)}
                             className="mobile-field w-full rounded-lg px-3 py-2 text-sm outline-none" placeholder="e.g. Physics" />
                    </div>
                    <div>
                      <p className="mb-1 text-xs text-gray-400">Cue Questions</p>
                      <textarea value={noteCue} onChange={(e) => setNoteCue(e.target.value)}
                                className="mobile-field h-24 w-full resize-none rounded-lg px-3 py-2 text-sm outline-none"
                                placeholder={"What is superposition?\nWhy does measurement collapse the state?"} />
                    </div>
                    <div>
                      <p className="mb-1 text-xs text-gray-400">Main Notes</p>
                      <textarea value={noteMain} onChange={(e) => setNoteMain(e.target.value)}
                                className="mobile-field h-32 w-full resize-none rounded-lg px-3 py-2 text-sm outline-none"
                                placeholder="Write core ideas, examples, and relationships." />
                    </div>
                    <div>
                      <p className="mb-1 text-xs text-gray-400">Summary</p>
                      <textarea value={noteSummary} onChange={(e) => setNoteSummary(e.target.value)}
                                className="mobile-field h-20 w-full resize-none rounded-lg px-3 py-2 text-sm outline-none"
                                placeholder="Summarize in one sentence." />
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <p className="text-xs text-gray-500">{draftSavedAt ? `Draft saved at ${draftSavedAt}` : "Draft not saved"}</p>
                      <button onClick={saveMobileDraft}
                              className="rounded-lg px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
                              style={{ background: "var(--gradient-primary)" }}>Save Draft</button>
                    </div>
                  </div>
                  {/* Feedback side */}
                  <div className="space-y-4">
                    <div className="glass-card p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-semibold text-gray-300">Quality Meter</h3>
                        <span className="text-lg font-bold gradient-text">{noteFeedback.qualityScore}/100</span>
                      </div>
                      <div className="progress-track mb-4">
                        <div className="progress-fill" style={{ width: `${noteFeedback.qualityScore}%`, background: 'var(--gradient-primary)' }} />
                      </div>
                      <div className="space-y-2">
                        {noteFeedback.items.map((item) => (
                          <p key={item} className="text-xs text-gray-400">• {item}</p>
                        ))}
                      </div>
                    </div>
                    <div className="glass-card p-6">
                      <p className="text-xs text-blue-300">💡 Tip: Use the Cornell Note method — strong cue questions + concise summary = better retention.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Mobile bottom sheet */}
            <div className="fixed bottom-20 left-0 right-0 z-90 px-2 md:hidden">
              <motion.div initial={{ y: 32, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.24 }}>
                <div className="mobile-sheet overflow-hidden">
                  <div className="flex justify-center pt-2">
                    <div className="h-1.5 w-12 rounded-full bg-white/20" />
                  </div>
                  <div className="px-3 pb-3 pt-2">
                    <div className="mb-3 grid grid-cols-2 gap-2">
                      <button onClick={() => setMobileSheetTab("input")}
                              className={`mobile-sheet-tab ${mobileSheetTab === "input" ? "active" : ""}`}>Input</button>
                      <button onClick={() => setMobileSheetTab("feedback")}
                              className={`mobile-sheet-tab ${mobileSheetTab === "feedback" ? "active" : ""}`}>Feedback</button>
                    </div>
                    <div className="max-h-[52vh] overflow-y-auto pr-1">
                      {mobileSheetTab === "input" ? (
                        <div className="space-y-3">
                          <div>
                            <p className="mb-1 text-[11px] text-gray-400">Subject</p>
                            <input value={noteSubject} onChange={(e) => setNoteSubject(e.target.value)}
                                   className="mobile-field w-full rounded-lg px-3 py-2 text-sm outline-none" placeholder="e.g. Physics" />
                          </div>
                          <div>
                            <p className="mb-1 text-[11px] text-gray-400">Cue Questions</p>
                            <textarea value={noteCue} onChange={(e) => setNoteCue(e.target.value)}
                                      className="mobile-field h-20 w-full resize-none rounded-lg px-3 py-2 text-sm outline-none"
                                      placeholder={"What is superposition?\nWhy does measurement collapse the state?"} />
                          </div>
                          <div>
                            <p className="mb-1 text-[11px] text-gray-400">Main Notes</p>
                            <textarea value={noteMain} onChange={(e) => setNoteMain(e.target.value)}
                                      className="mobile-field h-28 w-full resize-none rounded-lg px-3 py-2 text-sm outline-none"
                                      placeholder="Write core ideas, examples, and relationships." />
                          </div>
                          <div>
                            <p className="mb-1 text-[11px] text-gray-400">Summary</p>
                            <textarea value={noteSummary} onChange={(e) => setNoteSummary(e.target.value)}
                                      className="mobile-field h-16 w-full resize-none rounded-lg px-3 py-2 text-sm outline-none"
                                      placeholder="Summarize in one sentence." />
                          </div>
                          <div className="flex items-center justify-between gap-2 pt-1">
                            <p className="text-[11px] text-gray-500">{draftSavedAt ? `Draft saved at ${draftSavedAt}` : "Draft not saved"}</p>
                            <button onClick={saveMobileDraft}
                                    className="rounded-lg px-3 py-2 text-xs font-semibold text-white transition hover:brightness-110"
                                    style={{ background: "var(--gradient-primary)" }}>Save Draft</button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="rounded-xl border border-white/10 bg-white/4 p-3">
                            <div className="mb-2 flex items-center justify-between">
                              <p className="text-xs font-semibold text-gray-200">Quick Quality Meter</p>
                              <p className="text-xs font-bold text-blue-300">{noteFeedback.qualityScore}/100</p>
                            </div>
                            <div className="h-2 overflow-hidden rounded-full bg-white/10">
                              <div className="h-full rounded-full" style={{ width: `${noteFeedback.qualityScore}%`, background: "var(--gradient-primary)" }} />
                            </div>
                          </div>
                          <div className="rounded-xl border border-white/10 bg-white/3 p-3">
                            <p className="mb-2 text-xs font-semibold text-gray-200">Input Feedback</p>
                            <div className="space-y-2">
                              {noteFeedback.items.map((item) => (
                                <p key={item} className="text-xs text-gray-400">• {item}</p>
                              ))}
                            </div>
                          </div>
                          <div className="rounded-xl border border-blue-400/20 bg-blue-500/10 p-3">
                            <p className="text-[11px] text-blue-200">Mobile quick mode enabled. Detailed analysis panel stays on desktop flow.</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* ═══════════════════════════════════════════
            Tab: Dashboard (Spotify Wrapped + Stripe)
            ═══════════════════════════════════════════ */}
        {activeTab === "dashboard" && (
          <motion.div
            key="dashboard"
            className="tab-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-2xl font-bold mb-2">📊 Learning Dashboard</h2>
            <p className="text-sm text-gray-500 mb-6">Your knowledge evolution at a glance</p>

            {/* Metric Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {METRICS.map((m) => (
                <MetricCard key={m.label} {...m} />
              ))}
            </div>

            {/* Domain Progress */}
            <motion.div
              className="glass-card p-6 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-sm font-semibold text-gray-300 mb-4">📚 Knowledge Domains</h3>
              <div className="space-y-4">
                {DOMAINS.map((d) => (
                  <div key={d.name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-medium">{d.name}</span>
                      <span className="text-xs font-mono text-gray-400">{d.progress}%</span>
                    </div>
                    <div className="progress-track">
                      <motion.div
                        className="progress-fill"
                        style={{ background: d.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${d.progress}%` }}
                        transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              className="glass-card p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-sm font-semibold text-gray-300 mb-4">🕒 Recent Activity</h3>
              <div>
                {ACTIVITIES.map((a, i) => (
                  <div key={i} className="activity-item">
                    <div className="activity-icon" style={{ background: a.bg }}>{a.emoji}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{a.concept}</p>
                      <p className="text-xs text-gray-500">{a.action}</p>
                    </div>
                    <span className="text-xs text-gray-500 shrink-0">{a.time}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* ═══════════════════════════════════════════
            Tab: Quests (Duolingo Gamification)
            ═══════════════════════════════════════════ */}
        {activeTab === "quests" && (
          <motion.div
            key="quests"
            className="tab-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">⚔️ Daily Quests</h2>
                <p className="text-sm text-gray-500 mt-1">완료하면 XP를 획득하세요</p>
              </div>
              <div className="stat-badge text-sm">
                <span className="text-yellow-400">⭐</span>
                <span className="font-bold gradient-text">285 XP</span>
              </div>
            </div>

            {/* Quest List */}
            <div className="space-y-3 mb-8">
              {QUESTS.map((q, i) => (
                <motion.div
                  key={q.id}
                  className={`quest-card-v2 ${q.progress >= q.total ? "completed" : ""}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                       style={{ background: 'rgba(255,255,255,0.05)' }}>
                    {q.progress >= q.total ? "✅" : q.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-semibold truncate">{q.title}</p>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/15 text-yellow-400 font-mono">
                        +{q.xp} XP
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">{q.desc}</p>
                    <div className="progress-track">
                      <motion.div
                        className="progress-fill"
                        style={{ background: q.progress >= q.total ? '#22c55e' : 'var(--gradient-primary)' }}
                        initial={{ width: 0 }}
                        animate={{ width: `${(q.progress / q.total) * 100}%` }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                      />
                    </div>
                    <p className="text-[11px] text-gray-500 mt-1">{q.progress}/{q.total}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Weekly Summary Card */}
            <motion.div
              className="glass-card p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="text-sm font-semibold text-gray-300 mb-4">📅 이번 주 요약</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold gradient-text">12</p>
                  <p className="text-xs text-gray-500">완료한 퀘스트</p>
                </div>
                <div>
                  <p className="text-2xl font-bold gradient-text">285</p>
                  <p className="text-xs text-gray-500">획득 XP</p>
                </div>
                <div>
                  <p className="text-2xl font-bold gradient-text">7d</p>
                  <p className="text-xs text-gray-500">연속 기록</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Command Palette (Linear Inspiration) ─── */}
      <AnimatePresence>
        {showCmdPalette && (
          <motion.div
            className="command-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setShowCmdPalette(false)}
          >
            <motion.div
              className="command-palette"
              initial={{ scale: 0.95, opacity: 0, y: -10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <input
                className="command-input"
                placeholder="핀, 개념, 도메인을 검색하세요..."
                value={cmdQuery}
                onChange={(e) => setCmdQuery(e.target.value)}
                autoFocus
              />
              <div className="command-results">
                {cmdResults.length > 0 ? (
                  cmdResults.map((pin) => (
                    <button key={pin.id} className="command-item" onClick={() => selectCmdPin(pin)}>
                      <span className="pin-dot" style={{ background: STATUS_HEX[pin.status] }} />
                      <div className="flex-1 text-left">
                        <p className="text-sm font-medium">{pin.concept}</p>
                        <p className="text-xs text-gray-500">{pin.name} · {pin.domain}</p>
                      </div>
                      <span className="text-xs capitalize text-gray-500">{pin.status}</span>
                    </button>
                  ))
                ) : (
                  <div className="command-empty">
                    <p>검색 결과가 없습니다</p>
                    <p className="text-xs mt-1">다른 키워드로 시도해보세요</p>
                  </div>
                )}
              </div>
              <div className="command-shortcut">
                <kbd>ESC</kbd>
                <span className="ml-1">닫기</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Floating Bottom Nav ─── */}
      <motion.nav
        className="floating-nav"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            className={`floating-nav-item ${activeTab === item.id ? "active" : ""}`}
            onClick={() => setActiveTab(item.id)}
          >
            {item.label}
          </button>
        ))}
      </motion.nav>
    </main>
  );
}
