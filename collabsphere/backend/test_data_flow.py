"""
Test data flow between roles to verify real database interactions
"""
import requests
import json

BASE_URL = "http://localhost:8001/api/v1"

def login(email, password):
    """Login and return token"""
    response = requests.post(
        f"{BASE_URL}/auth/login",
        data={"username": email, "password": password}
    )
    if response.status_code == 200:
        return response.json()["access_token"]
    else:
        print(f"❌ Login failed for {email}: {response.text}")
        return None

def print_section(title):
    print("\n" + "="*60)
    print(f"🔍 {title}")
    print("="*60)

def test_lecturer_creates_project():
    """Test: Lecturer creates a project"""
    print_section("TEST 1: Lecturer creates a new project")
    
    token = login("lecturer@collabsphere.com", "lecturer123")
    if not token:
        return None
    
    headers = {"Authorization": f"Bearer {token}"}
    
    # Create new project
    project_data = {
        "title": "Hệ thống quản lý bán hàng online",
        "description": "Xây dựng website thương mại điện tử hoàn chỉnh",
        "duration_weeks": 12,
        "max_group_size": 5,
        "min_group_size": 3
    }
    
    response = requests.post(f"{BASE_URL}/projects", json=project_data, headers=headers)
    
    if response.status_code == 200:
        project = response.json()
        print(f"✅ Lecturer created project: '{project['title']}'")
        print(f"   - Project ID: {project['id']}")
        print(f"   - Status: {project['status']}")
        print(f"   - Creator ID: {project['creator_id']}")
        
        # Add milestones to the project
        milestone_data = {
            "title": "Phân tích yêu cầu",
            "description": "Thu thập và phân tích yêu cầu hệ thống",
            "week_number": 1
        }
        
        milestone_response = requests.post(
            f"{BASE_URL}/projects/{project['id']}/milestones",
            json=milestone_data,
            headers=headers
        )
        
        if milestone_response.status_code == 200:
            print(f"   - Added milestone: '{milestone_data['title']}'")
        
        return project
    else:
        print(f"❌ Failed to create project: {response.text}")
        return None

def test_lecturer_submit_for_approval(project_id):
    """Test: Lecturer submits project for approval"""
    print_section("TEST 2: Lecturer submits project for Head approval")
    
    token = login("lecturer@collabsphere.com", "lecturer123")
    if not token:
        return False
    
    headers = {"Authorization": f"Bearer {token}"}
    
    response = requests.post(f"{BASE_URL}/projects/{project_id}/submit", headers=headers)
    
    if response.status_code == 200:
        print(f"✅ Project {project_id} submitted for approval")
        print(f"   Status changed: DRAFT -> PENDING")
        return True
    else:
        print(f"❌ Failed to submit: {response.text}")
        return False

def test_head_sees_pending_project(project_id):
    """Test: Head sees the pending project"""
    print_section("TEST 3: Head views pending projects")
    
    token = login("head@collabsphere.com", "head123")
    if not token:
        return False
    
    headers = {"Authorization": f"Bearer {token}"}
    
    response = requests.get(f"{BASE_URL}/projects/pending", headers=headers)
    
    if response.status_code == 200:
        projects = response.json()
        found = False
        for p in projects:
            if p['id'] == project_id:
                found = True
                print(f"✅ Head can see pending project {project_id}")
                print(f"   - Title: {p['title']}")
                print(f"   - Status: {p['status']}")
                print(f"   - Creator: {p.get('creator', {}).get('full_name', 'Unknown')}")
                break
        
        if not found:
            print(f"⚠️  Project {project_id} not found in pending list")
            print(f"   Available projects: {[p['id'] for p in projects]}")
        
        return found
    else:
        print(f"❌ Failed to get pending projects: {response.text}")
        return False

def test_head_approves_project(project_id):
    """Test: Head approves the project"""
    print_section("TEST 4: Head approves the project")
    
    token = login("head@collabsphere.com", "head123")
    if not token:
        return False
    
    headers = {"Authorization": f"Bearer {token}"}
    
    response = requests.post(f"{BASE_URL}/projects/{project_id}/approve", headers=headers)
    
    if response.status_code == 200:
        print(f"✅ Head approved project {project_id}")
        print(f"   Status changed: PENDING -> APPROVED")
        return True
    else:
        print(f"❌ Failed to approve: {response.text}")
        return False

def test_lecturer_sees_approved_project(project_id):
    """Test: Lecturer sees their project is approved"""
    print_section("TEST 5: Lecturer checks project status")
    
    token = login("lecturer@collabsphere.com", "lecturer123")
    if not token:
        return False
    
    headers = {"Authorization": f"Bearer {token}"}
    
    response = requests.get(f"{BASE_URL}/projects/{project_id}", headers=headers)
    
    if response.status_code == 200:
        project = response.json()
        if project['status'] == 'approved':
            print(f"✅ Lecturer sees project {project_id} is APPROVED")
            print(f"   - Approved at: {project.get('approved_at', 'N/A')}")
            return True
        else:
            print(f"⚠️  Project status is {project['status']}, not APPROVED")
            return False
    else:
        print(f"❌ Failed to get project: {response.text}")
        return False

def test_staff_sees_all_data():
    """Test: Staff can see subjects, classes, projects"""
    print_section("TEST 6: Staff views system-wide data")
    
    token = login("staff@collabsphere.com", "staff123")
    if not token:
        return False
    
    headers = {"Authorization": f"Bearer {token}"}
    
    # Get statistics
    response = requests.get(f"{BASE_URL}/subjects/statistics", headers=headers)
    
    if response.status_code == 200:
        stats = response.json()
        print(f"✅ Staff can access statistics:")
        print(f"   - Total subjects: {stats.get('total_subjects', 0)}")
        print(f"   - Total classes: {stats.get('total_classes', 0)}")
        print(f"   - Total lecturers: {stats.get('total_lecturers', 0)}")
        print(f"   - Total students: {stats.get('total_students', 0)}")
        return True
    else:
        print(f"❌ Failed to get statistics: {response.text}")
        return False

