from fastapi import APIRouter
from src.api.character import character
from src.api import test
from src.api import spaces
from src.api import chat

router = APIRouter()


router.include_router(test.router, tags=["test"])

router.include_router(character.router,
                      prefix="/characters", tags=["characters"])

router.include_router(spaces.router,
                      prefix="/spaces", tags=["spaces"])
router.include_router(chat.router,
                      prefix="/chat", tags=["chat"])