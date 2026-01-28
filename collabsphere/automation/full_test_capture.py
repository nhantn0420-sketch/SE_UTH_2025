"""
CollabSphere - Full Test & Screenshot Capture
Chạy đầy đủ tất cả test cases và capture 17 screenshots
"""

import time
import os
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys

# ==================== CONFIGURATION ====================
BASE_URL = "http://localhost:80"
API_URL = "http://localhost:8000"
SCREENSHOT_DIR = r"C:\Users\LENOVO\Desktop\SE\MainDocument\Images\Screenshots"

# Test Accounts
ACCOUNTS = {
    "admin": {"username": "admin", "password": "admin123"},
    "lecturer": {"username": "giangvien1", "password": "gv123456"},
    "head": {"username": "truongkhoa1", "password": "tk123456"},
    "student": {"username": "sinhvien1", "password": "sv123456"}
}

# ==================== MAIN CLASS ====================
class CollabSphereFullTest:
    def __init__(self):
        self.driver = None
        self.screenshots_captured = []
        self.current_user = None
        
    def setup_browser(self):
        """Setup Chrome WebDriver"""
        print("\n" + "="*70)
        print("🚀 INITIALIZING BROWSER")
        print("="*70)
        
        options = Options()
        options.add_argument('--window-size=1920,1080')
        options.add_argument('--start-maximized')
        options.add_argument('--disable-notifications')
        options.add_argument('--disable-infobars')
        options.add_argument('--disable-extensions')
        options.add_argument('--no-sandbox')
        options.add_argument('--disable-dev-shm-usage')
        options.add_argument('--disable-gpu')
        
        try:
            from webdriver_manager.chrome import ChromeDriverManager
            from webdriver_manager.core.os_manager import ChromeType
            from selenium.webdriver.chrome.service import Service
            print("📦 Installing ChromeDriver...")
            service = Service(ChromeDriverManager(chrome_type=ChromeType.GOOGLE).install())
            self.driver = webdriver.Chrome(service=service, options=options)
            print("✅ ChromeDriver installed")
        except Exception as e:
            print(f"⚠️  ChromeDriverManager failed: {e}")
            print("🔄 Using default Chrome...")
            self.driver = webdriver.Chrome(options=options)
        
        self.driver.maximize_window()
        print("✅ Browser ready!")
        
    def take_screenshot(self, filename, description="", wait=3):
        """Take screenshot with wait time"""
        time.sleep(wait)
        
        # Ensure directory exists
        os.makedirs(SCREENSHOT_DIR, exist_ok=True)
        
        filepath = os.path.join(SCREENSHOT_DIR, filename)
        self.driver.save_screenshot(filepath)
        self.screenshots_captured.append(filename)
        
        size = os.path.getsize(filepath)
        print(f"   📸 {filename} ({size//1024}KB) - {description}")
        
    def login(self, role):
        """Login as specific role"""
        if self.current_user == role:
            print(f"   ℹ️  Already logged in as {role}")
            return True
            
        account = ACCOUNTS.get(role)
        if not account:
            print(f"   ❌ Unknown role: {role}")
            return False
            
        print(f"\n🔐 Logging in as {role.upper()} ({account['username']})...")
        
        try:
            # Go to login page
            self.driver.get(f"{BASE_URL}/login")
            time.sleep(2)
            
            # Find and fill username
            username_field = WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.NAME, "username"))
            )
            username_field.clear()
            username_field.send_keys(account['username'])
            
            # Find and fill password
            password_field = self.driver.find_element(By.NAME, "password")
            password_field.clear()
            password_field.send_keys(account['password'])
            
            # Submit form
            submit_btn = self.driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
            submit_btn.click()
            
            time.sleep(3)
            
            # Verify login success
            if "/login" not in self.driver.current_url:
                print(f"   ✅ Logged in as {role}")
                self.current_user = role
                return True
            else:
                print(f"   ❌ Login failed - still on login page")
                return False
                
        except Exception as e:
            print(f"   ❌ Login error: {str(e)[:100]}")
            return False
            
    def logout(self):
        """Logout current user"""
        if not self.current_user:
            return
            
        print(f"\n🚪 Logging out {self.current_user}...")
        try:
            self.driver.get(f"{BASE_URL}/logout")
            time.sleep(2)
            self.current_user = None
            print("   ✅ Logged out")
        except Exception as e:
            print(f"   ⚠️  Logout warning: {e}")
            self.current_user = None
            
    def navigate_and_capture(self, url, filename, description, wait=3):
        """Navigate to URL and capture screenshot"""
        try:
            full_url = f"{BASE_URL}{url}" if not url.startswith("http") else url
            self.driver.get(full_url)
            self.take_screenshot(filename, description, wait)
            return True
        except Exception as e:
            print(f"   ⚠️  Navigation failed: {str(e)[:100]}")
            # Still try to capture what's on screen
            try:
                self.take_screenshot(filename, f"{description} (error page)", wait)
            except:
                pass
            return False
            
    # ==================== TEST PHASES ====================
    
    def phase1_admin(self):
        """Phase 1: Admin Dashboard & Management"""
        print("\n" + "="*70)
        print("📋 PHASE 1: ADMIN DASHBOARD & MANAGEMENT")
        print("="*70)
        
        if not self.login("admin"):
            print("❌ Cannot proceed without admin login")
            return False
            
        # 1. Admin Dashboard
        print("\n1️⃣  Admin Dashboard")
        self.navigate_and_capture("/admin", "admin-dashboard.png", 
                                 "Admin dashboard overview")
        
        # 2. User Management
        print("\n2️⃣  User Management")
        self.navigate_and_capture("/admin/users", "user-management.png",
                                 "User management page")
        
        # 3. System Settings
        print("\n3️⃣  System Settings")
        self.navigate_and_capture("/admin/settings", "system-settings.png",
                                 "System configuration")
        
        return True
        
    def phase2_lecturer(self):
        """Phase 2: Lecturer Project Management"""
        print("\n" + "="*70)
        print("👨‍🏫 PHASE 2: LECTURER PROJECT MANAGEMENT")
        print("="*70)
        
        self.logout()
        
        if not self.login("lecturer"):
            print("❌ Cannot proceed without lecturer login")
            return False
            
        # 4. Lecturer Dashboard
        print("\n4️⃣  Lecturer Dashboard")
        self.navigate_and_capture("/lecturer", "lecturer-dashboard.png",
                                 "Lecturer dashboard")
        
        # 5. Create Project Manual
        print("\n5️⃣  Create Project Manually")
        urls_to_try = ["/lecturer/projects/create", "/projects/create", "/projects/new"]
        for url in urls_to_try:
            if self.navigate_and_capture(url, "create-project-manual.png",
                                        "Manual project creation form", wait=4):
                break
        
        # 6. AI Milestone Generation
        print("\n6️⃣  AI Milestone Generation")
        urls_to_try = ["/lecturer/projects", "/projects", "/ai/projects"]
        for url in urls_to_try:
            if self.navigate_and_capture(url, "ai-milestone-generation.png",
                                        "AI-powered milestone generation", wait=4):
                break
        
        return True
        
    def phase3_head_approval(self):
        """Phase 3: Department Head Approval"""
        print("\n" + "="*70)
        print("✅ PHASE 3: DEPARTMENT HEAD APPROVAL")
        print("="*70)
        
        self.logout()
        
        if not self.login("head"):
            print("⚠️  Head account not available, skipping...")
            return True
            
        # 7. Head Dashboard & Approvals
        print("\n7️⃣  Department Head Dashboard")
        self.navigate_and_capture("/head", "head-approve-projects.png",
                                 "Project approval interface")
        
        return True
        
    def phase4_student_registration(self):
        """Phase 4: Student Registration & Team Formation"""
        print("\n" + "="*70)
        print("👨‍🎓 PHASE 4: STUDENT REGISTRATION & TEAM FORMATION")
        print("="*70)
        
        self.logout()
        
        if not self.login("student"):
            print("❌ Cannot proceed without student login")
            return False
            
        # 8. Student Dashboard
        print("\n8️⃣  Student Dashboard")
        self.navigate_and_capture("/student", "student-dashboard.png",
                                 "Student dashboard overview")
        
        # 9. Browse Projects
        print("\n9️⃣  Browse Available Projects")
        urls_to_try = ["/student/projects", "/projects", "/projects/browse"]
        for url in urls_to_try:
            if self.navigate_and_capture(url, "browse-projects.png",
                                        "Browse available projects", wait=4):
                break
        
        # 10. Team Formation
        print("\n🔟 Team Formation")
        urls_to_try = ["/teams", "/groups", "/student/teams"]
        for url in urls_to_try:
            if self.navigate_and_capture(url, "team-formation.png",
                                        "Team creation interface", wait=4):
                break
        
        return True
        
    def phase5_collaboration(self):
        """Phase 5: Team Collaboration Tools"""
        print("\n" + "="*70)
        print("💬 PHASE 5: TEAM COLLABORATION TOOLS")
        print("="*70)
        
        # Ensure still logged in as student
        if self.current_user != "student":
            if not self.login("student"):
                return False
        
        # 11. Team Chat
        print("\n1️⃣1️⃣  Team Chat Interface")
        urls_to_try = ["/chat", "/messages", "/communication"]
        for url in urls_to_try:
            if self.navigate_and_capture(url, "team-chat.png",
                                        "Real-time team chat", wait=4):
                break
        
        # 12. Video Call
        print("\n1️⃣2️⃣  Video Meeting Interface")
        urls_to_try = ["/meeting", "/video-call", "/meetings"]
        for url in urls_to_try:
            if self.navigate_and_capture(url, "video-call.png",
                                        "Video conferencing interface", wait=4):
                break
        
        # 13. Team Progress Tracking
        print("\n1️⃣3️⃣  Team Progress Tracking")
        urls_to_try = ["/progress", "/milestones", "/team/progress"]
        for url in urls_to_try:
            if self.navigate_and_capture(url, "team-progress.png",
                                        "Milestone progress tracking", wait=4):
                break
        
        return True
        
    def phase6_submissions_grading(self):
        """Phase 6: Checkpoint Submissions & Grading"""
        print("\n" + "="*70)
        print("📝 PHASE 6: CHECKPOINT SUBMISSIONS & GRADING")
        print("="*70)
        
        # 14. Submit Checkpoint (as student)
        print("\n1️⃣4️⃣  Submit Checkpoint")
        if self.current_user != "student":
            if not self.login("student"):
                return False
                
        urls_to_try = ["/submissions", "/checkpoints", "/submit"]
        for url in urls_to_try:
            if self.navigate_and_capture(url, "submit-checkpoint.png",
                                        "Checkpoint submission form", wait=4):
                break
        
        # Switch to lecturer for grading
        self.logout()
        
        if not self.login("lecturer"):
            return False
        
        # 15. Grade Checkpoint
        print("\n1️⃣5️⃣  Grade Checkpoint Submissions")
        urls_to_try = ["/lecturer/evaluations", "/evaluations", "/grading"]
        for url in urls_to_try:
            if self.navigate_and_capture(url, "grade-checkpoint.png",
                                        "Grade student submissions", wait=4):
                break
        
        # Switch back to student to view grades
        self.logout()
        
        if not self.login("student"):
            return False
        
        # 16. View Grades
        print("\n1️⃣6️⃣  View Grades & Feedback")
        urls_to_try = ["/grades", "/evaluations", "/my-grades"]
        for url in urls_to_try:
            if self.navigate_and_capture(url, "view-grades.png",
                                        "View grades and feedback", wait=4):
                break
        
        return True
        
    def phase7_peer_review(self):
        """Phase 7: Peer Review System"""
        print("\n" + "="*70)
        print("👥 PHASE 7: PEER REVIEW SYSTEM")
        print("="*70)
        
        # Peer review as student
        if self.current_user != "student":
            if not self.login("student"):
                return False
        
        # 17. Peer Review Form
        print("\n1️⃣7️⃣  Peer Review Form")
        urls_to_try = ["/peer-review", "/reviews", "/team/review"]
        for url in urls_to_try:
            if self.navigate_and_capture(url, "peer-review-form.png",
                                        "Peer review evaluation form", wait=4):
                break
        
        # 18. Aggregated Peer Review Results (can be lecturer or student view)
        print("\n1️⃣8️⃣  Aggregated Peer Review Results")
        urls_to_try = ["/peer-review/results", "/reviews/results", "/peer-results"]
        for url in urls_to_try:
            if self.navigate_and_capture(url, "peer-review-aggregated.png",
                                        "Aggregated peer review results", wait=4):
                break
        
        return True
        
    # ==================== MAIN EXECUTION ====================
    
    def run_all_tests(self):
        """Execute all test phases"""
        print("\n" + "="*70)
        print("🎯 COLLABSPHERE FULL TEST SUITE")
        print("="*70)
        print(f"📁 Screenshot Directory: {SCREENSHOT_DIR}")
        print(f"🌐 Base URL: {BASE_URL}")
        print(f"⏱️  Estimated Time: 5-8 minutes")
        print("="*70)
        
        try:
            # Execute all phases
            self.phase1_admin()
            self.phase2_lecturer()
            self.phase3_head_approval()
            self.phase4_student_registration()
            self.phase5_collaboration()
            self.phase6_submissions_grading()
            self.phase7_peer_review()
            
            return True
            
        except KeyboardInterrupt:
            print("\n\n⚠️  Test interrupted by user")
            return False
        except Exception as e:
            print(f"\n\n❌ Test suite error: {e}")
            import traceback
            traceback.print_exc()
            return False
            
    def generate_report(self):
        """Generate test report"""
        print("\n" + "="*70)
        print("📊 TEST REPORT")
        print("="*70)
        
        # Count captured screenshots
        captured_count = len(self.screenshots_captured)
        expected_count = 17
        
        print(f"\n📸 Screenshots Captured: {captured_count}/{expected_count}")
        
        if captured_count > 0:
            print(f"\n✅ Successfully captured screenshots:")
            for i, filename in enumerate(self.screenshots_captured, 1):
                filepath = os.path.join(SCREENSHOT_DIR, filename)
                if os.path.exists(filepath):
                    size_kb = os.path.getsize(filepath) // 1024
                    print(f"   {i:2d}. {filename:40s} ({size_kb:4d}KB)")
                else:
                    print(f"   {i:2d}. {filename:40s} (MISSING)")
        
        if captured_count < expected_count:
            print(f"\n⚠️  Missing {expected_count - captured_count} screenshot(s)")
        else:
            print(f"\n🎉 ALL {expected_count} SCREENSHOTS CAPTURED!")
            
        print("\n" + "="*70)
        
        return captured_count >= expected_count
        
    def cleanup(self):
        """Close browser and cleanup"""
        if self.driver:
            try:
                self.driver.quit()
                print("\n🧹 Browser closed")
            except:
                pass

# ==================== MAIN ENTRY POINT ====================

def main():
    test_suite = None
    success = False
    
    try:
        print("\n" + "="*70)
        print("COLLABSPHERE - AUTOMATED TEST & SCREENSHOT CAPTURE")
        print("="*70)
        
        # Create test instance
        test_suite = CollabSphereFullTest()
        
        # Setup browser
        test_suite.setup_browser()
        
        # Run all tests
        success = test_suite.run_all_tests()
        
        # Generate report
        test_suite.generate_report()
        
        if success:
            print("\n✅ TEST SUITE COMPLETED SUCCESSFULLY!")
        else:
            print("\n⚠️  TEST SUITE COMPLETED WITH WARNINGS")
            
    except KeyboardInterrupt:
        print("\n\n⚠️  Test suite interrupted by user")
    except Exception as e:
        print(f"\n\n❌ Fatal error: {e}")
        import traceback
        traceback.print_exc()
    finally:
        if test_suite:
            test_suite.cleanup()
            
    return 0 if success else 1

if __name__ == "__main__":
    exit(main())
