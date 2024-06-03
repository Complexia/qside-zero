from fastapi import FastAPI, Depends, HTTPException, APIRouter
from pydantic import BaseModel
from src.libs.clients import supabase_client
from src.libs.auth.jwt_bearer import JWTBearer

app = FastAPI()
router = APIRouter()


@router.get("/{character_id}")
def get_character_memory(character_id: str):
    """
    Get all of the character's memory
    """
    value = supabase_client.table("memory").select("*").eq("id", character_id).execute()
    return value.data

@router.post("/remember", dependencies=[Depends(JWTBearer())])
def remember(payload: dict):
    """ fetch memory from vector store """
    supabase_client.table("memory").insert(payload).execute()

@router.post("/add", dependencies=[Depends(JWTBearer())])
def add(payload: dict):
    """ add memory  """
    supabase_client.table("memory").insert(payload).execute()

@router.delete("/delete/{memory_id}", dependencies=[Depends(JWTBearer())])
def delete(cls, memory_id: str):
    """ delete memory"""
    supabase_client.table("memory").delete().eq('id', memory_id).execute()



