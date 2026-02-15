"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { id: "globe", label: "🌍 Globe", emoji: "🌍" },
  { id: "notes", label: "📝 Notes", emoji: "📝" },
  { id: "dashboard", label: "📊 Dashboard", emoji: "📊" },
  { id: "quests", label: "⚔️ Quests", emoji: "⚔️" },
];

const SAMPLE_PINS = [
  { id: 1, name: "Copenhagen", concept: "Quantum Mechanics", status: "mastered" as const, x: 52, y: 28 },
  { id: 2, name: "Cambridge", concept: "DNA Structure", status: "review" as const, x: 48, y: 29 },
  { id: 3, name: "Athens", concept: "Democracy", status: "mastered" as const, x: 53, y: 38 },
  { id: 4, name: "MIT", concept: "Constructivism", status: "gap" as const, x: 26, y: 32 },
  { id: 5, name: "CERN", concept: "Higgs Boson", status: "path" as const, x: 50, y: 34 },
  { id: 6, name: "Seoul", concept: "한글 (Hangul)", status: "personal" as const, x: 79, y: 36 },
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

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("globe");
  const [hoveredPin, setHoveredPin] = useState<number | null>(null);
  const [selectedPin, setSelectedPin] = useState<typeof SAMPLE_PINS[0] | null>(null);

  return (
    <main className="globe-container">
      {/* ─── Ambient Background ─── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[800px] h-[800px] -top-40 -right-40 rounded-full bg-blue-900/10 blur-3xl" />
        <div className="absolute w-[600px] h-[600px] -bottom-20 -left-20 rounded-full bg-purple-900/10 blur-3xl" />
        <div className="absolute w-[400px] h-[400px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-900/5 blur-3xl" />
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

      {/* ─── Globe Placeholder (CesiumJS will replace) ─── */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Static globe preview */}
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
              style={{
                left: `${pin.x}%`,
                top: `${pin.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
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
              <p className="text-xs text-gray-500 mb-1 tracking-widest uppercase">CesiumJS Globe Loading...</p>
              <p className="text-sm text-gray-400">Placeholder · 6 Concept Pins</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ─── Selected Pin Detail ─── */}
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
              <div className="pt-3 border-t border-white/5">
                <p className="text-xs text-gray-500 mb-2">Memory Strength</p>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: 'var(--gradient-primary)' }}
                    initial={{ width: 0 }}
                    animate={{ width: "82%" }}
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

      {/* ─── Legend ─── */}
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
    </main>
  );
}
