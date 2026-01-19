"""
Subject and Curriculum Models - Quản lý môn học & giáo trình
"""

from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List, TYPE_CHECKING
from datetime import datetime

if TYPE_CHECKING:
    from app.models.academic import Class
    from app.models.project import Project


class SubjectBase(SQLModel):
    """Base subject fields"""
    code: str = Field(index=True, unique=True, max_length=20)
    name: str = Field(max_length=200)
    description: Optional[str] = None
    credits: int = Field(default=3, ge=1, le=10)
    is_active: bool = Field(default=True)


class Subject(SubjectBase, table=True):
    """Subject database model - Môn học"""
    __tablename__ = "subjects"
    
    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Relationships
    curricula: List["Curriculum"] = Relationship(back_populates="subject")
    classes: List["Class"] = Relationship(back_populates="subject")


class SubjectCreate(SubjectBase):
    """Schema for creating a subject"""
    pass


class SubjectUpdate(SQLModel):
    """Schema for updating a subject"""
    name: Optional[str] = None
    description: Optional[str] = None
    credits: Optional[int] = None
    is_active: Optional[bool] = None


class SubjectResponse(SubjectBase):
    """Schema for subject response"""
    id: int
    created_at: datetime


class CurriculumBase(SQLModel):
    """Base curriculum fields"""
    subject_id: int = Field(foreign_key="subjects.id")
    title: str = Field(max_length=200)
    description: Optional[str] = None
    learning_outcomes: Optional[str] = None  # JSON string for objectives
    content_outline: Optional[str] = None    # JSON string for topics
    duration_weeks: int = Field(default=15, ge=1, le=52)
    is_active: bool = Field(default=True)


class Curriculum(CurriculumBase, table=True):
    """Curriculum database model - Giáo trình"""
    __tablename__ = "curricula"
    
    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Relationships
    subject: Subject = Relationship(back_populates="curricula")
    projects: List["Project"] = Relationship(back_populates="curriculum")


class CurriculumCreate(SQLModel):
    """Schema for creating a curriculum"""
    subject_id: Optional[int] = None  # Will be set from URL path
    title: str = Field(max_length=200)
    description: Optional[str] = None
    learning_outcomes: Optional[str] = None
    content_outline: Optional[str] = None
    duration_weeks: int = Field(default=15, ge=1, le=52)
    is_active: bool = Field(default=True)


class CurriculumUpdate(SQLModel):
    """Schema for updating a curriculum"""
    title: Optional[str] = None
    description: Optional[str] = None
    learning_outcomes: Optional[str] = None
    content_outline: Optional[str] = None
    duration_weeks: Optional[int] = None
    is_active: Optional[bool] = None


class CurriculumResponse(CurriculumBase):
    """Schema for curriculum response"""
    id: int
    created_at: datetime
    subject: Optional[SubjectResponse] = None
