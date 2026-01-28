"""
Script to create test projects with pending status for Head approval
"""
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlmodel import Session, select
from app.database import engine
from app.models.project import Project, ProjectStatus
from app.models.user import User, UserRole

def create_test_pending_projects():
    with Session(engine) as session:
        # Get a lecturer to be project owner
        lecturer = session.exec(
            select(User).where(User.role == UserRole.LECTURER)
        ).first()
        
        if not lecturer:
            print("❌ No lecturer found. Please create users first.")
            return
        
        print(f"✅ Found lecturer: {lecturer.username}")
        
        # Check if pending projects already exist
        existing = session.exec(
            select(Project).where(Project.status == ProjectStatus.PENDING)
        ).all()
        
        if len(existing) > 0:
            print(f"ℹ️  Already have {len(existing)} pending project(s)")
            for p in existing:
                print(f"   - {p.title} (ID: {p.id})")
        
        # Create test pending projects
        test_projects = [
            {
                "title": "Hệ thống quản lý thư viện thông minh",
                "description": "Xây dựng hệ thống quản lý thư viện với các tính năng: quản lý sách, mượn/trả, tìm kiếm thông minh, thống kê.",
                "requirements": "- Có kiến thức về Python/Java\n- Biết về database (MySQL/PostgreSQL)\n- Hiểu về REST API\n- Có thể làm việc nhóm",
                "expected_outcomes": "- Website quản lý thư viện hoàn chỉnh\n- API documentation\n- User manual\n- Test cases và deployment guide",
                "max_group_size": 4,
                "min_group_size": 2,
                "duration_weeks": 12,
                "status": ProjectStatus.PENDING,
                "creator_id": lecturer.id,
            },
            {
                "title": "Ứng dụng di động quản lý chi tiêu cá nhân",
                "description": "Phát triển ứng dụng mobile (iOS/Android) giúp người dùng quản lý thu chi, lập kế hoạch tài chính, theo dõi mục tiêu tiết kiệm.",
                "requirements": "- Có kiến thức React Native hoặc Flutter\n- Biết về mobile app development\n- Am hiểu về UX/UI design\n- Có khả năng làm việc với database",
                "expected_outcomes": "- App mobile hoàn chỉnh trên iOS/Android\n- Backend API\n- Báo cáo phân tích và thiết kế\n- Video demo và tài liệu hướng dẫn",
                "max_group_size": 3,
                "min_group_size": 2,
                "duration_weeks": 14,
                "status": ProjectStatus.PENDING,
                "creator_id": lecturer.id,
            },
            {
                "title": "Hệ thống chatbot tư vấn học tập với AI",
                "description": "Xây dựng chatbot sử dụng AI/NLP để tư vấn học tập, trả lời câu hỏi về chương trình học, gợi ý lộ trình học tập.",
                "requirements": "- Có kiến thức về Python, NLP\n- Biết về Machine Learning cơ bản\n- Có kinh nghiệm với chatbot frameworks\n- Am hiểu về web development",
                "expected_outcomes": "- Chatbot tích hợp vào website\n- Model AI được train\n- Dataset câu hỏi - trả lời\n- Báo cáo kỹ thuật và đánh giá hiệu năng",
                "max_group_size": 5,
                "min_group_size": 3,
                "duration_weeks": 16,
                "status": ProjectStatus.PENDING,
                "creator_id": lecturer.id,
            }
        ]
        
        created_count = 0
        for proj_data in test_projects:
            # Check if similar project exists
            existing_proj = session.exec(
                select(Project).where(Project.title == proj_data["title"])
            ).first()
            
            if existing_proj:
                print(f"⚠️  Project already exists: {proj_data['title']}")
                continue
            
            project = Project(**proj_data)
            session.add(project)
            created_count += 1
        
        session.commit()
        
        if created_count > 0:
            print(f"\n✅ Created {created_count} pending project(s)")
        
        # Show all pending projects
        all_pending = session.exec(
            select(Project).where(Project.status == ProjectStatus.PENDING)
        ).all()
        
        print(f"\n📋 Total pending projects: {len(all_pending)}")
        for p in all_pending:
            print(f"   {p.id}. {p.title}")
            print(f"      Status: {p.status.value}")
            print(f"      Creator: User ID {p.creator_id}")
            print()

if __name__ == "__main__":
    print("="*60)
    print("CREATE TEST PENDING PROJECTS")
    print("="*60)
    create_test_pending_projects()
    print("="*60)
    print("✅ Done!")
