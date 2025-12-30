"""
Academic Models - Quản lý lớp học
"""

from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List, TYPE_CHECKING
from datetime import datetime
from enum import Enum

if TYPE_CHECKING:
    from app.models.user import User
    from app.models.subject import Subject
    from app.models.project import Project
    from app.models.group import Group
    from app.models.resource import Resource


class Semester(str, Enum):
    """Academic semester"""
    SPRING = "spring"    # Học kỳ 1
    SUMMER = "summer"    # Học kỳ hè
    FALL = "fall"        # Học kỳ 2


class ClassBase(SQLModel):
    """Base class fields"""
    code: str = Field(index=True, unique=True, max_length=20)
    name: str = Field(max_length=200)
    subject_id: int = Field(foreign_key="subjects.id")
    lecturer_id: Optional[int] = Field(default=None, foreign_key="users.id")
    semester: Semester = Field(default=Semester.FALL)
    academic_year: str = Field(max_length=10)  # e.g., "2024-2025"
    max_students: int = Field(default=40, ge=1, le=100)
    is_active: bool = Field(default=True)


class Class(ClassBase, table=True):
    """Class database model - Lớp học"""
    __tablename__ = "classes"
    
    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Relationships
    subject: "Subject" = Relationship(back_populates="classes")
    members: List["ClassMember"] = Relationship(back_populates="class_")
    assigned_projects: List["ClassProject"] = Relationship(back_populates="class_")
    groups: List["Group"] = Relationship(back_populates="class_")
    resources: List["Resource"] = Relationship(back_populates="class_")


class ClassCreate(ClassBase):
    """Schema for creating a class"""
    pass


class ClassUpdate(SQLModel):
    """Schema for updating a class"""
    name: Optional[str] = None
    lecturer_id: Optional[int] = None
    max_students: Optional[int] = None
    is_active: Optional[bool] = None


class ClassResponse(ClassBase):
    """Schema for class response"""
    id: int
    created_at: datetime
    student_count: Optional[int] = 0


class ClassMemberBase(SQLModel):
    """Base class member fields"""
    class_id: int = Field(foreign_key="classes.id")
    user_id: int = Field(foreign_key="users.id")


class ClassMember(ClassMemberBase, table=True):
    """Class member database model - Thành viên lớp"""
    __tablename__ = "class_members"
    
    id: Optional[int] = Field(default=None, primary_key=True)
    joined_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Relationships
    class_: Class = Relationship(back_populates="members")
    user: "User" = Relationship(back_populates="class_memberships")


class ClassProject(SQLModel, table=True):
    """Many-to-many relationship between Class and Project"""
    __tablename__ = "class_projects"
    
    id: Optional[int] = Field(default=None, primary_key=True)
    class_id: int = Field(foreign_key="classes.id")
    project_id: int = Field(foreign_key="projects.id")
    assigned_at: datetime = Field(default_factory=datetime.utcnow)
    assigned_by: int = Field(foreign_key="users.id")  # Head/Lecturer who assigned
    
    # Relationships
    class_: Class = Relationship(back_populates="assigned_projects")
    project: "Project" = Relationship(back_populates="assigned_classes")
