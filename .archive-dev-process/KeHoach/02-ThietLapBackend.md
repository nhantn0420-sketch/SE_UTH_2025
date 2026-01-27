# Giai Đoạn 2: Thiết Lập và Phát Triển Backend Core

**Thời gian**: 1 tuần  
**Mục tiêu**: Tạo foundation cho backend với database models, authentication, và basic API structure

## Nhiệm Vụ Chính

### 2.1. Thiết Lập Môi Trường Development

#### A. Cài Đặt Dependencies

**1. Khởi tạo project**:
```bash
# Tạo folder structure
mkdir collabsphere
cd collabsphere
mkdir backend frontend docs

# Backend setup
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate
```

**2. Install Python packages**:
```bash
pip install fastapi==0.104.1
pip install uvicorn[standard]==0.24.0
pip install sqlmodel==0.0.14
pip install psycopg2-binary==2.9.9  # PostgreSQL driver
pip install python-jose[cryptography]==3.3.0  # JWT
pip install passlib[bcrypt]==1.7.4  # Password hashing
pip install python-multipart==0.0.6  # File upload
pip install pandas==2.1.3  # CSV/Excel import
pip install openpyxl==3.1.2  # Excel support
pip install python-dotenv==1.0.0  # Environment variables
pip install redis==5.0.1  # Redis client
pip install python-socketio==5.10.0  # Socket.IO
pip install aiofiles==23.2.1  # Async file operations
pip install boto3==1.29.7  # AWS SDK
pip install cloudinary==1.36.0  # Cloudinary SDK
pip install httpx==0.25.2  # HTTP client for AI calls

# Save requirements
pip freeze > requirements.txt
```

**3. Project structure**:
```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py               # FastAPI app entry point
│   ├── config.py             # Configuration (DB, secrets)
│   ├── database.py           # Database connection
│   ├── models/               # SQLModel models
│   │   ├── __init__.py
│   │   ├── user.py
│   │   ├── subject.py
│   │   ├── project.py
│   │   ├── group.py
│   │   └── evaluation.py
│   ├── schemas/              # Pydantic schemas (request/response)
│   │   ├── __init__.py
│   │   ├── user.py
│   │   ├── auth.py
│   │   └── project.py
│   ├── routers/              # API endpoints
│   │   ├── __init__.py
│   │   ├── auth.py
│   │   ├── users.py
│   │   ├── projects.py
│   │   └── groups.py
│   ├── services/             # Business logic
│   │   ├── __init__.py
│   │   ├── auth_service.py
│   │   ├── ai_service.py
│   │   └── notification_service.py
│   ├── utils/                # Helpers
│   │   ├── __init__.py
│   │   ├── security.py       # JWT, hashing
│   │   └── dependencies.py   # FastAPI dependencies
│   └── tests/                # Test files
│       ├── __init__.py
│       └── test_auth.py
├── alembic/                  # Database migrations
├── .env                      # Environment variables
├── requirements.txt
└── README.md
```

#### B. Configuration Setup

**Tạo `.env` file**:
```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/collabsphere

# Security
SECRET_KEY=your-secret-key-here-generate-with-openssl
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# AWS
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
AWS_REGION=us-east-1
BEDROCK_MODEL_ID=anthropic.claude-v2

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Redis
REDIS_URL=redis://localhost:6379

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

**Tạo `app/config.py`**:
```python
from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    # Database
    database_url: str
    
    # Security
    secret_key: str
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    
    # AWS
    aws_access_key_id: str
    aws_secret_access_key: str
    aws_region: str
    bedrock_model_id: str
    
    # Cloudinary
    cloudinary_cloud_name: str
    cloudinary_api_key: str
    cloudinary_api_secret: str
    
    # Redis
    redis_url: str
    
    # Email
    smtp_host: str
    smtp_port: int
    smtp_user: str
    smtp_password: str
    
    class Config:
        env_file = ".env"

settings = Settings()
```

### 2.2. Thiết Lập Database

#### A. PostgreSQL Setup

**1. Install PostgreSQL** (nếu chưa có):
```bash
# Windows: Download from postgresql.org
# Mac: brew install postgresql
# Linux: sudo apt-get install postgresql

# Tạo database
createdb collabsphere

# Hoặc qua psql
psql -U postgres
CREATE DATABASE collabsphere;
\q
```

**2. Database connection (`app/database.py`)**:
```python
from sqlmodel import SQLModel, create_engine, Session
from app.config import settings

# Create engine
engine = create_engine(
    settings.database_url,
    echo=True,  # Log SQL queries (disable in production)
    pool_pre_ping=True  # Check connection health
)

# Dependency for getting DB session
def get_session():
    with Session(engine) as session:
        yield session

# Create all tables
def create_db_and_tables():
    SQLModel.metadata.create_all(engine)
```

#### B. Alembic Setup (Database Migrations)

```bash
# Install
pip install alembic

# Initialize
alembic init alembic

# Edit alembic.ini: set sqlalchemy.url
# Edit alembic/env.py: import models
```

**`alembic/env.py`** (sau khi tạo models):
```python
from app.database import engine
from app.models import *  # Import all models

