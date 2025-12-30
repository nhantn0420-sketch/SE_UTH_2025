"""
Group Models - Quản lý nhóm & không gian làm việc
"""

from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List, TYPE_CHECKING
from datetime import datetime
from enum import Enum

if TYPE_CHECKING:
    from app.models.user import User
    from app.models.academic import Class
    from app.models.project import Project
    from app.models.evaluation import GroupEvaluation, MemberEvaluation, PeerReview
    from app.models.resource import Resource
    from app.models.communication import ChatMessage, Meeting


class GroupRole(str, Enum):
    """Member role in group"""
    LEADER = "leader"      # Trưởng nhóm
    MEMBER = "member"      # Thành viên


class CheckpointStatus(str, Enum):
    """Checkpoint status"""
    NOT_STARTED = "not_started"
    IN_PROGRESS = "in_progress"
    SUBMITTED = "submitted"
    COMPLETED = "completed"


class GroupBase(SQLModel):
    """Base group fields"""
    name: str = Field(max_length=100)
    class_id: int = Field(foreign_key="classes.id")
    project_id: Optional[int] = Field(default=None, foreign_key="projects.id")
    description: Optional[str] = None


class Group(GroupBase, table=True):
    """Group database model - Nhóm"""
    __tablename__ = "groups"
    
    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Relationships
    class_: "Class" = Relationship(back_populates="groups")
    project: Optional["Project"] = Relationship(back_populates="groups")
    members: List["GroupMember"] = Relationship(back_populates="group")
    milestones: List["GroupMilestone"] = Relationship(back_populates="group")
    checkpoints: List["Checkpoint"] = Relationship(back_populates="group")
    evaluations: List["GroupEvaluation"] = Relationship(back_populates="group")
    resources: List["Resource"] = Relationship(back_populates="group")
    chat_messages: List["ChatMessage"] = Relationship(back_populates="group")
    meetings: List["Meeting"] = Relationship(back_populates="group")
    tasks: List["Task"] = Relationship(back_populates="group")


class GroupCreate(SQLModel):
    """Schema for creating a group"""
    name: str
    class_id: int
    project_id: Optional[int] = None
    description: Optional[str] = None
    member_ids: Optional[List[int]] = None


class GroupUpdate(SQLModel):
    """Schema for updating a group"""
    name: Optional[str] = None
    project_id: Optional[int] = None
    description: Optional[str] = None


class GroupResponse(GroupBase):
    """Schema for group response"""
    id: int
    created_at: datetime
    member_count: Optional[int] = 0
    progress_percentage: Optional[float] = 0.0


class GroupMemberBase(SQLModel):
    """Base group member fields"""
    group_id: int = Field(foreign_key="groups.id")
    user_id: int = Field(foreign_key="users.id")
    role: GroupRole = Field(default=GroupRole.MEMBER)


class GroupMember(GroupMemberBase, table=True):
    """Group member database model"""
    __tablename__ = "group_members"
    
    id: Optional[int] = Field(default=None, primary_key=True)
    joined_at: datetime = Field(default_factory=datetime.utcnow)
    contribution_score: float = Field(default=0.0)  # Tỷ lệ đóng góp
    
    # Relationships
    group: Group = Relationship(back_populates="members")
    user: "User" = Relationship(back_populates="group_memberships")


class GroupMilestone(SQLModel, table=True):
    """Group's progress on project milestones"""
    __tablename__ = "group_milestones"
    
    id: Optional[int] = Field(default=None, primary_key=True)
    group_id: int = Field(foreign_key="groups.id")
    milestone_id: int = Field(foreign_key="project_milestones.id")
    is_completed: bool = Field(default=False)
    completed_at: Optional[datetime] = None
    completed_by: Optional[int] = Field(default=None, foreign_key="users.id")
    notes: Optional[str] = None
    
    # Relationships
    group: Group = Relationship(back_populates="milestones")


class Checkpoint(SQLModel, table=True):
    """Checkpoints for group tasks - Điểm kiểm tra"""
    __tablename__ = "checkpoints"
    
    id: Optional[int] = Field(default=None, primary_key=True)
    group_id: int = Field(foreign_key="groups.id")
    title: str = Field(max_length=200)
    description: Optional[str] = None
    due_date: Optional[datetime] = None
    status: CheckpointStatus = Field(default=CheckpointStatus.NOT_STARTED)
    created_by: int = Field(foreign_key="users.id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Relationships
    group: Group = Relationship(back_populates="checkpoints")
    submissions: List["CheckpointSubmission"] = Relationship(back_populates="checkpoint")
    assigned_members: List["CheckpointAssignment"] = Relationship(back_populates="checkpoint")


class CheckpointAssignment(SQLModel, table=True):
    """Assignment of members to checkpoints"""
    __tablename__ = "checkpoint_assignments"
    
    id: Optional[int] = Field(default=None, primary_key=True)
    checkpoint_id: int = Field(foreign_key="checkpoints.id")
    user_id: int = Field(foreign_key="users.id")
    assigned_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Relationships
    checkpoint: Checkpoint = Relationship(back_populates="assigned_members")


class CheckpointSubmission(SQLModel, table=True):
    """Submission for checkpoints"""
    __tablename__ = "checkpoint_submissions"
    
    id: Optional[int] = Field(default=None, primary_key=True)
    checkpoint_id: int = Field(foreign_key="checkpoints.id")
    submitted_by: int = Field(foreign_key="users.id")
    content: Optional[str] = None
    file_url: Optional[str] = None
    submitted_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Relationships
    checkpoint: Checkpoint = Relationship(back_populates="submissions")


class Task(SQLModel, table=True):
    """Tasks in group workspace - Nhiệm vụ"""
    __tablename__ = "tasks"
    
    id: Optional[int] = Field(default=None, primary_key=True)
    group_id: int = Field(foreign_key="groups.id")
    title: str = Field(max_length=200)
    description: Optional[str] = None
    status: str = Field(default="todo")  # todo, in_progress, done
    priority: str = Field(default="medium")  # low, medium, high
    assigned_to: Optional[int] = Field(default=None, foreign_key="users.id")
    due_date: Optional[datetime] = None
    created_by: int = Field(foreign_key="users.id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    parent_task_id: Optional[int] = Field(default=None, foreign_key="tasks.id")
    
    # Relationships
    group: Group = Relationship(back_populates="tasks")
    subtasks: List["Task"] = Relationship(
        back_populates="parent_task",
        sa_relationship_kwargs={"remote_side": "Task.id"}
    )
    parent_task: Optional["Task"] = Relationship(
        back_populates="subtasks",
        sa_relationship_kwargs={"remote_side": "Task.parent_task_id"}
    )
