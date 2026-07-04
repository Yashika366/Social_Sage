# motor is the async MongoDB driver - works with FastAPI's async nature
# pymongo is synchronous, motor wraps it to be async
import motor.motor_asyncio

# os to read environment variables as a fallback
import os

# import our settings object we just created
from app.config.settings import settings

# Create the MongoDB client
# This is the connection to your MongoDB server (local or Atlas)
# motor.motor_asyncio = async version, required for FastAPI
client = motor.motor_asyncio.AsyncIOMotorClient(settings.MONGODB_URL)

# Select which database to use inside MongoDB
# MongoDB creates this database automatically if it doesn't exist yet
database = client[settings.DATABASE_NAME]

# Define our collections (like tables in SQL)
# These also get created automatically when you first insert data
# We define them here so every file imports from one place
users_collection = database["users"]
channels_collection = database["channels"]
videos_collection = database["videos"]
insights_collection = database["insights"]

# connect_to_mongo and close_mongo_connection are lifecycle functions
# FastAPI calls these when the server STARTS and STOPS
# This is the proper way to manage database connections in FastAPI
async def connect_to_mongo():
    # ping the database to confirm the connection actually works
    try:
        await client.admin.command("ping")
        print("✅ Connected to MongoDB successfully")
    except Exception as e:
        print(f"❌ MongoDB connection failed: {e}")

async def close_mongo_connection():
    client.close()
    print("MongoDB connection closed")