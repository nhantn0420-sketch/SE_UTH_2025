"""Test student dashboard APIs"""
import requests
import json

# Login as student1
login_response = requests.post(
    "http://localhost:8001/api/v1/auth/login",
    data={
        "username": "student1@collabsphere.com",
        "password": "student123"
    }
)

if login_response.status_code != 200:
    print(f"Login failed: {login_response.status_code}")
    print(login_response.text)
    exit(1)

token = login_response.json()["access_token"]
headers = {"Authorization": f"Bearer {token}"}

print("=" * 50)
print("Testing /groups/my endpoint")
print("=" * 50)

# Test /groups/my
try:
    response = requests.get("http://localhost:8001/api/v1/groups/my", headers=headers)
    print(f"Status: {response.status_code}")
    if response.status_code == 200:
        data = response.json()
        print(f"Response: {json.dumps(data, indent=2, ensure_ascii=False)}")
    else:
        print(f"Error: {response.text}")
except Exception as e:
    print(f"Exception: {e}")

print("\n" + "=" * 50)
print("Testing /groups/statistics/student endpoint")
print("=" * 50)

# Test /groups/statistics/student
try:
    response = requests.get("http://localhost:8001/api/v1/groups/statistics/student", headers=headers)
    print(f"Status: {response.status_code}")
    if response.status_code == 200:
        data = response.json()
        print(f"Response: {json.dumps(data, indent=2, ensure_ascii=False)}")
    else:
        print(f"Error: {response.text}")
except Exception as e:
    print(f"Exception: {e}")
