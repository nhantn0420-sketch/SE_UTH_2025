"""
Evaluations Router - Đánh giá & Phản hồi
"""

from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlmodel import Session, select
from typing import List, Optional
from datetime import datetime

from app.database import get_session
from app.models.user import User, UserRole
from app.models.group import Group, GroupMember, Checkpoint
from app.models.evaluation import (
    GroupEvaluation, MemberEvaluation, PeerReview,
    MilestoneAnswer, CheckpointEvaluation
)
from app.schemas.common import ResponseMessage
from app.utils.dependencies import (
    get_current_user,
    get_current_lecturer,
    get_current_student
)

router = APIRouter()


# ==================== GROUP EVALUATION ====================

@router.get("/groups/{group_id}")
async def get_group_evaluations(
    group_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """
    Get all evaluations for a group.
    """
    evaluations = session.exec(
        select(GroupEvaluation).where(GroupEvaluation.group_id == group_id)
    ).all()
    return evaluations


@router.post("/groups/{group_id}")
async def create_group_evaluation(
    group_id: int,
    score: float = Query(..., ge=0, le=10),
    feedback: Optional[str] = None,
    criteria_scores: Optional[str] = None,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_lecturer)
):
    """
    Lecturer: Create an evaluation for a group.
    """
    group = session.get(Group, group_id)
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")
    
    evaluation = GroupEvaluation(
        group_id=group_id,
        evaluator_id=current_user.id,
        score=score,
        feedback=feedback,
        criteria_scores=criteria_scores
    )
    
    session.add(evaluation)
    session.commit()
    session.refresh(evaluation)
    
    # TODO: Send notification to group members
    
    return evaluation


# ==================== MEMBER EVALUATION ====================

@router.get("/members/{user_id}")
async def get_member_evaluations(
    user_id: int,
    group_id: Optional[int] = Query(None),
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """
    Get evaluations for a member.
    Students can only see their own evaluations.
    """
    if current_user.role == UserRole.STUDENT and current_user.id != user_id:
        raise HTTPException(status_code=403, detail="Can only view your own evaluations")
    
    statement = select(MemberEvaluation).where(MemberEvaluation.member_id == user_id)
    if group_id:
        statement = statement.where(MemberEvaluation.group_id == group_id)
    
    evaluations = session.exec(statement).all()
    return evaluations


@router.post("/members/{user_id}")
async def create_member_evaluation(
    user_id: int,
    group_id: int,
    score: float = Query(..., ge=0, le=10),
    feedback: Optional[str] = None,
    contribution_assessment: Optional[str] = None,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_lecturer)
):
    """
    Lecturer: Create an evaluation for a member.
    """
    # Verify member is in group
    member = session.exec(
        select(GroupMember).where(
            GroupMember.group_id == group_id,
            GroupMember.user_id == user_id
        )
    ).first()
    if not member:
        raise HTTPException(status_code=404, detail="Member not found in group")
    
    evaluation = MemberEvaluation(
        member_id=user_id,
        evaluator_id=current_user.id,
        group_id=group_id,
        score=score,
        feedback=feedback,
        contribution_assessment=contribution_assessment
    )
    
    session.add(evaluation)
    session.commit()
    session.refresh(evaluation)
    
    # TODO: Send notification
    
    return evaluation


# ==================== PEER REVIEW ====================

