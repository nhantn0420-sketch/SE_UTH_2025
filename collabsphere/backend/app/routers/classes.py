"""
Classes Router - Quản lý lớp học
Staff: Import, create, manage classes and members
"""

from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Query
from sqlmodel import Session, select, func
from typing import List, Optional
from datetime import datetime
import pandas as pd
from io import BytesIO

from app.database import get_session
from app.models.user import User, UserRole
from app.models.academic import Class, ClassCreate, ClassUpdate, ClassResponse, ClassMember, Semester
from app.models.subject import Subject
from app.schemas.common import ResponseMessage, ImportResult
from app.utils.dependencies import (
    get_current_user, 
    get_current_staff, 
    get_current_lecturer,
    get_current_lecturer_or_head
)

router = APIRouter()


# ==================== CLASS MANAGEMENT ====================

@router.get("/", response_model=List[ClassResponse])
async def get_all_classes(
    subject_id: Optional[int] = Query(None),
    lecturer_id: Optional[int] = Query(None),
    semester: Optional[Semester] = Query(None),
    academic_year: Optional[str] = Query(None),
    is_active: Optional[bool] = Query(None),
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """
    Get all classes with optional filters.
    """
    statement = select(Class)
    
    if subject_id:
        statement = statement.where(Class.subject_id == subject_id)
    if lecturer_id:
        statement = statement.where(Class.lecturer_id == lecturer_id)
    if semester:
        statement = statement.where(Class.semester == semester)
    if academic_year:
        statement = statement.where(Class.academic_year == academic_year)
    if is_active is not None:
        statement = statement.where(Class.is_active == is_active)
    
    # Lecturers only see their assigned classes
    if current_user.role == UserRole.LECTURER:
        statement = statement.where(Class.lecturer_id == current_user.id)
    
    # Students only see their enrolled classes
    if current_user.role == UserRole.STUDENT:
        enrolled_class_ids = session.exec(
            select(ClassMember.class_id).where(ClassMember.user_id == current_user.id)
        ).all()
        statement = statement.where(Class.id.in_(enrolled_class_ids))
    
    statement = statement.offset(skip).limit(limit)
    classes = session.exec(statement).all()
    
    # Add student count
    result = []
    for cls in classes:
        count = session.exec(
            select(func.count(ClassMember.id)).where(ClassMember.class_id == cls.id)
        ).one()
        cls_dict = cls.dict()
        cls_dict['student_count'] = count
        result.append(ClassResponse(**cls_dict))
    
    return result


@router.get("/{class_id}", response_model=ClassResponse)
async def get_class(
    class_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """
    Get class by ID.
    """
    cls = session.get(Class, class_id)
    if not cls:
        raise HTTPException(status_code=404, detail="Class not found")
    
    # Check access
    if current_user.role == UserRole.STUDENT:
        member = session.exec(
            select(ClassMember).where(
                ClassMember.class_id == class_id,
                ClassMember.user_id == current_user.id
            )
        ).first()
        if not member:
            raise HTTPException(status_code=403, detail="Not enrolled in this class")
    
    count = session.exec(
        select(func.count(ClassMember.id)).where(ClassMember.class_id == cls.id)
    ).one()
    
    cls_dict = cls.dict()
    cls_dict['student_count'] = count
    return ClassResponse(**cls_dict)


@router.post("/", response_model=ClassResponse)
async def create_class(
    class_data: ClassCreate,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_staff)
):
    """
    Staff: Create a new class.
    """
    # Check if code exists
    existing = session.exec(
        select(Class).where(Class.code == class_data.code)
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="Class code already exists")
    
    # Verify subject exists
    subject = session.get(Subject, class_data.subject_id)
    if not subject:
        raise HTTPException(status_code=404, detail="Subject not found")
    
    # Verify lecturer if provided
    if class_data.lecturer_id:
        lecturer = session.get(User, class_data.lecturer_id)
        if not lecturer or lecturer.role != UserRole.LECTURER:
            raise HTTPException(status_code=400, detail="Invalid lecturer ID")
    
    new_class = Class(**class_data.dict())
    session.add(new_class)
    session.commit()
    session.refresh(new_class)
    
    return ClassResponse(**new_class.dict(), student_count=0)


@router.patch("/{class_id}", response_model=ClassResponse)
async def update_class(
    class_id: int,
    class_data: ClassUpdate,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_staff)
):
    """
    Staff: Update a class.
    """
    cls = session.get(Class, class_id)
    if not cls:
        raise HTTPException(status_code=404, detail="Class not found")
    
    update_data = class_data.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(cls, key, value)
    
    cls.updated_at = datetime.utcnow()
    session.add(cls)
    session.commit()
    session.refresh(cls)
    
    count = session.exec(
        select(func.count(ClassMember.id)).where(ClassMember.class_id == cls.id)
    ).one()
    
    return ClassResponse(**cls.dict(), student_count=count)


