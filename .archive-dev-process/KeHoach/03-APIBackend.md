# Giai Đoạn 3: Phát Triển API Backend Theo Module

**Thời gian**: 2-3 tuần  
**Mục tiêu**: Implement đầy đủ REST API endpoints cho tất cả chức năng theo yêu cầu đề bài

## Nhiệm Vụ Chính

### 3.1. Module Quản Lý Người Dùng (User Management)

#### A. API Endpoints cho Admin

**`app/routers/users.py`**:
```python
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlmodel import Session, select
from typing import List
from app.database import get_session
from app.models.user import User, UserRole
from app.utils.dependencies import get_current_admin, get_current_staff
from app.schemas.user import UserResponse, UserUpdate

router = APIRouter()

@router.get("/", response_model=List[UserResponse])
def get_all_users(
    role: UserRole | None = Query(None),
    skip: int = 0,
    limit: int = 100,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_admin)
):
    """Admin: Xem tất cả tài khoản của hệ thống"""
    statement = select(User)
    if role:
        statement = statement.where(User.role == role)
    statement = statement.offset(skip).limit(limit)
    users = session.exec(statement).all()
    return users

@router.patch("/{user_id}/deactivate")
def deactivate_user(
    user_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_admin)
):
    """Admin: Hủy kích hoạt tài khoản người dùng"""
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user.is_active = False
    session.add(user)
    session.commit()
    
    return {"message": f"User {user.username} deactivated successfully"}

@router.patch("/{user_id}/activate")
def activate_user(
    user_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_admin)
):
    """Admin: Kích hoạt lại tài khoản"""
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user.is_active = True
    session.add(user)
    session.commit()
    
    return {"message": f"User {user.username} activated successfully"}
```

#### B. API Import File Tạo Accounts (Staff)

**`app/routers/staff.py`**:
```python
from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlmodel import Session
import pandas as pd
from io import BytesIO
from app.database import get_session
from app.models.user import User, UserRole
from app.utils.dependencies import get_current_staff
from app.utils.security import get_password_hash

router = APIRouter()

@router.post("/import-users")
async def import_users(
    file: UploadFile = File(...),
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_staff)
):
    """
    Staff: Import file CSV/Excel để tạo tài khoản
    Expected columns: username, email, password, full_name, role
    """
    if not file.filename.endswith(('.csv', '.xlsx', '.xls')):
        raise HTTPException(status_code=400, detail="File must be CSV or Excel")
    
    # Read file
    contents = await file.read()
    if file.filename.endswith('.csv'):
        df = pd.read_csv(BytesIO(contents))
    else:
        df = pd.read_excel(BytesIO(contents))
    
    # Validate columns
    required_cols = ['username', 'email', 'password', 'full_name', 'role']
    if not all(col in df.columns for col in required_cols):
        raise HTTPException(status_code=400, detail=f"Missing required columns: {required_cols}")
    
    # Create users
    created_users = []
    errors = []
    
    for idx, row in df.iterrows():
        try:
            # Check if user exists
            existing = session.query(User).filter(User.username == row['username']).first()
            if existing:
                errors.append(f"Row {idx}: Username {row['username']} already exists")
                continue
            
            # Create user
            new_user = User(
                username=row['username'],
                email=row['email'],
                hashed_password=get_password_hash(row['password']),
                full_name=row['full_name'],
                role=UserRole(row['role'])
            )
            session.add(new_user)
            created_users.append(row['username'])
        except Exception as e:
            errors.append(f"Row {idx}: {str(e)}")
    
    session.commit()
    
    return {
        "message": f"Successfully created {len(created_users)} users",
        "created_users": created_users,
        "errors": errors
    }
```

### 3.2. Module Quản Lý Môn Học & Giáo Trình

