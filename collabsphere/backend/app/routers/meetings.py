"""
Meetings Router - Quản lý cuộc họp video/audio
"""

from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlmodel import Session, select
from typing import List, Optional
from datetime import datetime

from app.database import get_session
from app.models.user import User, UserRole
from app.models.group import Group, GroupMember
from app.models.communication import Meeting, MeetingParticipant, MeetingStatus
from app.schemas.common import ResponseMessage
from app.utils.dependencies import get_current_user

router = APIRouter()


@router.get("/groups/{group_id}")
async def get_group_meetings(
    group_id: int,
    status: Optional[MeetingStatus] = Query(None),
    upcoming_only: bool = Query(False),
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """
    Get meetings for a group.
    """
    statement = select(Meeting).where(Meeting.group_id == group_id)
    
    if status:
        statement = statement.where(Meeting.status == status)
    if upcoming_only:
        statement = statement.where(Meeting.scheduled_at > datetime.utcnow())
    
    statement = statement.order_by(Meeting.scheduled_at.desc())
    meetings = session.exec(statement).all()
    
    return meetings


@router.get("/{meeting_id}")
async def get_meeting(
    meeting_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """
    Get meeting details.
    """
    meeting = session.get(Meeting, meeting_id)
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")
    
    # Get participants
    participants = session.exec(
        select(MeetingParticipant, User)
        .join(User)
        .where(MeetingParticipant.meeting_id == meeting_id)
    ).all()
    
    return {
        **meeting.dict(),
        "participants": [
            {
                "user_id": user.id,
                "username": user.username,
                "full_name": user.full_name,
                "joined_at": participant.joined_at,
                "left_at": participant.left_at
            }
            for participant, user in participants
        ]
    }


@router.post("/groups/{group_id}")
async def create_meeting(
    group_id: int,
    title: str,
    description: Optional[str] = None,
    scheduled_at: Optional[datetime] = None,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """
    Create/schedule a meeting.
    """
    group = session.get(Group, group_id)
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")
    
    meeting = Meeting(
        group_id=group_id,
        title=title,
        description=description,
        scheduled_at=scheduled_at,
        created_by=current_user.id,
        status=MeetingStatus.SCHEDULED if scheduled_at else MeetingStatus.ACTIVE
    )
    
    session.add(meeting)
    session.commit()
    session.refresh(meeting)
    
    # TODO: Send notification to group members
    
    return meeting


@router.post("/{meeting_id}/join", response_model=ResponseMessage)
async def join_meeting(
    meeting_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """
    Join a meeting.
    """
    meeting = session.get(Meeting, meeting_id)
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")
    
    if meeting.status == MeetingStatus.ENDED:
        raise HTTPException(status_code=400, detail="Meeting has ended")
    
    # Check if already joined
    existing = session.exec(
        select(MeetingParticipant).where(
            MeetingParticipant.meeting_id == meeting_id,
            MeetingParticipant.user_id == current_user.id,
            MeetingParticipant.left_at == None
        )
    ).first()
    
    if existing:
        return ResponseMessage(message="Already in meeting")
    
    participant = MeetingParticipant(
        meeting_id=meeting_id,
        user_id=current_user.id
    )
    session.add(participant)
    
    # Activate meeting if scheduled
    if meeting.status == MeetingStatus.SCHEDULED:
        meeting.status = MeetingStatus.ACTIVE
        meeting.started_at = datetime.utcnow()
        session.add(meeting)
    
    session.commit()
    
    return ResponseMessage(message="Joined meeting")


@router.post("/{meeting_id}/leave", response_model=ResponseMessage)
async def leave_meeting(
    meeting_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """
    Leave a meeting.
    """
    participant = session.exec(
        select(MeetingParticipant).where(
            MeetingParticipant.meeting_id == meeting_id,
            MeetingParticipant.user_id == current_user.id,
            MeetingParticipant.left_at == None
        )
    ).first()
    
    if not participant:
        raise HTTPException(status_code=400, detail="Not in this meeting")
    
    participant.left_at = datetime.utcnow()
    session.add(participant)
    session.commit()
    
    return ResponseMessage(message="Left meeting")


@router.post("/{meeting_id}/end", response_model=ResponseMessage)
async def end_meeting(
    meeting_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """
    End a meeting (creator or lecturer only).
    """
    meeting = session.get(Meeting, meeting_id)
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")
    
    if meeting.created_by != current_user.id and current_user.role not in [UserRole.LECTURER, UserRole.ADMIN]:
        raise HTTPException(status_code=403, detail="Only creator or lecturer can end meeting")
    
    meeting.status = MeetingStatus.ENDED
    meeting.ended_at = datetime.utcnow()
    session.add(meeting)
    
    # Mark all participants as left
    participants = session.exec(
        select(MeetingParticipant).where(
            MeetingParticipant.meeting_id == meeting_id,
            MeetingParticipant.left_at == None
        )
    ).all()
    
    for p in participants:
        p.left_at = datetime.utcnow()
        session.add(p)
    
    session.commit()
    
    return ResponseMessage(message="Meeting ended")
