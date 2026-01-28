import sys
import os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app.database import create_db_and_tables, engine
from sqlmodel import Session, select
from app.models.user import User

print("\n🔧 AUTO-FIX: Cleaning database for fresh registration...\n")

create_db_and_tables()

with Session(engine) as session:
    # Check and delete user with email jqk@gmail.com
    existing = session.exec(select(User).where(User.email == "jqk@gmail.com")).first()
    
    if existing:
        session.delete(existing)
        session.commit()
        print(f"✅ Deleted old user: {existing.username} ({existing.email})")
    else:
        print("✅ Email jqk@gmail.com is available")
    
    print("\n✅ Database is ready for registration!\n")
