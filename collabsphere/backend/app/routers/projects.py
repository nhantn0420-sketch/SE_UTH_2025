"""
Projects Router - Quản lý dự án
Lecturer: Create, manage projects
Head: Approve/reject, assign to classes
"""

from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlmodel import Session, select, func
from typing import List, Optional
from datetime import datetime
import json

from app.database import get_session
from app.models.user import User, UserRole
from app.models.subject import Curriculum
from app.models.project import (
    Project, ProjectCreate, ProjectUpdate, ProjectResponse, ProjectStatus,
    ProjectMilestone, MilestoneQuestion
)
from app.models.academic import Class, ClassProject
from app.schemas.common import ResponseMessage
from app.utils.dependencies import (
    get_current_user,
    get_current_lecturer,
    get_current_head,
    get_current_lecturer_or_head
)

router = APIRouter()


# ==================== PROJECT MANAGEMENT ====================

@router.get("/my", response_model=List[ProjectResponse])
async def get_my_projects(
    status: Optional[ProjectStatus] = Query(None),
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_lecturer)
):
    """
    Lecturer: Get my own projects.
    """
    statement = select(Project).where(Project.creator_id == current_user.id)
    
    if status:
        statement = statement.where(Project.status == status)
    
    statement = statement.offset(skip).limit(limit)
    projects = session.exec(statement).all()
    
    # Add milestone count
    result = []
    for proj in projects:
        count = session.exec(
            select(func.count(ProjectMilestone.id)).where(ProjectMilestone.project_id == proj.id)
        ).one()
        proj_dict = proj.dict()
        proj_dict['milestone_count'] = count
        result.append(ProjectResponse(**proj_dict))
    
    return result


