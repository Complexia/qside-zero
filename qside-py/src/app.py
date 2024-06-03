import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.routes import router

from src.models.chat import ChatPayload



app = FastAPI(
    title="qside",
    description="to the battle stations",
    version="1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allow_headers=["*"],
    
)


app.include_router(router)

if __name__ == '__main__':
    uvicorn.run("app:app", host='0.0.0.0', port=8000)