target_metadata = SQLModel.metadata
```

### 2.3. Tạo Database Models

#### A. Base Models với SQLModel

**`app/models/user.py`**:
```python
from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
from datetime import datetime
from enum import Enum

class UserRole(str, Enum):
    ADMIN = "admin"
    STAFF = "staff"
    HEAD = "head"
    LECTURER = "lecturer"
    STUDENT = "student"

class User(SQLModel, table=True):
    __tablename__ = "users"
    
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str = Field(unique=True, index=True)
    email: str = Field(unique=True, index=True)
    hashed_password: str
    full_name: Optional[str] = None
    role: UserRole
    is_active: bool = Field(default=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: Optional[datetime] = None
    
    # Relationships (define sau khi có models khác)
    # created_projects: List["Project"] = Relationship(back_populates="creator")
    # group_memberships: List["GroupMember"] = Relationship(back_populates="student")
```

**`app/models/subject.py`**:
```python
from sqlmodel import SQLModel, Field, Relationship
from typing import Optional
from datetime import datetime

class Subject(SQLModel, table=True):
    __tablename__ = "subjects"
    
    id: Optional[int] = Field(default=None, primary_key=True)
    code: str = Field(unique=True, index=True)
    name: str
    description: Optional[str] = None
    credits: int
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Relationships
    # curricula: List["Curriculum"] = Relationship(back_populates="subject")

class Curriculum(SQLModel, table=True):
    __tablename__ = "curricula"
    
    id: Optional[int] = Field(default=None, primary_key=True)
    subject_id: int = Field(foreign_key="subjects.id")
    content: str
    learning_outcomes: str
    duration_weeks: int
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Relationships
    # subject: Subject = Relationship(back_populates="curricula")
```

**`app/models/project.py`**:
```python
from sqlmodel import SQLModel, Field, Relationship
from typing import Optional
from datetime import datetime
from enum import Enum

class ProjectStatus(str, Enum):
    DRAFT = "draft"
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"

class Project(SQLModel, table=True):
    __tablename__ = "projects"
    
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    description: str
    goals: str
    milestones_json: str  # JSON string of milestones
    status: ProjectStatus = Field(default=ProjectStatus.DRAFT)
    created_by: int = Field(foreign_key="users.id")
    approved_by: Optional[int] = Field(foreign_key="users.id", default=None)
    curriculum_id: Optional[int] = Field(foreign_key="curricula.id", default=None)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: Optional[datetime] = None
    
    # Relationships
    # creator: User = Relationship(back_populates="created_projects")
    # groups: List["Group"] = Relationship(back_populates="project")
```

**`app/models/class_model.py`** (class là keyword nên dùng class_model):
```python
from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
from datetime import datetime

class Class(SQLModel, table=True):
    __tablename__ = "classes"
    
    id: Optional[int] = Field(default=None, primary_key=True)
    code: str = Field(unique=True, index=True)
    name: str
    semester: str
    subject_id: int = Field(foreign_key="subjects.id")
    lecturer_id: Optional[int] = Field(foreign_key="users.id", default=None)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Relationships
    # members: List["ClassMember"] = Relationship(back_populates="class_obj")
    # groups: List["Group"] = Relationship(back_populates="class_obj")

class ClassMember(SQLModel, table=True):
    __tablename__ = "class_members"
    
    id: Optional[int] = Field(default=None, primary_key=True)
    class_id: int = Field(foreign_key="classes.id")
    student_id: int = Field(foreign_key="users.id")
    enrolled_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Relationships
    # class_obj: Class = Relationship(back_populates="members")
    # student: User = Relationship()
```

**`app/models/group.py`**:
```python
from sqlmodel import SQLModel, Field, Relationship
from typing import Optional
from datetime import datetime

class Group(SQLModel, table=True):
    __tablename__ = "groups"
    
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    class_id: int = Field(foreign_key="classes.id")
    project_id: Optional[int] = Field(foreign_key="projects.id", default=None)
    leader_id: Optional[int] = Field(foreign_key="users.id", default=None)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Relationships
    # class_obj: Class = Relationship(back_populates="groups")
    # project: Project = Relationship(back_populates="groups")
    # members: List["GroupMember"] = Relationship(back_populates="group")

class GroupMember(SQLModel, table=True):
    __tablename__ = "group_members"
    
    id: Optional[int] = Field(default=None, primary_key=True)
    group_id: int = Field(foreign_key="groups.id")
    student_id: int = Field(foreign_key="users.id")
    contribution_score: float = Field(default=0.0)
    joined_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Relationships
    # group: Group = Relationship(back_populates="members")
    # student: User = Relationship(back_populates="group_memberships")

class Milestone(SQLModel, table=True):
    __tablename__ = "milestones"
    
    id: Optional[int] = Field(default=None, primary_key=True)
    group_id: int = Field(foreign_key="groups.id")
    title: str
    description: str
    deadline: datetime
    is_completed: bool = Field(default=False)
    completed_at: Optional[datetime] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
```

**Continue với models khác**: `evaluation.py`, `resource.py`, `notification.py`, `meeting.py`

### 2.4. Implement Authentication System

#### A. Security Utilities

**`app/utils/security.py`**:
```python
from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from passlib.context import CryptContext
from app.config import settings

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

# JWT tokens
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.secret_key, algorithm=settings.algorithm)
    return encoded_jwt

