import json
from fastapi import FastAPI, Depends, HTTPException, APIRouter
from pydantic import BaseModel
from src.libs.clients import supabase_client
from src.libs.auth.jwt_bearer import JWTBearer

app = FastAPI()
router = APIRouter()

class Social(BaseModel):
    username: str
    url: str
    type: str
    key: str

@router.post("/", dependencies=[Depends(JWTBearer())])
def get_users(payload: list[str]):
    """
    Get multiple users by username
    """
    
    data = supabase_client.table("public_users").select("*").in_('username', payload).execute().data
    
    return data
    

@router.get("/{username}")
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
    
    
    
@router.post("/add-social", dependencies=[Depends(JWTBearer())])
def add_social(social: Social, email: str = Depends(JWTBearer().get_current_user)):
    """
    Add a social to user
    """
   
    # user = JWTBearer.get_current_user()
    # print(user)
    data = supabase_client.table("public_users").select("*").eq('email', email).execute().data
    
    
    if data:
        user = data[0]
        social = social.dict()
        #socials_insert = supabase_client.table("public_users").update({"socials": user.get("socials") + [social.dict()]}).eq('email', email).execute()
        social_payload = {
            "user_id": user.get("id"),
            "social_username": social.get("username"),
            "social_url": social.get("url"),
            "social_type": social.get("type"),
            "svg_key": social.get("key")
        }
        social_insert = supabase_client.table("socials").insert(social_payload).execute().data
        if social_insert:
            data = social_insert[0]
            social_id = data.get("id")
            supabase_client.table("public_users").update({"socials": user.get("socials") + [social_id]}).eq('email', email).execute()
   
    return 200

@router.get("/{username}/get-socials", dependencies=[Depends(JWTBearer())])
def get_socials(username: str):
    """
    Get user socials
    """
    
    # user = JWTBearer.get_current_user()
    # print(user)
    data = supabase_client.table("public_users").select("id").eq('username', username).execute().data
    # socials = []
    
    
    if data:
        data = data[0]
        socials = supabase_client.table("socials").select("*").eq('user_id', data.get("id")).execute().data
        return socials
    
    return []

    
@router.put("/update-social/{social_id}", dependencies=[Depends(JWTBearer())])
def update_social(social: Social, social_id: str):
    """
    update a social
    """
    
    # user = JWTBearer.get_current_user()
    # print(user)
    data = supabase_client.table("socials").update(social.dict()).eq('id', social_id).execute().data
    # socials = []
    
    return 200
            




    


# @router.put("/update", dependencies=[Depends(JWTBearer())])
# def update_space(cls, id: str, payload: dict):
#     """ update space"""
#     supabase_client.table("spaces").update(payload).eq('id', id).execute()


# @router.delete("/delete/{space_id}", dependencies=[Depends(JWTBearer())])
# def delete_space(cls, space_id: str):
#     """ delete space"""
#     supabase_client.table("spaces").delete().eq('id', space_id).execute()