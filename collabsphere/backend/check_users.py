import sys
import os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app.database import create_db_and_tables, engine
from sqlmodel import Session, select
from app.models.user import User

# Initialize database
print("🔍 Checking database...")
create_db_and_tables()

# Check existing users
with Session(engine) as session:
    users = session.exec(select(User)).all()
    print(f"\n📊 Total users in database: {len(users)}")
    
    if users:
        print("\n👥 Existing users:")
        for user in users:
            print(f"   - {user.username} | {user.email} | {user.role}")
    else:
        print("\n✅ No users found. Database is clean for testing.")
    
    # Check for specific email
    email_to_check = "jqk@gmail.com"
    existing = session.exec(select(User).where(User.email == email_to_check)).first()
    
    print(f"\n🔍 Email '{email_to_check}':", end=" ")
    if existing:
        print(f"❌ ALREADY EXISTS (username: {existing.username})")
        print(f"   → Use different email for registration")
    else:
        print("✅ AVAILABLE")
        print(f"   → Can register with this email")

print("\n" + "="*50)
print("💡 RECOMMENDATIONS:")
print("="*50)
if any(u.email == "jqk@gmail.com" for u in users):
    print("❌ Email 'jqk@gmail.com' is taken")
    print("✅ Try these emails:")
    print("   - ungchac2026@gmail.com")
    print("   - ung.chac.test@gmail.com")
    print("   - jqk2026@gmail.com")
else:
    print("✅ Email 'jqk@gmail.com' is available!")
    print("   You can register with this email")

print("\n📝 To clear database and start fresh:")
print("   python clear_database.py")
print()