def decode_access_token(token: str):
    try:
        payload = jwt.decode(token, settings.secret_key, algorithms=[settings.algorithm])
        return payload
    except JWTError:
        return None
```

#### B. Authentication Dependencies

**`app/utils/dependencies.py`**:
```python
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlmodel import Session, select
from app.database import get_session
from app.models.user import User, UserRole
from app.utils.security import decode_access_token

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")

async def get_current_user(
    token: str = Depends(oauth2_scheme),
    session: Session = Depends(get_session)
) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    payload = decode_access_token(token)
    if payload is None:
        raise credentials_exception
    
    username: str = payload.get("sub")
    if username is None:
        raise credentials_exception
    
    statement = select(User).where(User.username == username)
    user = session.exec(statement).first()
    
    if user is None:
        raise credentials_exception
    
    if not user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    
    return user

# Role-based dependencies
def get_current_admin(current_user: User = Depends(get_current_user)) -> User:
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    return current_user

def get_current_staff(current_user: User = Depends(get_current_user)) -> User:
    if current_user.role not in [UserRole.ADMIN, UserRole.STAFF]:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    return current_user

def get_current_lecturer(current_user: User = Depends(get_current_user)) -> User:
    if current_user.role not in [UserRole.ADMIN, UserRole.LECTURER]:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    return current_user

# ... Tương tự cho head, student
```

### 2.5. FastAPI Application Setup

**`app/main.py`**:
```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import create_db_and_tables
from app.routers import auth, users, projects, groups
from app.config import settings

app = FastAPI(
    title="CollabSphere API",
    description="Project-Based Learning Support System",
    version="1.0.0"
)

# CORS middleware (cho frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/v1/auth", tags=["Authentication"])
app.include_router(users.router, prefix="/api/v1/users", tags=["Users"])
app.include_router(projects.router, prefix="/api/v1/projects", tags=["Projects"])
app.include_router(groups.router, prefix="/api/v1/groups", tags=["Groups"])

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

@app.get("/")
def root():
    return {"message": "Welcome to CollabSphere API", "docs": "/docs"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}
```

### 2.6. Basic Auth Endpoints

**`app/schemas/auth.py`**:
```python
from pydantic import BaseModel, EmailStr

class UserRegister(BaseModel):
    username: str
    email: EmailStr
    password: str
    full_name: str
    role: str  # Will be set by admin/staff

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: str | None = None
```

**`app/routers/auth.py`**:
```python
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session, select
from datetime import timedelta
from app.database import get_session
from app.models.user import User, UserRole
from app.schemas.auth import UserRegister, Token
from app.utils.security import verify_password, get_password_hash, create_access_token
from app.config import settings

router = APIRouter()

@router.post("/register", response_model=Token)
def register(user_data: UserRegister, session: Session = Depends(get_session)):
    # Check if user exists
    statement = select(User).where(User.username == user_data.username)
    existing_user = session.exec(statement).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    
    # Create new user
    new_user = User(
        username=user_data.username,
        email=user_data.email,
        hashed_password=get_password_hash(user_data.password),
        full_name=user_data.full_name,
        role=UserRole.STUDENT  # Default role
    )
    session.add(new_user)
    session.commit()
    session.refresh(new_user)
    
    # Create token
    access_token = create_access_token(
        data={"sub": new_user.username},
        expires_delta=timedelta(minutes=settings.access_token_expire_minutes)
    )
    
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/login", response_model=Token)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    session: Session = Depends(get_session)
):
    # Authenticate user
    statement = select(User).where(User.username == form_data.username)
    user = session.exec(statement).first()
    
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    if not user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    
    # Create token
    access_token = create_access_token(
        data={"sub": user.username},
        expires_delta=timedelta(minutes=settings.access_token_expire_minutes)
    )
    
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/me")
def get_current_user_info(current_user: User = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "username": current_user.username,
        "email": current_user.email,
        "full_name": current_user.full_name,
        "role": current_user.role
    }
```

### 2.7. Run và Test

```bash
# Run server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Test API
# Mở browser: http://localhost:8000/docs (Swagger UI)
# Test endpoints:
# 1. POST /api/v1/auth/register
# 2. POST /api/v1/auth/login
# 3. GET /api/v1/auth/me (with Bearer token)
```

## Deliverables Giai Đoạn 2

- [ ] Project structure hoàn chỉnh
- [ ] Database models cho tất cả entities
- [ ] Database migrations setup (Alembic)
- [ ] Authentication system (JWT, RBAC)
- [ ] Basic API endpoints (auth, health check)
- [ ] FastAPI app running successfully
- [ ] Swagger docs accessible tại `/docs`

## Next Steps

Chuyển sang `03-APIBackend.md` để phát triển các API endpoints chi tiết cho từng module.