**`app/routers/subjects.py`**:
```python
from fastapi import APIRouter, Depends, UploadFile, File
from sqlmodel import Session, select
from typing import List
import pandas as pd
from io import BytesIO
from app.database import get_session
from app.models.subject import Subject, Curriculum
from app.utils.dependencies import get_current_staff
from app.schemas.subject import SubjectCreate, SubjectResponse, CurriculumCreate

router = APIRouter()

@router.post("/import")
async def import_subjects(
    file: UploadFile = File(...),
    session: Session = Depends(get_session),
    current_user = Depends(get_current_staff)
):
    """Staff: Import môn học từ file"""
    contents = await file.read()
    df = pd.read_csv(BytesIO(contents)) if file.filename.endswith('.csv') else pd.read_excel(BytesIO(contents))
    
    created_subjects = []
    for _, row in df.iterrows():
        subject = Subject(
            code=row['code'],
            name=row['name'],
            description=row.get('description', ''),
            credits=row['credits']
        )
        session.add(subject)
        created_subjects.append(subject.code)
    
    session.commit()
    return {"created_subjects": created_subjects}

@router.get("/", response_model=List[SubjectResponse])
def get_subjects(
    skip: int = 0,
    limit: int = 100,
    session: Session = Depends(get_session)
):
    """Xem danh sách môn học"""
    statement = select(Subject).offset(skip).limit(limit)
    subjects = session.exec(statement).all()
    return subjects

@router.post("/{subject_id}/curricula", response_model=CurriculumCreate)
def create_curriculum(
    subject_id: int,
    curriculum_data: CurriculumCreate,
    session: Session = Depends(get_session),
    current_user = Depends(get_current_staff)
):
    """Staff: Tạo giáo trình cho môn học"""
    curriculum = Curriculum(**curriculum_data.dict(), subject_id=subject_id)
    session.add(curriculum)
    session.commit()
    session.refresh(curriculum)
    return curriculum
```

### 3.3. Module Quản Lý Lớp Học

**`app/routers/classes.py`**:
```python
from fastapi import APIRouter, Depends, UploadFile, File
from sqlmodel import Session, select
from typing import List
import pandas as pd
from app.database import get_session
from app.models.class_model import Class, ClassMember
from app.utils.dependencies import get_current_staff
from app.schemas.class_schema import ClassCreate, ClassResponse, AssignMembersRequest

router = APIRouter()

@router.post("/import")
async def import_classes(
    file: UploadFile = File(...),
    session: Session = Depends(get_session),
    current_user = Depends(get_current_staff)
):
    """Staff: Import lớp học từ file"""
    contents = await file.read()
    df = pd.read_csv(BytesIO(contents)) if file.filename.endswith('.csv') else pd.read_excel(BytesIO(contents))
    
    created_classes = []
    for _, row in df.iterrows():
        cls = Class(
            code=row['code'],
            name=row['name'],
            semester=row['semester'],
            subject_id=row['subject_id']
        )
        session.add(cls)
        created_classes.append(cls.code)
    
    session.commit()
    return {"created_classes": created_classes}

@router.get("/", response_model=List[ClassResponse])
def get_classes(
    session: Session = Depends(get_session)
):
    """Xem danh sách lớp học"""
    classes = session.exec(select(Class)).all()
    return classes

@router.post("/{class_id}/assign-members")
def assign_members(
    class_id: int,
    request: AssignMembersRequest,
    session: Session = Depends(get_session),
    current_user = Depends(get_current_staff)
):
    """Staff: Phân công giảng viên và sinh viên vào lớp"""
    cls = session.get(Class, class_id)
    if not cls:
        raise HTTPException(status_code=404, detail="Class not found")
    
    # Assign lecturer
    if request.lecturer_id:
        cls.lecturer_id = request.lecturer_id
    
    # Assign students
    for student_id in request.student_ids:
        member = ClassMember(class_id=class_id, student_id=student_id)
        session.add(member)
    
    session.commit()
    return {"message": "Members assigned successfully"}

@router.get("/{class_id}/members")
def get_class_members(
    class_id: int,
    session: Session = Depends(get_session)
):
    """Xem danh sách thành viên lớp"""
    members = session.exec(
        select(ClassMember).where(ClassMember.class_id == class_id)
    ).all()
    return members
```

### 3.4. Module Quản Lý Dự Án

