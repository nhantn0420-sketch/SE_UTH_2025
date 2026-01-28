"""
Simple Screenshot Capture Script
Chỉ đăng nhập và chụp các trang chính, không tương tác phức tạp
"""

import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import os

# Configuration
BASE_URL = "http://localhost:80"
SCREENSHOT_DIR = r"C:\Users\LENOVO\Desktop\SE\MainDocument\Images\Screenshots"
WAIT_TIME = 3

# Test accounts
ACCOUNTS = {
    "admin": {"username": "admin", "password": "admin123"},
    "lecturer": {"username": "giangvien1", "password": "gv123456"},
    "student": {"username": "sinhvien1", "password": "sv123456"}
}

class SimpleCapture:
    def __init__(self):
        self.driver = None
        self.setup_browser()
        
    def setup_browser(self):
        """Setup Chrome WebDriver"""
        options = Options()
        options.add_argument('--window-size=1920,1080')
        options.add_argument('--start-maximized')
        options.add_argument('--disable-notifications')
        options.add_argument('--disable-gpu')
        
        print("🚀 Starting Chrome...")
        try:
            from webdriver_manager.chrome import ChromeDriverManager
            from webdriver_manager.core.os_manager import ChromeType
            from selenium.webdriver.chrome.service import Service
            service = Service(ChromeDriverManager(chrome_type=ChromeType.GOOGLE).install())
            self.driver = webdriver.Chrome(service=service, options=options)
        except:
            self.driver = webdriver.Chrome(options=options)
        
        self.driver.maximize_window()
        print("✅ Browser ready!")
        
    def take_screenshot(self, filename, description=""):
        """Take and save screenshot"""
        time.sleep(WAIT_TIME)
        filepath = os.path.join(SCREENSHOT_DIR, filename)
        self.driver.save_screenshot(filepath)
        print(f"📸 {filename} - {description}")
        
    def login(self, role):
        """Login as specific role"""
        account = ACCOUNTS[role]
        print(f"\n🔐 Logging in as {role.upper()} ({account['username']})...")
        
        self.driver.get(f"{BASE_URL}/login")
        time.sleep(2)
        
        try:
            # Try to find and fill login form
            username_input = WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.NAME, "username"))
            )
            password_input = self.driver.find_element(By.NAME, "password")
            
            username_input.clear()
            username_input.send_keys(account['username'])
            password_input.clear()
            password_input.send_keys(account['password'])
            
            # Find and click login button
            login_btn = self.driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
            login_btn.click()
            
            time.sleep(3)
            print(f"✅ Logged in as {role}")
            return True
        except Exception as e:
            print(f"❌ Login failed: {e}")
            return False
            
    def logout(self):
        """Logout current user"""
        try:
            # Navigate to logout and wait for redirect
            self.driver.get(f"{BASE_URL}/logout")
            time.sleep(3)
            # After logout, should be at login page
            self.driver.get(f"{BASE_URL}/login")
            time.sleep(2)
        except Exception as e:
            print(f"⚠️  Logout issue: {e}")
            # Force go to login page
            try:
                self.driver.get(f"{BASE_URL}/login")
                time.sleep(2)
            except:
                pass
            
    def capture_all(self):
        """Capture all required screenshots"""
        
        print("\n" + "="*60)
        print("SCREENSHOT CAPTURE - SIMPLE MODE")
        print("="*60)
        
        # PHASE 1: ADMIN
        print("\n" + "="*60)
        print("PHASE 1: ADMIN VIEWS")
        print("="*60)
        
        if self.login("admin"):
            # 1. Admin Dashboard
            self.driver.get(f"{BASE_URL}/admin")
            self.take_screenshot("admin-dashboard.png", "Admin dashboard overview")
            
            # 2. User Management
            try:
                self.driver.get(f"{BASE_URL}/admin/users")
                self.take_screenshot("user-management.png", "User management page")
            except:
                print("⚠️  User management page not accessible")
                
            # 3. System Settings
            try:
                self.driver.get(f"{BASE_URL}/admin/settings")
                self.take_screenshot("system-settings.png", "System settings page")
            except:
                print("⚠️  Settings page not accessible")
                
        self.logout()
        
        # PHASE 2: LECTURER
        print("\n" + "="*60)
        print("PHASE 2: LECTURER VIEWS")
        print("="*60)
        
        if self.login("lecturer"):
            # 4. Lecturer Dashboard
            self.driver.get(f"{BASE_URL}/lecturer")
            self.take_screenshot("lecturer-dashboard.png", "Lecturer dashboard")
            
            # 5. Create Project Manual
            try:
                self.driver.get(f"{BASE_URL}/lecturer/projects/create")
                self.take_screenshot("create-project-manual.png", "Manual project creation")
            except:
                try:
                    self.driver.get(f"{BASE_URL}/projects/create")
                    self.take_screenshot("create-project-manual.png", "Manual project creation")
                except:
                    print("⚠️  Project creation page not accessible")
                    
            # 6. AI Milestone Generation
            try:
                self.driver.get(f"{BASE_URL}/lecturer/projects")
                self.take_screenshot("ai-milestone-generation.png", "AI milestone generation interface")
            except:
                print("⚠️  Projects page not accessible")
                
        self.logout()
        
        # PHASE 3: STUDENT
        print("\n" + "="*60)
        print("PHASE 3: STUDENT VIEWS")
        print("="*60)
        
        if self.login("student"):
            # 7. Student Dashboard
            self.driver.get(f"{BASE_URL}/student")
            self.take_screenshot("student-dashboard.png", "Student dashboard")
            
            # 8. Browse Projects
            try:
                self.driver.get(f"{BASE_URL}/projects")
                self.take_screenshot("browse-projects.png", "Browse available projects")
            except:
                print("⚠️  Projects browse page not accessible")
                
            # 9. Team Formation
            try:
                self.driver.get(f"{BASE_URL}/teams")
                self.take_screenshot("team-formation.png", "Team formation page")
            except:
                self.driver.get(f"{BASE_URL}/groups")
                self.take_screenshot("team-formation.png", "Team formation page")
                
            # 10. Team Chat
            try:
                self.driver.get(f"{BASE_URL}/chat")
                self.take_screenshot("team-chat.png", "Team chat interface")
            except:
                print("⚠️  Chat page not accessible")
                
            # 11. Video Call
            try:
                self.driver.get(f"{BASE_URL}/meeting")
                self.take_screenshot("video-call.png", "Video meeting interface")
            except:
                print("⚠️  Meeting page not accessible")
                
            # 12. Team Progress
            try:
                self.driver.get(f"{BASE_URL}/progress")
                self.take_screenshot("team-progress.png", "Team progress tracking")
            except:
                self.driver.get(f"{BASE_URL}/milestones")
                self.take_screenshot("team-progress.png", "Team progress tracking")
                
            # 13. Submit Checkpoint
            try:
                self.driver.get(f"{BASE_URL}/submissions")
                self.take_screenshot("submit-checkpoint.png", "Checkpoint submission")
            except:
                print("⚠️  Submissions page not accessible")
                
            # 14. View Grades
            try:
                self.driver.get(f"{BASE_URL}/grades")
                self.take_screenshot("view-grades.png", "View grades page")
            except:
                self.driver.get(f"{BASE_URL}/evaluations")
                self.take_screenshot("view-grades.png", "View grades page")
                
        self.logout()
        
        # PHASE 4: PEER REVIEW (as lecturer)
        print("\n" + "="*60)
        print("PHASE 4: EVALUATION VIEWS")
        print("="*60)
        
        if self.login("lecturer"):
            # 15. Grade Checkpoint
            try:
                self.driver.get(f"{BASE_URL}/lecturer/evaluations")
                self.take_screenshot("grade-checkpoint.png", "Grade checkpoint submissions")
            except:
                self.driver.get(f"{BASE_URL}/evaluations")
                self.take_screenshot("grade-checkpoint.png", "Grade checkpoint submissions")
                
            # 16. Peer Review Form
            try:
                self.driver.get(f"{BASE_URL}/peer-review")
                self.take_screenshot("peer-review-form.png", "Peer review form")
            except:
                print("⚠️  Peer review page not accessible")
                
            # 17. Aggregated Review
            try:
                self.driver.get(f"{BASE_URL}/peer-review/results")
                self.take_screenshot("peer-review-aggregated.png", "Aggregated peer review results")
            except:
                print("⚠️  Peer review results not accessible")
                
        self.logout()
        
        print("\n" + "="*60)
        print("CAPTURE COMPLETE!")
        print("="*60)
        
        # Verify screenshots
        if os.path.exists(SCREENSHOT_DIR):
            screenshots = [f for f in os.listdir(SCREENSHOT_DIR) if f.endswith('.png')]
            print(f"\n📊 Total screenshots: {len(screenshots)}/17")
            for ss in sorted(screenshots):
                print(f"  ✅ {ss}")
        
    def cleanup(self):
        """Close browser"""
        if self.driver:
            self.driver.quit()
            print("\n🧹 Browser closed")

def main():
    capture = None
    try:
        capture = SimpleCapture()
        capture.capture_all()
    except KeyboardInterrupt:
        print("\n\n⚠️  Interrupted by user")
    except Exception as e:
        print(f"\n\n❌ Error: {e}")
        import traceback
        traceback.print_exc()
    finally:
        if capture:
            capture.cleanup()

if __name__ == "__main__":
    main()
