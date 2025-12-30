"""
Authentication Router - Login, Register, Token Management
"""

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session, select
from datetime import datetime

from app.database import get_session
from app.models.user import User, UserCreate, UserResponse, UserRole
from app.schemas.auth import Token, TokenWithUser, RefreshRequest, PasswordChange
from app.schemas.common import ResponseMessage
from app.utils.security import (
    verify_password,
    get_password_hash,
    create_access_token,
    create_refresh_token,
    verify_token
)
from app.utils.dependencies import get_current_user

router = APIRouter()


@router.post("/register", response_model=TokenWithUser)
async def register(
    user_data: UserCreate,
    session: Session = Depends(get_session)
):
    """
    Register a new user account.
    Default role is student. Admin/Staff accounts must be created by admin.
    """
    # Check if username exists
    existing_user = session.exec(
        select(User).where(User.username == user_data.username)
    ).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already registered"
        )
    
    # Check if email exists
    existing_email = session.exec(
        select(User).where(User.email == user_data.email)
    ).first()
    if existing_email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Only allow student registration through public endpoint
    if user_data.role not in [UserRole.STUDENT]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Can only register as student. Contact admin for other roles."
        )
    
    # Create new user
    new_user = User(
        username=user_data.username,
        email=user_data.email,
        full_name=user_data.full_name,
        role=user_data.role,
        phone=user_data.phone,
        hashed_password=get_password_hash(user_data.password)
    )
    
    session.add(new_user)
    session.commit()
    session.refresh(new_user)
    
    # Generate tokens
    access_token = create_access_token(data={"sub": new_user.username, "role": new_user.role.value})
    refresh_token = create_refresh_token(data={"sub": new_user.username})
    
    return TokenWithUser(
        access_token=access_token,
        refresh_token=refresh_token,
        token_type="bearer",
        user=UserResponse.model_validate(new_user)
    )


@router.post("/login", response_model=TokenWithUser)
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    session: Session = Depends(get_session)
):
    """
    Login with username OR email and password.
    Returns access and refresh tokens.
    """
    # Find user by username OR email
    user = session.exec(
        select(User).where(
            (User.username == form_data.username) | (User.email == form_data.username)
        )
    ).first()
    
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User account is deactivated"
        )
    
    # Update last login
    user.last_login = datetime.utcnow()
    session.add(user)
    session.commit()
    
    # Generate tokens
    access_token = create_access_token(data={"sub": user.username, "role": user.role.value})
    refresh_token = create_refresh_token(data={"sub": user.username})
    
    return TokenWithUser(
        access_token=access_token,
        refresh_token=refresh_token,
        token_type="bearer",
        user=UserResponse.model_validate(user)
    )


@router.post("/refresh", response_model=Token)
async def refresh_token(
    request: RefreshRequest,
    session: Session = Depends(get_session)
):
    """
    Refresh access token using refresh token.
    """
    payload = verify_token(request.refresh_token, "refresh")
    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token"
        )
    
    username = payload.get("sub")
    user = session.exec(select(User).where(User.username == username)).first()
    
    if not user or not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found or inactive"
        )
    
    # Generate new tokens
    access_token = create_access_token(data={"sub": user.username, "role": user.role.value})
    refresh_token = create_refresh_token(data={"sub": user.username})
    
    return Token(
        access_token=access_token,
        refresh_token=refresh_token,
        token_type="bearer"
    )


@router.get("/me", response_model=UserResponse)
async def get_current_user_info(
    current_user: User = Depends(get_current_user)
):
    """
    Get current authenticated user information.
    """
    return current_user


@router.post("/change-password", response_model=ResponseMessage)
async def change_password(
    password_data: PasswordChange,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Change password for current user.
    """
    if not verify_password(password_data.current_password, current_user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Current password is incorrect"
        )
    
    current_user.hashed_password = get_password_hash(password_data.new_password)
    current_user.updated_at = datetime.utcnow()
    session.add(current_user)
    session.commit()
    
    return ResponseMessage(message="Password changed successfully")


@router.post("/logout", response_model=ResponseMessage)
async def logout(current_user: User = Depends(get_current_user)):
    """
    Logout current user.
    Note: For JWT, logout is handled client-side by removing the token.
    This endpoint can be used to invalidate tokens if using a blacklist.
    """
    # TODO: Implement token blacklist with Redis for proper logout
    return ResponseMessage(message="Logged out successfully")
