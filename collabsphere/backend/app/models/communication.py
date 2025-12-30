"""
Communication Models - Chat & Meeting
"""

from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List, TYPE_CHECKING
from datetime import datetime
from enum import Enum

if TYPE_CHECKING:
    from app.models.user import User
    from app.models.group import Group


class MeetingStatus(str, Enum):
    """Meeting status"""
    SCHEDULED = "scheduled"
    ACTIVE = "active"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    ENDED = "ended"
    CANCELLED = "cancelled"


class ChatMessage(SQLModel, table=True):
    """Chat message model"""
    __tablename__ = "chat_messages"
    
    id: Optional[int] = Field(default=None, primary_key=True)
    group_id: int = Field(foreign_key="groups.id")
    sender_id: int = Field(foreign_key="users.id")
    content: str
    message_type: str = Field(default="text")  # text, file, image
    file_url: Optional[str] = None
    is_edited: bool = Field(default=False)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Relationships
    group: "Group" = Relationship(back_populates="chat_messages")
    sender: "User" = Relationship(back_populates="chat_messages")


class Meeting(SQLModel, table=True):
    """Video/Audio meeting model"""
    __tablename__ = "meetings"
    
    id: Optional[int] = Field(default=None, primary_key=True)
    group_id: int = Field(foreign_key="groups.id")
    title: str = Field(max_length=200)
    description: Optional[str] = None
    scheduled_at: datetime
    duration_minutes: int = Field(default=60)
    status: MeetingStatus = Field(default=MeetingStatus.SCHEDULED)
    meeting_url: Optional[str] = None
    created_by: int = Field(foreign_key="users.id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    started_at: Optional[datetime] = None
    ended_at: Optional[datetime] = None
    
    # Relationships
    group: "Group" = Relationship(back_populates="meetings")
    participants: List["MeetingParticipant"] = Relationship(back_populates="meeting")


class MeetingParticipant(SQLModel, table=True):
    """Meeting participant"""
    __tablename__ = "meeting_participants"
    
    id: Optional[int] = Field(default=None, primary_key=True)
    meeting_id: int = Field(foreign_key="meetings.id")
    user_id: int = Field(foreign_key="users.id")
    joined_at: Optional[datetime] = None
    left_at: Optional[datetime] = None
    is_host: bool = Field(default=False)
    
    # Relationships
    meeting: Meeting = Relationship(back_populates="participants")


class WhiteboardSession(SQLModel, table=True):
    """Whiteboard collaboration session"""
    __tablename__ = "whiteboard_sessions"
    
    id: Optional[int] = Field(default=None, primary_key=True)
    group_id: int = Field(foreign_key="groups.id")
    name: str = Field(max_length=200)
    data: Optional[str] = None  # JSON string for whiteboard data
    created_by: int = Field(foreign_key="users.id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


class DocumentSession(SQLModel, table=True):
    """Collaborative document editing session"""
    __tablename__ = "document_sessions"
    
    id: Optional[int] = Field(default=None, primary_key=True)
    group_id: int = Field(foreign_key="groups.id")
    title: str = Field(max_length=200)
    content: Optional[str] = None
    created_by: int = Field(foreign_key="users.id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
