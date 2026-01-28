"""Quick test for reports API"""
import requests

BASE_URL = "http://127.0.0.1:8001/api/v1"

# Login
print("🔐 Logging in as admin...")
login_response = requests.post(
    f"{BASE_URL}/auth/login",
    data={"username": "admin", "password": "admin123"}
)
print(f"Login status: {login_response.status_code}")

if login_response.status_code == 200:
    token = login_response.json()["access_token"]
    print("✅ Login successful!\n")
    
    # Get reports
    print("📊 Fetching reports...")
    headers = {"Authorization": f"Bearer {token}"}
    reports_response = requests.get(f"{BASE_URL}/reports", headers=headers)
    
    print(f"Reports API status: {reports_response.status_code}")
    
    if reports_response.status_code == 200:
        reports = reports_response.json()
        print(f"✅ Found {len(reports)} reports\n")
        
        if len(reports) == 0:
            print("⚠️  Database has 0 reports")
            print("Creating a test report...\n")
            
            # Create test report
            create_response = requests.post(
                f"{BASE_URL}/reports",
                headers=headers,
                json={
                    "subject": "Test Report - Backend Issue",
                    "content": "This is a test system report created for testing purposes."
                }
            )
            
            if create_response.status_code == 201:
                print("✅ Test report created successfully!")
                report = create_response.json()
                print(f"   ID: {report['id']}")
                print(f"   Subject: {report['subject']}")
            else:
                print(f"❌ Failed to create report: {create_response.status_code}")
                print(f"   {create_response.text}")
        else:
            print("Reports in database:")
            for r in reports[:3]:  # Show first 3
                print(f"  - {r.get('subject', 'N/A')} ({r.get('status', 'N/A')})")
    else:
        print(f"❌ Failed to fetch reports: {reports_response.status_code}")
        print(f"   {reports_response.text}")
else:
    print(f"❌ Login failed: {login_response.status_code}")
    print(f"   {login_response.text}")
