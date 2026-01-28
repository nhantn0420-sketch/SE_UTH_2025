import sys
import os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

print("="*60)
print("  🚀 STARTING BACKEND SERVER")
print("="*60)

# Clean database first
print("\n[1/2] Cleaning database...")
try:
    from app.database import create_db_and_tables, engine
    from sqlmodel import Session, select
    from app.models.user import User
    
    create_db_and_tables()
    
    with Session(engine) as session:
        existing = session.exec(select(User).where(User.email == "jqk@gmail.com")).first()
        if existing:
            session.delete(existing)
            session.commit()
            print(f"  ✅ Cleaned old user: {existing.email}")
        else:
            print("  ✅ Database clean")
except Exception as e:
    print(f"  ⚠️  Database warning: {e}")

# Start server
print("\n[2/2] Starting Uvicorn server...")
print("  Backend will run on: http://localhost:8001")
print("  API Docs: http://localhost:8001/docs")
print("\n" + "="*60)
print("  SERVER STARTING - DO NOT CLOSE THIS WINDOW")
print("="*60 + "\n")

os.system('uvicorn app.main:app --host 127.0.0.1 --port 8001')
