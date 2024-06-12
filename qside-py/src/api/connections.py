import json
from fastapi import FastAPI, Depends, HTTPException, APIRouter
from pydantic import BaseModel
from src.libs.clients import supabase_client
from src.libs.auth.jwt_bearer import JWTBearer

app = FastAPI()
router = APIRouter()

@router.get("/{username}", dependencies=[Depends(JWTBearer())])
def get_connections(username: str):
    """
    Get all connections of a user based on username
    """
    connections = supabase_client.table("public_users").select("connections").eq('username', username).execute().data
    
    return connections

    
@router.get("/{username}/users", dependencies=[Depends(JWTBearer())])
def get_users(username: str):
    """
    Get all users based on connections
    """

    connections = supabase_client.table("public_users").select("connections").eq('username', username).execute().data
    
    connected_users = []
    
    if connections:
        connections = connections[0].get("connections")
        
        for connection in connections:
            
            user = supabase_client.table("public_users").select("*").eq('username', connection.get("username")).execute().data
            
            if user:
                connected_users.append(user[0])
                
        
    
        
    return connected_users
        
    
    



# @router.post("/connect", dependencies=[Depends(JWTBearer())])
# def connect(payload: dict):
#     """ create a connection between 2 users """
#     target_username = payload.get("targetUsername")
#     source_username = payload.get("sourceUsername")
#     caterogy = payload.get("category")
    
#     usercon = [source_username, target_username]
#     usercon.sort(key=lambda x: x.lower())
#     usercon_string = ''.join(usercon)
    
#     try:
#         supabase_payload = {
#             "usercon": usercon_string,
#             "category": payload.get("category"),
#         }
#         # Assuming `supabase_client` is already defined somewhere
#         data, count = supabase_client.table("connections").insert(supabase_payload).execute()

#         if data:
#             try:
#                 result = supabase_client \
#                     .from_('public_users') \
#                     .update({
#                         'connections': public_user.get('connections', []) + [data[0].get('id')]
#                     }) \
#                     .eq('id', public_user.get('id')) \
#                     .execute()
                    
#                 data1 = result.get('data')
#                 error1 = result.get('error')
                
#                 if error1:
#                     print(f'Error updating user: {error1}')
                    
#             except Exception as e:
#                 print(f'Error: {e}')

#     except Exception as e:
#         print(e)
    


# @router.put("/update", dependencies=[Depends(JWTBearer())])
# def update_space(cls, id: str, payload: dict):
#     """ update space"""
#     supabase_client.table("spaces").update(payload).eq('id', id).execute()


# @router.delete("/delete/{space_id}", dependencies=[Depends(JWTBearer())])
# def delete_space(cls, space_id: str):
#     """ delete space"""
#     supabase_client.table("spaces").delete().eq('id', space_id).execute()