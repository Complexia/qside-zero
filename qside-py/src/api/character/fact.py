from fastapi import FastAPI, Depends, HTTPException, APIRouter
from pydantic import BaseModel
from src.libs.clients import supabase_client
from src.libs.auth.jwt_bearer import JWTBearer

app = FastAPI()
router = APIRouter()


@router.get("/{character_id}")
def get_character_facts(character_id: str):
    """
    Get all of the character's memory
    """
    value = supabase_client.table("facts").select("*").eq("id", character_id).execute()
    return value.data


@router.post("/add", dependencies=[Depends(JWTBearer())])
def add(payload: dict):
    """ add fact  """
    supabase_client.table("facts").insert(payload).execute()

@router.delete("/delete/{fact_id}", dependencies=[Depends(JWTBearer())])
def delete(cls, fact_id: str):
    """ delete fact"""
    supabase_client.table("fact").delete().eq('id', fact_id).execute()