**`app/routers/projects.py`**:
```python
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from typing import List
from app.database import get_session
from app.models.project import Project, ProjectStatus
from app.models.user import User
from app.utils.dependencies import get_current_lecturer, get_current_head
from app.schemas.project import ProjectCreate, ProjectResponse, ProjectUpdate

router = APIRouter()

@router.post("/", response_model=ProjectResponse)
def create_project(
    project_data: ProjectCreate,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_lecturer)
):
    """Giảng viên: Tạo dự án"""
    project = Project(
        **project_data.dict(),
        created_by=current_user.id,
        status=ProjectStatus.DRAFT
    )
    session.add(project)
    session.commit()
    session.refresh(project)
    return project

@router.get("/my-projects", response_model=List[ProjectResponse])
def get_my_projects(
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_lecturer)
):
    """Giảng viên: Xem danh sách dự án của mình"""
    statement = select(Project).where(Project.created_by == current_user.id)
    projects = session.exec(statement).all()
    return projects

@router.post("/{project_id}/submit")
def submit_project(
    project_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_lecturer)
):
    """Giảng viên: Gửi dự án để phê duyệt"""
    project = session.get(Project, project_id)
    if not project or project.created_by != current_user.id:
        raise HTTPException(status_code=404, detail="Project not found")
    
    if project.status != ProjectStatus.DRAFT:
        raise HTTPException(status_code=400, detail="Project already submitted")
    
    project.status = ProjectStatus.PENDING
    session.add(project)
    session.commit()
    
    return {"message": "Project submitted for approval"}

@router.get("/pending", response_model=List[ProjectResponse])
def get_pending_projects(
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_head)
):
    """Trưởng khoa: Xem dự án đang chờ phê duyệt"""
    statement = select(Project).where(Project.status == ProjectStatus.PENDING)
    projects = session.exec(statement).all()
    return projects

@router.post("/{project_id}/approve")
def approve_project(
    project_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_head)
):
    """Trưởng khoa: Phê duyệt dự án"""
    project = session.get(Project, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    project.status = ProjectStatus.APPROVED
    project.approved_by = current_user.id
    session.add(project)
    session.commit()
    
    # TODO: Send notification to creator
    
    return {"message": "Project approved"}

@router.post("/{project_id}/reject")
def reject_project(
    project_id: int,
    reason: str,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_head)
):
    """Trưởng khoa: Từ chối dự án"""
    project = session.get(Project, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    project.status = ProjectStatus.REJECTED
    session.add(project)
    session.commit()
    
    # TODO: Send notification with reason
    
    return {"message": "Project rejected", "reason": reason}

@router.get("/approved", response_model=List[ProjectResponse])
def get_approved_projects(
    session: Session = Depends(get_session)
):
    """Xem danh sách dự án đã được phê duyệt"""
    statement = select(Project).where(Project.status == ProjectStatus.APPROVED)
    projects = session.exec(statement).all()
    return projects

@router.patch("/{project_id}", response_model=ProjectResponse)
def update_project(
    project_id: int,
    project_data: ProjectUpdate,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_head)
):
    """Trưởng khoa: Cập nhật dự án đã phê duyệt"""
    project = session.get(Project, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    for key, value in project_data.dict(exclude_unset=True).items():
        setattr(project, key, value)
    
    session.add(project)
    session.commit()
    session.refresh(project)
    return project
```

### 3.5. Module Quản Lý Nhóm & Workspace

