"""
Authentication Schemas
"""

from pydantic import BaseModel
from typing import Optional, Any
from app.models.user import UserRole


class Token(BaseModel):
    """Token response schema"""
    access_token: str
    refresh_token: str
    token_type: str = "bearer"


class TokenWithUser(BaseModel):
    """Token response with user data"""
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    user: Any  # UserResponse


class TokenData(BaseModel):
    """Token payload data"""
    username: Optional[str] = None
    role: Optional[UserRole] = None


class LoginRequest(BaseModel):
    """Login request schema"""
    username: str
    password: str


class RefreshRequest(BaseModel):
    """Refresh token request"""
    refresh_token: str


class PasswordChange(BaseModel):
    """Password change request"""
    current_password: str
    new_password: str


class PasswordReset(BaseModel):
    """Password reset request"""
    email: str