@router.get("/", response_model=List[ProjectResponse])
async def get_projects(
    status: Optional[ProjectStatus] = Query(None),
    curriculum_id: Optional[int] = Query(None),
    creator_id: Optional[int] = Query(None),
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """
    Get projects with optional filters.
    - Lecturers see their own projects
    - Head sees all projects
    - Students see approved projects assigned to their classes
    """
    statement = select(Project)
    
    if status:
        statement = statement.where(Project.status == status)
    if curriculum_id:
        statement = statement.where(Project.curriculum_id == curriculum_id)
    if creator_id:
        statement = statement.where(Project.creator_id == creator_id)
    
    # Role-based filtering
    if current_user.role == UserRole.LECTURER:
        statement = statement.where(Project.creator_id == current_user.id)
    elif current_user.role == UserRole.STUDENT:
        # Students only see approved projects
        statement = statement.where(Project.status == ProjectStatus.APPROVED)
    
    statement = statement.offset(skip).limit(limit)
    projects = session.exec(statement).all()
    
    # Add milestone count
    result = []
    for proj in projects:
        count = session.exec(
            select(func.count(ProjectMilestone.id)).where(ProjectMilestone.project_id == proj.id)
        ).one()
        proj_dict = proj.dict()
        proj_dict['milestone_count'] = count
        result.append(ProjectResponse(**proj_dict))
    
    return result


@router.get("/{project_id}", response_model=ProjectResponse)
async def get_project(
    project_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """
    Get project by ID.
    """
    project = session.get(Project, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    # Check access
    if current_user.role == UserRole.LECTURER and project.creator_id != current_user.id:
        raise HTTPException(status_code=403, detail="Access denied")
    if current_user.role == UserRole.STUDENT and project.status != ProjectStatus.APPROVED:
        raise HTTPException(status_code=403, detail="Project not available")
    
    count = session.exec(
        select(func.count(ProjectMilestone.id)).where(ProjectMilestone.project_id == project.id)
    ).one()
    
    proj_dict = project.dict()
    proj_dict['milestone_count'] = count
    return ProjectResponse(**proj_dict)


@router.post("/", response_model=ProjectResponse)
async def create_project(
    project_data: ProjectCreate,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_lecturer)
):
    """
    Lecturer: Create a new project.
    """
    # Verify curriculum if provided
    if project_data.curriculum_id:
        curriculum = session.get(Curriculum, project_data.curriculum_id)
        if not curriculum:
            raise HTTPException(status_code=404, detail="Curriculum not found")
    
    new_project = Project(
        **project_data.dict(),
        creator_id=current_user.id,
        status=ProjectStatus.DRAFT
    )
    
    session.add(new_project)
    session.commit()
    session.refresh(new_project)
    
    return ProjectResponse(**new_project.dict(), milestone_count=0)


@router.patch("/{project_id}", response_model=ProjectResponse)
async def update_project(
    project_id: int,
    project_data: ProjectUpdate,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """
    Update a project (Lecturer for own projects, Head for approved projects).
    """
    project = session.get(Project, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    # Check permissions
    if current_user.role == UserRole.LECTURER:
        if project.creator_id != current_user.id:
            raise HTTPException(status_code=403, detail="Can only update your own projects")
        if project.status == ProjectStatus.APPROVED:
            raise HTTPException(status_code=400, detail="Cannot update approved project")
    elif current_user.role == UserRole.HEAD:
        if project.status != ProjectStatus.APPROVED:
            raise HTTPException(status_code=400, detail="Head can only update approved projects")
    else:
        raise HTTPException(status_code=403, detail="Access denied")
    
    update_data = project_data.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(project, key, value)
    
    project.updated_at = datetime.utcnow()
    session.add(project)
    session.commit()
    session.refresh(project)
    
    count = session.exec(
        select(func.count(ProjectMilestone.id)).where(ProjectMilestone.project_id == project.id)
    ).one()
    
    return ProjectResponse(**project.dict(), milestone_count=count)


@router.post("/{project_id}/submit", response_model=ResponseMessage)
async def submit_project_for_approval(
    project_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_lecturer)
):
    """
    Lecturer: Submit project for approval.
    """
    project = session.get(Project, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    if project.creator_id != current_user.id:
        raise HTTPException(status_code=403, detail="Can only submit your own projects")
    
    if project.status != ProjectStatus.DRAFT:
        raise HTTPException(status_code=400, detail="Project already submitted")
    
    # Check if project has milestones
    milestone_count = session.exec(
        select(func.count(ProjectMilestone.id)).where(ProjectMilestone.project_id == project_id)
    ).one()
    if milestone_count == 0:
        raise HTTPException(status_code=400, detail="Project must have at least one milestone")
    
    project.status = ProjectStatus.PENDING
    project.updated_at = datetime.utcnow()
    session.add(project)
    session.commit()
    
    return ResponseMessage(message="Project submitted for approval")


# ==================== HEAD APPROVAL ====================

@router.get("/pending", response_model=List[ProjectResponse])
async def get_pending_projects(
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_head)
):
    """
    Head: Get all pending projects for approval.
    """
    projects = session.exec(
        select(Project).where(Project.status == ProjectStatus.PENDING)
    ).all()
    
    result = []
    for proj in projects:
        count = session.exec(
            select(func.count(ProjectMilestone.id)).where(ProjectMilestone.project_id == proj.id)
        ).one()
        proj_dict = proj.dict()
        proj_dict['milestone_count'] = count
        result.append(ProjectResponse(**proj_dict))
    
    return result


@router.post("/{project_id}/approve", response_model=ResponseMessage)
async def approve_project(
    project_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_head)
):
    """
    Head: Approve a pending project.
    """
    project = session.get(Project, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    if project.status != ProjectStatus.PENDING:
        raise HTTPException(status_code=400, detail="Project is not pending approval")
    
    project.status = ProjectStatus.APPROVED
    project.approved_by = current_user.id
    project.approved_at = datetime.utcnow()
    project.updated_at = datetime.utcnow()
    session.add(project)
    session.commit()
    
    # TODO: Send notification to project creator
    
    return ResponseMessage(message="Project approved successfully")


@router.post("/{project_id}/reject", response_model=ResponseMessage)
async def reject_project(
    project_id: int,
    reason: str = Query(..., min_length=10),
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_head)
):
    """
    Head: Reject a pending project.
    """
    project = session.get(Project, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    if project.status != ProjectStatus.PENDING:
        raise HTTPException(status_code=400, detail="Project is not pending approval")
    
    project.status = ProjectStatus.REJECTED
    project.rejection_reason = reason
    project.updated_at = datetime.utcnow()
    session.add(project)
    session.commit()
    
    # TODO: Send notification to project creator
    
    return ResponseMessage(message="Project rejected")


# ==================== PROJECT ASSIGNMENT ====================

@router.post("/{project_id}/assign-to-class/{class_id}", response_model=ResponseMessage)
async def assign_project_to_class(
    project_id: int,
    class_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_lecturer_or_head)
):
    """
    Lecturer/Head: Assign an approved project to a class.
    """
    project = session.get(Project, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    if project.status != ProjectStatus.APPROVED:
        raise HTTPException(status_code=400, detail="Only approved projects can be assigned")
    
    cls = session.get(Class, class_id)
    if not cls:
        raise HTTPException(status_code=404, detail="Class not found")
    
    # Lecturers can only assign to their classes
    if current_user.role == UserRole.LECTURER and cls.lecturer_id != current_user.id:
        raise HTTPException(status_code=403, detail="Can only assign to your own classes")
    
    # Check if already assigned
    existing = session.exec(
        select(ClassProject).where(
            ClassProject.class_id == class_id,
            ClassProject.project_id == project_id
        )
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="Project already assigned to this class")
    
    assignment = ClassProject(
        class_id=class_id,
        project_id=project_id,
        assigned_by=current_user.id
    )
    session.add(assignment)
    session.commit()
    
    return ResponseMessage(message=f"Project assigned to class {cls.code}")


@router.get("/{project_id}/assigned-classes")
async def get_project_assigned_classes(
    project_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_lecturer_or_head)
):
    """
    Get all classes assigned to a project.
    """
    project = session.get(Project, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    assignments = session.exec(
        select(ClassProject, Class)
        .join(Class)
        .where(ClassProject.project_id == project_id)
    ).all()
    
    return [
        {
            "class_id": cls.id,
            "class_code": cls.code,
            "class_name": cls.name,
            "assigned_at": assignment.assigned_at
        }
        for assignment, cls in assignments
    ]


# ==================== MILESTONES ====================

@router.get("/{project_id}/milestones")
async def get_project_milestones(
    project_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """
    Get all milestones for a project.
    """
    project = session.get(Project, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    milestones = session.exec(
        select(ProjectMilestone)
        .where(ProjectMilestone.project_id == project_id)
        .order_by(ProjectMilestone.order)
    ).all()
    
    return milestones


@router.post("/{project_id}/milestones")
async def create_milestone(
    project_id: int,
    title: str,
    description: Optional[str] = None,
    week_number: int = 1,
    deliverables: Optional[str] = None,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_lecturer)
):
    """
    Lecturer: Create a milestone for a project.
    """
    project = session.get(Project, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    if project.creator_id != current_user.id:
        raise HTTPException(status_code=403, detail="Can only add milestones to your own projects")
    
    if project.status == ProjectStatus.APPROVED:
        raise HTTPException(status_code=400, detail="Cannot modify approved project")
    
    # Get next order
    max_order = session.exec(
        select(func.max(ProjectMilestone.order)).where(ProjectMilestone.project_id == project_id)
    ).one() or 0
    
    milestone = ProjectMilestone(
        project_id=project_id,
        title=title,
        description=description,
        week_number=week_number,
        deliverables=deliverables,
        order=max_order + 1
    )
    
    session.add(milestone)
    session.commit()
    session.refresh(milestone)
    
    return milestone


@router.patch("/milestones/{milestone_id}")
async def update_milestone(
    milestone_id: int,
    title: Optional[str] = None,
    description: Optional[str] = None,
    week_number: Optional[int] = None,
    deliverables: Optional[str] = None,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_lecturer)
):
    """
    Lecturer: Update a milestone.
    """
    milestone = session.get(ProjectMilestone, milestone_id)
    if not milestone:
        raise HTTPException(status_code=404, detail="Milestone not found")
    
    project = session.get(Project, milestone.project_id)
    if project.creator_id != current_user.id:
        raise HTTPException(status_code=403, detail="Access denied")
    
    if title:
        milestone.title = title
    if description is not None:
        milestone.description = description
    if week_number:
        milestone.week_number = week_number
    if deliverables is not None:
        milestone.deliverables = deliverables
    
    session.add(milestone)
    session.commit()
    session.refresh(milestone)
    
    return milestone


@router.delete("/milestones/{milestone_id}", response_model=ResponseMessage)
async def delete_milestone(
    milestone_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_lecturer)
):
    """
    Lecturer: Delete a milestone.
    """
    milestone = session.get(ProjectMilestone, milestone_id)
    if not milestone:
        raise HTTPException(status_code=404, detail="Milestone not found")
    
    project = session.get(Project, milestone.project_id)
    if project.creator_id != current_user.id:
        raise HTTPException(status_code=403, detail="Access denied")
    
    if project.status == ProjectStatus.APPROVED:
        raise HTTPException(status_code=400, detail="Cannot modify approved project")
    
    session.delete(milestone)
    session.commit()
    
    return ResponseMessage(message="Milestone deleted")
