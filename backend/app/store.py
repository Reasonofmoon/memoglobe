from __future__ import annotations

from datetime import UTC, date, datetime, timedelta
from uuid import UUID, uuid4

from .schemas import (
    AnalysisReport,
    ConceptObject,
    DailyQuest,
    DailyQuestPayload,
    FeedbackCard,
    GeoAnchorWithLocation,
    JourneyRoute,
    LocationObject,
    MetacogDashboard,
    NoteObject,
)


def utc_now() -> datetime:
    return datetime.now(tz=UTC)


def seed_analysis() -> AnalysisReport:
    return AnalysisReport(
        srs_score=0.08,
        kcs_score=0.72,
        bloom_distribution={
            "remember": 0.30,
            "understand": 0.25,
            "apply": 0.20,
            "analyze": 0.15,
            "evaluate": 0.07,
            "create": 0.03,
        },
        cli_score=0.45,
        dag_violations=["Linear Algebra", "Calculus II"],
        uncovered_concepts=["Wave Function", "Quantum Entanglement", "Superposition"],
        redundant_with=[],
        feedback_cards=[
            FeedbackCard(
                type="gap_alert",
                severity="warning",
                message="3 concepts in Physics remain uncovered.",
                action={"suggest": "Review Wave Function and Superposition"},
            )
        ],
    )


class InMemoryStore:
    def __init__(self) -> None:
        self.notes: dict[UUID, NoteObject] = {}
        self.analysis_by_note: dict[UUID, AnalysisReport] = {}
        self.anchors: dict[UUID, GeoAnchorWithLocation] = {}
        self.route_id: UUID = uuid4()
        self.quest_ids: list[UUID] = [uuid4(), uuid4(), uuid4()]

        self._seed_anchor()

    def _seed_anchor(self) -> None:
        concept = ConceptObject(
            id=uuid4(),
            name="Quantum Mechanics",
            aliases=["양자역학"],
            domain="physics",
            bloom_level="understand",
        )
        location = LocationObject(
            id=uuid4(),
            name="Niels Bohr Institute",
            description="Birthplace of quantum mechanics.",
            latitude=55.6961,
            longitude=12.5713,
            country="Denmark",
            type="laboratory",
            street_view_available=True,
            metadata={"city": "Copenhagen"},
        )
        anchor = GeoAnchorWithLocation(
            id=uuid4(),
            concept=concept,
            location=location,
            anchor_strategy="historical",
            strength=0.82,
            pin_color="mastered",
            review_count=4,
            last_reviewed=utc_now(),
        )
        self.anchors[anchor.id] = anchor

    def create_note(self, template_type: str, subject: str, content: dict) -> NoteObject:
        note = NoteObject(
            id=uuid4(),
            template_type=template_type,  # type: ignore[arg-type]
            subject=subject,
            content=content,
            extracted_concepts=["Placeholder Concept A", "Placeholder Concept B"],
            session_number=len(self.notes) + 1,
            created_at=utc_now(),
        )
        self.notes[note.id] = note
        self.analysis_by_note[note.id] = seed_analysis()
        return note

    def list_notes(self, subject: str | None = None) -> list[NoteObject]:
        notes = list(self.notes.values())
        if subject:
            notes = [n for n in notes if n.subject == subject]
        return sorted(notes, key=lambda x: x.created_at, reverse=True)

    def get_analysis(self, note_id: UUID) -> AnalysisReport:
        return self.analysis_by_note.get(note_id, seed_analysis())

    def list_anchors(self) -> list[GeoAnchorWithLocation]:
        return list(self.anchors.values())

    def create_personal_anchor(self, concept_id: UUID, latitude: float, longitude: float, name: str) -> GeoAnchorWithLocation:
        concept = ConceptObject(
            id=concept_id,
            name="Personal Concept",
            domain="general",
            bloom_level="understand",
        )
        location = LocationObject(
            id=uuid4(),
            name=name,
            latitude=latitude,
            longitude=longitude,
            type="personal",
            metadata={},
        )
        anchor = GeoAnchorWithLocation(
            id=uuid4(),
            concept=concept,
            location=location,
            anchor_strategy="personal",
            strength=1.0,
            pin_color="personal",
            review_count=0,
            last_reviewed=utc_now(),
        )
        self.anchors[anchor.id] = anchor
        return anchor

    def route(self) -> JourneyRoute:
        stop_ids = [a.id for a in self.anchors.values()]
        return JourneyRoute(
            id=self.route_id,
            estimated_minutes=45,
            bloom_progression=["remember", "understand", "apply"],
            stops=stop_ids,
        )

    def daily_quests(self) -> DailyQuestPayload:
        anchor_ids = list(self.anchors.values())
        concept_id = anchor_ids[0].concept.id if anchor_ids else None
        location_id = anchor_ids[0].location.id if anchor_ids else None
        quests = [
            DailyQuest(
                id=self.quest_ids[0],
                type="gap_review",
                concept_id=concept_id,
                location_id=location_id,
                bloom_target="understand",
                completed=False,
            ),
            DailyQuest(
                id=self.quest_ids[1],
                type="bloom_push",
                concept_id=concept_id,
                location_id=location_id,
                bloom_target="analyze",
                completed=False,
            ),
            DailyQuest(
                id=self.quest_ids[2],
                type="new_explore",
                concept_id=concept_id,
                location_id=location_id,
                bloom_target="apply",
                completed=False,
            ),
        ]
        return DailyQuestPayload(
            date=date.today(),
            quests=quests,
            journey_route=self.route(),
        )

    def dashboard(self) -> MetacogDashboard:
        return MetacogDashboard(
            bloom_distribution={
                "remember": 0.25,
                "understand": 0.22,
                "apply": 0.20,
                "analyze": 0.18,
                "evaluate": 0.10,
                "create": 0.05,
            },
            kcs_by_subject=[
                {"subject": "Physics", "coverage_pct": 0.72, "gap_count": 5},
                {"subject": "Biology", "coverage_pct": 0.95, "gap_count": 1},
            ],
            cli_trend=[
                {"week": "W1", "avg_cli": 0.35},
                {"week": "W2", "avg_cli": 0.42},
                {"week": "W3", "avg_cli": 0.48},
            ],
            evolution_index=0.68,
            streak=7,
        )

    def next_review_at(self, recall_quality: int) -> datetime:
        spacing_days = {1: 1, 2: 1, 3: 3, 4: 7, 5: 14}.get(recall_quality, 1)
        return utc_now() + timedelta(days=spacing_days)


store = InMemoryStore()

