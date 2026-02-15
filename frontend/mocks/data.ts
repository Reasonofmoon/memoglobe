// MSW Mock Data Generators for MemoGlobe
// Provides realistic fake data for all API endpoints

// Inline constants (mirrored from shared/constants.ts to avoid cross-project imports)
const ANCHOR_STRATEGIES = ["historical", "cultural", "personal"] as const;

// ─── UUID Generator ─────────────────────────────────
let counter = 0;
function fakeUUID(): string {
  counter++;
  return `00000000-0000-4000-a000-${String(counter).padStart(12, '0')}`;
}

// ─── Location Database ──────────────────────────────
export const MOCK_LOCATIONS = [
  {
    id: fakeUUID(),
    name: "Niels Bohr Institute",
    description: "Birthplace of quantum mechanics. Bohr and Heisenberg debated here.",
    latitude: 55.6961,
    longitude: 12.5713,
    country: "Denmark",
    type: "laboratory" as const,
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Niels_Bohr_Institute.jpg/1280px-Niels_Bohr_Institute.jpg",
    street_view_available: true,
    metadata: { city: "Copenhagen" },
  },
  {
    id: fakeUUID(),
    name: "Cavendish Laboratory",
    description: "Where Watson and Crick discovered the DNA double helix structure.",
    latitude: 52.2103,
    longitude: 0.0913,
    country: "United Kingdom",
    type: "laboratory" as const,
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Cavendish_Laboratory.jpg/1280px-Cavendish_Laboratory.jpg",
    street_view_available: true,
    metadata: { city: "Cambridge" },
  },
  {
    id: fakeUUID(),
    name: "Parthenon",
    description: "Temple of Athena, symbol of Athenian democracy and Western civilization.",
    latitude: 37.9715,
    longitude: 23.7267,
    country: "Greece",
    type: "landmark" as const,
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/The_Parthenon_in_Athens.jpg/1280px-The_Parthenon_in_Athens.jpg",
    street_view_available: true,
    metadata: { city: "Athens" },
  },
  {
    id: fakeUUID(),
    name: "MIT Media Lab",
    description: "Interdisciplinary research lab pioneering constructionist learning.",
    latitude: 42.3601,
    longitude: -71.0872,
    country: "United States",
    type: "university" as const,
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/MIT_Media_Lab.jpg/1280px-MIT_Media_Lab.jpg",
    street_view_available: true,
    metadata: { city: "Cambridge, MA" },
  },
  {
    id: fakeUUID(),
    name: "CERN",
    description: "European Organization for Nuclear Research. Home of the Large Hadron Collider.",
    latitude: 46.2330,
    longitude: 6.0557,
    country: "Switzerland",
    type: "laboratory" as const,
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/CERN_Aerial_View.jpg/1280px-CERN_Aerial_View.jpg",
    street_view_available: true,
    metadata: { city: "Geneva" },
  },
  {
    id: fakeUUID(),
    name: "Bibliotheca Alexandrina",
    description: "Modern library and cultural center, tribute to the ancient Library of Alexandria.",
    latitude: 31.2089,
    longitude: 29.9092,
    country: "Egypt",
    type: "library" as const,
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Bibliotheca_Alexandrina_2009.jpg/1280px-Bibliotheca_Alexandrina_2009.jpg",
    street_view_available: true,
    metadata: { city: "Alexandria" },
  },
  {
    id: fakeUUID(),
    name: "세종대왕 동상",
    description: "King Sejong the Great, creator of Hangul. Gwanghwamun Square.",
    latitude: 37.5723,
    longitude: 126.9769,
    country: "South Korea",
    type: "landmark" as const,
    image_url: "",
    street_view_available: true,
    metadata: { city: "Seoul" },
  },
];

// ─── Concept Database ───────────────────────────────
export const MOCK_CONCEPTS = [
  { id: fakeUUID(), name: "Quantum Mechanics", aliases: ["양자역학"], domain: "physics", bloom_level: "understand" as const },
  { id: fakeUUID(), name: "DNA Structure", aliases: ["DNA 구조"], domain: "biology", bloom_level: "remember" as const },
  { id: fakeUUID(), name: "Democracy", aliases: ["민주주의"], domain: "political science", bloom_level: "analyze" as const },
  { id: fakeUUID(), name: "Constructivism", aliases: ["구성주의"], domain: "education", bloom_level: "apply" as const },
  { id: fakeUUID(), name: "Higgs Boson", aliases: ["힉스 보손"], domain: "physics", bloom_level: "remember" as const },
  { id: fakeUUID(), name: "Knowledge Preservation", aliases: ["지식 보존"], domain: "library science", bloom_level: "evaluate" as const },
  { id: fakeUUID(), name: "Korean Alphabet", aliases: ["한글", "훈민정음"], domain: "linguistics", bloom_level: "create" as const },
];

