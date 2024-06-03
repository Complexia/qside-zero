import json
from fastapi import FastAPI, Depends, HTTPException, APIRouter
from pydantic import BaseModel
from src.libs.clients import supabase_client
from src.libs.auth.jwt_bearer import JWTBearer

app = FastAPI()
router = APIRouter()

@router.get("/", dependencies=[Depends(JWTBearer())])
def get_spaces():
    """
    Get all spaces
    """
    value = supabase_client.table("spaces").select("*").execute()
    return value.data
    # return supabase_client.table("spaces").select("*").execute()


@router.get("/{space_id}",)
def get_space(space_id: str):
    """
    Get a space by id
    """

    value = supabase_client.table("spaces").select("*").eq("id", space_id).execute()   
    return value.data


@router.post("/create", dependencies=[Depends(JWTBearer())])
def create_space(payload: dict):
    """ add space  """
    supabase_client.table("spaces").insert(payload).execute()


@router.put("/update", dependencies=[Depends(JWTBearer())])
def update_space(cls, id: str, payload: dict):
    """ update space"""
    supabase_client.table("spaces").update(payload).eq('id', id).execute()


@router.delete("/delete/{space_id}", dependencies=[Depends(JWTBearer())])
def delete_space(cls, space_id: str):
    """ delete space"""
    supabase_client.table("spaces").delete().eq('id', space_id).execute()