"""
System Reports Model - Bug reports and feedback
"""

from typing import Optional
from datetime import datetime
from sqlmodel import SQLModel, Field, Relationship
from enum import Enum


class ReportStatus(str, Enum):
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    RESOLVED = "resolved"
    CLOSED = "closed"


class SystemReport(SQLModel, table=True):
    __tablename__ = "system_reports"
    
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="users.id", index=True)
    subject: str = Field(max_length=200)
    content: str
    status: ReportStatus = Field(default=ReportStatus.PENDING)
    admin_response: Optional[str] = None
    resolved_by_id: Optional[int] = Field(default=None, foreign_key="users.id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    resolved_at: Optional[datetime] = None
    
    # Relationships
    user: Optional["User"] = Relationship(
        sa_relationship_kwargs={"foreign_keys": "[SystemReport.user_id]"}
    )
    resolved_by: Optional["User"] = Relationship(
        sa_relationship_kwargs={"foreign_keys": "[SystemReport.resolved_by_id]"}
    )


class SystemReportCreate(SQLModel):
    subject: str = Field(max_length=200)
    content: str


class SystemReportUpdate(SQLModel):
    status: Optional[ReportStatus] = None
    admin_response: Optional[str] = None


class SystemReportResponse(SQLModel):
    id: int
    user_id: int
    subject: str
    content: str
    status: ReportStatus
    admin_response: Optional[str]
    resolved_by_id: Optional[int]
    created_at: datetime
    updated_at: datetime
    resolved_at: Optional[datetime]
    
    # Optional nested objects (populated by API)
    user: Optional[dict] = None
    resolved_by: Optional[dict] = None
    
    class Config:
        from_attributes = True
