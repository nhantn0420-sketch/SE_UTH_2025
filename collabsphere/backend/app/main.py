"""
CollabSphere - Main FastAPI Application
Hệ thống hỗ trợ học tập theo phương pháp học tập dự án
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.config import settings
from app.database import create_db_and_tables

# Import routers
from app.routers import auth, users, subjects, classes, projects, groups, evaluations, resources, notifications, chat, meetings, ai


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan events"""
    # Startup
    print("🚀 Starting CollabSphere API...")
    create_db_and_tables()
    print("✅ Database tables created/verified")
    yield
    # Shutdown
    print("👋 Shutting down CollabSphere API...")


# Create FastAPI application
app = FastAPI(
    title=settings.app_name,
    description="""
    ## CollabSphere (COSRE) API
    
    Hệ thống hỗ trợ học tập theo phương pháp học tập dự án (Project-Based Learning)
    
    ### Tính năng chính:
    - 👥 Quản lý tài khoản (Admin, Staff, Head, Lecturer, Student)
    - 📚 Quản lý môn học & giáo trình
    - 🏫 Quản lý lớp học
    - 📋 Quản lý dự án & nhóm
    - 💬 Giao tiếp real-time (Chat, Video, Whiteboard)
    - 🤖 Hỗ trợ AI (Chatbot, Auto-generate milestones)
    - ⭐ Đánh giá & Peer Review
    - 🔔 Thông báo (Email & Real-time)
    """,
    version=settings.app_version,
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/v1/auth", tags=["Authentication"])
app.include_router(users.router, prefix="/api/v1/users", tags=["Users"])
app.include_router(subjects.router, prefix="/api/v1/subjects", tags=["Subjects & Curricula"])
app.include_router(classes.router, prefix="/api/v1/classes", tags=["Classes"])
app.include_router(projects.router, prefix="/api/v1/projects", tags=["Projects"])
app.include_router(groups.router, prefix="/api/v1/groups", tags=["Groups & Workspaces"])
app.include_router(evaluations.router, prefix="/api/v1/evaluations", tags=["Evaluations & Feedback"])
app.include_router(resources.router, prefix="/api/v1/resources", tags=["Resources"])
app.include_router(notifications.router, prefix="/api/v1/notifications", tags=["Notifications"])
app.include_router(chat.router, prefix="/api/v1/chat", tags=["Chat"])
app.include_router(meetings.router, prefix="/api/v1/meetings", tags=["Meetings"])
app.include_router(ai.router, prefix="/api/v1/ai", tags=["AI Assistant"])


@app.get("/", tags=["Root"])
def root():
    """API Root - Health check"""
    return {
        "message": "Welcome to CollabSphere API",
        "version": settings.app_version,
        "status": "running",
        "docs": "/docs"
    }


@app.get("/health", tags=["Root"])
def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}
