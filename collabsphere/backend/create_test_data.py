"""
Script to create test accounts and sample data for CollabSphere
"""
import sys
from sqlmodel import Session, select
from app.database import engine
from app.models.user import User, UserRole
from app.models.subject import Subject, Curriculum
from app.models.academic import Class, ClassMember, Semester
from app.models.project import Project, ProjectStatus, ProjectMilestone
from app.models.group import Group, GroupMember
from app.utils.security import get_password_hash
from datetime import datetime, timedelta

def create_test_users(session: Session):
    """Create test users for all roles"""
    print("\n👥 Creating test users...")
    
    users_data = [
        {
            "username": "admin",
            "email": "admin@collabsphere.com",
            "full_name": "System Admin",
            "role": UserRole.ADMIN,
            "password": "admin123"
        },
        {
            "username": "staff",
            "email": "staff@collabsphere.com",
            "full_name": "Staff Member",
            "role": UserRole.STAFF,
            "password": "staff123"
        },
        {
            "username": "head",
            "email": "head@collabsphere.com",
            "full_name": "Department Head",
            "role": UserRole.HEAD,
            "password": "head123"
        },
        {
            "username": "lecturer",
            "email": "lecturer@collabsphere.com",
            "full_name": "Lecturer Nguyễn Văn A",
            "role": UserRole.LECTURER,
            "password": "lecturer123"
        },
        {
            "username": "lecturer2",
            "email": "lecturer2@collabsphere.com",
            "full_name": "Lecturer Trần Thị B",
            "role": UserRole.LECTURER,
            "password": "lecturer123"
        },
        {
            "username": "student1",
            "email": "student1@collabsphere.com",
            "full_name": "Sinh viên Phạm Văn C",
            "role": UserRole.STUDENT,
            "password": "student123"
        },
        {
            "username": "student2",
            "email": "student2@collabsphere.com",
            "full_name": "Sinh viên Lê Thị D",
            "role": UserRole.STUDENT,
            "password": "student123"
        },
        {
            "username": "student3",
            "email": "student3@collabsphere.com",
            "full_name": "Sinh viên Hoàng Văn E",
            "role": UserRole.STUDENT,
            "password": "student123"
        },
        {
            "username": "student4",
            "email": "student4@collabsphere.com",
            "full_name": "Sinh viên Ngô Thị F",
            "role": UserRole.STUDENT,
            "password": "student123"
        },
    ]
    
    created_users = {}
    for user_data in users_data:
        # Check if user exists
        existing = session.exec(
            select(User).where(User.email == user_data["email"])
        ).first()
        
        if existing:
            print(f"   ⚠️  User {user_data['username']} already exists")
            created_users[user_data['username']] = existing
            continue
        
        # Create new user
        password = user_data.pop("password")
        user = User(
            **user_data,
            hashed_password=get_password_hash(password),
            is_active=True
        )
        session.add(user)
        session.flush()
        created_users[user_data['username']] = user
        print(f"   ✅ Created {user_data['role'].value}: {user_data['username']}")
    
    session.commit()
    return created_users

def create_test_subjects(session: Session):
    """Create test subjects"""
    print("\n📚 Creating test subjects...")
    
    subjects_data = [
        {
            "code": "CS101",
            "name": "Lập trình cơ bản",
            "description": "Môn học về lập trình Python cơ bản",
            "credits": 4
        },
        {
            "code": "CS201",
            "name": "Cấu trúc dữ liệu",
            "description": "Môn học về cấu trúc dữ liệu và giải thuật",
            "credits": 4
        },
        {
            "code": "SE301",
            "name": "Công nghệ phần mềm",
            "description": "Môn học về quy trình phát triển phần mềm",
            "credits": 3
        },
    ]
    
    created_subjects = {}
    for subject_data in subjects_data:
        existing = session.exec(
            select(Subject).where(Subject.code == subject_data["code"])
        ).first()
        
        if existing:
            print(f"   ⚠️  Subject {subject_data['code']} already exists")
            created_subjects[subject_data['code']] = existing
            continue
        
        subject = Subject(**subject_data)
        session.add(subject)
        session.flush()
        created_subjects[subject_data['code']] = subject
        print(f"   ✅ Created subject: {subject_data['code']} - {subject_data['name']}")
    
    session.commit()
    return created_subjects

