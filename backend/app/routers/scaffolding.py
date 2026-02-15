from fastapi import APIRouter, Depends

from ..dependencies import AuthUser, get_current_user
from ..schemas import ScaffoldingResponse, ScaffoldingTriggerRequest

router = APIRouter(prefix="/scaffolding", tags=["scaffolding"])


@router.post("/trigger", response_model=ScaffoldingResponse)
def trigger_scaffolding(
    payload: ScaffoldingTriggerRequest,
    _: AuthUser = Depends(get_current_user),
) -> ScaffoldingResponse:
    level_map = {
        "cli_overload": "simplify",
        "zpd_not_ready": "decompose",
        "student_request": "hint",
    }
    level = level_map.get(payload.trigger_reason, "hint")

    content_by_level = {
        "hint": {
            "question": "What prior concept can explain this new concept?",
            "connected_concept": "Prerequisites",
        },
        "decompose": {
            "sub_concepts": ["Foundation", "Core Principle", "Application"],
            "suggested_notes": [{"template_type": "cornell", "subject": "General"}],
        },
        "simplify": {
            "analogy": "Think in smaller chunks and map one concept to one location first.",
            "visual_url": "",
            "simplified_explanation": "Start from one anchor and expand outward.",
        },
    }

    return ScaffoldingResponse(level=level, content=content_by_level[level])

