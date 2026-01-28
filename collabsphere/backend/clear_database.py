import sys
import os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app.database import engine
from sqlmodel import Session, select
from app.models.user import User

print("⚠️  WARNING: This will delete ALL users from database!")
confirm = input("Type 'yes' to continue: ")

if confirm.lower() == 'yes':
    with Session(engine) as session:
        users = session.exec(select(User)).all()
        count = len(users)
        
        for user in users:
            session.delete(user)
        
        session.commit()
        print(f"\n✅ Deleted {count} users from database")
        print("   Database is now clean for fresh registration\n")
else:
    print("\n❌ Operation cancelled\n")