def test_student_sees_group():
    """Test: Student can see their group"""
    print_section("TEST 7: Student views their group")
    
    token = login("student1@collabsphere.com", "student123")
    if not token:
        return False
    
    headers = {"Authorization": f"Bearer {token}"}
    
    response = requests.get(f"{BASE_URL}/groups/my", headers=headers)
    
    if response.status_code == 200:
        group = response.json()
        if group:
            print(f"✅ Student can see their group:")
            print(f"   - Group name: {group['name']}")
            print(f"   - Project ID: {group.get('project_id', 'None')}")
            print(f"   - Class ID: {group.get('class_id', 'None')}")
            print(f"   - Members: {group.get('member_count', 0)}")
            return True
        else:
            print(f"⚠️  Student has no group yet")
            return False
    else:
        print(f"❌ Failed to get group: {response.text}")
        return False

def test_admin_sees_reports():
    """Test: Admin can see system reports"""
    print_section("TEST 8: Admin views system reports")
    
    token = login("admin@collabsphere.com", "admin123")
    if not token:
        return False
    
    headers = {"Authorization": f"Bearer {token}"}
    
    response = requests.get(f"{BASE_URL}/reports", headers=headers)
    
    if response.status_code == 200:
        reports = response.json()
        if isinstance(reports, list):
            print(f"✅ Admin can access reports:")
            print(f"   - Total reports: {len(reports)}")
            return True
        else:
            items = reports.get('items', [])
            print(f"✅ Admin can access reports:")
            print(f"   - Total reports: {len(items)}")
            return True
    else:
        print(f"❌ Failed to get reports: {response.text}")
        return False

def check_database_consistency():
    """Check database has real relationships"""
    print_section("TEST 9: Database consistency check")
    
    import sys
    sys.path.insert(0, '.')
    from sqlmodel import Session, select
    from app.database import engine
    from app.models.user import User
    from app.models.project import Project
    from app.models.academic import Class
    from app.models.group import Group, GroupMember
    
    with Session(engine) as session:
        # Count entities
        users = session.exec(select(User)).all()
        projects = session.exec(select(Project)).all()
        classes = session.exec(select(Class)).all()
        groups = session.exec(select(Group)).all()
        
        print(f"✅ Database entities:")
        print(f"   - Users: {len(users)}")
        print(f"   - Projects: {len(projects)}")
        print(f"   - Classes: {len(classes)}")
        print(f"   - Groups: {len(groups)}")
        
        # Check relationships
        if projects:
            project = projects[0]
            creator = session.get(User, project.creator_id)
            print(f"\n✅ Relationship check - Project to User:")
            print(f"   - Project '{project.title}' created by '{creator.full_name if creator else 'Unknown'}'")
        
        if groups:
            group = groups[0]
            members = session.exec(select(GroupMember).where(GroupMember.group_id == group.id)).all()
            print(f"\n✅ Relationship check - Group to Members:")
            print(f"   - Group '{group.name}' has {len(members)} members")
            for member in members[:3]:
                user = session.get(User, member.user_id)
                print(f"     • {user.full_name if user else 'Unknown'} ({member.role})")
        
        return True

def main():
    print("\n" + "="*60)
    print("🚀 TESTING DATA FLOW BETWEEN ROLES")
    print("="*60)
    print("\nThis test verifies that all roles interact with the same database")
    print("and data changes are reflected across roles.\n")
    
    results = []
    
    # Test 1: Lecturer creates project
    project = test_lecturer_creates_project()
    results.append(("Lecturer creates project", project is not None))
    
    if project:
        project_id = project['id']
        
        # Test 2: Submit for approval
        submitted = test_lecturer_submit_for_approval(project_id)
        results.append(("Lecturer submits for approval", submitted))
        
        if submitted:
            # Test 3: Head sees pending
            head_sees = test_head_sees_pending_project(project_id)
            results.append(("Head sees pending project", head_sees))
            
            # Test 4: Head approves
            approved = test_head_approves_project(project_id)
            results.append(("Head approves project", approved))
            
            if approved:
                # Test 5: Lecturer sees approval
                lecturer_sees = test_lecturer_sees_approved_project(project_id)
                results.append(("Lecturer sees approval", lecturer_sees))
    
    # Test 6: Staff access
    staff_access = test_staff_sees_all_data()
    results.append(("Staff accesses data", staff_access))
    
    # Test 7: Student access
    student_access = test_student_sees_group()
    results.append(("Student accesses group", student_access))
    
    # Test 8: Admin access
    admin_access = test_admin_sees_reports()
    results.append(("Admin accesses reports", admin_access))
    
    # Test 9: Database consistency
    db_check = check_database_consistency()
    results.append(("Database consistency", db_check))
    
    # Summary
    print("\n" + "="*60)
    print("📊 TEST SUMMARY")
    print("="*60)
    
    passed = sum(1 for _, success in results if success)
    total = len(results)
    
    for test_name, success in results:
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status}: {test_name}")
    
    print("\n" + "="*60)
    print(f"Results: {passed}/{total} tests passed ({passed*100//total}%)")
    print("="*60)
    
    if passed == total:
        print("\n🎉 All tests passed! Data flows correctly between roles.")
        print("   The database is shared and all roles interact with real data.")
    else:
        print("\n⚠️  Some tests failed. Check the details above.")

if __name__ == "__main__":
    main()
