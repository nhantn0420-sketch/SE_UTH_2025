"""
User Model - Quản lý tài khoản người dùng
5 vai trò: Admin, Staff, Department Head, Lecturer, Student
"""

from sqlmodel import SQLModel, Field, Relationship, Column
from sqlalchemy import JSON
from typing import Optional, List, TYPE_CHECKING, Dict, Any
from datetime import datetime
from enum import Enum

if TYPE_CHECKING:
    from app.models.academic import ClassMember
    from app.models.group import GroupMember
    from app.models.project import Project
    from app.models.evaluation import MemberEvaluation, PeerReview, MilestoneAnswer
    from app.models.notification import Notification
    from app.models.communication import ChatMessage


class UserRole(str, Enum):
    """User roles in the system"""
    ADMIN = "admin"              # Quản trị viên
    STAFF = "staff"              # Nhân viên
    HEAD = "head"                # Trưởng khoa
    LECTURER = "lecturer"        # Giảng viên
    STUDENT = "student"          # Sinh viên


class UserBase(SQLModel):
    """Base user fields"""
    username: str = Field(index=True, unique=True, min_length=3, max_length=50)
    email: str = Field(index=True, unique=True)
    full_name: str = Field(max_length=100)
    role: UserRole = Field(default=UserRole.STUDENT)
    avatar_url: Optional[str] = None
    phone: Optional[str] = None
    is_active: bool = Field(default=True)


class User(UserBase, table=True):
    """User database model"""
    __tablename__ = "users"
    
    id: Optional[int] = Field(default=None, primary_key=True)
    hashed_password: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    last_login: Optional[datetime] = None
    user_settings: Optional[Dict[str, Any]] = Field(default=None, sa_column=Column(JSON))
    
    # Relationships
    class_memberships: List["ClassMember"] = Relationship(back_populates="user")
    group_memberships: List["GroupMember"] = Relationship(back_populates="user")
    created_projects: List["Project"] = Relationship(
        back_populates="creator",
        sa_relationship_kwargs={"foreign_keys": "[Project.creator_id]"}
    )
    evaluations_received: List["MemberEvaluation"] = Relationship(
        back_populates="member",
        sa_relationship_kwargs={"foreign_keys": "[MemberEvaluation.member_id]"}
    )
    evaluations_given: List["MemberEvaluation"] = Relationship(
        back_populates="evaluator",
        sa_relationship_kwargs={"foreign_keys": "[MemberEvaluation.evaluator_id]"}
    )
    peer_reviews_received: List["PeerReview"] = Relationship(
        back_populates="reviewee",
        sa_relationship_kwargs={"foreign_keys": "[PeerReview.reviewee_id]"}
    )
    peer_reviews_given: List["PeerReview"] = Relationship(
        back_populates="reviewer",
        sa_relationship_kwargs={"foreign_keys": "[PeerReview.reviewer_id]"}
    )
    milestone_answers: List["MilestoneAnswer"] = Relationship(back_populates="user")
    notifications: List["Notification"] = Relationship(back_populates="user")
    chat_messages: List["ChatMessage"] = Relationship(back_populates="sender")


class UserCreate(UserBase):
    """Schema for creating a user"""
    password: str = Field(min_length=6)


class UserUpdate(SQLModel):
    """Schema for updating a user"""
    full_name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    avatar_url: Optional[str] = None
    is_active: Optional[bool] = None


class UserResponse(UserBase):
    """Schema for user response"""
    id: int
    created_at: datetime
    last_login: Optional[datetime]


class UserLogin(SQLModel):
    """Schema for user login"""
    username: str
    password: str
