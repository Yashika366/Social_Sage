# BaseSettings from pydantic reads values from the .env file automatically
# pydantic is installed with FastAPI so no extra install needed
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # Each variable here maps directly to a key in your .env file
    # If the .env key is missing, it uses the default value on the right
    
    # App settings
    APP_NAME: str = "SocialSage"
    DEBUG: bool = True
    
    # MongoDB settings
    MONGODB_URL: str = "mongodb://localhost:27017"
    DATABASE_NAME: str = "socialsage"
    
    # YouTube API
    YOUTUBE_API_KEY: str = ""
    
    # OpenAI
    OPENAI_API_KEY: str = ""

    class Config:
        # tells pydantic WHERE to find the .env file
        env_file = ".env"
        # case_sensitive = False means YOUTUBE_API_KEY and youtube_api_key both work
        case_sensitive = False

# Create ONE settings instance that every other file imports and reuses
# This pattern is called a singleton - one shared object, not a new one every import
settings = Settings()