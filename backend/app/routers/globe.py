from datetime import UTC, datetime
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel

from ..dependencies import AuthUser, get_current_user
from ..schemas import (
    CreateAnchorRequest,
    GeoAnchorWithLocation,
    GetAnchorResponse,
    ReviewAnchorRequest,
    ReviewAnchorResponse,
    ReviewEvent,
)
from ..store import store

router = APIRouter(prefix="/globe/anchors", tags=["globe"])


class ListAnchorsResponse(BaseModel):
    anchors: list[GeoAnchorWithLocation]


class CreateAnchorResponse(BaseModel):
    anchor: GeoAnchorWithLocation


@router.get("", response_model=ListAnchorsResponse)
def list_anchors(_: AuthUser = Depends(get_current_user)) -> ListAnchorsResponse:
    return ListAnchorsResponse(anchors=store.list_anchors())


@router.post("", response_model=CreateAnchorResponse, status_code=201)
def create_anchor(
    payload: CreateAnchorRequest,
    _: AuthUser = Depends(get_current_user),
) -> CreateAnchorResponse:
    anchor = store.create_personal_anchor(
        concept_id=payload.concept_id,
        latitude=payload.location.latitude,
        longitude=payload.location.longitude,
        name=payload.location.name,
    )
    return CreateAnchorResponse(anchor=anchor)


@router.get("/{anchor_id}", response_model=GetAnchorResponse)
def get_anchor(anchor_id: UUID, _: AuthUser = Depends(get_current_user)) -> GetAnchorResponse:
    anchor = store.anchors.get(anchor_id)
    if anchor is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="anchor not found")

    return GetAnchorResponse(
        anchor=anchor,
        concept_detail=anchor.concept,
        location_detail=anchor.location,
        review_history=[
            ReviewEvent(
                timestamp=anchor.last_reviewed or datetime.now(tz=UTC),
                recall_quality=4,
            )
        ],
    )


@router.post("/{anchor_id}/review", response_model=ReviewAnchorResponse)
def review_anchor(
    anchor_id: UUID,
    payload: ReviewAnchorRequest,
    _: AuthUser = Depends(get_current_user),
) -> ReviewAnchorResponse:
    anchor = store.anchors.get(anchor_id)
    if anchor is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="anchor not found")

    anchor.review_count += 1
    anchor.last_reviewed = datetime.now(tz=UTC)
    anchor.strength = min(1.0, max(0.2, anchor.strength + (payload.recall_quality - 3) * 0.03))

    return ReviewAnchorResponse(
        updated_strength=round(anchor.strength, 3),
        next_review_at=store.next_review_at(payload.recall_quality),
    )