// ─── GeoAnchors ─────────────────────────────────────
export function generateMockAnchors() {
  return MOCK_CONCEPTS.map((concept, i) => ({
    id: fakeUUID(),
    user_id: "user-001",
    concept_id: concept.id,
    location_id: MOCK_LOCATIONS[i].id,
    anchor_strategy: ANCHOR_STRATEGIES[i % 3],
    strength: Math.round((0.3 + Math.random() * 0.7) * 100) / 100,
    created_at: new Date(Date.now() - (7 - i) * 86400000).toISOString(),
    last_reviewed_at: new Date(Date.now() - i * 86400000).toISOString(),
    review_count: Math.floor(Math.random() * 10) + 1,
    concept,
    location: MOCK_LOCATIONS[i],
    pin_color: (["mastered", "gap", "review", "path", "mastered", "review", "mastered"] as const)[i],
  }));
}

// ─── Analysis Report ────────────────────────────────
export function generateMockAnalysis() {
  return {
    srs_score: 0.08,
    kcs_score: 0.72,
    bloom_distribution: {
      remember: 0.30,
      understand: 0.25,
      apply: 0.20,
      analyze: 0.15,
      evaluate: 0.07,
      create: 0.03,
    },
    cli_score: 0.45,
    dag_violations: ["Linear Algebra", "Calculus II"],
    uncovered_concepts: ["Wave Function", "Quantum Entanglement", "Superposition"],
    redundant_with: [],
    feedback_cards: [
      {
        type: "gap_alert",
        severity: "warning",
        message: "3 concepts in Physics remain uncovered.",
        action: { suggest: "Review Wave Function and Superposition" },
      },
      {
        type: "bloom_imbalance",
        severity: "info",
        message: "55% of your notes are Remember+Understand. Push toward Apply/Analyze.",
        action: { suggest: "Try writing application examples" },
      },
      {
        type: "growth_ready",
        severity: "info",
        message: "Your KCS in Biology is 95%! Ready for advanced topics.",
        action: { suggest: "Explore Epigenetics" },
      },
    ],
  };
}

// ─── Dashboard ──────────────────────────────────────
export function generateMockDashboard() {
  return {
    bloom_distribution: {
      remember: 0.25,
      understand: 0.22,
      apply: 0.20,
      analyze: 0.18,
      evaluate: 0.10,
      create: 0.05,
    },
    kcs_by_subject: [
      { subject: "Physics", coverage_pct: 0.72, gap_count: 5 },
      { subject: "Biology", coverage_pct: 0.95, gap_count: 1 },
      { subject: "History", coverage_pct: 0.60, gap_count: 8 },
      { subject: "Education", coverage_pct: 0.85, gap_count: 3 },
    ],
    cli_trend: [
      { week: "W1", avg_cli: 0.35 },
      { week: "W2", avg_cli: 0.42 },
      { week: "W3", avg_cli: 0.55 },
      { week: "W4", avg_cli: 0.48 },
      { week: "W5", avg_cli: 0.40 },
    ],
    evolution_index: 0.68,
    streak: 7,
  };
}

// ─── Daily Quests ───────────────────────────────────
export function generateMockQuests() {
  return {
    date: new Date().toISOString().split("T")[0],
    quests: [
      {
        id: fakeUUID(),
        date: new Date().toISOString().split("T")[0],
        quests: [
          {
            type: "gap_review" as const,
            concept_id: MOCK_CONCEPTS[0].id,
            location_id: MOCK_LOCATIONS[0].id,
            bloom_target: "understand",
          },
        ],
        completed: false,
      },
      {
        id: fakeUUID(),
        date: new Date().toISOString().split("T")[0],
        quests: [
          {
            type: "bloom_push" as const,
            concept_id: MOCK_CONCEPTS[2].id,
            location_id: MOCK_LOCATIONS[2].id,
            bloom_target: "evaluate",
          },
        ],
        completed: false,
      },
      {
        id: fakeUUID(),
        date: new Date().toISOString().split("T")[0],
        quests: [
          {
            type: "new_explore" as const,
            concept_id: MOCK_CONCEPTS[4].id,
            location_id: MOCK_LOCATIONS[4].id,
            bloom_target: "remember",
          },
        ],
        completed: false,
      },
    ],
    journey_route: null,
  };
}
