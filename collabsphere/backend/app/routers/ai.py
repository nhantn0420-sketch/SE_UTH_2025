"""
AI Router - Hỗ trợ AI (Chatbot & Auto-generate)
"""

from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlmodel import Session, select
from typing import List, Optional
from datetime import datetime

from app.database import get_session
from app.models.user import User, UserRole
from app.models.subject import Curriculum
from app.models.project import Project, ProjectMilestone
from app.models.group import Group
from app.schemas.common import ResponseMessage
from app.utils.dependencies import get_current_user, get_current_lecturer

router = APIRouter()


@router.post("/chat")
async def chat_with_ai(
    message: str,
    context: Optional[str] = Query(None),
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """
    Chat with AI for brainstorming, guidance, and suggestions.
    
    Note: This is a placeholder. In production, integrate with AWS Bedrock or similar.
    """
    # Placeholder response - In production, call AI service
    ai_response = f"""
Xin chào {current_user.full_name}!

Đây là phản hồi mẫu từ AI Assistant. Trong phiên bản production, tính năng này sẽ được tích hợp với:
- AWS Bedrock cho AI model
- Các chức năng:
  + Brainstorming ý tưởng dự án
  + Hướng dẫn lập kế hoạch milestone
  + Đề xuất giải pháp kỹ thuật
  + Phân tích tiến độ và đưa ra lời khuyên

Câu hỏi của bạn: "{message}"

Để tích hợp AI thực sự, cần cấu hình:
1. AWS Bedrock credentials
2. Model selection (Claude, Titan, etc.)
3. Context management
"""
    
    return {
        "response": ai_response,
        "timestamp": datetime.utcnow(),
        "model": "placeholder"
    }


@router.post("/projects/{project_id}/generate-milestones")
async def generate_project_milestones(
    project_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_lecturer)
):
    """
    AI-assisted milestone generation based on project info and curriculum.
    
    Note: This is a placeholder. In production, integrate with AWS Bedrock.
    """
    project = session.get(Project, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    if project.creator_id != current_user.id:
        raise HTTPException(status_code=403, detail="Access denied")
    
    # Get curriculum if available
    curriculum_info = ""
    if project.curriculum_id:
        curriculum = session.get(Curriculum, project.curriculum_id)
        if curriculum:
            curriculum_info = f"\nGiáo trình: {curriculum.name}\nNội dung: {curriculum.content}"
    
    # Placeholder - Generate sample milestones
    # In production, use AI to generate based on project description
    sample_milestones = [
        {
            "title": "Tuần 1-2: Khởi động & Phân tích yêu cầu",
            "description": "Tìm hiểu đề tài, phân tích yêu cầu, lập kế hoạch dự án",
            "week_number": 1,
            "deliverables": "Tài liệu yêu cầu, Kế hoạch dự án, Biểu đồ Gantt"
        },
        {
            "title": "Tuần 3-4: Thiết kế hệ thống",
            "description": "Thiết kế kiến trúc, database, UI/UX",
            "week_number": 3,
            "deliverables": "Tài liệu thiết kế, ERD, Wireframes"
        },
        {
            "title": "Tuần 5-7: Phát triển tính năng chính",
            "description": "Triển khai các tính năng core của hệ thống",
            "week_number": 5,
            "deliverables": "Source code backend, frontend cơ bản"
        },
        {
            "title": "Tuần 8-9: Tích hợp & Testing",
            "description": "Tích hợp các module, viết test, sửa lỗi",
            "week_number": 8,
            "deliverables": "Test cases, Bug reports, Source code hoàn chỉnh"
        },
        {
            "title": "Tuần 10: Hoàn thiện & Demo",
            "description": "Hoàn thiện tài liệu, chuẩn bị demo",
            "week_number": 10,
            "deliverables": "Tài liệu cuối cùng, Slide thuyết trình, Demo video"
        }
    ]
    
    # Create milestones in database
    created_milestones = []
    for i, ms_data in enumerate(sample_milestones):
        milestone = ProjectMilestone(
            project_id=project_id,
            title=ms_data["title"],
            description=ms_data["description"],
            week_number=ms_data["week_number"],
            deliverables=ms_data["deliverables"],
            order=i + 1
        )
        session.add(milestone)
        created_milestones.append(milestone)
    
    session.commit()
    
    return {
        "message": f"Đã tạo {len(created_milestones)} milestones cho dự án",
        "milestones": [
            {
                "title": m.title,
                "description": m.description,
                "week_number": m.week_number
            }
            for m in created_milestones
        ],
        "note": "Đây là milestones mẫu. Vui lòng chỉnh sửa cho phù hợp với dự án cụ thể."
    }


@router.post("/groups/{group_id}/analyze-progress")
async def analyze_group_progress(
    group_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """
    AI-assisted analysis of group progress with recommendations.
    
    Note: This is a placeholder. In production, integrate with AWS Bedrock.
    """
    group = session.get(Group, group_id)
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")
    
    # Placeholder analysis
    analysis = {
        "group_id": group_id,
        "group_name": group.name,
        "analysis": {
            "overall_status": "on_track",  # on_track, at_risk, behind
            "completion_percentage": 45,
            "recommendations": [
                "Tập trung hoàn thành các task còn pending trước deadline",
                "Tăng cường giao tiếp giữa các thành viên",
                "Cân nhắc chia nhỏ task lớn thành các subtask"
            ],
            "risks": [
                "Một số task đang gần deadline nhưng chưa hoàn thành",
                "Phân bổ công việc chưa đều giữa các thành viên"
            ],
            "strengths": [
                "Tiến độ milestone đang đúng kế hoạch",
                "Team có sự phối hợp tốt trong các checkpoint"
            ]
        },
        "generated_at": datetime.utcnow(),
        "note": "Đây là phân tích mẫu. Tích hợp AI thực sự sẽ có phân tích chi tiết hơn."
    }
    
    return analysis


@router.post("/groups/{group_id}/analyze-contributions")
async def analyze_member_contributions(
    group_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """
    AI-assisted analysis of individual member contributions.
    
    Note: This is a placeholder. In production, integrate with AWS Bedrock.
    """
    group = session.get(Group, group_id)
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")
    
    # Placeholder analysis
    analysis = {
        "group_id": group_id,
        "analysis": {
            "balance_score": 7.5,  # 1-10
            "summary": "Phân bổ công việc tương đối đều, một số thành viên đóng góp nhiều hơn",
            "recommendations": [
                "Khuyến khích thành viên ít hoạt động tham gia nhiều hơn",
                "Cân bằng lại task assignment cho sprint tiếp theo"
            ]
        },
        "generated_at": datetime.utcnow(),
        "note": "Đây là phân tích mẫu."
    }
    
    return analysis
