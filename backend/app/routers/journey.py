from pydantic import BaseModel
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status

from ..dependencies import AuthUser, get_current_user
from ..schemas import GetRouteResponse, JourneyRoute
from ..store import store

router = APIRouter(prefix="/journey/routes", tags=["journey"])


class ListRoutesResponse(BaseModel):
    routes: list[JourneyRoute]


@router.get("", response_model=ListRoutesResponse)
def list_routes(_: AuthUser = Depends(get_current_user)) -> ListRoutesResponse:
    return ListRoutesResponse(routes=[store.route()])


@router.get("/{route_id}", response_model=GetRouteResponse)
def get_route(route_id: UUID, _: AuthUser = Depends(get_current_user)) -> GetRouteResponse:
    route = store.route()
    if route.id != route_id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="route not found")

    stops = [store.anchors[sid] for sid in route.stops if sid in store.anchors]
    return GetRouteResponse(
        route=route,
        stops=stops,
        progress={"completed": 0, "total": len(stops)},
    )

