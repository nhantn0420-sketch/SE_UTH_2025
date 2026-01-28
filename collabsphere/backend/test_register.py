import sys
import os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import requests
import json
from datetime import datetime

print("="*60)
print("  🧪 TESTING REGISTER API")
print("="*60)

# Test data
timestamp = datetime.now().strftime("%H%M%S")
test_user = {
    "username": f"ungchac{timestamp}",
    "email": "jqk@gmail.com",  # Change this if email exists
    "password": "123456",
    "full_name": "Ung Chắc",
    "role": "student",
    "phone": None
}

print(f"\n📤 Sending registration request...")
print(f"   URL: http://localhost:8001/api/v1/auth/register")
print(f"   Email: {test_user['email']}")
print(f"   Username: {test_user['username']}")

try:
    response = requests.post(
        "http://localhost:8001/api/v1/auth/register",
        json=test_user,
        timeout=5
    )
    
    if response.status_code == 200:
        data = response.json()
        print("\n✅ REGISTRATION SUCCESS!")
        print(f"   Username: {data['user']['username']}")
        print(f"   Email: {data['user']['email']}")
        print(f"   Role: {data['user']['role']}")
        print(f"   Token: {data['access_token'][:50]}...")
        print("\n💡 You can now login with:")
        print(f"   Email: {data['user']['email']}")
        print(f"   Password: 123456")
    else:
        error = response.json()
        print(f"\n❌ REGISTRATION FAILED!")
        print(f"   Status Code: {response.status_code}")
        print(f"   Error: {error.get('detail', 'Unknown error')}")
        
        if "already registered" in error.get('detail', '').lower():
            print("\n💡 SOLUTION:")
            print("   1. Use different email (e.g., ungchac2026@gmail.com)")
            print("   2. Or clear database: python clear_database.py")

except requests.exceptions.ConnectionError:
    print("\n❌ CONNECTION ERROR!")
    print("   Backend is not running on http://localhost:8001")
    print("\n💡 SOLUTION:")
    print("   1. Start backend: cd backend && START_BACKEND.bat")
    print("   2. Or run: python -m uvicorn app.main:app --host 127.0.0.1 --port 8001")
    
except Exception as e:
    print(f"\n❌ ERROR: {str(e)}")

print("\n" + "="*60)