**`app/routers/groups.py`**:
```python
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from typing import List
from app.database import get_session
from app.models.group import Group, GroupMember, Milestone
from app.utils.dependencies import get_current_lecturer, get_current_user
from app.schemas.group import GroupCreate, GroupResponse, MilestoneCreate

router = APIRouter()

@router.post("/", response_model=GroupResponse)
def create_group(
    group_data: GroupCreate,
    session: Session = Depends(get_session),
    current_user = Depends(get_current_lecturer)
):
    """Giảng viên: Tạo nhóm"""
    group = Group(**group_data.dict())
    session.add(group)
    session.commit()
    session.refresh(group)
    return group

@router.get("/{group_id}", response_model=GroupResponse)
def get_group(
    group_id: int,
    session: Session = Depends(get_session),
    current_user = Depends(get_current_user)
):
    """Xem thông tin nhóm"""
    group = session.get(Group, group_id)
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")
    return group

@router.post("/{group_id}/members")
def add_group_member(
    group_id: int,
    student_id: int,
    session: Session = Depends(get_session),
    current_user = Depends(get_current_lecturer)
):
    """Giảng viên: Thêm thành viên vào nhóm"""
    member = GroupMember(group_id=group_id, student_id=student_id)
    session.add(member)
    session.commit()
    return {"message": "Member added successfully"}

@router.get("/{group_id}/progress")
def get_group_progress(
    group_id: int,
    session: Session = Depends(get_session),
    current_user = Depends(get_current_user)
):
    """Theo dõi tiến độ nhóm"""
    # Get all milestones
    milestones = session.exec(
        select(Milestone).where(Milestone.group_id == group_id)
    ).all()
    
    total = len(milestones)
    completed = sum(1 for m in milestones if m.is_completed)
    progress_percentage = (completed / total * 100) if total > 0 else 0
    
    return {
        "group_id": group_id,
        "total_milestones": total,
        "completed_milestones": completed,
        "progress_percentage": progress_percentage
    }

@router.get("/{group_id}/contributions")
def get_member_contributions(
    group_id: int,
    session: Session = Depends(get_session),
    current_user = Depends(get_current_user)
):
    """Theo dõi đóng góp của từng thành viên"""
    members = session.exec(
        select(GroupMember).where(GroupMember.group_id == group_id)
    ).all()
    
    contributions = [
        {
            "student_id": m.student_id,
            "contribution_score": m.contribution_score
        }
        for m in members
    ]
    
    return {"group_id": group_id, "contributions": contributions}

@router.post("/{group_id}/milestones")
def create_milestone(
    group_id: int,
    milestone_data: MilestoneCreate,
    session: Session = Depends(get_session),
    current_user = Depends(get_current_lecturer)
):
    """Giảng viên: Tạo mốc cho nhóm"""
    milestone = Milestone(**milestone_data.dict(), group_id=group_id)
    session.add(milestone)
    session.commit()
    return {"message": "Milestone created"}

@router.post("/{group_id}/milestones/{milestone_id}/complete")
def mark_milestone_complete(
    group_id: int,
    milestone_id: int,
    session: Session = Depends(get_session),
    current_user = Depends(get_current_user)
):
    """Trưởng nhóm: Đánh dấu mốc hoàn thành"""
    milestone = session.get(Milestone, milestone_id)
    if not milestone or milestone.group_id != group_id:
        raise HTTPException(status_code=404, detail="Milestone not found")
    
    milestone.is_completed = True
    milestone.completed_at = datetime.utcnow()
    session.add(milestone)
    session.commit()
    
    # TODO: Send notifications
    
    return {"message": "Milestone marked as complete"}
```

### 3.6. Module Quản Lý Đánh Giá & Phản Hồi

**`app/routers/evaluations.py`**:
```python
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from typing import List
from app.database import get_session
from app.models.evaluation import Evaluation, PeerReview
from app.utils.dependencies import get_current_lecturer, get_current_user
from app.schemas.evaluation import EvaluationCreate, PeerReviewCreate

router = APIRouter()

@router.post("/", response_model=EvaluationCreate)
def create_evaluation(
    eval_data: EvaluationCreate,
    session: Session = Depends(get_session),
    current_user = Depends(get_current_lecturer)
):
    """Giảng viên: Đánh giá nhóm/thành viên"""
    evaluation = Evaluation(
        **eval_data.dict(),
        evaluator_id=current_user.id
    )
    session.add(evaluation)
    session.commit()
    
    # TODO: Send notification to target
    
    return evaluation

@router.get("/peer-reviews/{group_id}")
def get_peer_reviews(
    group_id: int,
    session: Session = Depends(get_session),
    current_user = Depends(get_current_user)
):
    """Xem đánh giá đồng nghiệp trong nhóm"""
    reviews = session.exec(
        select(PeerReview).where(PeerReview.group_id == group_id)
    ).all()
    return reviews

@router.post("/peer-review")
def create_peer_review(
    review_data: PeerReviewCreate,
    session: Session = Depends(get_session),
    current_user = Depends(get_current_user)
):
    """Sinh viên: Đánh giá đồng nghiệp"""
    review = PeerReview(
        **review_data.dict(),
        reviewer_id=current_user.id
    )
    session.add(review)
    session.commit()
    
    # TODO: Send notification
    
    return {"message": "Peer review submitted"}

@router.get("/my-evaluations")
def get_my_evaluations(
    session: Session = Depends(get_session),
    current_user = Depends(get_current_user)
):
    """Xem đánh giá của bản thân"""
    evaluations = session.exec(
        select(Evaluation).where(Evaluation.target_id == current_user.id)
    ).all()
    return evaluations
```

