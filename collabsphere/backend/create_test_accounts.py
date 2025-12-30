"""
Script tạo tài khoản test cho tất cả các role
"""
import sys
sys.path.insert(0, '.')

from sqlmodel import Session, select
from app.database import engine
from app.models.user import User, UserRole
from app.utils.security import get_password_hash

def create_test_accounts():
    """Tạo các tài khoản test"""
    
    test_accounts = [
        {
            "username": "admin",
            "email": "admin@collabsphere.com",
            "full_name": "Quản Trị Viên",
            "role": UserRole.ADMIN,
            "password": "admin123"
        },
        {
            "username": "staff",
            "email": "staff@collabsphere.com", 
            "full_name": "Nhân Viên Hệ Thống",
            "role": UserRole.STAFF,
            "password": "staff123"
        },
        {
            "username": "head",
            "email": "head@collabsphere.com",
            "full_name": "Trưởng Bộ Môn",
            "role": UserRole.HEAD,
            "password": "head123"
        },
        {
            "username": "lecturer",
            "email": "lecturer@collabsphere.com",
            "full_name": "Giảng Viên Test",
            "role": UserRole.LECTURER,
            "password": "lecturer123"
        },
        {
            "username": "student",
            "email": "student@collabsphere.com",
            "full_name": "Sinh Viên Test",
            "role": UserRole.STUDENT,
            "password": "student123"
        }
    ]
    
    with Session(engine) as session:
        created = []
        skipped = []
        
        for acc in test_accounts:
            # Check if exists
            existing = session.exec(
                select(User).where(
                    (User.username == acc["username"]) | (User.email == acc["email"])
                )
            ).first()
            
            if existing:
                skipped.append(f"{acc['role'].value}: {acc['username']} (đã tồn tại)")
                continue
            
            # Create user
            user = User(
                username=acc["username"],
                email=acc["email"],
                full_name=acc["full_name"],
                role=acc["role"],
                hashed_password=get_password_hash(acc["password"]),
                is_active=True
            )
            session.add(user)
            created.append(f"{acc['role'].value}: {acc['username']} / {acc['password']}")
        
        session.commit()
        
        print("\n" + "="*60)
        print("       TÀI KHOẢN TEST COLLABSPHERE")
        print("="*60)
        
        if created:
            print("\n✅ ĐÃ TẠO MỚI:")
            for acc in created:
                print(f"   • {acc}")
        
        if skipped:
            print("\n⏭️ BỎ QUA (đã tồn tại):")
            for acc in skipped:
                print(f"   • {acc}")
        
        print("\n" + "-"*60)
        print("DANH SÁCH TÀI KHOẢN TEST:")
        print("-"*60)
        print("""
┌─────────────┬────────────────────────────────┬─────────────┐
│   Role      │   Email/Username               │   Password  │
├─────────────┼────────────────────────────────┼─────────────┤
│   ADMIN     │   admin / admin@collabsphere.com    │   admin123    │
│   STAFF     │   staff / staff@collabsphere.com    │   staff123    │
│   HEAD      │   head / head@collabsphere.com      │   head123     │
│   LECTURER  │   lecturer / lecturer@collabsphere.com │   lecturer123 │
│   STUDENT   │   student / student@collabsphere.com │   student123  │
└─────────────┴────────────────────────────────┴─────────────┘
        """)
        print("="*60)

if __name__ == "__main__":
    create_test_accounts()
