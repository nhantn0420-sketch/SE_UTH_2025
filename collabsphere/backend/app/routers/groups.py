"""
Groups Router - Quản lý nhóm & không gian làm việc
Lecturer: Create, manage groups
Student: Manage tasks, mark milestones
"""

from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlmodel import Session, select, func
from typing import List, Optional
from datetime import datetime

from app.database import get_session
from app.models.user import User, UserRole
from app.models.academic import Class, ClassMember
from app.models.project import Project, ProjectMilestone, MilestoneQuestion
from app.models.group import (
    Group, GroupCreate, GroupUpdate, GroupResponse, GroupRole,
    GroupMember, GroupMilestone, Checkpoint, CheckpointStatus,
    CheckpointSubmission, CheckpointAssignment, Task, TaskCreate, TaskUpdate
)
from app.schemas.common import ResponseMessage
from app.utils.dependencies import (
    get_current_user,
    get_current_lecturer,
    get_current_student
)

router = APIRouter()


# ==================== STATISTICS ENDPOINT ====================

@router.get("/statistics/student")
async def get_student_statistics(
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_student)
):
    """
    Student: Get my group and task statistics.
    """
    try:
        # My groups
        my_groups = session.exec(
            select(func.count(GroupMember.id)).where(GroupMember.user_id == current_user.id)
        ).one()
        
        # Get group IDs
        group_ids = session.exec(
            select(GroupMember.group_id).where(GroupMember.user_id == current_user.id)
        ).all()
        
        # My tasks statistics
        total_tasks = 0
        completed_tasks = 0
        pending_tasks = 0
        in_progress_tasks = 0
        
        if group_ids and len(group_ids) > 0:
            try:
                total_tasks = session.exec(
                    select(func.count(Task.id)).where(
                        Task.group_id.in_(group_ids),
                        Task.assignee_id == current_user.id
                    )
                ).one()
                
                completed_tasks = session.exec(
                    select(func.count(Task.id)).where(
                        Task.group_id.in_(group_ids),
                        Task.assignee_id == current_user.id,
                        Task.status == 'completed'
                    )
                ).one()
                
                in_progress_tasks = session.exec(
                    select(func.count(Task.id)).where(
                        Task.group_id.in_(group_ids),
                        Task.assignee_id == current_user.id,
                        Task.status == 'in_progress'
                    )
                ).one()
                
                pending_tasks = session.exec(
                    select(func.count(Task.id)).where(
                        Task.group_id.in_(group_ids),
                        Task.assignee_id == current_user.id,
                        Task.status == 'todo'
                    )
                ).one()
            except Exception as e:
                # Table might not exist or other DB error
                print(f"Warning: Could not query tasks - {e}")
        
        return {
            "my_groups": my_groups,
            "total_tasks": total_tasks,
            "completed_tasks": completed_tasks,
            "in_progress_tasks": in_progress_tasks,
            "pending_tasks": pending_tasks
        }
    except Exception as e:
        print(f"Error in get_student_statistics: {e}")
        raise HTTPException(status_code=500, detail=str(e))


# ==================== GROUP MANAGEMENT ====================

