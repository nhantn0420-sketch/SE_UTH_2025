"""
Subjects & Curricula Router - Quản lý môn học & giáo trình
Staff: Import, create, manage
"""

from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Query
from sqlmodel import Session, select, func
from typing import List, Optional
from datetime import datetime
import pandas as pd
from io import BytesIO

from app.database import get_session
from app.models.user import User, UserRole
from app.models.subject import (
    Subject, SubjectCreate, SubjectUpdate, SubjectResponse,
    Curriculum, CurriculumCreate, CurriculumUpdate, CurriculumResponse
)
from app.schemas.common import ResponseMessage, ImportResult
from app.utils.dependencies import get_current_user, get_current_staff, get_current_staff_or_admin

router = APIRouter()


# ==================== STATISTICS ENDPOINT ====================

@router.get("/statistics")
async def get_subject_statistics(
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_staff)
):
    """
    Staff: Get statistics for subjects, classes, curricula.
    """
    # Count subjects
    total_subjects = session.exec(select(func.count(Subject.id))).one()
    active_subjects = session.exec(
        select(func.count(Subject.id)).where(Subject.is_active == True)
    ).one()
    
    # Count curricula
    total_curricula = session.exec(select(func.count(Curriculum.id))).one()
    
    # Count classes (need to import)
    from app.models.academic import Class
    total_classes = session.exec(select(func.count(Class.id))).one()
    active_classes = session.exec(
        select(func.count(Class.id)).where(Class.is_active == True)
    ).one()
    
    # Count lecturers and students
    lecturers = session.exec(
        select(func.count(User.id)).where(User.role == UserRole.LECTURER)
    ).one()
    students = session.exec(
        select(func.count(User.id)).where(User.role == UserRole.STUDENT)
    ).one()
    
    return {
        "subjects": total_subjects,
        "active_subjects": active_subjects,
        "classes": total_classes,
        "active_classes": active_classes,
        "curricula": total_curricula,
        "lecturers": lecturers,
        "students": students
    }


# ==================== SUBJECT ENDPOINTS ====================

@router.get("/", response_model=List[SubjectResponse])
async def get_all_subjects(
    is_active: Optional[bool] = Query(None),
    search: Optional[str] = Query(None),
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """
    Get all subjects (accessible to all authenticated users).
    """
    statement = select(Subject)
    
    if is_active is not None:
        statement = statement.where(Subject.is_active == is_active)
    if search:
        statement = statement.where(
            (Subject.code.contains(search)) |
            (Subject.name.contains(search))
        )
    
    statement = statement.offset(skip).limit(limit)
    subjects = session.exec(statement).all()
    return subjects


@router.get("/{subject_id}", response_model=SubjectResponse)
async def get_subject(
    subject_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """
    Get subject by ID.
    """
    subject = session.get(Subject, subject_id)
    if not subject:
        raise HTTPException(status_code=404, detail="Subject not found")
    return subject


@router.post("/", response_model=SubjectResponse)
async def create_subject(
    subject_data: SubjectCreate,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_staff)
):
    """
    Staff: Create a new subject.
    """
    # Check if code exists
    existing = session.exec(
        select(Subject).where(Subject.code == subject_data.code)
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="Subject code already exists")
    
    new_subject = Subject(**subject_data.dict())
    session.add(new_subject)
    session.commit()
    session.refresh(new_subject)
    
    return new_subject


@router.patch("/{subject_id}", response_model=SubjectResponse)
async def update_subject(
    subject_id: int,
    subject_data: SubjectUpdate,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_staff)
):
    """
    Staff: Update a subject.
    """
    subject = session.get(Subject, subject_id)
    if not subject:
        raise HTTPException(status_code=404, detail="Subject not found")
    
    update_data = subject_data.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(subject, key, value)
    
    subject.updated_at = datetime.utcnow()
    session.add(subject)
    session.commit()
    session.refresh(subject)
    
    return subject


@router.delete("/{subject_id}", response_model=ResponseMessage)
async def delete_subject(
    subject_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_staff)
):
    """
    Staff: Delete a subject (soft delete - deactivate).
    """
    subject = session.get(Subject, subject_id)
    if not subject:
        raise HTTPException(status_code=404, detail="Subject not found")
    
    subject.is_active = False
    subject.updated_at = datetime.utcnow()
    session.add(subject)
    session.commit()
    
    return ResponseMessage(message=f"Subject {subject.code} deactivated successfully")


@router.post("/import", response_model=ImportResult)
async def import_subjects(
    file: UploadFile = File(...),
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_staff)
):
    """
    Staff: Import subjects from CSV/Excel file.
    
    Expected columns: code, name, description (optional), credits
    """
    if not file.filename.endswith(('.csv', '.xlsx', '.xls')):
        raise HTTPException(status_code=400, detail="File must be CSV or Excel format")
    
    contents = await file.read()
    
    try:
        if file.filename.endswith('.csv'):
            df = pd.read_csv(BytesIO(contents))
        else:
            df = pd.read_excel(BytesIO(contents))
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error reading file: {str(e)}")
    
    required_cols = ['code', 'name']
    missing_cols = [col for col in required_cols if col not in df.columns]
    if missing_cols:
        raise HTTPException(status_code=400, detail=f"Missing required columns: {missing_cols}")
    
    created_items = []
    errors = []
    
    for idx, row in df.iterrows():
        try:
            existing = session.exec(
                select(Subject).where(Subject.code == str(row['code']))
            ).first()
            if existing:
                errors.append(f"Row {idx + 2}: Subject code '{row['code']}' already exists")
                continue
            
            new_subject = Subject(
                code=str(row['code']).strip(),
                name=str(row['name']).strip(),
                description=str(row.get('description', '')).strip() if pd.notna(row.get('description')) else None,
                credits=int(row.get('credits', 3)) if pd.notna(row.get('credits')) else 3
            )
            session.add(new_subject)
            created_items.append(row['code'])
            
        except Exception as e:
            errors.append(f"Row {idx + 2}: {str(e)}")
    
    session.commit()
    
    return ImportResult(
        success_count=len(created_items),
        error_count=len(errors),
        errors=errors,
        created_items=created_items
    )