def create_test_classes(session: Session, subjects, users):
    """Create test classes"""
    print("\n🏫 Creating test classes...")
    
    lecturer1 = users.get('lecturer')
    lecturer2 = users.get('lecturer2')
    
    if not lecturer1 or not lecturer2:
        print("   ⚠️  Lecturers not found, skipping classes")
        return {}
    
    classes_data = [
        {
            "code": "CS101-2024-1",
            "name": "Lập trình cơ bản - Lớp 1",
            "subject_id": subjects['CS101'].id,
            "lecturer_id": lecturer1.id,
            "semester": Semester.FALL,
            "academic_year": "2024-2025",
            "max_students": 40
        },
        {
            "code": "SE301-2024-1",
            "name": "Công nghệ phần mềm - Lớp 1",
            "subject_id": subjects['SE301'].id,
            "lecturer_id": lecturer1.id,
            "semester": Semester.FALL,
            "academic_year": "2024-2025",
            "max_students": 35
        },
    ]
    
    created_classes = {}
    for class_data in classes_data:
        existing = session.exec(
            select(Class).where(Class.code == class_data["code"])
        ).first()
        
        if existing:
            print(f"   ⚠️  Class {class_data['code']} already exists")
            created_classes[class_data['code']] = existing
            continue
        
        cls = Class(**class_data)
        session.add(cls)
        session.flush()
        created_classes[class_data['code']] = cls
        print(f"   ✅ Created class: {class_data['code']}")
    
    session.commit()
    return created_classes

def add_students_to_class(session: Session, class_obj, students):
    """Add students to class"""
    print(f"\n👨‍🎓 Adding students to {class_obj.code}...")
    
    for student in students:
        # Check if already member
        existing = session.exec(
            select(ClassMember).where(
                ClassMember.class_id == class_obj.id,
                ClassMember.user_id == student.id
            )
        ).first()
        
        if existing:
            print(f"   ⚠️  {student.full_name} already in class")
            continue
        
        member = ClassMember(
            class_id=class_obj.id,
            user_id=student.id
        )
        session.add(member)
        print(f"   ✅ Added {student.full_name}")
    
    session.commit()

def create_test_projects(session: Session, users):
    """Create test projects"""
    print("\n📝 Creating test projects...")
    
    lecturer = users.get('lecturer')
    if not lecturer:
        print("   ⚠️  Lecturer not found, skipping projects")
        return {}
    
    projects_data = [
        {
            "title": "Hệ thống quản lý thư viện số",
            "description": "Xây dựng web application quản lý mượn/trả sách trực tuyến",
            "creator_id": lecturer.id,
            "status": ProjectStatus.APPROVED,
            "duration_weeks": 12,
            "max_group_size": 5,
            "min_group_size": 3,
            "milestones": [
                {"title": "Phân tích yêu cầu", "week_number": 1},
                {"title": "Thiết kế hệ thống", "week_number": 3},
                {"title": "Phát triển Backend", "week_number": 6},
                {"title": "Phát triển Frontend", "week_number": 9},
                {"title": "Testing & Deployment", "week_number": 12},
            ]
        },
        {
            "title": "Ứng dụng học từ vựng tiếng Anh",
            "description": "Mobile app giúp học sinh luyện từ vựng với flashcard và game",
            "creator_id": lecturer.id,
            "status": ProjectStatus.APPROVED,
            "duration_weeks": 12,
            "max_group_size": 4,
            "min_group_size": 2,
            "milestones": [
                {"title": "Nghiên cứu phương pháp học", "week_number": 1},
                {"title": "Thiết kế UI/UX", "week_number": 2},
                {"title": "Xây dựng database từ vựng", "week_number": 4},
                {"title": "Phát triển tính năng học", "week_number": 8},
                {"title": "Test và hoàn thiện", "week_number": 11},
            ]
        },
    ]
    
    created_projects = {}
    for i, project_data in enumerate(projects_data):
        milestones_data = project_data.pop('milestones')
        
        existing = session.exec(
            select(Project).where(Project.title == project_data["title"])
        ).first()
        
        if existing:
            print(f"   ⚠️  Project '{project_data['title']}' already exists")
            created_projects[f"project{i+1}"] = existing
            continue
        
        project = Project(**project_data)
        session.add(project)
        session.flush()
        
        # Add milestones
        for ms_data in milestones_data:
            milestone = ProjectMilestone(
                project_id=project.id,
                **ms_data
            )
            session.add(milestone)
        
        created_projects[f"project{i+1}"] = project
        print(f"   ✅ Created project: {project_data['title']} ({len(milestones_data)} milestones)")
    
    session.commit()
    return created_projects

