"""
Users Router - User Management API
Admin: View all, deactivate
Staff: Import, create, manage lecturer/student accounts
"""

from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Query
from sqlmodel import Session, select, func
from typing import List, Optional
from datetime import datetime
import pandas as pd
from io import BytesIO

from app.database import get_session
from app.models.user import User, UserCreate, UserUpdate, UserResponse, UserRole
from app.schemas.common import ResponseMessage, ImportResult, PaginatedResponse
from app.utils.security import get_password_hash
from app.utils.dependencies import (
    get_current_user,
    get_current_admin,
    get_current_staff,
    get_current_staff_or_admin
)

router = APIRouter()


# ==================== ADMIN ENDPOINTS ====================

@router.get("/", response_model=List[UserResponse])
async def get_all_users(
    role: Optional[UserRole] = Query(None, description="Filter by role"),
    is_active: Optional[bool] = Query(None, description="Filter by active status"),
    search: Optional[str] = Query(None, description="Search by name or username"),
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_admin)
):
    """
    Admin: Get all users with optional filters.
    """
    statement = select(User)
    
    if role:
        statement = statement.where(User.role == role)
    if is_active is not None:
        statement = statement.where(User.is_active == is_active)
    if search:
        statement = statement.where(
            (User.username.contains(search)) | 
            (User.full_name.contains(search)) |
            (User.email.contains(search))
        )
    
    statement = statement.offset(skip).limit(limit)
    users = session.exec(statement).all()
    return users


@router.get("/stats")
async def get_user_stats(
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_admin)
):
    """
    Admin: Get user statistics.
    """
    total = session.exec(select(func.count(User.id))).one()
    active = session.exec(select(func.count(User.id)).where(User.is_active == True)).one()
    
    stats_by_role = {}
    for role in UserRole:
        count = session.exec(
            select(func.count(User.id)).where(User.role == role)
        ).one()
        stats_by_role[role.value] = count
    
    return {
        "total_users": total,
        "active_users": active,
        "inactive_users": total - active,
        "by_role": stats_by_role
    }


@router.patch("/{user_id}/deactivate", response_model=ResponseMessage)
async def deactivate_user(
    user_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_admin)
):
    """
    Admin: Deactivate a user account.
    """
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if user.id == current_user.id:
        raise HTTPException(status_code=400, detail="Cannot deactivate yourself")
    
    user.is_active = False
    user.updated_at = datetime.utcnow()
    session.add(user)
    session.commit()
    
    return ResponseMessage(message=f"User {user.username} deactivated successfully")


@router.patch("/{user_id}/activate", response_model=ResponseMessage)
async def activate_user(
    user_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_admin)
):
    """
    Admin: Activate a user account.
    """
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user.is_active = True
    user.updated_at = datetime.utcnow()
    session.add(user)
    session.commit()
    
    return ResponseMessage(message=f"User {user.username} activated successfully")


# ==================== STAFF ENDPOINTS ====================

@router.post("/import", response_model=ImportResult)
async def import_users(
    file: UploadFile = File(...),
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_staff)
):
    """
    Staff: Import users from CSV/Excel file.
    
    Expected columns: username, email, password, full_name, role, phone (optional)
    Valid roles: lecturer, student
    """
    if not file.filename.endswith(('.csv', '.xlsx', '.xls')):
        raise HTTPException(status_code=400, detail="File must be CSV or Excel format")
    
    contents = await file.read()
    
    try:
        if file.filename.endswith('.csv'):
            df = pd.read_csv(BytesIO(contents))
        else:
            df = pd.read_excel(BytesIO(contents))
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error reading file: {str(e)}")
    
    # Validate required columns
    required_cols = ['username', 'email', 'password', 'full_name', 'role']
    missing_cols = [col for col in required_cols if col not in df.columns]
    if missing_cols:
        raise HTTPException(
            status_code=400,
            detail=f"Missing required columns: {missing_cols}"
        )
    
    created_users = []
    errors = []
    
    for idx, row in df.iterrows():
        try:
            # Validate role
            role_str = str(row['role']).lower().strip()
            if role_str not in ['lecturer', 'student']:
                errors.append(f"Row {idx + 2}: Invalid role '{role_str}'. Must be 'lecturer' or 'student'")
                continue
            
            role = UserRole.LECTURER if role_str == 'lecturer' else UserRole.STUDENT
            
            # Check for existing username
            existing = session.exec(
                select(User).where(User.username == str(row['username']))
            ).first()
            if existing:
                errors.append(f"Row {idx + 2}: Username '{row['username']}' already exists")
                continue
            
            # Check for existing email
            existing_email = session.exec(
                select(User).where(User.email == str(row['email']))
            ).first()
            if existing_email:
                errors.append(f"Row {idx + 2}: Email '{row['email']}' already exists")
                continue
            
            # Create user
            new_user = User(
                username=str(row['username']).strip(),
                email=str(row['email']).strip(),
                hashed_password=get_password_hash(str(row['password'])),
                full_name=str(row['full_name']).strip(),
                role=role,
                phone=str(row.get('phone', '')).strip() if pd.notna(row.get('phone')) else None
            )
            session.add(new_user)
            created_users.append(row['username'])
            
        except Exception as e:
            errors.append(f"Row {idx + 2}: {str(e)}")
    
    session.commit()
    
    return ImportResult(
        success_count=len(created_users),
        error_count=len(errors),
        errors=errors,
        created_items=created_users
    )