@router.post("/import", response_model=ImportResult)
async def import_classes(
    file: UploadFile = File(...),
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_staff)
):
    """
    Staff: Import classes from CSV/Excel file.
    
    Expected columns: code, name, subject_code, semester, academic_year, max_students
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
    
    required_cols = ['code', 'name', 'subject_code', 'semester', 'academic_year']
    missing_cols = [col for col in required_cols if col not in df.columns]
    if missing_cols:
        raise HTTPException(status_code=400, detail=f"Missing required columns: {missing_cols}")
    
    created_items = []
    errors = []
    
    for idx, row in df.iterrows():
        try:
            existing = session.exec(
                select(Class).where(Class.code == str(row['code']))
            ).first()
            if existing:
                errors.append(f"Row {idx + 2}: Class code '{row['code']}' already exists")
                continue
            
            # Find subject by code
            subject = session.exec(
                select(Subject).where(Subject.code == str(row['subject_code']))
            ).first()
            if not subject:
                errors.append(f"Row {idx + 2}: Subject code '{row['subject_code']}' not found")
                continue
            
            semester_str = str(row['semester']).lower().strip()
            semester_map = {'spring': Semester.SPRING, 'summer': Semester.SUMMER, 'fall': Semester.FALL}
            if semester_str not in semester_map:
                errors.append(f"Row {idx + 2}: Invalid semester '{semester_str}'")
                continue
            
            new_class = Class(
                code=str(row['code']).strip(),
                name=str(row['name']).strip(),
                subject_id=subject.id,
                semester=semester_map[semester_str],
                academic_year=str(row['academic_year']).strip(),
                max_students=int(row.get('max_students', 40)) if pd.notna(row.get('max_students')) else 40
            )
            session.add(new_class)
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


# ==================== CLASS MEMBERS ====================

@router.get("/{class_id}/members")
async def get_class_members(
    class_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """
    Get all members of a class.
    """
    cls = session.get(Class, class_id)
    if not cls:
        raise HTTPException(status_code=404, detail="Class not found")
    
    members = session.exec(
        select(ClassMember, User)
        .join(User)
        .where(ClassMember.class_id == class_id)
    ).all()
    
    return [
        {
            "id": member.id,
            "user_id": user.id,
            "username": user.username,
            "full_name": user.full_name,
            "email": user.email,
            "joined_at": member.joined_at
        }
        for member, user in members
    ]


@router.post("/{class_id}/members", response_model=ResponseMessage)
async def add_class_member(
    class_id: int,
    user_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_staff)
):
    """
    Staff: Add a student to a class.
    """
    cls = session.get(Class, class_id)
    if not cls:
        raise HTTPException(status_code=404, detail="Class not found")
    
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if user.role != UserRole.STUDENT:
        raise HTTPException(status_code=400, detail="Only students can be added to classes")
    
    # Check if already enrolled
    existing = session.exec(
        select(ClassMember).where(
            ClassMember.class_id == class_id,
            ClassMember.user_id == user_id
        )
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="Student already enrolled in this class")
    
    # Check max students
    count = session.exec(
        select(func.count(ClassMember.id)).where(ClassMember.class_id == class_id)
    ).one()
    if count >= cls.max_students:
        raise HTTPException(status_code=400, detail="Class is full")
    
    new_member = ClassMember(class_id=class_id, user_id=user_id)
    session.add(new_member)
    session.commit()
    
    return ResponseMessage(message=f"Student {user.username} added to class {cls.code}")


@router.post("/{class_id}/members/bulk", response_model=ImportResult)
async def add_class_members_bulk(
    class_id: int,
    user_ids: List[int],
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_staff)
):
    """
    Staff: Add multiple students to a class.
    """
    cls = session.get(Class, class_id)
    if not cls:
        raise HTTPException(status_code=404, detail="Class not found")
    
    created_items = []
    errors = []
    
    for user_id in user_ids:
        user = session.get(User, user_id)
        if not user:
            errors.append(f"User ID {user_id} not found")
            continue
        if user.role != UserRole.STUDENT:
            errors.append(f"User {user.username} is not a student")
            continue
        
        existing = session.exec(
            select(ClassMember).where(
                ClassMember.class_id == class_id,
                ClassMember.user_id == user_id
            )
        ).first()
        if existing:
            errors.append(f"Student {user.username} already enrolled")
            continue
        
        new_member = ClassMember(class_id=class_id, user_id=user_id)
        session.add(new_member)
        created_items.append(user.username)
    
    session.commit()
    
    return ImportResult(
        success_count=len(created_items),
        error_count=len(errors),
        errors=errors,
        created_items=created_items
    )


@router.delete("/{class_id}/members/{user_id}", response_model=ResponseMessage)
async def remove_class_member(
    class_id: int,
    user_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_staff)
):
    """
    Staff: Remove a student from a class.
    """
    member = session.exec(
        select(ClassMember).where(
            ClassMember.class_id == class_id,
            ClassMember.user_id == user_id
        )
    ).first()
    
    if not member:
        raise HTTPException(status_code=404, detail="Student not found in this class")
    
    session.delete(member)
    session.commit()
    
    return ResponseMessage(message="Student removed from class")


@router.post("/{class_id}/assign-lecturer", response_model=ResponseMessage)
async def assign_lecturer(
    class_id: int,
    lecturer_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_staff)
):
    """
    Staff: Assign a lecturer to a class.
    """
    cls = session.get(Class, class_id)
    if not cls:
        raise HTTPException(status_code=404, detail="Class not found")
    
    lecturer = session.get(User, lecturer_id)
    if not lecturer or lecturer.role != UserRole.LECTURER:
        raise HTTPException(status_code=400, detail="Invalid lecturer ID")
    
    cls.lecturer_id = lecturer_id
    cls.updated_at = datetime.utcnow()
    session.add(cls)
    session.commit()
    
    return ResponseMessage(message=f"Lecturer {lecturer.username} assigned to class {cls.code}")
