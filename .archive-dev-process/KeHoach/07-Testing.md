# Giai Đoạn 7: Testing, Integration và Debugging

**Thời gian**: 2 tuần  
**Mục tiêu**: Đảm bảo hệ thống hoạt động ổn định, không có bug critical, và đạt code coverage >80%

## Nhiệm Vụ Chính

### 7.1. Backend Unit Testing

#### A. Setup Testing Framework

```bash
# Install testing libraries
pip install pytest==7.4.3
pip install pytest-asyncio==0.21.1
pip install httpx==0.25.2  # For testing FastAPI
pip install pytest-cov==4.1.0  # Code coverage
```

#### B. Test Configuration

**`app/tests/conftest.py`**:
```python
import pytest
from fastapi.testclient import TestClient
from sqlmodel import Session, create_engine, SQLModel
from sqlmodel.pool import StaticPool
from app.main import app
from app.database import get_session
from app.models.user import User, UserRole
from app.utils.security import get_password_hash

# Create in-memory SQLite for testing
@pytest.fixture(name="session")
def session_fixture():
    engine = create_engine(
        "sqlite:///:memory:",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    SQLModel.metadata.create_all(engine)
    with Session(engine) as session:
        yield session

@pytest.fixture(name="client")
def client_fixture(session: Session):
    def get_session_override():
        return session
    
    app.dependency_overrides[get_session] = get_session_override
    client = TestClient(app)
    yield client
    app.dependency_overrides.clear()

@pytest.fixture(name="test_user")
def test_user_fixture(session: Session):
    user = User(
        username="testuser",
        email="test@example.com",
        hashed_password=get_password_hash("password123"),
        full_name="Test User",
        role=UserRole.STUDENT
    )
    session.add(user)
    session.commit()
    session.refresh(user)
    return user

@pytest.fixture(name="test_lecturer")
def test_lecturer_fixture(session: Session):
    lecturer = User(
        username="lecturer1",
        email="lecturer@example.com",
        hashed_password=get_password_hash("password123"),
        full_name="Test Lecturer",
        role=UserRole.LECTURER
    )
    session.add(lecturer)
    session.commit()
    session.refresh(lecturer)
    return lecturer

@pytest.fixture(name="auth_token")
def auth_token_fixture(client: TestClient):
    response = client.post(
        "/api/v1/auth/login",
        data={"username": "testuser", "password": "password123"}
    )
    return response.json()["access_token"]
```

#### C. Authentication Tests

**`app/tests/test_auth.py`**:
```python
from fastapi.testclient import TestClient
from app.models.user import User

def test_register(client: TestClient):
    response = client.post(
        "/api/v1/auth/register",
        json={
            "username": "newuser",
            "email": "newuser@example.com",
            "password": "password123",
            "full_name": "New User",
            "role": "student"
        }
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"

def test_login(client: TestClient, test_user: User):
    response = client.post(
        "/api/v1/auth/login",
        data={"username": "testuser", "password": "password123"}
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data

def test_login_wrong_password(client: TestClient, test_user: User):
    response = client.post(
        "/api/v1/auth/login",
        data={"username": "testuser", "password": "wrongpassword"}
    )
    assert response.status_code == 401

def test_get_current_user(client: TestClient, test_user: User, auth_token: str):
    response = client.get(
        "/api/v1/auth/me",
        headers={"Authorization": f"Bearer {auth_token}"}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["username"] == "testuser"
```

#### D. Project Management Tests

**`app/tests/test_projects.py`**:
```python
from fastapi.testclient import TestClient
from app.models.user import User

def test_create_project(client: TestClient, test_lecturer: User):
    # Login as lecturer
    login_response = client.post(
        "/api/v1/auth/login",
        data={"username": "lecturer1", "password": "password123"}
    )
    token = login_response.json()["access_token"]
    
    # Create project
    response = client.post(
        "/api/v1/projects/",
        json={
            "title": "Test Project",
            "description": "Test description",
            "goals": "Test goals",
            "milestones_json": "[]"
        },
        headers={"Authorization": f"Bearer {token}"}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "Test Project"
    assert data["status"] == "draft"

def test_submit_project(client: TestClient, test_lecturer: User):
    # Create and submit project
    # ... implementation

def test_approve_project(client: TestClient):
    # Test approval workflow
    # ... implementation
```

#### E. Group Management Tests

**`app/tests/test_groups.py`**:
```python
def test_create_group(client: TestClient, test_lecturer: User):
    # Test group creation
    pass

def test_add_member_to_group(client: TestClient):
    # Test adding members
    pass

def test_track_group_progress(client: TestClient):
    # Test progress tracking
    pass

def test_mark_milestone_complete(client: TestClient, test_user: User):
    # Test milestone completion
    pass
```

