from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status

from ..dependencies import AuthUser, get_current_user
from ..schemas import CompleteQuestRequest, DailyQuestPayload, QuestCompletionResponse
from ..store import store

router = APIRouter(prefix="/quests", tags=["quests"])


@router.get("/daily", response_model=DailyQuestPayload)
def get_daily_quests(_: AuthUser = Depends(get_current_user)) -> DailyQuestPayload:
    return store.daily_quests()


@router.post("/{quest_id}/complete", response_model=QuestCompletionResponse)
def complete_quest(
    quest_id: UUID,
    payload: CompleteQuestRequest,
    _: AuthUser = Depends(get_current_user),
) -> QuestCompletionResponse:
    daily = store.daily_quests()
    quest = next((q for q in daily.quests if q.id == quest_id), None)
    if quest is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="quest not found")

    if payload.note_id not in store.notes:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="note not found")

    quest.completed = True
    return QuestCompletionResponse(
        quest=quest,
        xp_earned=50,
        evolution_index_delta=0.02,
    )

