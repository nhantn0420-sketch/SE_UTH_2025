"""
Configuration for automation testing
"""
import os

# Base URLs
BASE_URL = "http://localhost:80"
API_URL = "http://localhost:8000"

# Test Accounts
ACCOUNTS = {
    "admin": {
        "username": "admin",
        "password": "admin123",
        "email": "admin@collabsphere.com"
    },
    "lecturer": {
        "username": "lecturer",
        "password": "lecturer123",
        "email": "lecturer@collabsphere.com"
    },
    "head": {
        "username": "head",
        "password": "head123",
        "email": "head@collabsphere.com"
    },
    "student": {
        "username": "student",
        "password": "student123",
        "email": "student@collabsphere.com"
    }
}

# Screenshot Settings
SCREENSHOT_DIR = r"C:\Users\LENOVO\Desktop\SE\MainDocument\Images\Screenshots"
SCREENSHOT_SIZE = (1920, 1080)  # Full HD
SCREENSHOT_FORMAT = "PNG"

# Test Data
PROJECT_1 = {
    "title": "Smart Campus IoT System",
    "description": """Xây dựng hệ thống IoT quản lý campus thông minh bao gồm:
- Giám sát nhiệt độ, độ ẩm trong phòng học
- Tự động điều khiển đèn, điều hòa dựa trên lịch học
- Dashboard real-time hiển thị trạng thái sensors
- Mobile app cho giảng viên và sinh viên

Công nghệ: Arduino/ESP32, MQTT, Node.js, React, MongoDB""",
    "goals": """- Hiểu kiến trúc IoT end-to-end
- Thực hành embedded programming
- Xây dựng real-time system
- Team collaboration và project management""",
    "duration_weeks": 12,
    "difficulty": "MEDIUM",
    "max_teams": 3
}

PROJECT_2 = {
    "title": "E-Learning Platform with AI Tutor",
    "description": """Nền tảng học tập trực tuyến với AI chatbot hỗ trợ:
- Video courses với interactive quizzes
- AI-powered chatbot trả lời câu hỏi
- Progress tracking và learning analytics
- Gamification (badges, leaderboard)

Công nghệ: Next.js, PostgreSQL, AWS Bedrock (AI), WebRTC""",
    "goals": """- Xây dựng LMS platform
- Tích hợp AI chatbot
- Real-time video streaming
- Learning analytics dashboard""",
    "duration_weeks": 12,
    "difficulty": "HARD",
    "max_teams": 2
}

MILESTONES_PROJECT_1 = [
    {
        "title": "Research & Requirements Analysis",
        "description": "Nghiên cứu IoT protocols (MQTT, CoAP), sensors, chọn platform (Arduino/ESP32)",
        "week_number": 1,
        "deliverables": "Research report, Requirements specification, Technology stack decision"
    },
    {
        "title": "Hardware Prototyping & Setup",
        "description": "Mua linh kiện, lắp ráp mạch, test sensors, kết nối WiFi",
        "week_number": 3,
        "deliverables": "Working prototype với 2-3 sensors, Circuit diagram, Hardware documentation"
    },
    {
        "title": "Backend & Database Development",
        "description": "Xây dựng API server, database schema, MQTT broker integration",
        "week_number": 5,
        "deliverables": "REST API endpoints, Database schema, MQTT message handling, Unit tests"
    },
    {
        "title": "Dashboard & Mobile App",
        "description": "Frontend dashboard (React), Mobile app (React Native hoặc Flutter)",
        "week_number": 9,
        "deliverables": "Web dashboard với real-time charts, Mobile app (Android/iOS), User documentation"
    }
]

CHECKPOINT_SUBMISSION = {
    "title": "Milestone 1 - Research Report",
    "description": """Đã hoàn thành:
- Nghiên cứu IoT protocols: MQTT, CoAP
- Chọn platform: ESP32 với WiFi built-in
- Chọn sensors: DHT22 (temp/humidity), PIR (motion)
- Database: MongoDB cho time-series data
- Frontend: React với Recharts

Challenges:
- Power management cho sensors
- MQTT broker selection (AWS IoT vs Mosquitto)""",
    "files": "research-report.pdf, requirements-spec.docx, tech-stack-comparison.xlsx"
}

EVALUATION = {
    "grade": 8.5,
    "feedback": """✅ Strengths:
- Research report rất chi tiết và có depth
- Technology stack choices hợp lý (ESP32, MQTT, MongoDB)
- Comparison matrix giữa các options rõ ràng

⚠️ Areas for Improvement:
- Thiếu phần analysis về security (authentication, encryption)
- Chưa có risk assessment cho hardware failures
- Power consumption calculation cần chi tiết hơn

💡 Suggestions:
- Thêm threat modeling cho IoT system
- Nghiên cứu TLS cho MQTT
- Xem xét battery backup solutions

Overall: Excellent start! Keep up the good work! 🎉"""
}

PEER_REVIEW = {
    "cooperation": 5,
    "contribution": 4,
    "communication": 5,
    "technical": 4,
    "comments": """C làm việc rất tốt, nhiệt tình support team. Có kinh nghiệm Arduino nên 
giúp team rất nhiều trong phần hardware. Communication tốt, luôn update 
tiến độ. Đề xuất: C có thể tập trung thêm vào documentation để source 
code dễ maintain hơn."""
}

CHAT_MESSAGES = [
    "Chào mọi người! Chúng ta đã chọn project IoT rồi nhé 🎉",
    "Hôm nay 2pm họp kick-off meeting nhé @all",
    "Ai có kinh nghiệm Arduino không?"
]

TEAM_NAME = "Team Alpha"
TEAM_DESCRIPTION = "Passionate team focusing on IoT and Smart Systems"

# Timing Settings (seconds)
WAIT_SHORT = 2      # Wait for element to appear
WAIT_MEDIUM = 5     # Wait for page load
WAIT_LONG = 10      # Wait for heavy operation
SCREENSHOT_DELAY = 1  # Delay before taking screenshot
