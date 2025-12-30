"""
Notifications Router - Hệ thống thông báo
"""

from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlmodel import Session, select, func
from typing import List, Optional
from datetime import datetime

from app.database import get_session
from app.models.user import User
from app.models.notification import (
    Notification, NotificationCreate, NotificationResponse, NotificationType
)
from app.schemas.common import ResponseMessage
from app.utils.dependencies import get_current_user

router = APIRouter()


@router.get("/", response_model=List[NotificationResponse])
async def get_notifications(
    is_read: Optional[bool] = Query(None),
    notification_type: Optional[NotificationType] = Query(None),
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """
    Get current user's notifications.
    """
    statement = select(Notification).where(Notification.user_id == current_user.id)
    
    if is_read is not None:
        statement = statement.where(Notification.is_read == is_read)
    if notification_type:
        statement = statement.where(Notification.type == notification_type)
    
    statement = statement.order_by(Notification.created_at.desc())
    statement = statement.offset(skip).limit(limit)
    
    notifications = session.exec(statement).all()
    return notifications


@router.get("/unread-count")
async def get_unread_count(
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """
    Get count of unread notifications.
    """
    count = session.exec(
        select(func.count(Notification.id)).where(
            Notification.user_id == current_user.id,
            Notification.is_read == False
        )
    ).one()
    return {"unread_count": count}


@router.post("/{notification_id}/read", response_model=ResponseMessage)
async def mark_as_read(
    notification_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """
    Mark a notification as read.
    """
    notification = session.get(Notification, notification_id)
    if not notification:
        raise HTTPException(status_code=404, detail="Notification not found")
    
    if notification.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Access denied")
    
    notification.is_read = True
    notification.read_at = datetime.utcnow()
    session.add(notification)
    session.commit()
    
    return ResponseMessage(message="Notification marked as read")


@router.post("/read-all", response_model=ResponseMessage)
async def mark_all_as_read(
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """
    Mark all notifications as read.
    """
    notifications = session.exec(
        select(Notification).where(
            Notification.user_id == current_user.id,
            Notification.is_read == False
        )
    ).all()
    
    for notification in notifications:
        notification.is_read = True
        notification.read_at = datetime.utcnow()
        session.add(notification)
    
    session.commit()
    
    return ResponseMessage(message=f"Marked {len(notifications)} notifications as read")


@router.delete("/{notification_id}", response_model=ResponseMessage)
async def delete_notification(
    notification_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """
    Delete a notification.
    """
    notification = session.get(Notification, notification_id)
    if not notification:
        raise HTTPException(status_code=404, detail="Notification not found")
    
    if notification.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Access denied")
    
    session.delete(notification)
    session.commit()
    
    return ResponseMessage(message="Notification deleted")


@router.delete("/", response_model=ResponseMessage)
async def clear_all_notifications(
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """
    Clear all notifications for current user.
    """
    notifications = session.exec(
        select(Notification).where(Notification.user_id == current_user.id)
    ).all()
    
    for notification in notifications:
        session.delete(notification)
    
    session.commit()
    
    return ResponseMessage(message=f"Cleared {len(notifications)} notifications")