# ==================== CURRICULUM ENDPOINTS ====================

@router.get("/curricula/all", response_model=List[CurriculumResponse])
async def get_all_curricula(
    search: Optional[str] = Query(None),
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=200),
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """
    Get all curricula in the system.
    """
    statement = select(Curriculum)
    
    if search:
        statement = statement.where(
            (Curriculum.code.contains(search)) |
            (Curriculum.name.contains(search))
        )
    
    statement = statement.offset(skip).limit(limit)
    curricula = session.exec(statement).all()
    return curricula


@router.post("/curricula/import", response_model=ImportResult)
async def import_curricula(
    file: UploadFile = File(...),
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_staff)
):
    """
    Staff: Import curricula from CSV/Excel file.
    
    Expected columns: code, name, subject_code, description (optional), objectives (optional)
    """
    if not file.filename.endswith(('.csv', '.xlsx', '.xls')):
        raise HTTPException(status_code=400, detail="File must be CSV or Excel format")
    
    contents = await file.read()
    
    try:
        if file.filename.endswith('.csv'):
            df = pd.read_csv(BytesIO(contents))
        else:
            df = pd.read_excel(BytesIO(contents))
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error reading file: {str(e)}")
    
    required_cols = ['code', 'name', 'subject_code']
    missing_cols = [col for col in required_cols if col not in df.columns]
    if missing_cols:
        raise HTTPException(status_code=400, detail=f"Missing required columns: {missing_cols}")
    
    created_items = []
    errors = []
    
    for idx, row in df.iterrows():
        try:
            # Find subject by code
            subject = session.exec(
                select(Subject).where(Subject.code == str(row['subject_code']))
            ).first()
            if not subject:
                errors.append(f"Row {idx + 2}: Subject code '{row['subject_code']}' not found")
                continue
            
            existing = session.exec(
                select(Curriculum).where(Curriculum.code == str(row['code']))
            ).first()
            if existing:
                errors.append(f"Row {idx + 2}: Curriculum code '{row['code']}' already exists")
                continue
            
            # Parse objectives
            objectives_list = []
            if pd.notna(row.get('objectives')):
                objectives_list = [obj.strip() for obj in str(row['objectives']).split(';') if obj.strip()]
            
            new_curriculum = Curriculum(
                code=str(row['code']).strip(),
                name=str(row['name']).strip(),
                subject_id=subject.id,
                description=str(row.get('description', '')).strip() if pd.notna(row.get('description')) else None,
                objectives=objectives_list
            )
            session.add(new_curriculum)
            created_items.append(row['code'])
            
        except Exception as e:
            errors.append(f"Row {idx + 2}: {str(e)}")
    
    session.commit()
    
    return ImportResult(
        success_count=len(created_items),
        error_count=len(errors),
        errors=errors,
        created_items=created_items
    )


@router.get("/{subject_id}/curricula", response_model=List[CurriculumResponse])
async def get_subject_curricula(
    subject_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """
    Get all curricula for a subject.
    """
    subject = session.get(Subject, subject_id)
    if not subject:
        raise HTTPException(status_code=404, detail="Subject not found")
    
    curricula = session.exec(
        select(Curriculum).where(Curriculum.subject_id == subject_id)
    ).all()
    return curricula


@router.post("/{subject_id}/curricula", response_model=CurriculumResponse)
async def create_curriculum(
    subject_id: int,
    curriculum_data: CurriculumCreate,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_staff)
):
    """
    Staff: Create a new curriculum for a subject.
    """
    subject = session.get(Subject, subject_id)
    if not subject:
        raise HTTPException(status_code=404, detail="Subject not found")
    
    curriculum_data.subject_id = subject_id
    new_curriculum = Curriculum(**curriculum_data.dict())
    session.add(new_curriculum)
    session.commit()
    session.refresh(new_curriculum)
    
    return new_curriculum


@router.get("/curricula/{curriculum_id}", response_model=CurriculumResponse)
async def get_curriculum(
    curriculum_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """
    Get curriculum by ID.
    """
    curriculum = session.get(Curriculum, curriculum_id)
    if not curriculum:
        raise HTTPException(status_code=404, detail="Curriculum not found")
    return curriculum


@router.patch("/curricula/{curriculum_id}", response_model=CurriculumResponse)
async def update_curriculum(
    curriculum_id: int,
    curriculum_data: CurriculumUpdate,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_staff)
):
    """
    Staff: Update a curriculum.
    """
    curriculum = session.get(Curriculum, curriculum_id)
    if not curriculum:
        raise HTTPException(status_code=404, detail="Curriculum not found")
    
    update_data = curriculum_data.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(curriculum, key, value)
    
    curriculum.updated_at = datetime.utcnow()
    session.add(curriculum)
    session.commit()
    session.refresh(curriculum)
    
    return curriculum
