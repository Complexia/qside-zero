import time
from fastapi import HTTPException, Request, WebSocket
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
import jwt
from src.libs.config import config

JWT_SECRET = config.get("JWT_SECRET")
JWT_ALGORITHM = config.get("JWT_ALGORITHM")


class JWTBearer(HTTPBearer):
    def __init__(self, auto_error: bool = True):
        super(JWTBearer, self).__init__(auto_error=auto_error)

    async def __call__(self, request: Request=None, websocket: WebSocket=None):
        if request:
            
            credentials: HTTPAuthorizationCredentials = await super(JWTBearer, self).__call__(request)
            if credentials:
                
                if not credentials.scheme == "Bearer":
                    
                    raise HTTPException(status_code=403, detail="Invalid authentication scheme.")
                if not self.verify_jwt(credentials.credentials):
                    raise HTTPException(status_code=403, detail="Invalid token or expired token.")
                return credentials.credentials
            else:
                raise HTTPException(status_code=403, detail="Invalid authorization code.")
        else:
            access_token = websocket.headers.get("Authorization").replace("Bearer ", "")
            if not self.verify_jwt(access_token):
                raise HTTPException(status_code=403, detail="Invalid token or expired token.")
            return websocket.headers.get("Authorization")

    def verify_jwt(self, jwtoken: str) -> bool:
        isTokenValid: bool = False

        try:
            jwtoken = jwtoken.replace("Bearer ", "")
            payload = self.decodeJWT(jwtoken)
        except:
            payload = None
        if payload:
            isTokenValid = True
        return isTokenValid
    
    def decodeJWT(self, token: str) -> dict:
        try:
            
            
            #decoded_token = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
            decoded_token = jwt.decode(token, algorithms='HS256', audience="authenticated", key=JWT_SECRET, verify=False)
            
            
            return decoded_token if decoded_token["exp"] >= time.time() else None
        except Exception as e:
            
            return {}