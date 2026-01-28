"""
System Reports Router - Bug reports and feedback
Users: Submit reports
Admin: View, respond, resolve
"""

from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlmodel import Session, select, func
from typing import List, Optional
from datetime import datetime

from app.database import get_session
from app.models.user import User, UserRole
from app.models.report import (
    SystemReport, SystemReportCreate, SystemReportUpdate, 
    SystemReportResponse, ReportStatus
)
from app.schemas.common import ResponseMessage
from app.utils.dependencies import get_current_user, get_current_admin

router = APIRouter()


# ==================== USER ENDPOINTS ====================

@router.post("/", response_model=SystemReportResponse, status_code=status.HTTP_201_CREATED)
async def create_report(
    report_data: SystemReportCreate,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """
    Any user: Submit a bug report or feedback.
    """
    report = SystemReport(
        user_id=current_user.id,
        subject=report_data.subject,
        content=report_data.content
    )
    session.add(report)
    session.commit()
    session.refresh(report)
    return report


@router.get("/my", response_model=List[SystemReportResponse])
async def get_my_reports(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """
    Get my submitted reports.
    """
    statement = select(SystemReport).where(
        SystemReport.user_id == current_user.id
    ).order_by(SystemReport.created_at.desc())
    statement = statement.offset(skip).limit(limit)
    reports = session.exec(statement).all()
    return reports


# ==================== ADMIN ENDPOINTS ====================

@router.get("/", response_model=List[SystemReportResponse])
async def get_all_reports(
    status: Optional[ReportStatus] = Query(None),
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_admin)
):
    """
    Admin: Get all system reports with optional status filter.
    """
    statement = select(SystemReport)
    
    if status:
        statement = statement.where(SystemReport.status == status)
    
    statement = statement.order_by(SystemReport.created_at.desc())
    statement = statement.offset(skip).limit(limit)
    reports = session.exec(statement).all()
    
    # Add user information
    result = []
    for report in reports:
        user = session.get(User, report.user_id)
        report_dict = report.dict()
        report_dict['user'] = {
            'id': user.id,
            'full_name': user.full_name,
            'email': user.email,
            'role': user.role
        } if user else None
        
        if report.resolved_by_id:
            resolved_by = session.get(User, report.resolved_by_id)
            report_dict['resolved_by'] = {
                'id': resolved_by.id,
                'full_name': resolved_by.full_name
            } if resolved_by else None
        else:
            report_dict['resolved_by'] = None
            
        result.append(report_dict)
    
    return result


@router.get("/{report_id}", response_model=SystemReportResponse)
async def get_report(
    report_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """
    Get a specific report.
    Admin can view any, users can only view their own.
    """
    report = session.get(SystemReport, report_id)
    if not report:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Report not found"
        )
    
    # Check permissions
    if current_user.role != UserRole.ADMIN and report.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to view this report"
        )
    
    return report


@router.put("/{report_id}", response_model=SystemReportResponse)
async def update_report_status(
    report_id: int,
    update_data: SystemReportUpdate,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_admin)
):
    """
    Admin: Update report status and add response.
    """
    report = session.get(SystemReport, report_id)
    if not report:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Report not found"
        )
    
    if update_data.status:
        report.status = update_data.status
        
        # If resolving, set resolved timestamp and admin
        if update_data.status == ReportStatus.RESOLVED:
            report.resolved_at = datetime.utcnow()
            report.resolved_by_id = current_user.id
    
    if update_data.admin_response:
        report.admin_response = update_data.admin_response
    
    report.updated_at = datetime.utcnow()
    
    session.add(report)
    session.commit()
    session.refresh(report)
    return report


@router.delete("/{report_id}")
async def delete_report(
    report_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_admin)
):
    """
    Admin: Delete a report.
    """
    report = session.get(SystemReport, report_id)
    if not report:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Report not found"
        )
    
    session.delete(report)
    session.commit()
    return ResponseMessage(message="Report deleted successfully")


@router.get("/statistics/admin")
async def get_report_statistics(
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_admin)
):
    """
    Admin: Get report statistics by status.
    """
    pending = session.exec(
        select(func.count(SystemReport.id)).where(SystemReport.status == ReportStatus.PENDING)
    ).one()
    
    in_progress = session.exec(
        select(func.count(SystemReport.id)).where(SystemReport.status == ReportStatus.IN_PROGRESS)
    ).one()
    
    resolved = session.exec(
        select(func.count(SystemReport.id)).where(SystemReport.status == ReportStatus.RESOLVED)
    ).one()
    
    closed = session.exec(
        select(func.count(SystemReport.id)).where(SystemReport.status == ReportStatus.CLOSED)
    ).one()
    
    total = pending + in_progress + resolved + closed
    
    return {
        "total": total,
        "pending": pending,
        "in_progress": in_progress,
        "resolved": resolved,
        "closed": closed
    }
