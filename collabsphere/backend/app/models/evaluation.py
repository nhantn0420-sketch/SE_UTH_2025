"""
Evaluation Models - Đánh giá & Phản hồi
"""

from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List, TYPE_CHECKING
from datetime import datetime

if TYPE_CHECKING:
    from app.models.user import User
    from app.models.group import Group, Checkpoint


class GroupEvaluation(SQLModel, table=True):
    """Evaluation for entire group - Đánh giá nhóm"""
    __tablename__ = "group_evaluations"
    
    id: Optional[int] = Field(default=None, primary_key=True)
    group_id: int = Field(foreign_key="groups.id")
    evaluator_id: int = Field(foreign_key="users.id")  # Lecturer
    score: float = Field(ge=0, le=10)
    feedback: Optional[str] = None
    criteria_scores: Optional[str] = None  # JSON for detailed scores
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Relationships
    group: "Group" = Relationship(back_populates="evaluations")


class MemberEvaluation(SQLModel, table=True):
    """Evaluation for individual member - Đánh giá thành viên"""
    __tablename__ = "member_evaluations"
    
    id: Optional[int] = Field(default=None, primary_key=True)
    member_id: int = Field(foreign_key="users.id")
    evaluator_id: int = Field(foreign_key="users.id")  # Lecturer
    group_id: int = Field(foreign_key="groups.id")
    score: float = Field(ge=0, le=10)
    contribution_assessment: Optional[str] = None
    feedback: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Relationships
    member: "User" = Relationship(
        back_populates="evaluations_received",
        sa_relationship_kwargs={"foreign_keys": "[MemberEvaluation.member_id]"}
    )
    evaluator: "User" = Relationship(
        back_populates="evaluations_given",
        sa_relationship_kwargs={"foreign_keys": "[MemberEvaluation.evaluator_id]"}
    )


class PeerReview(SQLModel, table=True):
    """Peer review between group members - Đánh giá ngang hàng"""
    __tablename__ = "peer_reviews"
    
    id: Optional[int] = Field(default=None, primary_key=True)
    reviewer_id: int = Field(foreign_key="users.id")
    reviewee_id: int = Field(foreign_key="users.id")
    group_id: int = Field(foreign_key="groups.id")
    score: float = Field(ge=0, le=10)
    cooperation_score: float = Field(ge=0, le=10)
    contribution_score: float = Field(ge=0, le=10)
    communication_score: float = Field(ge=0, le=10)
    feedback: Optional[str] = None
    is_anonymous: bool = Field(default=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Relationships
    reviewer: "User" = Relationship(
        back_populates="peer_reviews_given",
        sa_relationship_kwargs={"foreign_keys": "[PeerReview.reviewer_id]"}
    )
    reviewee: "User" = Relationship(
        back_populates="peer_reviews_received",
        sa_relationship_kwargs={"foreign_keys": "[PeerReview.reviewee_id]"}
    )


class MilestoneAnswer(SQLModel, table=True):
    """Answers to milestone questions - Trả lời câu hỏi mốc"""
    __tablename__ = "milestone_answers"
    
    id: Optional[int] = Field(default=None, primary_key=True)
    question_id: int = Field(foreign_key="milestone_questions.id")
    user_id: int = Field(foreign_key="users.id")
    group_id: int = Field(foreign_key="groups.id")
    answer: str
    feedback: Optional[str] = None  # Lecturer feedback
    score: Optional[float] = Field(default=None, ge=0, le=10)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Relationships
    user: "User" = Relationship(back_populates="milestone_answers")


class CheckpointEvaluation(SQLModel, table=True):
    """Evaluation for checkpoint submissions"""
    __tablename__ = "checkpoint_evaluations"
    
    id: Optional[int] = Field(default=None, primary_key=True)
    checkpoint_id: int = Field(foreign_key="checkpoints.id")
    evaluator_id: int = Field(foreign_key="users.id")
    score: float = Field(ge=0, le=10)
    feedback: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
