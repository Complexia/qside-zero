from typing import Optional
from fastapi import Depends, FastAPI, HTTPException, APIRouter, Query, WebSocket, WebSocketDisconnect
from pydantic import BaseModel

import uuid
from src.libs.agent_engine import run_agent
from src.libs.auth.jwt_bearer import JWTBearer
from src.libs.clients import supabase_client


app = FastAPI()
router = APIRouter()

class CharacterChatPayload(BaseModel):
    input: str
    character_id: str
    user_id: str
    # messages: dict


class ConnectionManager:
    def __init__(self):
        self.active_connections: list = []
        self.session_id: list = []

    async def connect(self, websocket: WebSocket, session_id: str):
        await websocket.accept()
        self.active_connections.append(websocket)
        self.session_id.append(session_id)
        message_structure[session_id] = []

    def disconnect(self, websocket: WebSocket, session_id: str):
        self.active_connections.remove(websocket)
        self.session_id.remove(session_id)


# @router.post("/chat")
# def character_agent_chat_completion(payload: CharacterChatPayload):
#     try:
#         memory = payload.get("messages")
#         query = payload.get("input")
#         character_id = payload.get("character_id")
#         user_id = payload.get("user_id")
#         memory = ConversationBufferMemory(
#             memory_key="chat_history", return_messages=True)
#         c_id = "5ed33903-cbd8-4af6-ae74-97ea06a2d88e"
#         u_id = "1"
#         character_agent = CharacterAgentManager()
#         res = character_agent.run_agent(query, memory, character_id, user_id)

#         return res

#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))


manager = ConnectionManager()

# socket and then list of messages in socket
message_structure = {}

@router.websocket('/test2')
async def test2(websocket: WebSocket, value: Optional[int] = Query(1)):
    await websocket.accept()
    try:
        while True:
            message = await websocket.receive_text()
            message = message*value
            await websocket.send_text(message)
    except WebSocketDisconnect:
        pass

jwt_bearer = JWTBearer()

@router.websocket("/ws")
# async def chat_websocket_endpoint(websocket: WebSocket, token: dict = Depends(jwt_bearer), prefix: Optional[str] = Query(None)):
async def chat_websocket_endpoint(websocket: WebSocket, prefix: Optional[str] = Query(None)):
    # action_send_callback_handler = ActionSendCallbackHandler(websocket)
    # if token is None:
    #     await websocket.close(code=1008)
    #     return
    
    session_id: str = str(uuid.uuid4())
    await manager.connect(websocket, session_id)
    # send back this session's id
    await websocket.send_json({"init_session_id": session_id})

    # now = datetime.now()
    # current_time = now.strftime("%H:%M")
    try:
        while True:
            payload = await websocket.receive_json()
            access_token = payload.get("access_token")
            
            if not jwt_bearer.verify_jwt(access_token):
                print("we here??")
                raise HTTPException(status_code=403, detail="Invalid token or expired token.")
            
            query = payload.get("input")
            character_id = payload.get("character_id")
            chat_history = payload.get("chat_history")
            user_id = payload.get("user_id")
            user_message = {"content": query,
                            "role": "user", "session_id": session_id}
            new_chat = payload.get("new_chat")
            if payload.get("chat_id") == None:
                chat_id = session_id
            else:
                chat_id = payload.get("chat_id")
                
            
            
            await websocket.send_json(user_message)
            # memory = message_structure[session_id][-10:]

            res = run_agent(user_prompt = query,  chat_history=chat_history, character_id=character_id, user_id=user_id, new_chat=new_chat, chat_id=chat_id)
            
            agent_message = {"content": res,
                             "role": "agent", "session_id": session_id}

            await websocket.send_json(agent_message)
            # add agent message to memory
            message_structure[session_id].append(user_message)
            message_structure[session_id].append(agent_message)

            # print(message_structure[session_id])

    except WebSocketDisconnect:
        # message = {"time":current_time,"message":"Offline", "session_id": session_id}
        # await websocket.send_json(message)

        # print("closed")
        manager.disconnect(websocket, session_id)
        
        
@router.get("/chat-history/{chat_id}")
def get_chat_history(chat_id: str):
    """
    get chat history
    """

    return supabase_client.table("posts").select("*").eq("id", chat_id).execute()

app.include_router(router)