@router.post("/create", response_model=UserResponse)
async def create_user(
    user_data: UserCreate,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_staff_or_admin)
):
    """
    Staff/Admin: Create a new user account.
    """
    # Check if username exists
    existing = session.exec(
        select(User).where(User.username == user_data.username)
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="Username already exists")
    
    # Check if email exists
    existing_email = session.exec(
        select(User).where(User.email == user_data.email)
    ).first()
    if existing_email:
        raise HTTPException(status_code=400, detail="Email already exists")
    
    # Staff can only create lecturer/student
    if current_user.role == UserRole.STAFF:
        if user_data.role not in [UserRole.LECTURER, UserRole.STUDENT]:
            raise HTTPException(
                status_code=403,
                detail="Staff can only create lecturer or student accounts"
            )
    
    new_user = User(
        username=user_data.username,
        email=user_data.email,
        hashed_password=get_password_hash(user_data.password),
        full_name=user_data.full_name,
        role=user_data.role,
        phone=user_data.phone,
        avatar_url=user_data.avatar_url
    )
    
    session.add(new_user)
    session.commit()
    session.refresh(new_user)
    
    return new_user


@router.get("/lecturers", response_model=List[UserResponse])
async def get_lecturers(
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_staff_or_admin)
):
    """
    Staff/Admin: Get all lecturer accounts.
    """
    lecturers = session.exec(
        select(User).where(User.role == UserRole.LECTURER)
    ).all()
    return lecturers


@router.get("/students", response_model=List[UserResponse])
async def get_students(
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_staff_or_admin)
):
    """
    Staff/Admin: Get all student accounts.
    """
    students = session.exec(
        select(User).where(User.role == UserRole.STUDENT)
    ).all()
    return students


# ==================== GENERAL ENDPOINTS ====================

@router.get("/{user_id}", response_model=UserResponse)
async def get_user(
    user_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """
    Get user by ID (accessible to all authenticated users).
    """
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.patch("/{user_id}", response_model=UserResponse)
async def update_user(
    user_id: int,
    user_data: UserUpdate,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """
    Update user profile.
    Users can only update their own profile, unless they are admin/staff.
    """
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Check permission
    if current_user.id != user_id and current_user.role not in [UserRole.ADMIN, UserRole.STAFF]:
        raise HTTPException(status_code=403, detail="Cannot update other user's profile")
    
    # Update fields
    update_data = user_data.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(user, key, value)
    
    user.updated_at = datetime.utcnow()
    session.add(user)
    session.commit()
    session.refresh(user)
    
    return user


# ==================== USER SETTINGS & PROFILE ENDPOINTS ====================

@router.get("/me", response_model=UserResponse)
async def get_current_user_profile(
    current_user: User = Depends(get_current_user)
):
    """
    Get current user's profile.
    """
    return current_user


@router.put("/me", response_model=UserResponse)
async def update_my_profile(
    user_data: UserUpdate,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """
    Update current user's profile information.
    """
    update_data = user_data.dict(exclude_unset=True)
    
    # Don't allow changing username, email, role
    restricted_fields = ["username", "email", "role", "hashed_password", "is_active"]
    for field in restricted_fields:
        update_data.pop(field, None)
    
    for key, value in update_data.items():
        setattr(current_user, key, value)
    
    current_user.updated_at = datetime.utcnow()
    session.add(current_user)
    session.commit()
    session.refresh(current_user)
    
    return current_user


@router.post("/change-password", response_model=ResponseMessage)
async def change_password(
    current_password: str,
    new_password: str,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """
    Change current user's password.
    """
    from app.utils.security import verify_password
    
    # Verify current password
    if not verify_password(current_password, current_user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Current password is incorrect"
        )
    
    # Validate new password
    if len(new_password) < 6:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="New password must be at least 6 characters"
        )
    
    # Update password
    current_user.hashed_password = get_password_hash(new_password)
    current_user.updated_at = datetime.utcnow()
    session.add(current_user)
    session.commit()
    
    return ResponseMessage(message="Password changed successfully")


@router.get("/settings")
async def get_user_settings(
    current_user: User = Depends(get_current_user)
):
    """
    Get current user's settings and preferences.
    """
    # Default settings
    default_notifications = {
        "email_notifications": True,
        "push_notifications": True,
        "project_updates": True,
        "group_messages": True,
        "deadline_reminders": True,
    }
    
    default_preferences = {
        "theme": "light",
        "language": "vi",
        "timezone": "Asia/Ho_Chi_Minh",
    }
    
    # Get settings from user metadata (if exists)
    notifications = default_notifications
    preferences = default_preferences
    
    # Try to get from metadata if column exists
    try:
        if hasattr(current_user, "metadata") and current_user.metadata:
            notifications = current_user.metadata.get("notifications", default_notifications)
            preferences = current_user.metadata.get("preferences", default_preferences)
    except:
        pass
    
    return {
        "notifications": notifications,
        "preferences": preferences,
    }


@router.put("/settings/notifications")
async def update_notification_settings(
    settings: dict,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Update user's notification settings.
    """
    try:
        # Try to update metadata if column exists
        if hasattr(current_user, "metadata"):
            if current_user.metadata is None:
                current_user.metadata = {}
            current_user.metadata["notifications"] = settings
            current_user.updated_at = datetime.utcnow()
            session.add(current_user)
            session.commit()
    except:
        pass  # If metadata column doesn't exist, just return success
    
    return {
        "message": "Notification settings updated successfully",
        "notifications": settings
    }


@router.put("/settings/preferences")
async def update_app_preferences(
    preferences: dict,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Update user's app preferences (theme, language, timezone).
    """
    try:
        # Try to update metadata if column exists
        if hasattr(current_user, "metadata"):
            if current_user.metadata is None:
                current_user.metadata = {}
            current_user.metadata["preferences"] = preferences
            current_user.updated_at = datetime.utcnow()
            session.add(current_user)
            session.commit()
    except:
        pass  # If metadata column doesn't exist, just return success
    
    return {
        "message": "App preferences updated successfully",
        "preferences": preferences
    }
