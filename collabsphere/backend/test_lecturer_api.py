"""Test lecturer dashboard APIs"""
import requests
import json

# Login as lecturer
login_response = requests.post(
    "http://localhost:8001/api/v1/auth/login",
    data={
        "username": "lecturer@collabsphere.com",
        "password": "lecturer123"
    }
)

if login_response.status_code != 200:
    print(f"Login failed: {login_response.status_code}")
    print(login_response.text)
    exit(1)

token = login_response.json()["access_token"]
headers = {"Authorization": f"Bearer {token}"}

print("=" * 50)
print("Testing /projects/my endpoint")
print("=" * 50)

try:
    response = requests.get("http://localhost:8001/api/v1/projects/my", headers=headers)
    print(f"Status: {response.status_code}")
    if response.status_code == 200:
        data = response.json()
        print(f"Response: {json.dumps(data, indent=2, ensure_ascii=False)}")
    else:
        print(f"Error: {response.text}")
except Exception as e:
    print(f"Exception: {e}")

print("\n" + "=" * 50)
print("Testing /projects/statistics/lecturer endpoint")
print("=" * 50)

try:
    response = requests.get("http://localhost:8001/api/v1/projects/statistics/lecturer", headers=headers)
    print(f"Status: {response.status_code}")
    if response.status_code == 200:
        data = response.json()
        print(f"Response: {json.dumps(data, indent=2, ensure_ascii=False)}")
    else:
        print(f"Error: {response.text}")
except Exception as e:
    print(f"Exception: {e}")

print("\n" + "=" * 50)
print("Testing /groups endpoint")
print("=" * 50)

try:
    response = requests.get("http://localhost:8001/api/v1/groups", headers=headers)
    print(f"Status: {response.status_code}")
    if response.status_code == 200:
        data = response.json()
        print(f"Response: {json.dumps(data, indent=2, ensure_ascii=False)}")
    else:
        print(f"Error: {response.text}")
except Exception as e:
    print(f"Exception: {e}")
