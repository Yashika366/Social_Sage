# FastAPI is the web framework - like Express.js is for Node, FastAPI is for Python
from fastapi import FastAPI

# CORSMiddleware lets our React frontend (running on port 5173) talk to this backend (running on port 8000)
# Without CORS, browsers block requests between different ports as a security measure
from fastapi.middleware.cors import CORSMiddleware

# load_dotenv reads our .env file and makes those values available via os.getenv()
from dotenv import load_dotenv

# os lets us read environment variables (the secret keys from .env)
import os

# Load the .env file as soon as the app starts
# After this line runs, os.getenv("YOUTUBE_API_KEY") etc will work
load_dotenv()

# Create the FastAPI application instance
# This 'app' object is what uvicorn will run
app = FastAPI(
    title="SocialSage API",       # shows in the auto-generated docs
    description="AI-powered social media growth intelligence platform",
    version="0.1.0"
)

# CORS SETTINGS
# origins = list of frontend URLs allowed to make requests to this backend
# In development our React app runs on localhost:5173
# In production this would be your real domain e.g. "https://socialsage.ai"
origins = [
    "http://localhost:5173",   # Vite dev server
    "http://localhost:3000",   # in case you ever run React on default port
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,          # only these frontend URLs can call us
    allow_credentials=True,         # allows cookies/auth headers to be sent
    allow_methods=["*"],            # allow GET, POST, PUT, DELETE etc
    allow_headers=["*"],            # allow any headers in requests
)

# ROOT ENDPOINT - the simplest possible API route
# @app.get("/") means: when someone sends a GET request to "/" return what's below
# This is just a health check to confirm the server is running
@app.get("/")
def root():
    return {
        "message": "SocialSage API is running",
        "version": "0.1.0",
        "status": "healthy"
    }

# HEALTH CHECK ENDPOINT
# A dedicated /health route is standard practice for backends
# Monitoring tools and deployment platforms ping this to check if the server is alive
@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "app": os.getenv("APP_NAME", "SocialSage"),  # reads APP_NAME from .env, falls back to "SocialSage" if not found
        "debug": os.getenv("DEBUG", "False")
    }

# This block only runs when you execute main.py directly (python main.py)
# When uvicorn runs it, this block is skipped - uvicorn handles starting the server itself
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
    # "main:app" means "find the 'app' object inside 'main.py'"
    # reload=True means the server auto-restarts when you save changes (like Vite's hot reload)