def create_test_groups(session: Session, class_obj, project, students):
    """Create test group"""
    print(f"\n👥 Creating test group for project '{project.title}'...")
    
    group_name = f"Nhóm 1 - {project.title[:30]}"
    
    existing = session.exec(
        select(Group).where(Group.name == group_name)
    ).first()
    
    if existing:
        print(f"   ⚠️  Group already exists")
        return existing
    
    group = Group(
        name=group_name,
        class_id=class_obj.id,
        project_id=project.id
    )
    session.add(group)
    session.flush()
    
    # Add members
    for i, student in enumerate(students[:4]):  # Max 4 students per group
        role = "leader" if i == 0 else "member"
        member = GroupMember(
            group_id=group.id,
            user_id=student.id,
            role=role
        )
        session.add(member)
        print(f"   ✅ Added {student.full_name} as {role}")
    
    session.commit()
    print(f"   ✅ Created group: {group_name}")
    return group

def main():
    print("=" * 60)
    print("🚀 CREATING TEST DATA FOR COLLABSPHERE")
    print("=" * 60)
    
    with Session(engine) as session:
        try:
            # Create users
            users = create_test_users(session)
            
            # Create subjects
            subjects = create_test_subjects(session)
            
            # Create classes
            classes = create_test_classes(session, subjects, users)
            
            # Add students to class
            students = [users[f'student{i}'] for i in range(1, 5) if f'student{i}' in users]
            if classes and students:
                se_class = classes.get('SE301-2024-1')
                if se_class:
                    add_students_to_class(session, se_class, students)
            
            # Create projects
            projects = create_test_projects(session, users)
            
            # Create group
            if classes and projects and students:
                se_class = classes.get('SE301-2024-1')
                project1 = projects.get('project1')
                if se_class and project1:
                    create_test_groups(session, se_class, project1, students)
            
            print("\n" + "=" * 60)
            print("✅ TEST DATA CREATED SUCCESSFULLY!")
            print("=" * 60)
            print("\n📝 Test Accounts:")
            print("   Admin:    admin@collabsphere.com    / admin123")
            print("   Staff:    staff@collabsphere.com    / staff123")
            print("   Head:     head@collabsphere.com     / head123")
            print("   Lecturer: lecturer@collabsphere.com / lecturer123")
            print("   Student1: student1@collabsphere.com / student123")
            print("   Student2: student2@collabsphere.com / student123")
            print("   Student3: student3@collabsphere.com / student123")
            print("   Student4: student4@collabsphere.com / student123")
            print("\n🎯 You can now login and test all features!")
            print("")
            
        except Exception as e:
            print(f"\n❌ Error: {e}")
            import traceback
            traceback.print_exc()
            session.rollback()
            sys.exit(1)

if __name__ == "__main__":
    main()
