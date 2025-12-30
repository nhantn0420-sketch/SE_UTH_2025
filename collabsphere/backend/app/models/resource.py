"""
Resource Models - Quản lý tài nguyên (files, documents)
"""

from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, TYPE_CHECKING
from datetime import datetime
from enum import Enum

if TYPE_CHECKING:
    from app.models.user import User
    from app.models.academic import Class
    from app.models.group import Group


class ResourceType(str, Enum):
    """Type of resource"""
    DOCUMENT = "document"
    SLIDE = "slide"
    IMAGE = "image"
    VIDEO = "video"
    AUDIO = "audio"
    ARCHIVE = "archive"
    OTHER = "other"


class ResourceBase(SQLModel):
    """Base resource fields"""
    name: str = Field(max_length=255)
    description: Optional[str] = None
    file_url: str
    file_size: Optional[int] = None  # in bytes
    file_type: Optional[str] = None  # MIME type
    resource_type: ResourceType = Field(default=ResourceType.DOCUMENT)
    class_id: Optional[int] = Field(default=None, foreign_key="classes.id")
    group_id: Optional[int] = Field(default=None, foreign_key="groups.id")
    uploaded_by: int = Field(foreign_key="users.id")


class Resource(ResourceBase, table=True):
    """Resource database model"""
    __tablename__ = "resources"
    
    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Relationships
    class_: Optional["Class"] = Relationship(back_populates="resources")
    group: Optional["Group"] = Relationship(back_populates="resources")


class ResourceCreate(SQLModel):
    """Schema for creating a resource"""
    name: str
    description: Optional[str] = None
    file_url: str
    file_size: Optional[int] = None
    file_type: Optional[str] = None
    resource_type: ResourceType = ResourceType.DOCUMENT
    class_id: Optional[int] = None
    group_id: Optional[int] = None


class ResourceResponse(ResourceBase):
    """Schema for resource response"""
    id: int
    created_at: datetime