### 7.2. Frontend Testing

#### A. Setup Jest and React Testing Library

```bash
npm install --save-dev @testing-library/react
npm install --save-dev @testing-library/jest-dom
npm install --save-dev @testing-library/user-event
```

#### B. Component Tests

**`src/components/Auth/Login.test.js`**:
```javascript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';
import { AuthProvider } from '../../context/AuthContext';

const MockLogin = () => (
  <BrowserRouter>
    <AuthProvider>
      <Login />
    </AuthProvider>
  </BrowserRouter>
);

describe('Login Component', () => {
  test('renders login form', () => {
    render(<MockLogin />);
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('shows error on invalid credentials', async () => {
    render(<MockLogin />);
    
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'wronguser' }
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'wrongpass' }
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/invalid username or password/i)).toBeInTheDocument();
    });
  });
});
```

**`src/components/Lecturer/ProjectCreate.test.js`**:
```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import ProjectCreate from './ProjectCreate';

describe('ProjectCreate Component', () => {
  test('renders project creation form', () => {
    render(<ProjectCreate />);
    expect(screen.getByLabelText(/project title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
  });

  test('AI button generates milestones', async () => {
    render(<ProjectCreate />);
    const aiButton = screen.getByText(/generate milestones with ai/i);
    fireEvent.click(aiButton);
    
    // Mock AI response and verify
  });
});
```

### 7.3. Integration Testing (E2E)

#### A. Setup Cypress

```bash
npm install --save-dev cypress
npx cypress open
```

#### B. E2E Test Scenarios

**`cypress/e2e/project_workflow.cy.js`**:
```javascript
describe('Complete Project Workflow', () => {
  beforeEach(() => {
    // Reset database and seed test data
    cy.exec('python scripts/reset_test_db.py');
  });

  it('should complete full project lifecycle', () => {
    // 1. Login as lecturer
    cy.visit('http://localhost:3000/login');
    cy.get('input[name="username"]').type('lecturer1');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');

    // 2. Create project
    cy.contains('Create Project').click();
    cy.get('input[name="title"]').type('E-commerce Website');
    cy.get('textarea[name="description"]').type('Build online shopping platform');
    cy.contains('Generate Milestones with AI').click();
    cy.wait(3000); // Wait for AI
    cy.contains('Create Project').click();
    cy.contains('Project created successfully').should('be.visible');

    // 3. Submit for approval
    cy.contains('Submit for Approval').click();
    cy.contains('Project submitted').should('be.visible');

    // 4. Login as department head
    cy.contains('Logout').click();
    cy.get('input[name="username"]').type('head1');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    // 5. Approve project
    cy.contains('Pending Projects').click();
    cy.contains('E-commerce Website').parent().contains('Approve').click();
    cy.contains('Project approved').should('be.visible');

    // 6. Assign to class
    cy.contains('Assign to Class').click();
    cy.get('select[name="class_id"]').select('CS101');
    cy.contains('Assign').click();

    // 7. Login as student
    cy.contains('Logout').click();
    cy.get('input[name="username"]').type('student1');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    // 8. View assigned project
    cy.contains('My Groups').click();
    cy.contains('E-commerce Website').should('be.visible');

    // 9. Mark milestone complete
    cy.contains('Mark Complete').click();
    cy.contains('Milestone completed').should('be.visible');
  });
});
```

**`cypress/e2e/collaboration.cy.js`**:
```javascript
describe('Collaboration Features', () => {
  it('should allow real-time chat', () => {
    // Login and join group chat
    cy.visit('http://localhost:3000/login');
    cy.login('student1', 'password123');
    cy.visit('/groups/1/workspace');
    
    // Send message
    cy.get('input[placeholder="Type a message..."]').type('Hello team!');
    cy.get('button[aria-label="Send"]').click();
    cy.contains('Hello team!').should('be.visible');
  });

  it('should sync whiteboard drawing', () => {
    cy.visit('/groups/1/workspace');
    cy.contains('Whiteboard').click();
    
    // Test drawing (may need custom commands)
    cy.get('canvas').trigger('mousedown', { which: 1 });
    cy.get('canvas').trigger('mousemove', { clientX: 100, clientY: 100 });
    cy.get('canvas').trigger('mouseup');
  });
});
```

### 7.4. Load Testing

#### A. Setup Locust

**Install**:
```bash
pip install locust
```