@router.get("/", response_model=List[GroupResponse])
async def get_groups(
    class_id: Optional[int] = Query(None),
    project_id: Optional[int] = Query(None),
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """
    Get groups with optional filters.
    """
    statement = select(Group)
    
    if class_id:
        statement = statement.where(Group.class_id == class_id)
    if project_id:
        statement = statement.where(Group.project_id == project_id)
    
    # Role-based filtering
    if current_user.role == UserRole.LECTURER:
        # Get classes taught by lecturer
        lecturer_classes = session.exec(
            select(Class.id).where(Class.lecturer_id == current_user.id)
        ).all()
        statement = statement.where(Group.class_id.in_(lecturer_classes))
    elif current_user.role == UserRole.STUDENT:
        # Get groups where student is a member
        student_groups = session.exec(
            select(GroupMember.group_id).where(GroupMember.user_id == current_user.id)
        ).all()
        statement = statement.where(Group.id.in_(student_groups))
    
    statement = statement.offset(skip).limit(limit)
    groups = session.exec(statement).all()
    
    # Add member count and progress
    result = []
    for group in groups:
        member_count = session.exec(
            select(func.count(GroupMember.id)).where(GroupMember.group_id == group.id)
        ).one()
        
        # Calculate progress
        progress = 0.0
        if group.project_id:
            total_milestones = session.exec(
                select(func.count(ProjectMilestone.id)).where(ProjectMilestone.project_id == group.project_id)
            ).one()
            completed = session.exec(
                select(func.count(GroupMilestone.id)).where(
                    GroupMilestone.group_id == group.id,
                    GroupMilestone.is_completed == True
                )
            ).one()
            if total_milestones > 0:
                progress = (completed / total_milestones) * 100
        
        result.append(GroupResponse(
            **group.dict(),
            member_count=member_count,
            progress_percentage=progress
        ))
    
    return result


@router.get("/my", response_model=Optional[GroupResponse])
async def get_my_group(
    class_project_id: Optional[int] = Query(None),
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_student)
):
    """
    Student: Get my group (first group if multiple).
    Optionally filter by class_project_id.
    """
    statement = select(Group).join(
        GroupMember, GroupMember.group_id == Group.id
    ).where(GroupMember.user_id == current_user.id)
    
    if class_project_id:
        statement = statement.where(Group.class_project_id == class_project_id)
    
    group = session.exec(statement).first()
    
    if not group:
        return None
    
    member_count = session.exec(
        select(func.count(GroupMember.id)).where(GroupMember.group_id == group.id)
    ).one()
    
    # Calculate progress
    progress = 0.0
    if group.project_id:
        total_milestones = session.exec(
            select(func.count(ProjectMilestone.id)).where(ProjectMilestone.project_id == group.project_id)
        ).one()
        completed = session.exec(
            select(func.count(GroupMilestone.id)).where(
                GroupMilestone.group_id == group.id,
                GroupMilestone.is_completed == True
            )
        ).one()
        if total_milestones > 0:
            progress = (completed / total_milestones) * 100
    
    return GroupResponse(
        **group.dict(),
        member_count=member_count,
        progress_percentage=progress
    )


@router.get("/{group_id}", response_model=GroupResponse)
async def get_group(
    group_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """
    Get group by ID.
    """
    group = session.get(Group, group_id)
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")
    
    # Check access
    if current_user.role == UserRole.STUDENT:
        member = session.exec(
            select(GroupMember).where(
                GroupMember.group_id == group_id,
                GroupMember.user_id == current_user.id
            )
        ).first()
        if not member:
            raise HTTPException(status_code=403, detail="Not a member of this group")
    
    member_count = session.exec(
        select(func.count(GroupMember.id)).where(GroupMember.group_id == group.id)
    ).one()
    
    # Calculate progress
    progress = 0.0
    if group.project_id:
        total_milestones = session.exec(
            select(func.count(ProjectMilestone.id)).where(ProjectMilestone.project_id == group.project_id)
        ).one()
        completed = session.exec(
            select(func.count(GroupMilestone.id)).where(
                GroupMilestone.group_id == group.id,
                GroupMilestone.is_completed == True
            )
        ).one()
        if total_milestones > 0:
            progress = (completed / total_milestones) * 100
    
    return GroupResponse(
        **group.dict(),
        member_count=member_count,
        progress_percentage=progress
    )


@router.post("/", response_model=GroupResponse)
async def create_group(
    group_data: GroupCreate,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_lecturer)
):
    """
    Lecturer: Create a new group.
    """
    # Verify class
    cls = session.get(Class, group_data.class_id)
    if not cls:
        raise HTTPException(status_code=404, detail="Class not found")
    
    if cls.lecturer_id != current_user.id:
        raise HTTPException(status_code=403, detail="Can only create groups in your classes")
    
    # Verify project if provided
    if group_data.project_id:
        project = session.get(Project, group_data.project_id)
        if not project:
            raise HTTPException(status_code=404, detail="Project not found")
    
    new_group = Group(
        name=group_data.name,
        class_id=group_data.class_id,
        project_id=group_data.project_id,
        description=group_data.description
    )
    
    session.add(new_group)
    session.commit()
    session.refresh(new_group)
    
    # Add initial members if provided
    if group_data.member_ids:
        for i, user_id in enumerate(group_data.member_ids):
            user = session.get(User, user_id)
            if user and user.role == UserRole.STUDENT:
                role = GroupRole.LEADER if i == 0 else GroupRole.MEMBER
                member = GroupMember(
                    group_id=new_group.id,
                    user_id=user_id,
                    role=role
                )
                session.add(member)
        session.commit()
    
    # Initialize group milestones from project
    if new_group.project_id:
        milestones = session.exec(
            select(ProjectMilestone).where(ProjectMilestone.project_id == new_group.project_id)
        ).all()
        for milestone in milestones:
            gm = GroupMilestone(
                group_id=new_group.id,
                milestone_id=milestone.id
            )
            session.add(gm)
        session.commit()
    
    member_count = len(group_data.member_ids) if group_data.member_ids else 0
    return GroupResponse(**new_group.dict(), member_count=member_count, progress_percentage=0.0)


