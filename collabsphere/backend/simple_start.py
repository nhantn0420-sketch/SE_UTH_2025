import subprocess
import sys
import os

os.chdir(r'C:\Users\LENOVO\Desktop\SE\collabsphere\backend')
os.environ['PYTHONPATH'] = os.getcwd()

print("="*60)
print("  🚀 STARTING BACKEND - SIMPLE METHOD")
print("="*60)
print(f"\nWorking directory: {os.getcwd()}")
print(f"PYTHONPATH: {os.environ['PYTHONPATH']}")
print("\nStarting Uvicorn server...")
print("="*60)
print()

# Run uvicorn directly
subprocess.run([
    sys.executable,
    "-m",
    "uvicorn",
    "app.main:app",
    "--host",
    "127.0.0.1",
    "--port",
    "8001"
])
