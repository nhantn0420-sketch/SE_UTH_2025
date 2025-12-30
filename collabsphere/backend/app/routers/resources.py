"""
Resources Router - Quản lý tài nguyên
"""

from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Query
from sqlmodel import Session, select
from typing import List, Optional
from datetime import datetime

from app.database import get_session
from app.models.user import User, UserRole
from app.models.academic import Class, ClassMember
from app.models.group import Group, GroupMember
from app.models.resource import Resource, ResourceCreate, ResourceResponse, ResourceType
from app.schemas.common import ResponseMessage
from app.utils.dependencies import get_current_user, get_current_lecturer

router = APIRouter()


# ==================== CLASS RESOURCES ====================

@router.get("/class/{class_id}", response_model=List[ResourceResponse])
async def get_class_resources(
    class_id: int,
    resource_type: Optional[ResourceType] = Query(None),
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """
    Get all resources for a class.
    """
    cls = session.get(Class, class_id)
    if not cls:
        raise HTTPException(status_code=404, detail="Class not found")
    
    # Verify access
    if current_user.role == UserRole.STUDENT:
        member = session.exec(
            select(ClassMember).where(
                ClassMember.class_id == class_id,
                ClassMember.user_id == current_user.id
            )
        ).first()
        if not member:
            raise HTTPException(status_code=403, detail="Not enrolled in this class")
    
    statement = select(Resource).where(Resource.class_id == class_id)
    if resource_type:
        statement = statement.where(Resource.resource_type == resource_type)
    
    resources = session.exec(statement).all()
    return resources


@router.post("/class/{class_id}", response_model=ResourceResponse)
async def upload_class_resource(
    class_id: int,
    resource_data: ResourceCreate,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_lecturer)
):
    """
    Lecturer: Upload a resource to a class.
    """
    cls = session.get(Class, class_id)
    if not cls:
        raise HTTPException(status_code=404, detail="Class not found")
    
    if cls.lecturer_id != current_user.id:
        raise HTTPException(status_code=403, detail="Can only upload to your own classes")
    
    resource = Resource(
        **resource_data.dict(),
        class_id=class_id,
        uploaded_by=current_user.id
    )
    
    session.add(resource)
    session.commit()
    session.refresh(resource)
    
    # TODO: Send notification to class members
    
    return resource


# ==================== GROUP RESOURCES ====================

@router.get("/group/{group_id}", response_model=List[ResourceResponse])
async def get_group_resources(
    group_id: int,
    resource_type: Optional[ResourceType] = Query(None),
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """
    Get all resources for a group.
    """
    group = session.get(Group, group_id)
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")
    
    # Verify access
    if current_user.role == UserRole.STUDENT:
        member = session.exec(
            select(GroupMember).where(
                GroupMember.group_id == group_id,
                GroupMember.user_id == current_user.id
            )
        ).first()
        if not member:
            raise HTTPException(status_code=403, detail="Not a member of this group")
    
    statement = select(Resource).where(Resource.group_id == group_id)
    if resource_type:
        statement = statement.where(Resource.resource_type == resource_type)
    
    resources = session.exec(statement).all()
    return resources


@router.post("/group/{group_id}", response_model=ResourceResponse)
async def upload_group_resource(
    group_id: int,
    resource_data: ResourceCreate,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """
    Upload a resource to a group.
    """
    group = session.get(Group, group_id)
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")
    
    # Verify access (lecturer or group member)
    if current_user.role == UserRole.STUDENT:
        member = session.exec(
            select(GroupMember).where(
                GroupMember.group_id == group_id,
                GroupMember.user_id == current_user.id
            )
        ).first()
        if not member:
            raise HTTPException(status_code=403, detail="Not a member of this group")
    
    resource = Resource(
        **resource_data.dict(),
        group_id=group_id,
        uploaded_by=current_user.id
    )
    
    session.add(resource)
    session.commit()
    session.refresh(resource)
    
    # TODO: Send notification to group members
    
    return resource


# ==================== RESOURCE MANAGEMENT ====================

@router.get("/{resource_id}", response_model=ResourceResponse)
async def get_resource(
    resource_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """
    Get resource by ID.
    """
    resource = session.get(Resource, resource_id)
    if not resource:
        raise HTTPException(status_code=404, detail="Resource not found")
    return resource


@router.delete("/{resource_id}", response_model=ResponseMessage)
async def delete_resource(
    resource_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """
    Delete a resource.
    Only uploader, lecturer, or admin can delete.
    """
    resource = session.get(Resource, resource_id)
    if not resource:
        raise HTTPException(status_code=404, detail="Resource not found")
    
    # Check permission
    can_delete = (
        resource.uploaded_by == current_user.id or
        current_user.role in [UserRole.ADMIN, UserRole.STAFF]
    )
    
    if not can_delete and current_user.role == UserRole.LECTURER:
        if resource.class_id:
            cls = session.get(Class, resource.class_id)
            can_delete = cls.lecturer_id == current_user.id
    
    if not can_delete:
        raise HTTPException(status_code=403, detail="Cannot delete this resource")
    
    session.delete(resource)
    session.commit()
    
    # TODO: Delete from Cloudinary if needed
    
    return ResponseMessage(message="Resource deleted")