**`locustfile.py`**:
```python
from locust import HttpUser, task, between

class CollabSphereUser(HttpUser):
    wait_time = between(1, 3)
    
    def on_start(self):
        # Login
        response = self.client.post("/api/v1/auth/login", data={
            "username": "testuser",
            "password": "password123"
        })
        self.token = response.json()["access_token"]
        self.headers = {"Authorization": f"Bearer {self.token}"}
    
    @task(3)
    def view_projects(self):
        self.client.get("/api/v1/projects/", headers=self.headers)
    
    @task(2)
    def view_groups(self):
        self.client.get("/api/v1/groups/1", headers=self.headers)
    
    @task(1)
    def create_project(self):
        self.client.post("/api/v1/projects/", json={
            "title": "Load Test Project",
            "description": "Testing",
            "goals": "Performance",
            "milestones_json": "[]"
        }, headers=self.headers)
```

**Run load test**:
```bash
locust -f locustfile.py --host=http://localhost:8000
# Open browser: http://localhost:8089
# Configure users: 100 users, spawn rate: 10/sec
```

### 7.5. Code Coverage

#### A. Backend Coverage

```bash
# Run tests with coverage
pytest --cov=app --cov-report=html

# View report
# Open htmlcov/index.html in browser

# Target: >80% coverage
```

#### B. Frontend Coverage

```bash
# Run tests with coverage
npm test -- --coverage --watchAll=false

# View report
# Open coverage/lcov-report/index.html
```

### 7.6. Common Bug Fixes

#### A. Race Conditions in Real-time

**Problem**: Messages arrive out of order in chat  
**Solution**:
```python
# Add timestamp and sequence number
class ChatMessage(SQLModel, table=True):
    sequence: int = Field(default=0)
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    
# Sort by sequence on client
messages.sort((a, b) => a.sequence - b.sequence);
```

#### B. Memory Leaks in WebRTC

**Problem**: Peer connections not cleaned up  
**Solution**:
```javascript
useEffect(() => {
  return () => {
    // Cleanup on unmount
    peersRef.current.forEach(({ peer }) => {
      peer.destroy();
    });
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
    }
  };
}, []);
```

#### C. CORS Issues

**Problem**: Frontend can't connect to Socket.IO  
**Solution**:
```python
# In backend
sio = socketio.AsyncServer(
    async_mode='asgi',
    cors_allowed_origins=['http://localhost:3000']  # Specific origin
)
```

### 7.7. Performance Optimization

#### A. Database Query Optimization

```python
# Bad: N+1 queries
groups = session.exec(select(Group)).all()
for group in groups:
    members = session.exec(select(GroupMember).where(GroupMember.group_id == group.id)).all()

# Good: Join query
from sqlmodel import select
statement = select(Group, GroupMember).join(GroupMember).where(Group.id == group_id)
results = session.exec(statement).all()
```

#### B. Frontend Performance

```javascript
// Use React.memo for expensive components
const ExpensiveComponent = React.memo(({ data }) => {
  // Component logic
});

// Lazy load routes
const AdminDashboard = React.lazy(() => import('./components/Admin/Dashboard'));

// Use in Router
<Suspense fallback={<Loading />}>
  <AdminDashboard />
</Suspense>
```

### 7.8. Security Testing

#### A. Penetration Testing Checklist

- [ ] SQL Injection: Test with `' OR '1'='1` in inputs
- [ ] XSS: Test with `<script>alert('XSS')</script>`
- [ ] CSRF: Verify CSRF tokens
- [ ] Authentication: Try accessing protected routes without token
- [ ] Authorization: Try accessing admin routes as student
- [ ] File Upload: Try uploading malicious files
- [ ] Rate Limiting: Send 1000 requests rapidly

#### B. Security Fixes

```python
# Input sanitization
from pydantic import validator

class ProjectCreate(BaseModel):
    title: str
    description: str
    
    @validator('title', 'description')
    def sanitize_html(cls, v):
        import bleach
        return bleach.clean(v)
```

## Deliverables Giai Đoạn 7

- [ ] Backend unit tests (>80% coverage)
- [ ] Frontend component tests
- [ ] E2E tests với Cypress (10+ scenarios)
- [ ] Load testing results (support 100+ concurrent users)
- [ ] Performance optimization report
- [ ] Security audit report
- [ ] Bug tracking và resolution (0 critical bugs)
- [ ] Code coverage reports

## Testing Checklist

### Functional Testing
- [ ] All CRUD operations work
- [ ] File upload/download works
- [ ] Authentication và authorization correct
- [ ] Real-time features sync properly
- [ ] Notifications sent correctly
- [ ] AI features respond

### Non-functional Testing
- [ ] Page load time <3s
- [ ] API response time <2s
- [ ] Real-time latency <1s
- [ ] Support 500+ concurrent users
- [ ] Mobile responsive
- [ ] Browser compatibility (Chrome, Firefox, Safari, Edge)

## Next Steps

Chuyển sang `08-Deployment.md` để deploy lên production.
