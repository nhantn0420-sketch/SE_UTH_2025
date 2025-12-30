"""
AI Service - Tích hợp AWS Bedrock cho AI features
"""

import json
from typing import Dict, List, Optional
from app.config import settings

try:
    import boto3
    BOTO3_AVAILABLE = True
except ImportError:
    BOTO3_AVAILABLE = False


class AIService:
    """Service for AI-powered features using AWS Bedrock"""
    
    def __init__(self):
        self.client = None
        if BOTO3_AVAILABLE and settings.aws_access_key_id:
            try:
                self.client = boto3.client(
                    'bedrock-runtime',
                    aws_access_key_id=settings.aws_access_key_id,
                    aws_secret_access_key=settings.aws_secret_access_key,
                    region_name=settings.aws_region
                )
            except Exception as e:
                print(f"Failed to initialize Bedrock client: {e}")
    
    def _call_bedrock(self, prompt: str, max_tokens: int = 2000, temperature: float = 0.7) -> str:
        """Make a call to AWS Bedrock"""
        if not self.client:
            return self._fallback_response(prompt)
        
        try:
            body = json.dumps({
                "anthropic_version": "bedrock-2023-05-31",
                "max_tokens": max_tokens,
                "temperature": temperature,
                "messages": [
                    {"role": "user", "content": prompt}
                ]
            })
            
            response = self.client.invoke_model(
                modelId=settings.bedrock_model_id,
                body=body
            )
            
            response_body = json.loads(response['body'].read())
            return response_body.get('content', [{}])[0].get('text', '')
        
        except Exception as e:
            print(f"Bedrock API error: {e}")
            return self._fallback_response(prompt)
    
    def _fallback_response(self, prompt: str) -> str:
        """Fallback when AI is not available"""
        return "AI service is currently unavailable. Please try again later."
    
    def generate_milestones(self, project_data: Dict) -> List[Dict]:
        """
        Generate project milestones based on project information
        """
        prompt = f"""
Bạn là một chuyên gia giáo dục về học tập dựa trên dự án (Project-Based Learning).

Dựa trên thông tin dự án sau, hãy tạo ra các mốc (milestones) chi tiết:

**Tiêu đề dự án**: {project_data.get('title', 'N/A')}
**Mô tả**: {project_data.get('description', 'N/A')}
**Mục tiêu**: {project_data.get('goals', 'N/A')}
**Thời gian**: {project_data.get('duration_weeks', 12)} tuần

Hãy tạo 5-8 milestones với format JSON như sau:
[
    {{
        "title": "Tên milestone ngắn gọn",
        "description": "Mô tả chi tiết (2-3 câu)",
        "week_number": 1,
        "deliverables": ["Sản phẩm 1", "Sản phẩm 2"]
    }}
]

Chỉ trả về JSON array, không thêm text khác.
"""
        
        response = self._call_bedrock(prompt, max_tokens=2000, temperature=0.7)
        
        try:
            # Try to extract JSON from response
            start = response.find('[')
            end = response.rfind(']') + 1
            if start != -1 and end > start:
                milestones = json.loads(response[start:end])
                return milestones
        except json.JSONDecodeError:
            pass
        
        # Return default milestones if parsing fails
        return self._get_default_milestones(project_data.get('duration_weeks', 12))
    
    def _get_default_milestones(self, duration_weeks: int) -> List[Dict]:
        """Return default milestones template"""
        return [
            {
                "title": "Phân tích yêu cầu",
                "description": "Nghiên cứu và phân tích yêu cầu dự án, xác định mục tiêu và phạm vi.",
                "week_number": 1,
                "deliverables": ["Tài liệu yêu cầu", "Kế hoạch dự án"]
            },
            {
                "title": "Thiết kế giải pháp",
                "description": "Thiết kế kiến trúc và giải pháp kỹ thuật cho dự án.",
                "week_number": int(duration_weeks * 0.2),
                "deliverables": ["Tài liệu thiết kế", "Sơ đồ kiến trúc"]
            },
            {
                "title": "Triển khai giai đoạn 1",
                "description": "Phát triển các chức năng cơ bản của dự án.",
                "week_number": int(duration_weeks * 0.4),
                "deliverables": ["Prototype", "Code base"]
            },
            {
                "title": "Triển khai giai đoạn 2",
                "description": "Hoàn thiện các chức năng và tích hợp.",
                "week_number": int(duration_weeks * 0.6),
                "deliverables": ["Sản phẩm beta", "Báo cáo tiến độ"]
            },
            {
                "title": "Kiểm thử và sửa lỗi",
                "description": "Kiểm thử toàn diện và sửa các lỗi phát hiện.",
                "week_number": int(duration_weeks * 0.8),
                "deliverables": ["Báo cáo kiểm thử", "Sản phẩm đã sửa lỗi"]
            },
            {
                "title": "Hoàn thiện và bàn giao",
                "description": "Hoàn thiện tài liệu và bàn giao sản phẩm cuối cùng.",
                "week_number": duration_weeks,
                "deliverables": ["Sản phẩm hoàn chỉnh", "Tài liệu hướng dẫn", "Báo cáo cuối kỳ"]
            }
        ]
    
    def chatbot_response(self, user_message: str, context: str = "") -> str:
        """
        AI Chatbot for brainstorming and guidance
        """
        prompt = f"""
Bạn là trợ lý AI của CollabSphere - hệ thống hỗ trợ học tập dựa trên dự án (PBL).
Nhiệm vụ của bạn là giúp sinh viên và giảng viên trong quá trình thực hiện dự án.

{f'Context: {context}' if context else ''}

Câu hỏi của người dùng: {user_message}

Hãy trả lời một cách hữu ích, ngắn gọn và thực tế. Tập trung vào:
- Đưa ra ý tưởng sáng tạo
- Hướng dẫn cách giải quyết vấn đề
- Gợi ý các bước tiếp theo
- Khuyến khích làm việc nhóm hiệu quả
"""
        
        return self._call_bedrock(prompt, max_tokens=500, temperature=0.8)
    
    def analyze_progress(self, progress_data: Dict) -> str:
        """
        Analyze group progress and provide recommendations
        """
        prompt = f"""
Phân tích tiến độ nhóm dự án và đưa ra khuyến nghị:

**Thông tin tiến độ:**
- Tổng số milestones: {progress_data.get('total_milestones', 0)}
- Đã hoàn thành: {progress_data.get('completed', 0)}
- Đang làm: {progress_data.get('in_progress', 0)}
- Chưa bắt đầu: {progress_data.get('not_started', 0)}
- Thời gian còn lại: {progress_data.get('weeks_left', 0)} tuần

**Yêu cầu:**
1. Đánh giá tình hình hiện tại (tốt/cần cải thiện/cảnh báo)
2. Xác định rủi ro (nếu có)
3. Đưa ra 3-5 khuyến nghị cụ thể

Trả lời bằng tiếng Việt, ngắn gọn và thực tế.
"""
        
        return self._call_bedrock(prompt, max_tokens=400, temperature=0.5)
    
    def analyze_contribution(self, contribution_data: Dict) -> str:
        """
        Analyze member contributions and provide insights
        """
        prompt = f"""
Phân tích đóng góp của thành viên trong nhóm dự án:

**Dữ liệu đóng góp:**
{json.dumps(contribution_data, ensure_ascii=False, indent=2)}

**Yêu cầu:**
1. Đánh giá mức độ đóng góp của từng thành viên
2. Xác định điểm mạnh và điểm cần cải thiện
3. Đưa ra gợi ý để cân bằng công việc trong nhóm

Trả lời bằng tiếng Việt, khách quan và mang tính xây dựng.
"""
        
        return self._call_bedrock(prompt, max_tokens=500, temperature=0.6)


# Singleton instance
ai_service = AIService()
