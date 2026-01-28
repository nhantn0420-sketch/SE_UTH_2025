"""Test Staff statistics API"""
import requests

BASE_URL = "http://127.0.0.1:8001/api/v1"

# Login as staff
print("🔐 Logging in as staff...")
login_response = requests.post(
    f"{BASE_URL}/auth/login",
    data={"username": "staff", "password": "staff123"}
)

if login_response.status_code == 200:
    token = login_response.json()["access_token"]
    print("✅ Login successful!\n")
    
    # Get statistics
    print("📊 Fetching statistics...")
    headers = {"Authorization": f"Bearer {token}"}
    stats_response = requests.get(f"{BASE_URL}/subjects/statistics", headers=headers)
    
    print(f"Statistics API status: {stats_response.status_code}")
    
    if stats_response.status_code == 200:
        stats = stats_response.json()
        print("✅ Statistics loaded successfully!\n")
        print("Stats data:")
        for key, value in stats.items():
            print(f"  - {key}: {value}")
    else:
        print(f"❌ Failed to fetch statistics: {stats_response.status_code}")
        print(f"   {stats_response.text}")
else:
    print(f"❌ Login failed: {login_response.status_code}")
    print(f"   {login_response.text}")
