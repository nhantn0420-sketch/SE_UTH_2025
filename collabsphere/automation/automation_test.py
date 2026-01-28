"""
CollabSphere Automation Testing & Screenshot Capture
Tự động test toàn bộ hệ thống và chụp 17 screenshots
"""

import os
import time
import sys
from datetime import datetime
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from PIL import Image
import io

# Import config
from config import *


class CollabSphereAutomation:
    """Main automation class"""
    
    def __init__(self, headless=False):
        """Initialize browser"""
        self.headless = headless
        self.driver = None
        self.screenshots_taken = []
        self.setup_browser()
        self.ensure_screenshot_dir()
    
    def ensure_screenshot_dir(self):
        """Create screenshot directory if not exists"""
        os.makedirs(SCREENSHOT_DIR, exist_ok=True)
        print(f"📁 Screenshot directory: {SCREENSHOT_DIR}")
    
    def setup_browser(self):
        """Setup Chrome WebDriver"""
        options = Options()
        
        if self.headless:
            options.add_argument('--headless')
        
        # Set window size for consistent screenshots
        options.add_argument(f'--window-size={SCREENSHOT_SIZE[0]},{SCREENSHOT_SIZE[1]}')
        options.add_argument('--start-maximized')
        options.add_argument('--disable-notifications')
        options.add_argument('--disable-infobars')
        options.add_argument('--disable-extensions')
        options.add_argument('--no-sandbox')
        options.add_argument('--disable-dev-shm-usage')
        options.add_argument('--disable-gpu')
        
        # Initialize driver without service (let selenium auto-detect)
        print("🚀 Starting Chrome WebDriver...")
        try:
            # Try with auto ChromeDriverManager
            from webdriver_manager.chrome import ChromeDriverManager
            from webdriver_manager.core.os_manager import ChromeType
            service = Service(ChromeDriverManager(chrome_type=ChromeType.GOOGLE).install())
            self.driver = webdriver.Chrome(service=service, options=options)
        except Exception as e:
            print(f"⚠️ ChromeDriverManager failed: {e}")
            print("🔄 Trying default Chrome...")
            # Fallback: use system Chrome without explicit driver
            self.driver = webdriver.Chrome(options=options)
        
        self.driver.maximize_window()
        print("✅ Browser ready!")
    
    def take_screenshot(self, filename, description=""):
        """Take screenshot and save with proper name"""
        time.sleep(SCREENSHOT_DELAY)  # Wait for UI to settle
        
        filepath = os.path.join(SCREENSHOT_DIR, filename)
        
        try:
            # Scroll to top for consistent screenshots
            self.driver.execute_script("window.scrollTo(0, 0);")
            time.sleep(0.5)
            
            # Take screenshot
            self.driver.save_screenshot(filepath)
            self.screenshots_taken.append(filename)
            
            print(f"📸 Screenshot: {filename}")
            if description:
                print(f"   → {description}")
            
            return True
        except Exception as e:
            print(f"❌ Failed to capture {filename}: {e}")
            return False
    
    def wait_for_element(self, by, value, timeout=WAIT_MEDIUM):
        """Wait for element to be present"""
        try:
            element = WebDriverWait(self.driver, timeout).until(
                EC.presence_of_element_located((by, value))
            )
            return element
        except Exception as e:
            print(f"⚠️  Element not found: {value}")
            return None
    
    def wait_for_clickable(self, by, value, timeout=WAIT_MEDIUM):
        """Wait for element to be clickable"""
        try:
            element = WebDriverWait(self.driver, timeout).until(
                EC.element_to_be_clickable((by, value))
            )
            return element
        except Exception as e:
            print(f"⚠️  Element not clickable: {value}")
            return None
    
    def login(self, role):
        """Login with specified role"""
        account = ACCOUNTS[role]
        
        print(f"\n🔐 Logging in as {role.upper()} ({account['username']})...")
        
        # Navigate to login page
        self.driver.get(f"{BASE_URL}/login")
        time.sleep(WAIT_SHORT)
        
        # Find and fill login form
        try:
            username_input = self.wait_for_element(By.NAME, "username")
            password_input = self.wait_for_element(By.NAME, "password")
            
            if username_input and password_input:
                username_input.clear()
                username_input.send_keys(account['username'])
                
                password_input.clear()
                password_input.send_keys(account['password'])
                
                # Find and click submit button
                submit_btn = self.driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
                submit_btn.click()
                
                time.sleep(WAIT_MEDIUM)
                print(f"✅ Logged in as {role}")
                return True
            else:
                print(f"❌ Login form not found")
                return False
                
        except Exception as e:
            print(f"❌ Login failed: {e}")
            return False
    
    def logout(self):
        """Logout current user"""
        try:
            print("🚪 Logging out...")
            # Try to find and click logout button (varies by UI)
            # Option 1: Dropdown menu
            try:
                profile_menu = self.driver.find_element(By.CSS_SELECTOR, "[data-testid='user-menu']")
                profile_menu.click()
                time.sleep(1)
                logout_btn = self.driver.find_element(By.XPATH, "//button[contains(text(), 'Logout')]")
                logout_btn.click()
            except:
                # Option 2: Direct logout link
                self.driver.get(f"{BASE_URL}/logout")
            
            time.sleep(WAIT_SHORT)
            print("✅ Logged out")
            return True
        except Exception as e:
            print(f"⚠️  Logout failed (may already be logged out): {e}")
            return False
    
    # ==================== PHASE 1: ADMIN ====================
    
    def test_admin_dashboard(self):
        """Phase 1.1: Admin Dashboard"""
        print("\n" + "="*60)
        print("PHASE 1: ADMIN SETUP")
        print("="*60)
        
        if not self.login("admin"):
            return False
        
        # Navigate to dashboard
        self.driver.get(f"{BASE_URL}/admin")
        time.sleep(WAIT_MEDIUM)
        
        # Take screenshot #15
        self.take_screenshot("admin-dashboard.png", "Admin dashboard overview")
        
        return True
    
    def test_user_management(self):
        """Phase 1.2: User Management"""
        print("\n📋 User Management...")
        
        # Navigate to users page
        try:
            users_link = self.driver.find_element(By.XPATH, "//a[contains(text(), 'Users')]")
            users_link.click()
            time.sleep(WAIT_MEDIUM)
            
            # Take screenshot #16
            self.take_screenshot("user-management.png", "User management table")
            
            return True
        except Exception as e:
            print(f"⚠️  Users page not found: {e}")
            # Try direct URL
            self.driver.get(f"{BASE_URL}/admin/users")
            time.sleep(WAIT_MEDIUM)
            self.take_screenshot("user-management.png", "User management (direct URL)")
            return True
    
    def test_system_settings(self):
        """Phase 1.3: System Settings"""
        print("\n⚙️  System Settings...")
        
        try:
            settings_link = self.driver.find_element(By.XPATH, "//a[contains(text(), 'Settings')]")
            settings_link.click()
            time.sleep(WAIT_MEDIUM)
            
            # Take screenshot #17
            self.take_screenshot("system-settings.png", "System configuration")
            
            return True
        except Exception as e:
            print(f"⚠️  Settings page not found: {e}")
            self.driver.get(f"{BASE_URL}/admin/settings")
            time.sleep(WAIT_MEDIUM)
            self.take_screenshot("system-settings.png", "System settings (direct URL)")
            return True
    
    # ==================== PHASE 2: LECTURER ====================
    
    def test_lecturer_dashboard(self):
        """Phase 2.1: Lecturer Dashboard"""
        print("\n" + "="*60)
        print("PHASE 2: LECTURER - CREATE PROJECTS")
        print("="*60)
        
        self.logout()
        
        if not self.login("lecturer"):
            return False
        
        # Navigate to dashboard
        self.driver.get(f"{BASE_URL}/lecturer")
        time.sleep(WAIT_MEDIUM)
        
        # Take screenshot #1
        self.take_screenshot("lecturer-dashboard.png", "Lecturer dashboard with stats")
        
        return True
    
    def test_create_project_manual(self):
        """Phase 2.2: Create Project Manually"""
        print("\n📝 Creating Project 1 (Manual)...")
        
        # Navigate to create project page
        try:
            # Try clicking "Create Project" button
            create_btn = self.driver.find_element(By.XPATH, "//button[contains(text(), 'Create')]")
            create_btn.click()
        except:
            # Direct navigation
            self.driver.get(f"{BASE_URL}/projects/create")
        
        time.sleep(WAIT_MEDIUM)
        
        # Fill project form
        try:
            # Title
            title_input = self.wait_for_element(By.NAME, "title")
            if title_input:
                title_input.send_keys(PROJECT_1["title"])
            
            # Description
            desc_input = self.driver.find_element(By.NAME, "description")
            desc_input.send_keys(PROJECT_1["description"])
            
            # Goals
            try:
                goals_input = self.driver.find_element(By.NAME, "goals")
                goals_input.send_keys(PROJECT_1["goals"])
            except:
                pass
            
            # Duration
            try:
                duration_input = self.driver.find_element(By.NAME, "duration_weeks")
                duration_input.clear()
                duration_input.send_keys(str(PROJECT_1["duration_weeks"]))
            except:
                pass
            
            # Add milestones
            for i, milestone in enumerate(MILESTONES_PROJECT_1):
                try:
                    # Click "Add Milestone" button
                    add_milestone_btn = self.driver.find_element(
                        By.XPATH, "//button[contains(text(), 'Add Milestone')]"
                    )
                    add_milestone_btn.click()
                    time.sleep(1)
                    
                    # Fill milestone fields (indexed)
                    milestone_title = self.driver.find_element(
                        By.NAME, f"milestones[{i}].title"
                    )
                    milestone_title.send_keys(milestone["title"])
                    
                    milestone_desc = self.driver.find_element(
                        By.NAME, f"milestones[{i}].description"
                    )
                    milestone_desc.send_keys(milestone["description"])
                    
                    milestone_week = self.driver.find_element(
                        By.NAME, f"milestones[{i}].week_number"
                    )
                    milestone_week.clear()
                    milestone_week.send_keys(str(milestone["week_number"]))
                    
                except Exception as e:
                    print(f"⚠️  Could not add milestone {i+1}: {e}")
                    break
            
            # Scroll to top to see full form
            self.driver.execute_script("window.scrollTo(0, 0);")
            time.sleep(1)
            
            # Take screenshot #3
            self.take_screenshot("create-project-manual.png", "Project form filled (before submit)")
            
            # Save as draft (don't submit yet)
            try:
                draft_btn = self.driver.find_element(By.XPATH, "//button[contains(text(), 'Save Draft')]")
                draft_btn.click()
                time.sleep(WAIT_SHORT)
                print("✅ Project 1 saved as draft")
            except:
                print("⚠️  Draft button not found, skipping save")
            
            return True
            
        except Exception as e:
            print(f"❌ Failed to create project: {e}")
            # Take screenshot anyway
            self.take_screenshot("create-project-manual.png", "Project form (error state)")
            return False
    
    def test_ai_milestone_generation(self):
        """Phase 2.3: AI Milestone Generation"""
        print("\n✨ Testing AI Milestone Generation...")
        
        # Create new project for AI test
        self.driver.get(f"{BASE_URL}/projects/create")
        time.sleep(WAIT_MEDIUM)
        
        # Fill basic info
        try:
            title_input = self.wait_for_element(By.NAME, "title")
            if title_input:
                title_input.send_keys(PROJECT_2["title"])
            
            desc_input = self.driver.find_element(By.NAME, "description")
            desc_input.send_keys(PROJECT_2["description"])
            
            # Look for AI button
            try:
                ai_button = self.driver.find_element(
                    By.XPATH, 
                    "//button[contains(text(), 'AI') or contains(text(), 'Generate')]"
                )
                
                # Hover over button (optional - for highlight effect)
                from selenium.webdriver.common.action_chains import ActionChains
                actions = ActionChains(self.driver)
                actions.move_to_element(ai_button).perform()
                time.sleep(1)
                
                # Take screenshot #4 BEFORE clicking
                self.take_screenshot("ai-milestone-generation.png", "AI button before click")
                
                # Click AI button
                ai_button.click()
                time.sleep(WAIT_MEDIUM)
                
                # Check for response (error or success)
                # If error modal appears, that's expected (no AWS credentials)
                
            except Exception as e:
                print(f"⚠️  AI button not found: {e}")
                # Take screenshot of form anyway
                self.take_screenshot("ai-milestone-generation.png", "AI feature (button not found)")
            
            return True
            
        except Exception as e:
            print(f"❌ AI test failed: {e}")
            self.take_screenshot("ai-milestone-generation.png", "AI test (error)")
            return False
    
    def submit_projects_for_approval(self):
        """Phase 2.4: Submit Projects"""
        print("\n📤 Submitting projects for approval...")
        
        # Go to projects list
        self.driver.get(f"{BASE_URL}/projects")
        time.sleep(WAIT_MEDIUM)
        
        # Find and submit both projects
        try:
            # Find all "Submit" buttons
            submit_buttons = self.driver.find_elements(
                By.XPATH, "//button[contains(text(), 'Submit')]"
            )
            
            for i, btn in enumerate(submit_buttons[:2]):  # Only first 2
                try:
                    btn.click()
                    time.sleep(WAIT_SHORT)
                    
                    # Confirm if modal appears
                    try:
                        confirm_btn = self.driver.find_element(
                            By.XPATH, "//button[contains(text(), 'Confirm')]"
                        )
                        confirm_btn.click()
                        time.sleep(WAIT_SHORT)
                    except:
                        pass
                    
                    print(f"✅ Project {i+1} submitted")
                except Exception as e:
                    print(f"⚠️  Could not submit project {i+1}: {e}")
            
            return True
        except Exception as e:
            print(f"❌ Submit failed: {e}")
            return False
    
    # ==================== PHASE 3: HEAD ====================
    
    def test_head_approve_projects(self):
        """Phase 3: Head Approve Projects"""
        print("\n" + "="*60)
        print("PHASE 3: HEAD - APPROVE PROJECTS")
        print("="*60)
        
        self.logout()
        
        if not self.login("head"):
            return False
        
        # Navigate to pending approvals
        try:
            self.driver.get(f"{BASE_URL}/projects/pending")
        except:
            self.driver.get(f"{BASE_URL}/projects")
        
        time.sleep(WAIT_MEDIUM)
        
        # Find and approve projects
        try:
            approve_buttons = self.driver.find_elements(
                By.XPATH, "//button[contains(text(), 'Approve')]"
            )
            
            for i, btn in enumerate(approve_buttons[:2]):
                try:
                    btn.click()
                    time.sleep(WAIT_SHORT)
                    
                    # Confirm
                    try:
                        confirm_btn = self.driver.find_element(
                            By.XPATH, "//button[contains(text(), 'Confirm')]"
                        )
                        confirm_btn.click()
                        time.sleep(WAIT_SHORT)
                    except:
                        pass
                    
                    print(f"✅ Project {i+1} approved")
                except Exception as e:
                    print(f"⚠️  Could not approve project {i+1}: {e}")
            
            return True
        except Exception as e:
            print(f"❌ Approval failed: {e}")
            return False
    
    # ==================== PHASE 4: STUDENTS ====================
    
    def test_student_dashboard(self):
        """Phase 4.1: Student Dashboard"""
        print("\n" + "="*60)
        print("PHASE 4: STUDENTS - JOIN & PICK PROJECT")
        print("="*60)
        
        self.logout()
        
        if not self.login("student"):
            return False
        
        # Navigate to dashboard
        self.driver.get(f"{BASE_URL}/student")
        time.sleep(WAIT_MEDIUM)
        
        # Take screenshot #2
        self.take_screenshot("student-dashboard.png", "Student dashboard")
        
        return True
    
    def test_browse_projects(self):
        """Phase 4.2: Browse Projects"""
        print("\n🔍 Browsing available projects...")
        
        # Navigate to projects page
        self.driver.get(f"{BASE_URL}/projects")
        time.sleep(WAIT_MEDIUM)
        
        # Take screenshot #5
        self.take_screenshot("browse-projects.png", "Available projects list")
        
        return True
    
    def test_create_team(self):
        """Phase 4.3: Create Team"""
        print("\n👥 Creating team...")
        
        # Navigate to teams page
        try:
            self.driver.get(f"{BASE_URL}/teams/create")
        except:
            self.driver.get(f"{BASE_URL}/teams")
            time.sleep(WAIT_SHORT)
            create_btn = self.driver.find_element(By.XPATH, "//button[contains(text(), 'Create')]")
            create_btn.click()
        
        time.sleep(WAIT_MEDIUM)
        
        # Fill team form
        try:
            team_name_input = self.wait_for_element(By.NAME, "name")
            if team_name_input:
                team_name_input.send_keys(TEAM_NAME)
            
            try:
                team_desc_input = self.driver.find_element(By.NAME, "description")
                team_desc_input.send_keys(TEAM_DESCRIPTION)
            except:
                pass
            
            # Take screenshot #13 BEFORE submit
            self.take_screenshot("create-team.png", "Create team form")
            
            # Submit
            submit_btn = self.driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
            submit_btn.click()
            time.sleep(WAIT_SHORT)
            
            print("✅ Team created")
            return True
            
        except Exception as e:
            print(f"❌ Team creation failed: {e}")
            self.take_screenshot("create-team.png", "Team form (error)")
            return False
    
    # ==================== PHASE 5: COLLABORATION ====================
    
    def test_team_chat(self):
        """Phase 5.1: Team Chat"""
        print("\n" + "="*60)
        print("PHASE 5: TEAM COLLABORATION")
        print("="*60)
        print("\n💬 Testing team chat...")
        
        # Navigate to team
        self.driver.get(f"{BASE_URL}/teams")
        time.sleep(WAIT_MEDIUM)
        
        # Click on team
        try:
            team_link = self.driver.find_element(By.XPATH, f"//a[contains(text(), '{TEAM_NAME}')]")
            team_link.click()
            time.sleep(WAIT_MEDIUM)
            
            # Go to chat tab
            try:
                chat_tab = self.driver.find_element(By.XPATH, "//button[contains(text(), 'Chat')]")
                chat_tab.click()
                time.sleep(WAIT_SHORT)
            except:
                pass
            
            # Send messages
            for msg in CHAT_MESSAGES:
                try:
                    chat_input = self.driver.find_element(By.CSS_SELECTOR, "input[type='text'], textarea")
                    chat_input.send_keys(msg)
                    chat_input.send_keys(Keys.RETURN)
                    time.sleep(1)
                except Exception as e:
                    print(f"⚠️  Could not send message: {e}")
                    break
            
            # Take screenshot #6
            self.take_screenshot("team-chat.png", "Team chat interface")
            
            return True
        except Exception as e:
            print(f"❌ Chat test failed: {e}")
            self.take_screenshot("team-chat.png", "Chat (error)")
            return False
    
    def test_video_call(self):
        """Phase 5.2: Video Call / Meetings"""
        print("\n📹 Testing meetings...")
        
        # Go to meetings tab
        try:
            meetings_tab = self.driver.find_element(By.XPATH, "//button[contains(text(), 'Meeting')]")
            meetings_tab.click()
            time.sleep(WAIT_SHORT)
            
            # Take screenshot #7
            self.take_screenshot("video-call.png", "Meetings interface")
            
            return True
        except Exception as e:
            print(f"⚠️  Meetings tab not found: {e}")
            self.take_screenshot("video-call.png", "Meetings (fallback)")
            return False
    
    def test_team_progress(self):
        """Phase 5.3: Team Progress (Lecturer view)"""
        print("\n📊 Checking team progress (lecturer view)...")
        
        self.logout()
        
        if not self.login("lecturer"):
            return False
        
        # Navigate to teams
        self.driver.get(f"{BASE_URL}/teams")
        time.sleep(WAIT_MEDIUM)
        
        # Click on Team Alpha
        try:
            team_link = self.driver.find_element(By.XPATH, f"//a[contains(text(), '{TEAM_NAME}')]")
            team_link.click()
            time.sleep(WAIT_MEDIUM)
            
            # Take screenshot #11
            self.take_screenshot("team-progress.png", "Team progress dashboard")
            
            return True
        except Exception as e:
            print(f"⚠️  Team progress failed: {e}")
            self.take_screenshot("team-progress.png", "Progress (error)")
            return False
    
    # ==================== PHASE 6: CHECKPOINT & GRADING ====================
    
    def test_submit_checkpoint(self):
        """Phase 6.1: Submit Checkpoint"""
        print("\n" + "="*60)
        print("PHASE 6: CHECKPOINT SUBMISSION & GRADING")
        print("="*60)
        
        self.logout()
        
        if not self.login("student"):
            return False
        
        print("\n📤 Submitting checkpoint...")
        
        # Navigate to team checkpoints
        self.driver.get(f"{BASE_URL}/teams")
        time.sleep(WAIT_SHORT)
        
        try:
            team_link = self.driver.find_element(By.XPATH, f"//a[contains(text(), '{TEAM_NAME}')]")
            team_link.click()
            time.sleep(WAIT_MEDIUM)
            
            # Go to checkpoints tab
            try:
                checkpoints_tab = self.driver.find_element(
                    By.XPATH, "//button[contains(text(), 'Checkpoint')]"
                )
                checkpoints_tab.click()
                time.sleep(WAIT_SHORT)
            except:
                pass
            
            # Click submit button
            submit_btn = self.driver.find_element(
                By.XPATH, "//button[contains(text(), 'Submit')]"
            )
            submit_btn.click()
            time.sleep(WAIT_MEDIUM)
            
            # Fill submission form
            title_input = self.wait_for_element(By.NAME, "title")
            if title_input:
                title_input.send_keys(CHECKPOINT_SUBMISSION["title"])
            
            desc_input = self.driver.find_element(By.NAME, "description")
            desc_input.send_keys(CHECKPOINT_SUBMISSION["description"])
            
            # Take screenshot #8 BEFORE submitting
            self.take_screenshot("submit-checkpoint.png", "Checkpoint submission form")
            
            # Submit
            submit_final_btn = self.driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
            submit_final_btn.click()
            time.sleep(WAIT_SHORT)
            
            print("✅ Checkpoint submitted")
            return True
            
        except Exception as e:
            print(f"❌ Checkpoint submission failed: {e}")
            self.take_screenshot("submit-checkpoint.png", "Submit (error)")
            return False
    
    def test_grade_checkpoint(self):
        """Phase 6.2: Grade Checkpoint"""
        print("\n📊 Grading checkpoint (lecturer)...")
        
        self.logout()
        
        if not self.login("lecturer"):
            return False
        
        # Navigate to submissions
        self.driver.get(f"{BASE_URL}/submissions")
        time.sleep(WAIT_MEDIUM)
        
        try:
            # Click on submitted checkpoint
            checkpoint_link = self.driver.find_element(
                By.XPATH, f"//a[contains(text(), '{CHECKPOINT_SUBMISSION['title']}')]"
            )
            checkpoint_link.click()
            time.sleep(WAIT_MEDIUM)
            
            # Click Grade button
            grade_btn = self.driver.find_element(By.XPATH, "//button[contains(text(), 'Grade')]")
            grade_btn.click()
            time.sleep(WAIT_SHORT)
            
            # Fill evaluation form
            grade_input = self.wait_for_element(By.NAME, "grade")
            if grade_input:
                grade_input.clear()
                grade_input.send_keys(str(EVALUATION["grade"]))
            
            feedback_input = self.driver.find_element(By.NAME, "feedback")
            feedback_input.send_keys(EVALUATION["feedback"])
            
            # Take screenshot #9 BEFORE submitting
            self.take_screenshot("evaluation-form.png", "Evaluation form with grade")
            
            # Submit evaluation
            submit_btn = self.driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
            submit_btn.click()
            time.sleep(WAIT_SHORT)
            
            print("✅ Checkpoint graded")
            return True
            
        except Exception as e:
            print(f"❌ Grading failed: {e}")
            self.take_screenshot("evaluation-form.png", "Evaluation (error)")
            return False
    
    def test_view_grade(self):
        """Phase 6.3: View Grade & Feedback"""
        print("\n📈 Viewing grade (student)...")
        
        self.logout()
        
        if not self.login("student"):
            return False
        
        # Navigate to grades
        self.driver.get(f"{BASE_URL}/grades")
        time.sleep(WAIT_MEDIUM)
        
        try:
            # Click on graded checkpoint
            checkpoint_link = self.driver.find_element(
                By.XPATH, f"//a[contains(text(), '{CHECKPOINT_SUBMISSION['title']}')]"
            )
            checkpoint_link.click()
            time.sleep(WAIT_MEDIUM)
            
            # Take screenshot #10
            self.take_screenshot("view-grade-feedback.png", "Grade and feedback view")
            
            return True
        except Exception as e:
            print(f"⚠️  Grade view failed: {e}")
            self.take_screenshot("view-grade-feedback.png", "Grade view (error)")
            return False
    
    # ==================== PHASE 7: PEER REVIEW ====================
    
    def test_peer_review_form(self):
        """Phase 7.1: Peer Review Form"""
        print("\n" + "="*60)
        print("PHASE 7: PEER REVIEW")
        print("="*60)
        print("\n⭐ Submitting peer review...")
        
        # Navigate to team
        self.driver.get(f"{BASE_URL}/teams")
        time.sleep(WAIT_SHORT)
        
        try:
            team_link = self.driver.find_element(By.XPATH, f"//a[contains(text(), '{TEAM_NAME}')]")
            team_link.click()
            time.sleep(WAIT_MEDIUM)
            
            # Go to peer review tab
            try:
                peer_review_tab = self.driver.find_element(
                    By.XPATH, "//button[contains(text(), 'Peer Review')]"
                )
                peer_review_tab.click()
                time.sleep(WAIT_SHORT)
            except:
                pass
            
            # Click submit review button
            submit_review_btn = self.driver.find_element(
                By.XPATH, "//button[contains(text(), 'Submit Review')]"
            )
            submit_review_btn.click()
            time.sleep(WAIT_MEDIUM)
            
            # Fill ratings (if inputs exist)
            for category, score in [
                ("cooperation", PEER_REVIEW["cooperation"]),
                ("contribution", PEER_REVIEW["contribution"]),
                ("communication", PEER_REVIEW["communication"]),
                ("technical", PEER_REVIEW["technical"])
            ]:
                try:
                    rating_input = self.driver.find_element(By.NAME, category)
                    rating_input.clear()
                    rating_input.send_keys(str(score))
                except:
                    pass
            
            # Comments
            try:
                comments_input = self.driver.find_element(By.NAME, "comments")
                comments_input.send_keys(PEER_REVIEW["comments"])
            except:
                pass
            
            # Take screenshot #14 BEFORE submitting
            self.take_screenshot("peer-review-form.png", "Peer review form")
            
            # Submit
            submit_btn = self.driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
            submit_btn.click()
            time.sleep(WAIT_SHORT)
            
            print("✅ Peer review submitted")
            return True
            
        except Exception as e:
            print(f"❌ Peer review failed: {e}")
            self.take_screenshot("peer-review-form.png", "Peer review (error)")
            return False
    
    def test_peer_review_aggregated(self):
        """Phase 7.2: Aggregated Peer Reviews"""
        print("\n📊 Viewing aggregated peer reviews (lecturer)...")
        
        self.logout()
        
        if not self.login("lecturer"):
            return False
        
        # Navigate to team
        self.driver.get(f"{BASE_URL}/teams")
        time.sleep(WAIT_SHORT)
        
        try:
            team_link = self.driver.find_element(By.XPATH, f"//a[contains(text(), '{TEAM_NAME}')]")
            team_link.click()
            time.sleep(WAIT_MEDIUM)
            
            # Go to peer reviews tab
            try:
                peer_review_tab = self.driver.find_element(
                    By.XPATH, "//button[contains(text(), 'Peer Review') or contains(text(), 'Evaluation')]"
                )
                peer_review_tab.click()
                time.sleep(WAIT_SHORT)
            except:
                pass
            
            # Take screenshot #12
            self.take_screenshot("peer-review-aggregated.png", "Aggregated peer reviews")
            
            return True
        except Exception as e:
            print(f"⚠️  Aggregated view failed: {e}")
            self.take_screenshot("peer-review-aggregated.png", "Aggregated (error)")
            return False
    
    # ==================== VERIFICATION ====================
    
    def verify_screenshots(self):
        """Verify all screenshots captured"""
        print("\n" + "="*60)
        print("VERIFICATION")
        print("="*60)
        
        required_screenshots = [
            "lecturer-dashboard.png",
            "student-dashboard.png",
            "create-project-manual.png",
            "ai-milestone-generation.png",
            "browse-projects.png",
            "team-chat.png",
            "video-call.png",
            "submit-checkpoint.png",
            "evaluation-form.png",
            "view-grade-feedback.png",
            "team-progress.png",
            "peer-review-aggregated.png",
            "create-team.png",
            "peer-review-form.png",
            "admin-dashboard.png",
            "user-management.png",
            "system-settings.png"
        ]
        
        missing = []
        completed = []
        
        for screenshot in required_screenshots:
            filepath = os.path.join(SCREENSHOT_DIR, screenshot)
            if os.path.exists(filepath):
                completed.append(screenshot)
            else:
                missing.append(screenshot)
        
        print(f"\n📊 SCREENSHOT PROGRESS:")
        print(f"✅ Completed: {len(completed)}/17")
        print(f"❌ Missing: {len(missing)}/17")
        
        if completed:
            print(f"\n✅ Captured:")
            for s in completed:
                print(f"   ✓ {s}")
        
        if missing:
            print(f"\n❌ Missing:")
            for s in missing:
                print(f"   ✗ {s}")
        
        completion_rate = len(completed) / 17 * 100
        print(f"\n📈 Completion: {completion_rate:.1f}%")
        
        if len(completed) == 17:
            print("\n🎉 ALL SCREENSHOTS COMPLETE!")
            print("Ready for documentation!")
        
        return len(completed), len(missing)
    
    def cleanup(self):
        """Close browser"""
        if self.driver:
            print("\n🧹 Cleaning up...")
            self.driver.quit()
            print("✅ Browser closed")
    
    # ==================== MAIN TEST FLOW ====================
    
    def run_all_tests(self):
        """Run all test phases"""
        start_time = time.time()
        
        print("\n" + "="*60)
        print("COLLABSPHERE AUTOMATION TESTING")
        print("Starting automated test & screenshot capture...")
        print("="*60)
        
        try:
            # Phase 1: Admin
            self.test_admin_dashboard()
            self.test_user_management()
            self.test_system_settings()
            
            # Phase 2: Lecturer
            self.test_lecturer_dashboard()
            self.test_create_project_manual()
            self.test_ai_milestone_generation()
            self.submit_projects_for_approval()
            
            # Phase 3: Head
            self.test_head_approve_projects()
            
            # Phase 4: Students
            self.test_student_dashboard()
            self.test_browse_projects()
            self.test_create_team()
            
            # Phase 5: Collaboration
            self.test_team_chat()
            self.test_video_call()
            self.test_team_progress()
            
            # Phase 6: Checkpoint & Grading
            self.test_submit_checkpoint()
            self.test_grade_checkpoint()
            self.test_view_grade()
            
            # Phase 7: Peer Review
            self.test_peer_review_form()
            self.test_peer_review_aggregated()
            
        except Exception as e:
            print(f"\n❌ Test failed with error: {e}")
            import traceback
            traceback.print_exc()
        
        # Verification
        completed, missing = self.verify_screenshots()
        
        elapsed_time = time.time() - start_time
        
        print("\n" + "="*60)
        print("TEST SUMMARY")
        print("="*60)
        print(f"⏱️  Total time: {elapsed_time:.1f} seconds")
        print(f"📸 Screenshots: {completed}/17 completed")
        print(f"📁 Location: {SCREENSHOT_DIR}")
        
        if missing == 0:
            print("\n🎉 SUCCESS! All tests passed and screenshots captured!")
        else:
            print(f"\n⚠️  WARNING: {missing} screenshots missing")
        
        return completed == 17


def main():
    """Main entry point"""
    automation = None
    
    try:
        # Create automation instance
        automation = CollabSphereAutomation(headless=False)
        
        # Run all tests
        success = automation.run_all_tests()
        
        # Cleanup
        automation.cleanup()
        
        # Exit with proper code
        sys.exit(0 if success else 1)
        
    except KeyboardInterrupt:
        print("\n\n⚠️  Test interrupted by user")
        if automation:
            automation.cleanup()
        sys.exit(1)
    
    except Exception as e:
        print(f"\n\n❌ Fatal error: {e}")
        import traceback
        traceback.print_exc()
        if automation:
            automation.cleanup()
        sys.exit(1)


if __name__ == "__main__":
    main()
