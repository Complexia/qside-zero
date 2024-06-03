from fastapi import FastAPI, Depends, HTTPException, APIRouter
from pydantic import BaseModel
from src.libs.clients import supabase_client
from src.libs.auth.jwt_bearer import JWTBearer

app = FastAPI()
router = APIRouter()

@router.get("/")
def get_character():
    """
    Get all characters
    """
    value = supabase_client.table("characters").select("*").execute()
    return value.data

@router.get("/{character_id}")
def get_character(character_id: str):
    """
    Get a character by id
    """
    value = supabase_client.table("characters").select("*").eq("id", character_id).single().execute()
    return value.data


@router.post("/create", dependencies=[Depends(JWTBearer())])
def create_character(payload: dict):
    """ add character  """
    value = supabase_client.table("characters").insert(payload).execute()
    return value.data


@router.put("/update", dependencies=[Depends(JWTBearer())])
def update_character(cls, id: str, payload: dict):
    """ update character"""
    supabase_client.table("characters").update(payload).eq('id', id).execute()


@router.delete("/delete/{character_id}", dependencies=[Depends(JWTBearer())])
def delete_character(cls, character_id: str):
    """ delete character"""
    supabase_client.table("characters").delete().eq('id', character_id).execute()

