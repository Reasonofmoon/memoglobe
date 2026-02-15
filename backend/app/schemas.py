from datetime import date, datetime
from typing import Any, Literal
from uuid import UUID

from pydantic import BaseModel, Field

TemplateType = Literal["cornell", "zettelkasten", "outline", "concept_map"]
BloomLevel = Literal["remember", "understand", "apply", "analyze", "evaluate", "create"]
AnchorStrategy = Literal["historical", "cultural", "personal"]
FeedbackSeverity = Literal["info", "warning", "critical"]
FeedbackType = Literal[
    "gap_alert",
    "redundancy_warning",
    "bloom_imbalance",
    "cognitive_overload",
    "growth_ready",
]
QuestType = Literal["gap_review", "bloom_push", "new_explore"]
ScaffoldingLevel = Literal["hint", "decompose", "simplify"]
TriggerReason = Literal["cli_overload", "zpd_not_ready", "student_request"]


class CreateNoteRequest(BaseModel):
    template_type: TemplateType
    subject: str
    content: dict[str, Any]


class CreateNoteAccepted(BaseModel):
    note_id: UUID
    status: Literal["processing"] = "processing"
    analysis_eta_seconds: int = 3


class NoteObject(BaseModel):
    id: UUID
    template_type: TemplateType
    subject: str
    content: dict[str, Any]
    extracted_concepts: list[str]
    session_number: int
    created_at: datetime


class FeedbackCard(BaseModel):
    type: FeedbackType
    severity: FeedbackSeverity
    message: str
    action: dict[str, Any] = Field(default_factory=dict)


class AnalysisReport(BaseModel):
    srs_score: float
    kcs_score: float
    bloom_distribution: dict[str, float]
    cli_score: float
    dag_violations: list[str]
    uncovered_concepts: list[str]
    redundant_with: list[UUID]
    feedback_cards: list[FeedbackCard]


class GetNoteResponse(BaseModel):
    note: NoteObject
    analysis: AnalysisReport | None = None


class ListNotesResponse(BaseModel):
    notes: list[NoteObject]
    total: int
    page: int


class LocationInput(BaseModel):
    latitude: float
    longitude: float
    name: str


class CreateAnchorRequest(BaseModel):
    concept_id: UUID
    location: LocationInput
    anchor_strategy: Literal["personal"] = "personal"


class LocationObject(BaseModel):
    id: UUID
    name: str
    description: str = ""
    latitude: float
    longitude: float
    country: str = ""
    type: str = "landmark"
    image_url: str = ""
    street_view_available: bool = False
    metadata: dict[str, Any] = Field(default_factory=dict)


class ConceptObject(BaseModel):
    id: UUID
    name: str
    aliases: list[str] = Field(default_factory=list)
    domain: str = "general"
    bloom_level: BloomLevel = "understand"


class GeoAnchorWithLocation(BaseModel):
    id: UUID
    concept: ConceptObject
    location: LocationObject
    anchor_strategy: AnchorStrategy
    strength: float
    pin_color: str
    review_count: int = 0
    last_reviewed: datetime | None = None


class ReviewEvent(BaseModel):
    timestamp: datetime
    recall_quality: int


class GetAnchorResponse(BaseModel):
    anchor: GeoAnchorWithLocation
    concept_detail: ConceptObject
    location_detail: LocationObject
    review_history: list[ReviewEvent]


class ReviewAnchorRequest(BaseModel):
    recall_quality: int = Field(ge=1, le=5)


class ReviewAnchorResponse(BaseModel):
    updated_strength: float
    next_review_at: datetime


class JourneyRoute(BaseModel):
    id: UUID
    estimated_minutes: int
    bloom_progression: list[BloomLevel]
    stops: list[UUID]


class GetRouteResponse(BaseModel):
    route: JourneyRoute
    stops: list[GeoAnchorWithLocation]
    progress: dict[str, int]


class DailyQuest(BaseModel):
    id: UUID
    type: QuestType
    concept_id: UUID | None = None
    location_id: UUID | None = None
    bloom_target: BloomLevel | None = None
    completed: bool = False


class DailyQuestPayload(BaseModel):
    date: date
    quests: list[DailyQuest]
    journey_route: JourneyRoute | None = None


class CompleteQuestRequest(BaseModel):
    note_id: UUID


class QuestCompletionResponse(BaseModel):
    quest: DailyQuest
    xp_earned: int
    evolution_index_delta: float


class KnowledgeRegion(BaseModel):
    latitude: float
    longitude: float
    radius: float
    coverage_pct: float
    concept_count: int


class MetacogDashboard(BaseModel):
    bloom_distribution: dict[str, float]
    kcs_by_subject: list[dict[str, Any]]
    cli_trend: list[dict[str, Any]]
    evolution_index: float
    streak: int


class ScaffoldingTriggerRequest(BaseModel):
    concept_id: UUID
    trigger_reason: TriggerReason


class ScaffoldingResponse(BaseModel):
    level: ScaffoldingLevel
    content: dict[str, Any]

