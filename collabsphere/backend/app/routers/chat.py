"""
Chat Router - Hệ thống trò chuyện nhóm
"""

from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlmodel import Session, select
from typing import List, Optional
from datetime import datetime

from app.database import get_session
from app.models.user import User, UserRole
from app.models.group import Group, GroupMember
from app.models.communication import ChatMessage
from app.schemas.common import ResponseMessage
from app.utils.dependencies import get_current_user

router = APIRouter()


@router.get("/groups/{group_id}/messages")
async def get_group_messages(
    group_id: int,
    before: Optional[datetime] = Query(None),
    limit: int = Query(50, ge=1, le=100),
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """
    Get chat messages for a group.
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
    
    statement = select(ChatMessage).where(ChatMessage.group_id == group_id)
    if before:
        statement = statement.where(ChatMessage.created_at < before)
    
    statement = statement.order_by(ChatMessage.created_at.desc()).limit(limit)
    messages = session.exec(statement).all()
    
    # Return with sender info
    result = []
    for msg in reversed(messages):
        sender = session.get(User, msg.sender_id)
        result.append({
            "id": msg.id,
            "content": msg.content,
            "message_type": msg.message_type,
            "file_url": msg.file_url,
            "created_at": msg.created_at,
            "sender": {
                "id": sender.id,
                "username": sender.username,
                "full_name": sender.full_name
            }
        })
    
    return result


@router.post("/groups/{group_id}/messages")
async def send_message(
    group_id: int,
    content: str,
    message_type: str = "text",
    file_url: Optional[str] = None,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """
    Send a chat message to a group.
    """
    group = session.get(Group, group_id)
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")
    
    # Verify membership
    if current_user.role == UserRole.STUDENT:
        member = session.exec(
            select(GroupMember).where(
                GroupMember.group_id == group_id,
                GroupMember.user_id == current_user.id
            )
        ).first()
        if not member:
            raise HTTPException(status_code=403, detail="Not a member of this group")
    
    message = ChatMessage(
        group_id=group_id,
        sender_id=current_user.id,
        content=content,
        message_type=message_type,
        file_url=file_url
    )
    
    session.add(message)
    session.commit()
    session.refresh(message)
    
    # TODO: Broadcast via WebSocket
    
    return {
        "id": message.id,
        "content": message.content,
        "message_type": message.message_type,
        "file_url": message.file_url,
        "created_at": message.created_at,
        "sender": {
            "id": current_user.id,
            "username": current_user.username,
            "full_name": current_user.full_name
        }
    }


@router.delete("/messages/{message_id}", response_model=ResponseMessage)
async def delete_message(
    message_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """
    Delete a chat message.
    """
    message = session.get(ChatMessage, message_id)
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    
    if message.sender_id != current_user.id:
        raise HTTPException(status_code=403, detail="Can only delete your own messages")
    
    session.delete(message)
    session.commit()
    
    return ResponseMessage(message="Message deleted")
