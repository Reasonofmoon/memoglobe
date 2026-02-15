from fastapi import APIRouter, Depends, HTTPException, status
from uuid import UUID

from ..dependencies import AuthUser, get_current_user
from ..schemas import AnalysisReport
from ..store import store

router = APIRouter(prefix="/notes", tags=["analysis"])


@router.get("/{note_id}/analysis", response_model=AnalysisReport)
def get_note_analysis(note_id: UUID, _: AuthUser = Depends(get_current_user)) -> AnalysisReport:
    if note_id not in store.notes:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="note not found")
    return store.get_analysis(note_id)

