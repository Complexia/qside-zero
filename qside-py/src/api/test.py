from fastapi import APIRouter, Depends

from src.libs.auth.jwt_bearer import JWTBearer

router = APIRouter()


@router.get("/test", name="test", description="testing something", dependencies=[Depends(JWTBearer())])
async def test():
    return "test icles"