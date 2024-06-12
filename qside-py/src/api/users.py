import json
from fastapi import FastAPI, Depends, HTTPException, APIRouter
from pydantic import BaseModel
from src.libs.clients import supabase_client
from src.libs.auth.jwt_bearer import JWTBearer

app = FastAPI()
router = APIRouter()

@router.post("/", dependencies=[Depends(JWTBearer())])
def get_users(payload: list[str]):
    """
    Get multiple users by username
    """
    
    data = supabase_client.table("public_users").select("*").in_('username', payload).execute().data
    
    return data
    

@router.get("/{username}", dependencies=[Depends(JWTBearer())])
def get_user(username: str):
    """
    Get user by username
    """
    data = supabase_client.table("public_users").select("*").eq('username', username).execute().data
    
    if data:
        user = data[0]
        return user
    else:
        return {"error": "User not found"}
    
    
    





    


# @router.put("/update", dependencies=[Depends(JWTBearer())])
# def update_space(cls, id: str, payload: dict):
#     """ update space"""
#     supabase_client.table("spaces").update(payload).eq('id', id).execute()


# @router.delete("/delete/{space_id}", dependencies=[Depends(JWTBearer())])
# def delete_space(cls, space_id: str):
#     """ delete space"""
#     supabase_client.table("spaces").delete().eq('id', space_id).execute()