@router.get("/peer-reviews/{group_id}")
async def get_group_peer_reviews(
    group_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """
    Get peer reviews for a group.
    - Lecturers see all reviews
    - Students see reviews they received (anonymous)
    """
    statement = select(PeerReview).where(PeerReview.group_id == group_id)
    
    if current_user.role == UserRole.STUDENT:
        statement = statement.where(PeerReview.reviewee_id == current_user.id)
    
    reviews = session.exec(statement).all()
    
    # For students, anonymize reviewer info
    if current_user.role == UserRole.STUDENT:
        return [
            {
                "id": r.id,
                "score": r.score,
                "cooperation_score": r.cooperation_score,
                "contribution_score": r.contribution_score,
                "communication_score": r.communication_score,
                "feedback": r.feedback if not r.is_anonymous else None,
                "created_at": r.created_at
            }
            for r in reviews
        ]
    
    return reviews


@router.post("/peer-reviews")
async def create_peer_review(
    group_id: int,
    reviewee_id: int,
    score: float = Query(..., ge=0, le=10),
    cooperation_score: float = Query(..., ge=0, le=10),
    contribution_score: float = Query(..., ge=0, le=10),
    communication_score: float = Query(..., ge=0, le=10),
    feedback: Optional[str] = None,
    is_anonymous: bool = True,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_student)
):
    """
    Student: Create a peer review for another group member.
    """
    if reviewee_id == current_user.id:
        raise HTTPException(status_code=400, detail="Cannot review yourself")
    
    # Verify both users are in the same group
    reviewer_member = session.exec(
        select(GroupMember).where(
            GroupMember.group_id == group_id,
            GroupMember.user_id == current_user.id
        )
    ).first()
    reviewee_member = session.exec(
        select(GroupMember).where(
            GroupMember.group_id == group_id,
            GroupMember.user_id == reviewee_id
        )
    ).first()
    
    if not reviewer_member or not reviewee_member:
        raise HTTPException(status_code=400, detail="Both users must be in the same group")
    
    # Check if already reviewed
    existing = session.exec(
        select(PeerReview).where(
            PeerReview.group_id == group_id,
            PeerReview.reviewer_id == current_user.id,
            PeerReview.reviewee_id == reviewee_id
        )
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="Already reviewed this member")
    
    review = PeerReview(
        reviewer_id=current_user.id,
        reviewee_id=reviewee_id,
        group_id=group_id,
        score=score,
        cooperation_score=cooperation_score,
        contribution_score=contribution_score,
        communication_score=communication_score,
        feedback=feedback,
        is_anonymous=is_anonymous
    )
    
    session.add(review)
    session.commit()
    session.refresh(review)
    
    # Update contribution score for reviewee
    all_reviews = session.exec(
        select(PeerReview).where(
            PeerReview.group_id == group_id,
            PeerReview.reviewee_id == reviewee_id
        )
    ).all()
    
    if all_reviews:
        avg_contribution = sum(r.contribution_score for r in all_reviews) / len(all_reviews)
        reviewee_member.contribution_score = avg_contribution
        session.add(reviewee_member)
        session.commit()
    
    return review


# ==================== MILESTONE ANSWERS ====================

@router.get("/milestone-answers/{group_id}")
async def get_group_milestone_answers(
    group_id: int,
    question_id: Optional[int] = Query(None),
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """
    Get milestone answers for a group.
    """
    statement = select(MilestoneAnswer).where(MilestoneAnswer.group_id == group_id)
    if question_id:
        statement = statement.where(MilestoneAnswer.question_id == question_id)
    
    answers = session.exec(statement).all()
    return answers


@router.post("/milestone-answers")
async def submit_milestone_answer(
    question_id: int,
    group_id: int,
    answer: str,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_student)
):
    """
    Student: Submit an answer to a milestone question.
    """
    # Verify membership
    member = session.exec(
        select(GroupMember).where(
            GroupMember.group_id == group_id,
            GroupMember.user_id == current_user.id
        )
    ).first()
    if not member:
        raise HTTPException(status_code=403, detail="Not a member of this group")
    
    # Check if already answered
    existing = session.exec(
        select(MilestoneAnswer).where(
            MilestoneAnswer.question_id == question_id,
            MilestoneAnswer.user_id == current_user.id,
            MilestoneAnswer.group_id == group_id
        )
    ).first()
    
    if existing:
        existing.answer = answer
        existing.updated_at = datetime.utcnow()
        session.add(existing)
        session.commit()
        session.refresh(existing)
        return existing
    
    answer_obj = MilestoneAnswer(
        question_id=question_id,
        user_id=current_user.id,
        group_id=group_id,
        answer=answer
    )
    
    session.add(answer_obj)
    session.commit()
    session.refresh(answer_obj)
    
    return answer_obj


@router.patch("/milestone-answers/{answer_id}/feedback")
async def provide_answer_feedback(
    answer_id: int,
    feedback: str,
    score: float = Query(..., ge=0, le=10),
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_lecturer)
):
    """
    Lecturer: Provide feedback for a milestone answer.
    """
    answer = session.get(MilestoneAnswer, answer_id)
    if not answer:
        raise HTTPException(status_code=404, detail="Answer not found")
    
    answer.feedback = feedback
    answer.score = score
    answer.updated_at = datetime.utcnow()
    session.add(answer)
    session.commit()
    session.refresh(answer)
    
    # TODO: Send notification
    
    return answer


# ==================== CHECKPOINT EVALUATION ====================

@router.post("/checkpoints/{checkpoint_id}")
async def create_checkpoint_evaluation(
    checkpoint_id: int,
    score: float = Query(..., ge=0, le=10),
    feedback: Optional[str] = None,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_lecturer)
):
    """
    Lecturer: Evaluate a checkpoint submission.
    """
    checkpoint = session.get(Checkpoint, checkpoint_id)
    if not checkpoint:
        raise HTTPException(status_code=404, detail="Checkpoint not found")
    
    evaluation = CheckpointEvaluation(
        checkpoint_id=checkpoint_id,
        evaluator_id=current_user.id,
        score=score,
        feedback=feedback
    )
    
    session.add(evaluation)
    session.commit()
    session.refresh(evaluation)
    
    # TODO: Send notification
    
    return evaluation
