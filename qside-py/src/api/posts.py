from fastapi import FastAPI, Depends, HTTPException, APIRouter
from pydantic import BaseModel
from src.libs.clients import supabase_client
from src.libs.auth.jwt_bearer import JWTBearer

app = FastAPI()
router = APIRouter()

@router.get("/")
def get_posts():
    """
    Get all posts
    """
    value = supabase_client.table("posts").select("*").execute()
    return value.data


@router.get("/{post_id}")
def get_post(post_id: str):
    """
    Get a post by id
    """
    value = supabase_client.table("posts").select("*").eq("id", post_id).execute()
    return value.data


@router.post("/create", dependencies=[Depends(JWTBearer())])
def create_post(payload: dict):
    """ add post  """
    supabase_client.table("posts").insert(payload).execute()


@router.put("/update", dependencies=[Depends(JWTBearer())])
def update_post(cls, id: str, payload: dict):
    """ update post"""
    supabase_client.table("posts").update(payload).eq('id', id).execute()


@router.delete("/delete/{post_id}", dependencies=[Depends(JWTBearer())])
def delete_post(cls, post_id: str):
    """ delete post"""
    supabase_client.table("posts").delete().eq('id', post_id).execute()