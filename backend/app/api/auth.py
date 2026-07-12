from fastapi import APIRouter, HTTPException
from app.schemas.user import UserRegister, UserLogin, TokenResponse, UserResponse
from app.database.connection import users_collection
from app.utils.auth import hash_password, verify_password, create_access_token
from datetime import datetime

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register")
async def register(user_data: UserRegister):
    """
    Creates a new user account
    1. Check email isn't already registered
    2. Hash the password
    3. Store in MongoDB
    4. Return a JWT token so user is logged in immediately after registering
    """

    # Check if email already exists in database
    existing_user = await users_collection.find_one({"email": user_data.email})
    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="An account with this email already exists"
        )

    # Hash the password - NEVER store plain text
    hashed = hash_password(user_data.password)

    # Build user document to store in MongoDB
    new_user = {
        "name": user_data.name,
        "email": user_data.email,
        "password": hashed,      # store only the hash
        "created_at": datetime.utcnow(),
        "channels": []            # list of connected YouTube channels
    }

    # Insert into MongoDB
    result = await users_collection.insert_one(new_user)

    # result.inserted_id = the MongoDB _id of the new document
    user_id = str(result.inserted_id)

    # Create JWT token with user's id and email as payload
    token = create_access_token({
        "sub": user_id,           # "sub" = subject, standard JWT field
        "email": user_data.email,
        "name": user_data.name
    })

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user_id,
            "name": user_data.name,
            "email": user_data.email
        }
    }


@router.post("/login")
async def login(user_data: UserLogin):
    """
    Logs in an existing user
    1. Find user by email
    2. Verify password matches the stored hash
    3. Return a fresh JWT token
    """

    # Find user by email
    user = await users_collection.find_one({"email": user_data.email})

    # If user not found OR password doesn't match
    # We give the same error for both cases - don't reveal which one failed
    # (security best practice - don't help attackers know if email exists)
    if not user or not verify_password(user_data.password, user["password"]):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    user_id = str(user["_id"])

    # Create fresh JWT token
    token = create_access_token({
        "sub": user_id,
        "email": user["email"],
        "name": user["name"]
    })

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user_id,
            "name": user["name"],
            "email": user["email"]
        }
    }


@router.get("/me")
async def get_me(token: str):
    """
    Returns current user's info from their JWT token
    This is how the frontend checks if a user is still logged in
    """
    from app.utils.auth import verify_token
    payload = verify_token(token)

    if not payload:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token"
        )

    return {
        "id": payload.get("sub"),
        "email": payload.get("email"),
        "name": payload.get("name")
    }