export interface CreateNoteRequest {
  template_type: "cornell" | "zettelkasten" | "outline" | "concept_map";
  subject: string;
  content: Record<string, unknown>;
}

export interface CreateNoteAccepted {
  note_id: string;
  status: "processing";
  analysis_eta_seconds: number;
}

export interface FeedbackCard {
  type:
    | "gap_alert"
    | "redundancy_warning"
    | "bloom_imbalance"
    | "cognitive_overload"
    | "growth_ready";
  severity: "info" | "warning" | "critical";
  message: string;
  action?: Record<string, unknown>;
}

export interface AnalysisReport {
  srs_score: number;
  kcs_score: number;
  bloom_distribution: Record<string, number>;
  cli_score: number;
  dag_violations: string[];
  uncovered_concepts: string[];
  redundant_with: string[];
  feedback_cards: FeedbackCard[];
}

const API_BASE = process.env.NEXT_PUBLIC_MEMOGLOBE_API_BASE ?? "http://localhost:8000/v1";
const DEV_TOKEN = process.env.NEXT_PUBLIC_MEMOGLOBE_TOKEN ?? "dev-token";

async function request<T>(path: string, init: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${DEV_TOKEN}`,
      ...(init.headers ?? {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`API ${response.status}: ${body || response.statusText}`);
  }

  return (await response.json()) as T;
}

export async function createNote(payload: CreateNoteRequest): Promise<CreateNoteAccepted> {
  return request<CreateNoteAccepted>("/notes", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getNoteAnalysis(noteId: string): Promise<AnalysisReport> {
  return request<AnalysisReport>(`/notes/${noteId}/analysis`, {
    method: "GET",
  });
}
