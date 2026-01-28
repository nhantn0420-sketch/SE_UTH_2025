"""Create multiple test reports"""
import requests
from datetime import datetime

BASE_URL = "http://127.0.0.1:8001/api/v1"

# Login as different users and create reports
users = [
    {"username": "student1", "password": "student123"},
    {"username": "student2", "password": "student123"},
    {"username": "lecturer", "password": "lecturer123"},
]

test_reports = [
    {
        "subject": "Lỗi không thể tải trang Dashboard",
        "content": "Khi tôi truy cập trang Dashboard, hệ thống báo lỗi 500. Vui lòng kiểm tra lại."
    },
    {
        "subject": "Đề xuất thêm tính năng xuất báo cáo PDF",
        "content": "Tôi muốn đề xuất thêm tính năng xuất báo cáo đánh giá nhóm ra file PDF để dễ lưu trữ và chia sẻ."
    },
    {
        "subject": "Bug: Không gửi được tin nhắn trong nhóm",
        "content": "Khi gửi tin nhắn trong chat nhóm, hệ thống báo 'Failed to send message'. Đã thử nhiều lần nhưng vẫn lỗi."
    },
    {
        "subject": "Yêu cầu hỗ trợ reset mật khẩu",
        "content": "Tôi quên mật khẩu và không thể reset được. Email reset không được gửi đến."
    },
    {
        "subject": "Giao diện mobile không responsive",
        "content": "Khi truy cập từ điện thoại, giao diện bị vỡ layout. Các button và form không hiển thị đúng."
    },
]

print("🔐 Creating test reports from multiple users...\n")

created_count = 0
for i, user in enumerate(users):
    # Login
    login_response = requests.post(
        f"{BASE_URL}/auth/login",
        data={"username": user["username"], "password": user["password"]}
    )
    
    if login_response.status_code == 200:
        token = login_response.json()["access_token"]
        headers = {"Authorization": f"Bearer {token}"}
        
        # Create 1-2 reports per user
        reports_to_create = test_reports[i:i+2] if i < len(test_reports) else [test_reports[-1]]
        
        for report_data in reports_to_create:
            response = requests.post(
                f"{BASE_URL}/reports",
                headers=headers,
                json=report_data
            )
            
            if response.status_code == 201:
                created_count += 1
                report = response.json()
                print(f"✅ Created: {report['subject']} (by {user['username']})")
            else:
                print(f"❌ Failed: {report_data['subject']}")
    else:
        print(f"❌ Login failed for {user['username']}")

print(f"\n✅ Total created: {created_count} reports")

# Verify as admin
print("\n📊 Verifying as admin...")
admin_login = requests.post(
    f"{BASE_URL}/auth/login",
    data={"username": "admin", "password": "admin123"}
)

if admin_login.status_code == 200:
    token = admin_login.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    
    reports_response = requests.get(f"{BASE_URL}/reports", headers=headers)
    if reports_response.status_code == 200:
        reports = reports_response.json()
        print(f"✅ Total reports in database: {len(reports)}")
        
        print("\n📋 Reports list:")
        for r in reports:
            user_info = r.get('user', {})
            print(f"  - [{r.get('status', 'N/A')}] {r.get('subject', 'N/A')}")
            print(f"    By: {user_info.get('full_name', 'Unknown')} ({user_info.get('email', 'N/A')})")