### 3.7. Module Quản Lý Tài Nguyên

**`app/routers/resources.py`**:
```python
from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlmodel import Session, select
from typing import List
import cloudinary
import cloudinary.uploader
from app.database import get_session
from app.models.resource import Resource
from app.utils.dependencies import get_current_user
from app.config import settings

# Configure Cloudinary
cloudinary.config(
    cloud_name=settings.cloudinary_cloud_name,
    api_key=settings.cloudinary_api_key,
    api_secret=settings.cloudinary_api_secret
)

router = APIRouter()

@router.post("/upload")
async def upload_resource(
    file: UploadFile = File(...),
    title: str,
    group_id: int = None,
    class_id: int = None,
    session: Session = Depends(get_session),
    current_user = Depends(get_current_user)
):
    """Upload tài nguyên (file, tài liệu, slide)"""
    # Upload to Cloudinary
    try:
        contents = await file.read()
        upload_result = cloudinary.uploader.upload(
            contents,
            resource_type="auto",
            folder="collabsphere"
        )
        
        # Save to database
        resource = Resource(
            title=title,
            file_url=upload_result['secure_url'],
            file_type=file.content_type,
            uploaded_by=current_user.id,
            group_id=group_id,
            class_id=class_id
        )
        session.add(resource)
        session.commit()
        
        # TODO: Send notification
        
        return {
            "message": "File uploaded successfully",
            "url": upload_result['secure_url'],
            "resource_id": resource.id
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Upload failed: {str(e)}")

@router.get("/class/{class_id}")
def get_class_resources(
    class_id: int,
    session: Session = Depends(get_session),
    current_user = Depends(get_current_user)
):
    """Xem tài nguyên của lớp"""
    resources = session.exec(
        select(Resource).where(Resource.class_id == class_id)
    ).all()
    return resources

@router.get("/group/{group_id}")
def get_group_resources(
    group_id: int,
    session: Session = Depends(get_session),
    current_user = Depends(get_current_user)
):
    """Xem tài nguyên của nhóm"""
    resources = session.exec(
        select(Resource).where(Resource.group_id == group_id)
    ).all()
    return resources

@router.delete("/{resource_id}")
def delete_resource(
    resource_id: int,
    session: Session = Depends(get_session),
    current_user = Depends(get_current_user)
):
    """Xóa tài nguyên"""
    resource = session.get(Resource, resource_id)
    if not resource:
        raise HTTPException(status_code=404, detail="Resource not found")
    
    # Check permissions
    if resource.uploaded_by != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    session.delete(resource)
    session.commit()
    
    return {"message": "Resource deleted"}
```

## Deliverables Giai Đoạn 3

- [ ] API endpoints cho quản lý người dùng (admin, staff)
- [ ] API import file (CSV/Excel) cho users, subjects, classes
- [ ] API quản lý môn học & giáo trình
- [ ] API quản lý lớp học và thành viên
- [ ] API quản lý dự án (create, submit, approve/reject)
- [ ] API quản lý nhóm (create, members, progress, contributions)
- [ ] API quản lý milestones và checkpoints
- [ ] API đánh giá và phản hồi (evaluation, peer review)
- [ ] API quản lý tài nguyên (upload, view, delete)
- [ ] Swagger documentation đầy đủ tại `/docs`

## Testing

```python
# Test với pytest
# app/tests/test_projects.py
import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_create_project():
    # Login first
    login_response = client.post("/api/v1/auth/login", data={
        "username": "lecturer1",
        "password": "password"
    })
    token = login_response.json()["access_token"]
    
    # Create project
    response = client.post(
        "/api/v1/projects/",
        json={
            "title": "Test Project",
            "description": "Test description",
            "goals": "Test goals",
            "milestones_json": "[]"
        },
        headers={"Authorization": f"Bearer {token}"}
    )
    assert response.status_code == 200
    assert response.json()["title"] == "Test Project"
```

## Next Steps

Chuyển sang `04-AIRealtime.md` để tích hợp AI và real-time features.
