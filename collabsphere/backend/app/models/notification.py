"""
Notification Models - Hệ thống thông báo
"""

from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, TYPE_CHECKING
from datetime import datetime
from enum import Enum

if TYPE_CHECKING:
    from app.models.user import User


class NotificationType(str, Enum):
    """Type of notification"""
    # Project related
    PROJECT_APPROVED = "project_approved"
    PROJECT_REJECTED = "project_rejected"
    PROJECT_ASSIGNED = "project_assigned"
    
    # Group related
    GROUP_ASSIGNED = "group_assigned"
    GROUP_LEADER_ASSIGNED = "group_leader_assigned"
    MILESTONE_COMPLETED = "milestone_completed"
    CHECKPOINT_SUBMITTED = "checkpoint_submitted"
    CHECKPOINT_COMPLETED = "checkpoint_completed"
    
    # Evaluation related
    EVALUATION_RECEIVED = "evaluation_received"
    PEER_REVIEW_RECEIVED = "peer_review_received"
    
    # Resource related
    RESOURCE_UPLOADED = "resource_uploaded"
    
    # Communication related
    NEW_MESSAGE = "new_message"
    MEETING_SCHEDULED = "meeting_scheduled"
    MEETING_REMINDER = "meeting_reminder"
    
    # System
    SYSTEM_REPORT = "system_report"


class NotificationBase(SQLModel):
    """Base notification fields"""
    user_id: int = Field(foreign_key="users.id")
    type: NotificationType
    title: str = Field(max_length=200)
    message: str
    link: Optional[str] = None  # URL to related resource
    is_read: bool = Field(default=False)
    is_email_sent: bool = Field(default=False)


class Notification(NotificationBase, table=True):
    """Notification database model"""
    __tablename__ = "notifications"
    
    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    read_at: Optional[datetime] = None
    
    # Relationships
    user: "User" = Relationship(back_populates="notifications")


class NotificationCreate(SQLModel):
    """Schema for creating a notification"""
    user_id: int
    type: NotificationType
    title: str
    message: str
    link: Optional[str] = None
    send_email: bool = False


class NotificationResponse(NotificationBase):
    """Schema for notification response"""
    id: int
    created_at: datetime
    read_at: Optional[datetime]