@router.patch("/{group_id}", response_model=GroupResponse)
async def update_group(
    group_id: int,
    group_data: GroupUpdate,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_lecturer)
):
    """
    Lecturer: Update a group.
    """
    group = session.get(Group, group_id)
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")
    
    cls = session.get(Class, group.class_id)
    if cls.lecturer_id != current_user.id:
        raise HTTPException(status_code=403, detail="Access denied")
    
    update_data = group_data.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(group, key, value)
    
    group.updated_at = datetime.utcnow()
    session.add(group)
    session.commit()
    session.refresh(group)
    
    member_count = session.exec(
        select(func.count(GroupMember.id)).where(GroupMember.group_id == group.id)
    ).one()
    
    return GroupResponse(**group.dict(), member_count=member_count, progress_percentage=0.0)


@router.post("/{group_id}/pick-project/{project_id}", response_model=ResponseMessage)
async def pick_project_for_group(
    group_id: int,
    project_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_lecturer)
):
    """
    UC006: Lecturer picks/assigns a specific approved project to a team.
    This is different from class-level project assignment.
    Automatically creates group milestones from project milestones.
    """
    # Verify group exists
    group = session.get(Group, group_id)
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")
    
    # Verify lecturer owns the class
    cls = session.get(Class, group.class_id)
    if not cls:
        raise HTTPException(status_code=404, detail="Class not found")
    
    if cls.lecturer_id != current_user.id:
        raise HTTPException(status_code=403, detail="Can only pick projects for groups in your classes")
    
    # Verify project exists and is approved
    project = session.get(Project, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    if project.status != "approved":
        raise HTTPException(status_code=400, detail="Can only pick approved projects")
    
    # Check if project is assigned to this class
    from app.models.academic import ClassProject
    class_project = session.exec(
        select(ClassProject).where(
            ClassProject.class_id == cls.id,
            ClassProject.project_id == project_id
        )
    ).first()
    
    if not class_project:
        raise HTTPException(
            status_code=400, 
            detail="Project must be assigned to the class first before picking for a team"
        )
    
    # Update group's project
    old_project_id = group.project_id
    group.project_id = project_id
    group.updated_at = datetime.utcnow()
    session.add(group)
    
    # If changing project, clear old milestones
    if old_project_id and old_project_id != project_id:
        old_milestones = session.exec(
            select(GroupMilestone).where(GroupMilestone.group_id == group_id)
        ).all()
        for om in old_milestones:
            session.delete(om)
    
    # Auto-create group milestones from project milestones
    milestones = session.exec(
        select(ProjectMilestone).where(
            ProjectMilestone.project_id == project_id
        ).order_by(ProjectMilestone.order)
    ).all()
    
    for milestone in milestones:
        # Check if already exists
        existing = session.exec(
            select(GroupMilestone).where(
                GroupMilestone.group_id == group_id,
                GroupMilestone.milestone_id == milestone.id
            )
        ).first()
        
        if not existing:
            gm = GroupMilestone(
                group_id=group_id,
                milestone_id=milestone.id,
                is_completed=False
            )
            session.add(gm)
    
    session.commit()
    
    # TODO: Send notification to group members
    
    return ResponseMessage(
        message=f"Project '{project.title}' successfully picked for group '{group.name}'. "
                f"{len(milestones)} milestones created."
    )


# ==================== GROUP MEMBERS ====================

@router.get("/{group_id}/members")
async def get_group_members(
    group_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """
    Get all members of a group.
    """
    group = session.get(Group, group_id)
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")
    
    members = session.exec(
        select(GroupMember, User)
        .join(User)
        .where(GroupMember.group_id == group_id)
    ).all()
    
    return [
        {
            "id": member.id,
            "user_id": user.id,
            "username": user.username,
            "full_name": user.full_name,
            "email": user.email,
            "role": member.role.value,
            "contribution_score": member.contribution_score,
            "joined_at": member.joined_at
        }
        for member, user in members
    ]


@router.post("/{group_id}/members", response_model=ResponseMessage)
async def add_group_member(
    group_id: int,
    user_id: int,
    role: GroupRole = GroupRole.MEMBER,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_lecturer)
):
    """
    Lecturer: Add a member to a group.
    """
    group = session.get(Group, group_id)
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")
    
    # Verify lecturer owns the class
    cls = session.get(Class, group.class_id)
    if cls.lecturer_id != current_user.id:
        raise HTTPException(status_code=403, detail="Access denied")
    
    # Verify user is a student in the class
    class_member = session.exec(
        select(ClassMember).where(
            ClassMember.class_id == group.class_id,
            ClassMember.user_id == user_id
        )
    ).first()
    if not class_member:
        raise HTTPException(status_code=400, detail="User is not in this class")
    
    # Check if already in group
    existing = session.exec(
        select(GroupMember).where(
            GroupMember.group_id == group_id,
            GroupMember.user_id == user_id
        )
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="User already in group")
    
    # Check if already in another group for same project
    if group.project_id:
        other_groups = session.exec(
            select(GroupMember)
            .join(Group)
            .where(
                Group.project_id == group.project_id,
                GroupMember.user_id == user_id
            )
        ).first()
        if other_groups:
            raise HTTPException(status_code=400, detail="User already in another group for this project")
    
    member = GroupMember(group_id=group_id, user_id=user_id, role=role)
    session.add(member)
    session.commit()
    
    return ResponseMessage(message="Member added to group")


@router.patch("/{group_id}/members/{user_id}/role", response_model=ResponseMessage)
async def update_member_role(
    group_id: int,
    user_id: int,
    role: GroupRole,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_lecturer)
):
    """
    Lecturer: Update member role (e.g., set as leader).
    """
    member = session.exec(
        select(GroupMember).where(
            GroupMember.group_id == group_id,
            GroupMember.user_id == user_id
        )
    ).first()
    
    if not member:
        raise HTTPException(status_code=404, detail="Member not found")
    
    # If setting as leader, remove current leader
    if role == GroupRole.LEADER:
        current_leaders = session.exec(
            select(GroupMember).where(
                GroupMember.group_id == group_id,
                GroupMember.role == GroupRole.LEADER
            )
        ).all()
        for leader in current_leaders:
            leader.role = GroupRole.MEMBER
            session.add(leader)
    
    member.role = role
    session.add(member)
    session.commit()
    
    return ResponseMessage(message=f"Member role updated to {role.value}")


