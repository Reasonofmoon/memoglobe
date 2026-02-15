// MSW Request Handlers — MemoGlobe API Mock Server
// Generated from shared/openapi.yaml contract

import { http, HttpResponse } from 'msw';
import {
  MOCK_LOCATIONS,
  MOCK_CONCEPTS,
  generateMockAnchors,
  generateMockAnalysis,
  generateMockDashboard,
  generateMockQuests,
} from './data';

const API_BASE = 'http://localhost:8000/v1';

// In-memory state
const mockAnchors = generateMockAnchors();
let noteCounter = 0;
const mockNotes: Array<{
  id: string;
  user_id: string;
  template_type: string;
  subject: string;
  raw_content: unknown;
  extracted_concepts: string[];
  session_number: number;
  created_at: string;
}> = [];

export const handlers = [
  // ─── NOTES ──────────────────────────────────────
  http.post(`${API_BASE}/notes`, async ({ request }) => {
    const body = (await request.json()) as {
      template_type: string;
      subject: string;
      content: unknown;
    };
    noteCounter++;
    const noteId = `note-${String(noteCounter).padStart(6, '0')}`;
    const note = {
      id: noteId,
      user_id: 'user-001',
      template_type: body.template_type,
      subject: body.subject,
      raw_content: body.content,
      extracted_concepts: ['Placeholder Concept A', 'Placeholder Concept B'],
      session_number: noteCounter,
      created_at: new Date().toISOString(),
    };
    mockNotes.push(note);
    return HttpResponse.json(
      { note_id: noteId, status: 'processing', analysis_eta_seconds: 3 },
      { status: 202 }
    );
  }),

  http.get(`${API_BASE}/notes`, ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '20');
    const subject = url.searchParams.get('subject');
    let filtered = mockNotes;
    if (subject) filtered = filtered.filter((n) => n.subject === subject);
    return HttpResponse.json({
      notes: filtered.slice((page - 1) * limit, page * limit),
      total: filtered.length,
      page,
    });
  }),

  http.get(`${API_BASE}/notes/:noteId`, ({ params }) => {
    const note = mockNotes.find((n) => n.id === params.noteId) || mockNotes[0];
    return HttpResponse.json({
      note: note || { id: params.noteId, template_type: 'cornell', subject: 'Physics', raw_content: {}, extracted_concepts: [], session_number: 1, created_at: new Date().toISOString() },
      analysis: generateMockAnalysis(),
    });
  }),

  // ─── ANALYSIS ───────────────────────────────────
  http.get(`${API_BASE}/notes/:noteId/analysis`, () => {
    return HttpResponse.json(generateMockAnalysis());
  }),

  // ─── GLOBE & GEOANCHORS ─────────────────────────
  http.get(`${API_BASE}/globe/anchors`, () => {
    return HttpResponse.json({ anchors: mockAnchors });
  }),

  http.post(`${API_BASE}/globe/anchors`, async ({ request }) => {
    const body = (await request.json()) as {
      concept_id: string;
      location: { latitude: number; longitude: number; name: string };
      anchor_strategy: string;
    };
    const newAnchor = {
      id: `anchor-${Date.now()}`,
      user_id: 'user-001',
      concept_id: body.concept_id,
      location_id: `loc-${Date.now()}`,
      anchor_strategy: body.anchor_strategy,
      strength: 1.0,
      created_at: new Date().toISOString(),
      last_reviewed_at: new Date().toISOString(),
      review_count: 0,
      concept: MOCK_CONCEPTS.find((c) => c.id === body.concept_id) || MOCK_CONCEPTS[0],
      location: {
        id: `loc-${Date.now()}`,
        name: body.location.name,
        description: '',
        latitude: body.location.latitude,
        longitude: body.location.longitude,
        country: '',
        type: 'personal' as const,
        image_url: '',
        street_view_available: false,
        metadata: {},
      },
      pin_color: 'personal' as const,
    };
    return HttpResponse.json({ anchor: newAnchor }, { status: 201 });
  }),

  http.get(`${API_BASE}/globe/anchors/:anchorId`, ({ params }) => {
    const anchor = mockAnchors.find((a) => a.id === params.anchorId) || mockAnchors[0];
    return HttpResponse.json({
      anchor,
      concept_detail: anchor.concept,
      location_detail: anchor.location,
    });
  }),

  http.post(`${API_BASE}/globe/anchors/:anchorId/review`, () => {
    return HttpResponse.json({
      updated_strength: 0.95,
      next_review_at: new Date(Date.now() + 3 * 86400000).toISOString(),
    });
  }),

  // ─── JOURNEY & QUESTS ───────────────────────────
  http.get(`${API_BASE}/journey/routes`, () => {
    return HttpResponse.json({
      routes: [
        {
          id: 'route-001',
          stops: mockAnchors.slice(0, 4),
          estimated_time_minutes: 45,
          progress: { completed: 1, total: 4 },
        },
      ],
    });
  }),

  http.get(`${API_BASE}/journey/routes/:routeId`, () => {
    return HttpResponse.json({
      id: 'route-001',
      stops: mockAnchors.slice(0, 4),
      estimated_time_minutes: 45,
      progress: { completed: 1, total: 4 },
    });
  }),

  http.get(`${API_BASE}/quests/daily`, () => {
    return HttpResponse.json(generateMockQuests());
  }),

  http.post(`${API_BASE}/quests/:questId/complete`, () => {
    return HttpResponse.json({
      quest: { id: 'quest-completed', completed: true },
      xp_earned: 50,
      evolution_index_delta: 0.02,
    });
  }),

  // ─── METACOGNITION ──────────────────────────────
  http.get(`${API_BASE}/metacog/dashboard`, () => {
    return HttpResponse.json(generateMockDashboard());
  }),

  http.get(`${API_BASE}/metacog/knowledge-map`, () => {
    return HttpResponse.json({
      regions: MOCK_LOCATIONS.map((loc) => ({
        latitude: loc.latitude,
        longitude: loc.longitude,
        radius: 50 + Math.random() * 200,
        coverage_pct: 0.3 + Math.random() * 0.7,
        concept_count: Math.floor(Math.random() * 10) + 1,
      })),
    });
  }),

  // ─── SCAFFOLDING ────────────────────────────────
  http.post(`${API_BASE}/scaffolding/trigger`, async ({ request }) => {
    const body = (await request.json()) as {
      concept_id: string;
      trigger_reason: string;
    };
    const concept = MOCK_CONCEPTS.find((c) => c.id === body.concept_id);
    const levels = {
      cli_overload: 'simplify',
      zpd_not_ready: 'decompose',
      student_request: 'hint',
    } as const;
    const level = levels[body.trigger_reason as keyof typeof levels] || 'hint';
    const content: Record<string, unknown> = {
      hint: {
        question: `What happens when you apply ${concept?.name || 'this concept'} to real-world scenarios?`,
        connected_concept: 'Practical Application',
      },
      decompose: {
        sub_concepts: ['Foundation', 'Core Principle', 'Application'],
        suggested_notes: [
          { template_type: 'cornell', subject: concept?.domain || 'General' },
        ],
      },
      simplify: {
        analogy: `Think of ${concept?.name || 'this concept'} like building blocks — each piece connects to form a larger structure.`,
        visual_url: '',
        simplified_explanation: `${concept?.name || 'This concept'} is fundamentally about understanding patterns and relationships.`,
      },
    };

    return HttpResponse.json({ level, content: content[level] });
  }),
];
