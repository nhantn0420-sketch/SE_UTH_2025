"""
Project Models - Quản lý dự án & mốc dự án
"""

from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List, TYPE_CHECKING
from datetime import datetime
from enum import Enum

if TYPE_CHECKING:
    from app.models.user import User
    from app.models.subject import Curriculum
    from app.models.academic import ClassProject
    from app.models.group import Group


class ProjectStatus(str, Enum):
    """Project approval status"""
    DRAFT = "draft"           # Bản nháp
    PENDING = "pending"       # Đang chờ phê duyệt
    APPROVED = "approved"     # Đã phê duyệt
    REJECTED = "rejected"     # Bị từ chối


class ProjectBase(SQLModel):
    """Base project fields"""
    title: str = Field(max_length=200)
    description: str
    goals: Optional[str] = None           # JSON string for project goals
    requirements: Optional[str] = None     # JSON string for requirements
    curriculum_id: Optional[int] = Field(default=None, foreign_key="curricula.id")
    creator_id: int = Field(foreign_key="users.id")
    duration_weeks: int = Field(default=12, ge=1, le=52)
    max_group_size: int = Field(default=5, ge=2, le=10)
    min_group_size: int = Field(default=3, ge=1, le=10)


class Project(ProjectBase, table=True):
    """Project database model - Dự án"""
    __tablename__ = "projects"
    
    id: Optional[int] = Field(default=None, primary_key=True)
    status: ProjectStatus = Field(default=ProjectStatus.DRAFT)
    approved_by: Optional[int] = Field(default=None, foreign_key="users.id")
    approved_at: Optional[datetime] = None
    rejection_reason: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Relationships
    creator: "User" = Relationship(
        back_populates="created_projects",
        sa_relationship_kwargs={"foreign_keys": "[Project.creator_id]"}
    )
    curriculum: Optional["Curriculum"] = Relationship(back_populates="projects")
    milestones: List["ProjectMilestone"] = Relationship(back_populates="project")
    assigned_classes: List["ClassProject"] = Relationship(back_populates="project")
    groups: List["Group"] = Relationship(back_populates="project")


class ProjectCreate(SQLModel):
    """Schema for creating a project"""
    title: str
    description: str
    goals: Optional[str] = None
    requirements: Optional[str] = None
    curriculum_id: Optional[int] = None
    duration_weeks: int = 12
    max_group_size: int = 5
    min_group_size: int = 3


class ProjectUpdate(SQLModel):
    """Schema for updating a project"""
    title: Optional[str] = None
    description: Optional[str] = None
    goals: Optional[str] = None
    requirements: Optional[str] = None
    duration_weeks: Optional[int] = None
    max_group_size: Optional[int] = None
    min_group_size: Optional[int] = None


class ProjectResponse(ProjectBase):
    """Schema for project response"""
    id: int
    status: ProjectStatus
    approved_at: Optional[datetime]
    created_at: datetime
    milestone_count: Optional[int] = 0


class ProjectMilestoneBase(SQLModel):
    """Base milestone fields"""
    project_id: int = Field(foreign_key="projects.id")
    title: str = Field(max_length=200)
    description: Optional[str] = None
    week_number: int = Field(ge=1)
    deliverables: Optional[str] = None    # JSON string for deliverables list
    order: int = Field(default=1)


class ProjectMilestone(ProjectMilestoneBase, table=True):
    """Project Milestone database model - Mốc dự án"""
    __tablename__ = "project_milestones"
    
    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Relationships
    project: Project = Relationship(back_populates="milestones")
    questions: List["MilestoneQuestion"] = Relationship(back_populates="milestone")


class MilestoneQuestion(SQLModel, table=True):
    """Questions for milestones - Câu hỏi mốc"""
    __tablename__ = "milestone_questions"
    
    id: Optional[int] = Field(default=None, primary_key=True)
    milestone_id: int = Field(foreign_key="project_milestones.id")
    question: str
    description: Optional[str] = None
    order: int = Field(default=1)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Relationships
    milestone: ProjectMilestone = Relationship(back_populates="questions")
