"""Test Head dashboard APIs"""
import requests

BASE_URL = "http://127.0.0.1:8001/api/v1"

# Login as head
print("🔐 Logging in as head...")
login_response = requests.post(
    f"{BASE_URL}/auth/login",
    data={"username": "head", "password": "head123"}
)

if login_response.status_code == 200:
    token = login_response.json()["access_token"]
    print("✅ Login successful!\n")
    
    headers = {"Authorization": f"Bearer {token}"}
    
    # Test 1: Get statistics
    print("📊 Testing statistics API...")
    stats_response = requests.get(f"{BASE_URL}/projects/statistics/head", headers=headers)
    
    if stats_response.status_code == 200:
        stats = stats_response.json()
        print("✅ Statistics loaded successfully!")
        print("Stats data:")
        for key, value in stats.items():
            print(f"  - {key}: {value}")
        print()
    else:
        print(f"❌ Failed to fetch statistics: {stats_response.status_code}")
        print(f"   {stats_response.text}\n")
    
    # Test 2: Get pending projects
    print("📝 Testing pending projects API...")
    pending_response = requests.get(f"{BASE_URL}/projects/pending", headers=headers)
    
    if pending_response.status_code == 200:
        pending = pending_response.json()
        print(f"✅ Pending projects loaded successfully!")
        print(f"   Found {len(pending)} pending projects")
        
        if pending:
            print("\nPending projects:")
            for p in pending:
                print(f"  - {p.get('title', 'N/A')} (Status: {p.get('status', 'N/A')})")
        else:
            print("   No pending projects in database")
    else:
        print(f"❌ Failed to fetch pending projects: {pending_response.status_code}")
        print(f"   {pending_response.text}")
else:
    print(f"❌ Login failed: {login_response.status_code}")
    print(f"   {login_response.text}")
