from pydantic import BaseModel
from typing import Optional

class UserRegister(BaseModel):
    name: str
    email: str  # changed from EmailStr to str - avoids the email-validator dependency
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class UserResponse(BaseModel):
    id: str
    name: str
    email: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse