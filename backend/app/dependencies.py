from uuid import UUID

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from pydantic import BaseModel

security = HTTPBearer(auto_error=False)


class AuthUser(BaseModel):
    user_id: UUID
    token: str


def get_current_user(
    credentials: HTTPAuthorizationCredentials | None = Depends(security),
) -> AuthUser:
    # TODO(codex): replace with Supabase/NextAuth JWT verification.
    if credentials is None or credentials.scheme.lower() != "bearer":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing or invalid bearer token",
        )

    return AuthUser(
        user_id=UUID("00000000-0000-4000-a000-000000000001"),
        token=credentials.credentials,
    )

