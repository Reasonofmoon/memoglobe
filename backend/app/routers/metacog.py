from pydantic import BaseModel

from fastapi import APIRouter, Depends

from ..dependencies import AuthUser, get_current_user
from ..schemas import KnowledgeRegion, MetacogDashboard

router = APIRouter(prefix="/metacog", tags=["metacog"])


class KnowledgeMapResponse(BaseModel):
    regions: list[KnowledgeRegion]


@router.get("/dashboard", response_model=MetacogDashboard)
def get_dashboard(_: AuthUser = Depends(get_current_user)) -> MetacogDashboard:
    from ..store import store

    return store.dashboard()


@router.get("/knowledge-map", response_model=KnowledgeMapResponse)
def get_knowledge_map(_: AuthUser = Depends(get_current_user)) -> KnowledgeMapResponse:
    regions = [
        KnowledgeRegion(
            latitude=55.6961,
            longitude=12.5713,
            radius=130.0,
            coverage_pct=0.72,
            concept_count=5,
        ),
        KnowledgeRegion(
            latitude=37.9715,
            longitude=23.7267,
            radius=100.0,
            coverage_pct=0.60,
            concept_count=8,
        ),
    ]
    return KnowledgeMapResponse(regions=regions)

