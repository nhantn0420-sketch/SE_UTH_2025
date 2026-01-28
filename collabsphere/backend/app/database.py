"""
Database connection and session management
"""

from sqlmodel import SQLModel, Session, create_engine
from app.config import settings

# Create database engine
# SQLite needs connect_args for check_same_thread
if settings.database_url.startswith("sqlite"):
    engine = create_engine(
        settings.database_url,
        echo=settings.debug,
        connect_args={"check_same_thread": False}
    )
else:
    engine = create_engine(
        settings.database_url,
        echo=settings.debug,
        pool_pre_ping=True,
        pool_size=10,
        max_overflow=20
    )


def create_db_and_tables():
    """Create all database tables"""
    # Import all models to ensure they are registered
    from app.models import user, subject, academic, project, group, notification, communication, evaluation, resource, report
    
    SQLModel.metadata.create_all(engine)


def get_session():
    """Dependency to get database session"""
    with Session(engine) as session:
        yield session
