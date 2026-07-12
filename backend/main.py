from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

# Import our database lifecycle functions
from app.database.connection import connect_to_mongo, close_mongo_connection

# Import our settings
from app.config.settings import settings
from app.api.youtube import router as youtube_router
from app.api.analysis import router as analysis_router
from app.api.auth import router as auth_router

load_dotenv()

app = FastAPI(
    title="SocialSage API",
    description="AI-powered social media growth intelligence platform",
    version="0.1.0"
)

# CORS
origins = [
    "http://localhost:5173",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(youtube_router)
app.include_router(analysis_router)
app.include_router(auth_router)
# LIFECYCLE EVENTS
# on_event("startup") runs ONCE when the server first starts
# This is where we connect to MongoDB so it's ready before any request comes in
@app.on_event("startup")
async def startup():
    print(f"🚀 Starting {settings.APP_NAME} API...")
    await connect_to_mongo()

# on_event("shutdown") runs ONCE when the server is stopping (Ctrl+C)
# Clean disconnection from MongoDB prevents connection leaks
@app.on_event("shutdown")
async def shutdown():
    await close_mongo_connection()

# ROUTES
@app.get("/")
def root():
    return {
        "message": f"{settings.APP_NAME} API is running",
        "version": "0.1.0",
        "status": "healthy"
    }

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "app": settings.APP_NAME,
        "debug": settings.DEBUG
    }