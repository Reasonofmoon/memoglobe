from fastapi import APIRouter, Depends, Query

from ..dependencies import AuthUser, get_current_user
from ..schemas import (
    CreateNoteAccepted,
    CreateNoteRequest,
    GetNoteResponse,
    ListNotesResponse,
)
from ..store import store

router = APIRouter(prefix="/notes", tags=["notes"])


@router.post("", response_model=CreateNoteAccepted, status_code=202)
def create_note(payload: CreateNoteRequest, _: AuthUser = Depends(get_current_user)) -> CreateNoteAccepted:
    note = store.create_note(
        template_type=payload.template_type,
        subject=payload.subject,
        content=payload.content,
    )
    return CreateNoteAccepted(note_id=note.id, analysis_eta_seconds=3)


@router.get("", response_model=ListNotesResponse)
def list_notes(
    _: AuthUser = Depends(get_current_user),
    subject: str | None = Query(default=None),
    page: int = Query(default=1, ge=1),
    limit: int = Query(default=20, ge=1, le=100),
) -> ListNotesResponse:
    items = store.list_notes(subject=subject)
    start = (page - 1) * limit
    end = start + limit
    return ListNotesResponse(notes=items[start:end], total=len(items), page=page)


@router.get("/{note_id}", response_model=GetNoteResponse)
def get_note(note_id: str, _: AuthUser = Depends(get_current_user)) -> GetNoteResponse:
    parsed = next((note for note in store.notes.values() if str(note.id) == note_id), None)
    if parsed is None:
        parsed = store.create_note("cornell", "General", {"cue_column": [], "main_notes": "", "summary": ""})
    return GetNoteResponse(note=parsed, analysis=store.get_analysis(parsed.id))

