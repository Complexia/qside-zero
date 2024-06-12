from fastapi import APIRouter
from src.api.character import character
from src.api import test
from src.api import spaces
from src.api import chat
from src.api import connections
from src.api import users

router = APIRouter()


router.include_router(test.router, tags=["test"])

router.include_router(character.router,
                      prefix="/characters", tags=["characters"])

router.include_router(spaces.router,
                      prefix="/spaces", tags=["spaces"])
router.include_router(chat.router,
                      prefix="/chat", tags=["chat"])

router.include_router(connections.router,
                      prefix="/connections", tags=["connections"])
                      
router.include_router(users.router,
                      prefix="/users", tags=["users"])