@router.delete("/{group_id}/members/{user_id}", response_model=ResponseMessage)
async def remove_group_member(
    group_id: int,
    user_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_lecturer)
):
    """
    Lecturer: Remove a member from a group.
    """
    member = session.exec(
        select(GroupMember).where(
            GroupMember.group_id == group_id,
            GroupMember.user_id == user_id
        )
    ).first()
    
    if not member:
        raise HTTPException(status_code=404, detail="Member not found")
    
    session.delete(member)
    session.commit()
    
    return ResponseMessage(message="Member removed from group")


# ==================== MILESTONES & PROGRESS ====================

@router.get("/{group_id}/milestones")
async def get_group_milestones(
    group_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """
    Get group's milestone progress.
    """
    group = session.get(Group, group_id)
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")
    
    if not group.project_id:
        return []
    
    milestones = session.exec(
        select(GroupMilestone, ProjectMilestone)
        .join(ProjectMilestone)
        .where(GroupMilestone.group_id == group_id)
        .order_by(ProjectMilestone.order)
    ).all()
    
    return [
        {
            "id": gm.id,
            "milestone_id": pm.id,
            "title": pm.title,
            "description": pm.description,
            "week_number": pm.week_number,
            "deliverables": pm.deliverables,
            "is_completed": gm.is_completed,
            "completed_at": gm.completed_at,
            "notes": gm.notes
        }
        for gm, pm in milestones
    ]


@router.post("/{group_id}/milestones/{milestone_id}/complete", response_model=ResponseMessage)
async def complete_milestone(
    group_id: int,
    milestone_id: int,
    notes: Optional[str] = None,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """
    Group Leader: Mark a milestone as complete.
    """
    # Verify group membership and leader role
    member = session.exec(
        select(GroupMember).where(
            GroupMember.group_id == group_id,
            GroupMember.user_id == current_user.id
        )
    ).first()
    
    if not member:
        raise HTTPException(status_code=403, detail="Not a member of this group")
    
    if current_user.role == UserRole.STUDENT and member.role != GroupRole.LEADER:
        raise HTTPException(status_code=403, detail="Only group leader can mark milestones")
    
    gm = session.exec(
        select(GroupMilestone).where(
            GroupMilestone.group_id == group_id,
            GroupMilestone.milestone_id == milestone_id
        )
    ).first()
    
    if not gm:
        raise HTTPException(status_code=404, detail="Milestone not found for this group")
    
    gm.is_completed = True
    gm.completed_at = datetime.utcnow()
    gm.completed_by = current_user.id
    gm.notes = notes
    session.add(gm)
    session.commit()
    
    # TODO: Send notifications
    
    return ResponseMessage(message="Milestone marked as complete")


@router.get("/{group_id}/progress")
async def get_group_progress(
    group_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """
    Get group's overall progress and contribution scores.
    """
    group = session.get(Group, group_id)
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")
    
    # Milestone progress
    total_milestones = 0
    completed_milestones = 0
    if group.project_id:
        total_milestones = session.exec(
            select(func.count(ProjectMilestone.id)).where(ProjectMilestone.project_id == group.project_id)
        ).one()
        completed_milestones = session.exec(
            select(func.count(GroupMilestone.id)).where(
                GroupMilestone.group_id == group_id,
                GroupMilestone.is_completed == True
            )
        ).one()
    
    # Checkpoint progress
    total_checkpoints = session.exec(
        select(func.count(Checkpoint.id)).where(Checkpoint.group_id == group_id)
    ).one()
    completed_checkpoints = session.exec(
        select(func.count(Checkpoint.id)).where(
            Checkpoint.group_id == group_id,
            Checkpoint.status == CheckpointStatus.COMPLETED
        )
    ).one()
    
    # Member contributions
    members = session.exec(
        select(GroupMember, User)
        .join(User)
        .where(GroupMember.group_id == group_id)
    ).all()
    
    contributions = [
        {
            "user_id": user.id,
            "full_name": user.full_name,
            "role": member.role.value,
            "contribution_score": member.contribution_score
        }
        for member, user in members
    ]
    
    progress_percentage = 0.0
    if total_milestones > 0:
        progress_percentage = (completed_milestones / total_milestones) * 100
    
    return {
        "milestones": {
            "total": total_milestones,
            "completed": completed_milestones,
            "percentage": progress_percentage
        },
        "checkpoints": {
            "total": total_checkpoints,
            "completed": completed_checkpoints
        },
        "contributions": contributions
    }


# ==================== WORKSPACE CARDS (UC039) ====================

@router.get("/{group_id}/cards")
async def get_workspace_cards(
    group_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """
    UC039: Get all workspace cards for a group.
    Returns cards with their tasks in hierarchical structure.
    """
    group = session.get(Group, group_id)
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")
    
    # Import WorkspaceCard here to avoid circular import
    from app.models.group import WorkspaceCard
    
    cards = session.exec(
        select(WorkspaceCard)
        .where(WorkspaceCard.group_id == group_id)
        .order_by(WorkspaceCard.position)
    ).all()
    
    result = []
    for card in cards:
        # Get tasks for this card
        tasks = session.exec(
            select(Task)
            .where(Task.card_id == card.id, Task.parent_task_id == None)
            .order_by(Task.created_at)
        ).all()
        
        card_data = {
            "id": card.id,
            "title": card.title,
            "description": card.description,
            "position": card.position,
            "color": card.color,
            "tasks": [
                {
                    "id": task.id,
                    "title": task.title,
                    "description": task.description,
                    "status": task.status,
                    "priority": task.priority,
                    "assigned_to": task.assigned_to,
                    "due_date": task.due_date,
                    "subtask_count": len(task.subtasks) if hasattr(task, 'subtasks') else 0
                }
                for task in tasks
            ],
            "task_count": len(tasks)
        }
        result.append(card_data)
    
    return result


@router.post("/{group_id}/cards")
async def create_workspace_card(
    group_id: int,
    title: str,
    description: Optional[str] = None,
    color: Optional[str] = "#3498db",
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """
    UC039: Create a new workspace card (Kanban column).
    Students (team members) or Lecturer can create cards.
    """
    group = session.get(Group, group_id)
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")
    
    # Verify membership or lecturer
    if current_user.role == UserRole.STUDENT:
        member = session.exec(
            select(GroupMember).where(
                GroupMember.group_id == group_id,
                GroupMember.user_id == current_user.id
            )
        ).first()
        if not member:
            raise HTTPException(status_code=403, detail="Not a member of this group")
    elif current_user.role == UserRole.LECTURER:
        cls = session.get(Class, group.class_id)
        if cls.lecturer_id != current_user.id:
            raise HTTPException(status_code=403, detail="Access denied")
    
    # Get next position
    from app.models.group import WorkspaceCard
    max_position = session.exec(
        select(func.max(WorkspaceCard.position)).where(WorkspaceCard.group_id == group_id)
    ).one() or 0
    
    card = WorkspaceCard(
        group_id=group_id,
        title=title,
        description=description,
        color=color,
        position=max_position + 1
    )
    
    session.add(card)
    session.commit()
    session.refresh(card)
    
    return card


@router.patch("/cards/{card_id}")
async def update_workspace_card(
    card_id: int,
    title: Optional[str] = None,
    description: Optional[str] = None,
    color: Optional[str] = None,
    position: Optional[int] = None,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """
    UC039: Update a workspace card.
    """
    from app.models.group import WorkspaceCard
    card = session.get(WorkspaceCard, card_id)
    if not card:
        raise HTTPException(status_code=404, detail="Card not found")
    
    # Verify access
    group = session.get(Group, card.group_id)
    if current_user.role == UserRole.STUDENT:
        member = session.exec(
            select(GroupMember).where(
                GroupMember.group_id == group.id,
                GroupMember.user_id == current_user.id
            )
        ).first()
        if not member:
            raise HTTPException(status_code=403, detail="Access denied")
    
    if title:
        card.title = title
    if description is not None:
        card.description = description
    if color:
        card.color = color
    if position is not None:
        card.position = position
    
    card.updated_at = datetime.utcnow()
    session.add(card)
    session.commit()
    session.refresh(card)
    
    return card


@router.delete("/cards/{card_id}", response_model=ResponseMessage)
async def delete_workspace_card(
    card_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """
    UC039: Delete a workspace card.
    Note: This will also delete all tasks in the card.
    """
    from app.models.group import WorkspaceCard
    card = session.get(WorkspaceCard, card_id)
    if not card:
        raise HTTPException(status_code=404, detail="Card not found")
    
    # Verify access (leader or lecturer)
    group = session.get(Group, card.group_id)
    if current_user.role == UserRole.STUDENT:
        member = session.exec(
            select(GroupMember).where(
                GroupMember.group_id == group.id,
                GroupMember.user_id == current_user.id,
                GroupMember.role == GroupRole.LEADER
            )
        ).first()
        if not member:
            raise HTTPException(status_code=403, detail="Only group leader can delete cards")
    elif current_user.role == UserRole.LECTURER:
        cls = session.get(Class, group.class_id)
        if cls.lecturer_id != current_user.id:
            raise HTTPException(status_code=403, detail="Access denied")
    
    # Delete all tasks in this card first
    tasks = session.exec(select(Task).where(Task.card_id == card_id)).all()
    for task in tasks:
        # Delete subtasks
        subtasks = session.exec(select(Task).where(Task.parent_task_id == task.id)).all()
        for subtask in subtasks:
            session.delete(subtask)
        session.delete(task)
    
    session.delete(card)
    session.commit()
    
    return ResponseMessage(message="Card deleted successfully")


# ==================== CHECKPOINTS ====================

@router.get("/{group_id}/checkpoints")
async def get_group_checkpoints(
    group_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """
    Get all checkpoints for a group.
    """
    checkpoints = session.exec(
        select(Checkpoint)
        .where(Checkpoint.group_id == group_id)
        .order_by(Checkpoint.due_date)
    ).all()
    return checkpoints


@router.post("/{group_id}/checkpoints")
async def create_checkpoint(
    group_id: int,
    title: str,
    description: Optional[str] = None,
    due_date: Optional[datetime] = None,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """
    Group Leader: Create a checkpoint.
    """
    # Verify leader role
    member = session.exec(
        select(GroupMember).where(
            GroupMember.group_id == group_id,
            GroupMember.user_id == current_user.id
        )
    ).first()
    
    if not member or (current_user.role == UserRole.STUDENT and member.role != GroupRole.LEADER):
        raise HTTPException(status_code=403, detail="Only group leader can create checkpoints")
    
    checkpoint = Checkpoint(
        group_id=group_id,
        title=title,
        description=description,
        due_date=due_date,
        created_by=current_user.id
    )
    
    session.add(checkpoint)
    session.commit()
    session.refresh(checkpoint)
    
    return checkpoint


@router.post("/{group_id}/checkpoints/{checkpoint_id}/submit", response_model=ResponseMessage)
async def submit_checkpoint(
    group_id: int,
    checkpoint_id: int,
    content: Optional[str] = None,
    file_url: Optional[str] = None,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """
    Submit a checkpoint.
    """
    checkpoint = session.get(Checkpoint, checkpoint_id)
    if not checkpoint or checkpoint.group_id != group_id:
        raise HTTPException(status_code=404, detail="Checkpoint not found")
    
    submission = CheckpointSubmission(
        checkpoint_id=checkpoint_id,
        submitted_by=current_user.id,
        content=content,
        file_url=file_url
    )
    
    session.add(submission)
    checkpoint.status = CheckpointStatus.SUBMITTED
    session.add(checkpoint)
    session.commit()
    
    # TODO: Send notifications
    
    return ResponseMessage(message="Checkpoint submitted")


# ==================== TASKS (WORKSPACE) ====================

@router.get("/{group_id}/tasks")
async def get_group_tasks(
    group_id: int,
    status: Optional[str] = Query(None),
    assigned_to: Optional[int] = Query(None),
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """
    Get all tasks for a group's workspace.
    """
    statement = select(Task).where(Task.group_id == group_id, Task.parent_task_id == None)
    
    if status:
        statement = statement.where(Task.status == status)
    if assigned_to:
        statement = statement.where(Task.assigned_to == assigned_to)
    
    tasks = session.exec(statement).all()
    
    # Include subtasks
    result = []
    for task in tasks:
        subtasks = session.exec(
            select(Task).where(Task.parent_task_id == task.id)
        ).all()
        task_dict = task.dict()
        task_dict['subtasks'] = [st.dict() for st in subtasks]
        result.append(task_dict)
    
    return result


@router.post("/{group_id}/tasks")
async def create_task(
    group_id: int,
    task_data: TaskCreate,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """
    UC039: Create a task in group workspace.
    Can optionally link to a workspace card.
    If parent_task_id is provided, creates a subtask.
    """
    # Verify membership
    member = session.exec(
        select(GroupMember).where(
            GroupMember.group_id == group_id,
            GroupMember.user_id == current_user.id
        )
    ).first()
    
    if not member and current_user.role not in [UserRole.LECTURER, UserRole.HEAD]:
        raise HTTPException(status_code=403, detail="Not a member of this group")
    
    # Verify card exists if provided
    if task_data.card_id:
        from app.models.group import WorkspaceCard
        card = session.get(WorkspaceCard, task_data.card_id)
        if not card or card.group_id != group_id:
            raise HTTPException(status_code=404, detail="Card not found or doesn't belong to this group")
    
    task = Task(
        group_id=group_id,
        **task_data.dict(),
        created_by=current_user.id
    )
    
    session.add(task)
    session.commit()
    session.refresh(task)
    
    return task


@router.patch("/{group_id}/tasks/{task_id}")
async def update_task(
    group_id: int,
    task_id: int,
    task_data: TaskUpdate,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """
    Update a task.
    """
    task = session.get(Task, task_id)
    if not task or task.group_id != group_id:
        raise HTTPException(status_code=404, detail="Task not found")
    
    # Update fields from TaskUpdate schema
    update_data = task_data.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(task, field, value)
    
    task.updated_at = datetime.utcnow()
    session.add(task)
    session.commit()
    session.refresh(task)
    
    return task


@router.delete("/{group_id}/tasks/{task_id}", response_model=ResponseMessage)
async def delete_task(
    group_id: int,
    task_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """
    Delete a task.
    """
    task = session.get(Task, task_id)
    if not task or task.group_id != group_id:
        raise HTTPException(status_code=404, detail="Task not found")
    
    # Delete subtasks first
    subtasks = session.exec(select(Task).where(Task.parent_task_id == task_id)).all()
    for st in subtasks:
        session.delete(st)
    
    session.delete(task)
    session.commit()
    
    return ResponseMessage(message="Task deleted")


# ==================== MILESTONE QUESTIONS ====================

@router.get("/{group_id}/milestones/{milestone_id}/questions")
async def get_milestone_questions(
    group_id: int,
    milestone_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """
    Get questions for a milestone.
    """
    group = session.get(Group, group_id)
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")
    
    # Get project milestone
    milestone = session.get(ProjectMilestone, milestone_id)
    if not milestone:
        raise HTTPException(status_code=404, detail="Milestone not found")
    
    questions = session.exec(
        select(MilestoneQuestion).where(MilestoneQuestion.milestone_id == milestone_id)
    ).all()
    
    return questions


@router.post("/{group_id}/milestones/{milestone_id}/questions")
async def create_milestone_question(
    group_id: int,
    milestone_id: int,
    question: str,
    description: Optional[str] = None,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_lecturer)
):
    """
    Lecturer: Create a question for a milestone.
    """
    group = session.get(Group, group_id)
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")
    
    milestone = session.get(ProjectMilestone, milestone_id)
    if not milestone:
        raise HTTPException(status_code=404, detail="Milestone not found")
    
    new_question = MilestoneQuestion(
        milestone_id=milestone_id,
        question=question,
        description=description,
        created_by=current_user.id
    )
    session.add(new_question)
    session.commit()
    session.refresh(new_question)
    
    return new_question


@router.patch("/{group_id}/milestones/{milestone_id}/questions/{question_id}")
async def update_milestone_question(
    group_id: int,
    milestone_id: int,
    question_id: int,
    question: Optional[str] = None,
    description: Optional[str] = None,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_lecturer)
):
    """
    Lecturer: Update a milestone question.
    """
    q = session.get(MilestoneQuestion, question_id)
    if not q or q.milestone_id != milestone_id:
        raise HTTPException(status_code=404, detail="Question not found")
    
    if question:
        q.question = question
    if description is not None:
        q.description = description
    
    session.add(q)
    session.commit()
    session.refresh(q)
    
    return q


@router.delete("/{group_id}/milestones/{milestone_id}/questions/{question_id}", response_model=ResponseMessage)
async def delete_milestone_question(
    group_id: int,
    milestone_id: int,
    question_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_lecturer)
):
    """
    Lecturer: Delete a milestone question.
    """
    q = session.get(MilestoneQuestion, question_id)
    if not q or q.milestone_id != milestone_id:
        raise HTTPException(status_code=404, detail="Question not found")
    
    session.delete(q)
    session.commit()
    
    return ResponseMessage(message="Question deleted")
