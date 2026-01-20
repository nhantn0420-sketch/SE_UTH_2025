# SECTION VI: RELEASE PACKAGE & USER GUIDES

**CollabSphere - Project-Based Learning Management System**

---

**Document Version**: 1.0  
**Last Updated**: January 20, 2026  
**Status**: Final

---

## TABLE OF CONTENTS

- [6.1. Deliverable Package](#61-deliverable-package)
  - [6.1.1. Software Components](#611-software-components)
  - [6.1.2. Documentation](#612-documentation)
  - [6.1.3. Source Code](#613-source-code)
  - [6.1.4. Deployment Artifacts](#614-deployment-artifacts)
- [6.2. Installation Guides](#62-installation-guides)
  - [6.2.1. System Requirements](#621-system-requirements)
  - [6.2.2. Docker Installation (Recommended)](#622-docker-installation-recommended)
  - [6.2.3. Manual Installation](#623-manual-installation)
  - [6.2.4. Configuration](#624-configuration)
  - [6.2.5. Troubleshooting](#625-troubleshooting)
- [6.3. User Manual](#63-user-manual)
  - [6.3.1. Lecturer Guide](#631-lecturer-guide)
  - [6.3.2. Student Guide](#632-student-guide)
  - [6.3.3. Admin Guide](#633-admin-guide)

---

## 6.1. DELIVERABLE PACKAGE

### 6.1.1. Software Components

The CollabSphere system consists of the following deliverable components:

#### **Backend Application**

**Component**: FastAPI-based REST API Server  
**Technology**: Python 3.11, FastAPI 0.104.1, PostgreSQL 15  
**Location**: `/backend/`

**Key Features**:
- ✅ 13 API routers with 120+ endpoints
- ✅ JWT-based authentication
- ✅ Role-Based Access Control (RBAC)
- ✅ WebSocket support for real-time features
- ✅ AWS Bedrock AI integration
- ✅ Cloudinary file storage integration
- ✅ Email notification service

**Deliverable Files**:
```
backend/
├── app/
│   ├── main.py              # Application entry point
│   ├── config.py            # Configuration management
│   ├── database.py          # Database connection
│   ├── models/              # SQLModel data models (15 tables)
│   ├── routers/             # API endpoints (13 routers)
│   ├── schemas/             # Pydantic schemas
│   ├── services/            # Business logic services
│   └── utils/               # Utilities (security, dependencies)
├── alembic/                 # Database migrations
├── tests/                   # Test suite (pytest)
├── requirements.txt         # Python dependencies
├── Dockerfile               # Container image definition
└── alembic.ini             # Migration configuration
```

**Build Output**:
- Docker image: `collabsphere-backend:1.0`
- Size: ~450 MB
- Base image: `python:3.11-slim`

---

#### **Frontend Application**

**Component**: React Single-Page Application  
**Technology**: React 18.2.0, React Router, Context API  
**Location**: `/frontend/`

**Key Features**:
- ✅ 40+ reusable components
- ✅ Responsive design (desktop, tablet)
- ✅ Real-time updates (WebSocket)
- ✅ Video conferencing (WebRTC)
- ✅ File upload/download
- ✅ Dark mode support (in progress)

**Deliverable Files**:
```
frontend/
├── public/
│   └── index.html           # HTML template
├── src/
│   ├── App.js               # Root component
│   ├── index.js             # Entry point
│   ├── config.js            # API configuration
│   ├── components/          # UI components
│   │   ├── Auth/            # Login, Register
│   │   ├── Project/         # Project management
│   │   ├── Group/           # Team collaboration
│   │   ├── Evaluation/      # Grading, peer review
│   │   └── Common/          # Shared components
│   ├── pages/               # Page components
│   ├── services/            # API services
│   ├── context/             # State management
│   └── styles/              # CSS styles
├── package.json             # Dependencies
├── Dockerfile               # Container image definition
└── nginx.conf              # Web server configuration
```

**Build Output**:
- Static files: `build/` directory
- Docker image: `collabsphere-frontend:1.0`
- Size: ~80 MB (including nginx)
- Production build optimized with code splitting

---

#### **Database**

**Component**: PostgreSQL Database  
**Version**: PostgreSQL 15.3  
**Location**: Managed via Docker Compose

**Schema**:
- ✅ 15 tables
- ✅ 42 relationships (foreign keys)
- ✅ 18 indexes for performance
- ✅ Database migrations (Alembic)

**Deliverable Files**:
```
backend/alembic/versions/
├── 001_initial_schema.py
├── 002_add_notifications.py
├── 003_add_peer_reviews.py
└── 004_add_indexes.py
```

**Database Backup**:
- Sample data: `database/seed_data.sql`
- Schema only: `database/schema_only.sql`
- Full backup: `database/backup_YYYYMMDD.sql`

---

#### **Docker Compose Configuration**

**Component**: Container orchestration  
**Location**: `/docker-compose.yml`

**Services**:
1. **backend**: FastAPI application (port 8000)
2. **frontend**: React app with nginx (port 3000)
3. **db**: PostgreSQL database (port 5432)
4. **redis**: Cache for WebSocket state (port 6379)

**Deliverable Files**:
```
collabsphere/
├── docker-compose.yml       # Production configuration
├── docker-compose.dev.yml   # Development with hot reload
├── docker-compose.test.yml  # Testing environment
└── .env.example            # Environment variables template
```

---

### 6.1.2. Documentation

#### **Technical Documentation**

| Document | File | Pages | Description |
|----------|------|-------|-------------|
| **Section 0: Front Matter** | `00-FrontMatter.md` | 6 | Cover page, ToC, acknowledgement |
| **Section I: Project Introduction** | `01-ProjectIntroduction.md` | 18 | Vision, objectives, scope |
| **Section II: Project Management Plan** | `02-ProjectManagementPlan.md` | 16 | Team, schedule, risks |
| **Section III: Software Requirements** | `03-SRS/` | 105 | Product overview, user requirements, functional requirements |
| **Section IV: System Design** | `04-SDD/` | 178 | System architecture, database design, detailed design |
| **Section V: Testing Documentation** | `05-Testing.md` | 28 | Test strategy, cases, results, CI/CD |
| **Section VI: User Guides** | `06-UserGuides/` | 18 | Installation, user manuals |
| **Appendix** | `Appendix/` | 30 | API docs, database schema, screenshots |

**Total Documentation**: ~400 pages

---

#### **Design Artifacts**

**Diagrams** (31 PNG files in `Images/`):
- ✅ 2 Use Case Diagrams
- ✅ 4 System Architecture Diagrams
- ✅ 7 Entity-Relationship Diagrams (ERD)
- ✅ 6 Class Diagrams
- ✅ 10 Sequence Diagrams
- ✅ 1 RBAC Hierarchy Diagram
- ✅ 1 Project Timeline

All diagrams created with Draw.io, source files: `Diagrams/*.drawio`

---

#### **User Manuals**

| Manual | Audience | File | Pages |
|--------|----------|------|-------|
| **Installation Guide** | System Admin | Section 6.2 | 4 |
| **Lecturer Guide** | Lecturers/Faculty | Section 6.3.1 | 6 |
| **Student Guide** | Students | Section 6.3.2 | 5 |
| **Admin Guide** | System Admin | Section 6.3.3 | 3 |

---

### 6.1.3. Source Code

#### **Repository Information**

**GitHub Repository**: `https://github.com/[your-org]/collabsphere`  
**License**: MIT License  
**Primary Language**: Python (Backend), JavaScript (Frontend)

**Repository Structure**:
```
collabsphere/
├── backend/              # Python FastAPI backend
├── frontend/             # React frontend
├── MainDocument/         # Complete documentation
├── Documentation/        # Additional docs
├── KeHoach/             # Planning documents (Vietnamese)
├── docker-compose.yml    # Docker orchestration
├── .github/
│   └── workflows/
│       └── test.yml     # CI/CD pipeline
├── .gitignore
├── LICENSE
└── README.md
```

**Code Statistics**:
```
Language         Files    Lines    Blank    Comment    Code
---------------------------------------------------------
Python             85     12,450    1,850      2,100    8,500
JavaScript         124    18,700    2,300      1,800   14,600
Markdown           35      6,200      800        200    5,200
YAML               12        650       80         50      520
SQL                 8      1,200      150        100      950
---------------------------------------------------------
TOTAL             264     39,200    5,180      4,250   29,770
```

---

#### **Version Information**

**Current Release**: v1.0.0  
**Release Date**: January 20, 2026  
**Build Number**: 2026.01.20.001

**Version History**:
- `v0.1.0` (2025-10-01): Initial prototype
- `v0.5.0` (2025-11-15): Alpha release (internal testing)
- `v0.9.0` (2026-01-05): Beta release (UAT)
- `v1.0.0` (2026-01-20): Production release ✅

---

### 6.1.4. Deployment Artifacts

#### **Docker Images**

**Backend Image**:
```dockerfile
# Available on Docker Hub (if public)
docker pull collabsphere/backend:1.0

# Or build from source
cd backend
docker build -t collabsphere-backend:1.0 .
```

**Image Details**:
- Base: `python:3.11-slim`
- Size: 450 MB
- Layers: 12
- Vulnerabilities: 0 critical, 0 high (scanned with Trivy)

**Frontend Image**:
```dockerfile
# Available on Docker Hub (if public)
docker pull collabsphere/frontend:1.0

# Or build from source
cd frontend
docker build -t collabsphere-frontend:1.0 .
```

**Image Details**:
- Base: `node:18-alpine` (build), `nginx:alpine` (runtime)
- Size: 80 MB
- Multi-stage build for optimization

---

#### **Configuration Files**

**Environment Variables** (`.env` file):
```bash
# Database
DATABASE_URL=postgresql://user:password@db:5432/collabsphere
POSTGRES_USER=collabsphere_user
POSTGRES_PASSWORD=secure_password_here
POSTGRES_DB=collabsphere

# Backend
JWT_SECRET=your-secret-key-min-32-characters
JWT_ALGORITHM=HS256
JWT_EXPIRATION_MINUTES=1440

# AWS Bedrock (AI)
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_REGION=us-east-1
AWS_BEDROCK_MODEL_ID=anthropic.claude-v2

# Cloudinary (File Storage)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# Frontend
REACT_APP_API_URL=http://localhost:8000
REACT_APP_SOCKET_URL=http://localhost:8000
```

---

#### **Database Initialization**

**Migration Scripts**:
```bash
# Run all migrations
cd backend
alembic upgrade head

# Create initial admin user
python scripts/create_admin.py

# Seed sample data (optional, for testing)
python scripts/seed_data.py
```

**Sample Data**:
- 1 Admin user
- 5 Lecturers
- 20 Students
- 3 Subjects
- 10 Projects
- 5 Teams

---

## 6.2. INSTALLATION GUIDES

### 6.2.1. System Requirements

#### **Minimum Requirements**

**Server/Host Machine**:
- **CPU**: 2 cores (4 cores recommended)
- **RAM**: 4 GB (8 GB recommended)
- **Storage**: 20 GB free space
- **OS**: Ubuntu 20.04+, Windows 10+, macOS 11+
- **Network**: Stable internet connection (for AI and file storage)

**Software Dependencies**:
- Docker: 20.10+
- Docker Compose: 2.0+
- Git: 2.30+

---

#### **Client Requirements (End Users)**

**Web Browser** (one of):
- Google Chrome 100+
- Microsoft Edge 100+
- Firefox 95+ (limited testing)
- Safari 15+ (limited testing)

**Screen Resolution**: Minimum 1366×768 (1920×1080 recommended)

**Internet Speed**:
- Minimum: 5 Mbps (for video calls: 10 Mbps)
- Recommended: 20 Mbps

---

### 6.2.2. Docker Installation (Recommended)

Docker installation is the **recommended method** as it handles all dependencies automatically.

#### **Step 1: Install Docker**

**For Ubuntu/Linux**:
```bash
# Update package index
sudo apt update

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo apt install docker-compose-plugin

# Add user to docker group (avoid sudo)
sudo usermod -aG docker $USER
newgrp docker

# Verify installation
docker --version
docker compose version
```

**For Windows**:
1. Download Docker Desktop from https://www.docker.com/products/docker-desktop
2. Run installer and follow instructions
3. Restart computer after installation
4. Open Docker Desktop and wait for it to start
5. Verify in PowerShell: `docker --version`

**For macOS**:
1. Download Docker Desktop from https://www.docker.com/products/docker-desktop
2. Drag Docker.app to Applications folder
3. Open Docker from Applications
4. Verify in Terminal: `docker --version`

---

#### **Step 2: Clone Repository**

```bash
# Clone from GitHub
git clone https://github.com/[your-org]/collabsphere.git
cd collabsphere

# Or extract from ZIP
unzip collabsphere-v1.0.0.zip
cd collabsphere
```

---

#### **Step 3: Configure Environment**

```bash
# Copy example environment file
cp .env.example .env

# Edit configuration
nano .env  # or use any text editor
```

**Required Configuration**:
```bash
# 1. Database credentials (change default password!)
POSTGRES_PASSWORD=your_secure_password_here

# 2. JWT secret (generate random 32+ character string)
JWT_SECRET=your-random-secret-key-min-32-chars

# 3. AWS Bedrock (for AI features)
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret

# 4. Cloudinary (for file uploads)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# 5. Email (for notifications)
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

**Generate JWT Secret**:
```bash
# Linux/macOS
openssl rand -hex 32

# Windows PowerShell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | ForEach-Object {[char]$_})
```

---

#### **Step 4: Start Services**

```bash
# Build and start all containers
docker compose up -d --build

# View logs
docker compose logs -f

# Check container status
docker compose ps
```

**Expected Output**:
```
NAME                 STATUS          PORTS
collabsphere-backend     running     0.0.0.0:8000->8000/tcp
collabsphere-frontend    running     0.0.0.0:3000->3000/tcp
collabsphere-db          running     0.0.0.0:5432->5432/tcp
collabsphere-redis       running     0.0.0.0:6379->6379/tcp
```

---

#### **Step 5: Initialize Database**

```bash
# Run database migrations
docker compose exec backend alembic upgrade head

# Create initial admin user
docker compose exec backend python -c "
from app.database import SessionLocal
from app.models.user import User
from app.utils.security import get_password_hash

db = SessionLocal()
admin = User(
    username='admin',
    email='admin@collabsphere.com',
    hashed_password=get_password_hash('Admin123!'),
    full_name='System Administrator',
    role='admin'
)
db.add(admin)
db.commit()
print('Admin user created: username=admin, password=Admin123!')
"

# (Optional) Load sample data for testing
docker compose exec backend python scripts/seed_data.py
```

---

#### **Step 6: Verify Installation**

**1. Check Backend API**:
```bash
# Test health endpoint
curl http://localhost:8000/health

# Expected response: {"status": "healthy"}
```

**2. Check API Documentation**:
Open browser: http://localhost:8000/docs  
You should see Swagger UI with all API endpoints.

**3. Check Frontend**:
Open browser: http://localhost:3000  
You should see the CollabSphere login page.

**4. Test Login**:
- Username: `admin`
- Password: `Admin123!`
- Should redirect to admin dashboard

---

#### **Step 7: Common Docker Commands**

```bash
# Stop all services
docker compose down

# Stop and remove all data (including database)
docker compose down -v

# Restart a specific service
docker compose restart backend

# View logs for specific service
docker compose logs -f backend

# Execute command in container
docker compose exec backend bash

# Rebuild after code changes
docker compose up -d --build backend

# Check resource usage
docker stats
```

---

### 6.2.3. Manual Installation

For development or environments where Docker is not available.

#### **Step 1: Install System Dependencies**

**For Ubuntu/Linux**:
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Python 3.11
sudo apt install python3.11 python3.11-venv python3-pip -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install nodejs -y

# Install PostgreSQL 15
sudo apt install postgresql-15 postgresql-contrib -y

# Install Redis
sudo apt install redis-server -y

# Verify installations
python3.11 --version
node --version
psql --version
redis-server --version
```

---

#### **Step 2: Setup Database**

```bash
# Start PostgreSQL service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create database and user
sudo -u postgres psql <<EOF
CREATE DATABASE collabsphere;
CREATE USER collabsphere_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE collabsphere TO collabsphere_user;
\q
EOF
```

---

#### **Step 3: Setup Backend**

```bash
# Clone repository
git clone https://github.com/[your-org]/collabsphere.git
cd collabsphere/backend

# Create virtual environment
python3.11 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cat > .env <<EOF
DATABASE_URL=postgresql://collabsphere_user:your_password@localhost:5432/collabsphere
JWT_SECRET=your-secret-key-min-32-characters
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
EOF

# Run migrations
alembic upgrade head

# Create admin user
python create_admin.py

# Start backend server
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

Backend should now be running on http://localhost:8000

---

#### **Step 4: Setup Frontend**

```bash
# Open new terminal
cd collabsphere/frontend

# Install dependencies
npm install

# Create .env file
cat > .env <<EOF
REACT_APP_API_URL=http://localhost:8000
REACT_APP_SOCKET_URL=http://localhost:8000
EOF

# Start development server
npm start
```

Frontend should now be running on http://localhost:3000

---

#### **Step 5: Setup Redis (for WebSocket)**

```bash
# Start Redis server
sudo systemctl start redis
sudo systemctl enable redis

# Test connection
redis-cli ping
# Expected response: PONG
```

---

### 6.2.4. Configuration

#### **Backend Configuration**

**File**: `backend/app/config.py`

```python
# Key configuration options:

# Database
DATABASE_URL: str  # Connection string

# JWT Authentication
JWT_SECRET: str           # Secret key for signing tokens
JWT_ALGORITHM: str = "HS256"
JWT_EXPIRATION_MINUTES: int = 1440  # 24 hours

# AWS Bedrock (AI)
AWS_ACCESS_KEY_ID: str
AWS_SECRET_ACCESS_KEY: str
AWS_REGION: str = "us-east-1"
AWS_BEDROCK_MODEL_ID: str = "anthropic.claude-v2"

# Cloudinary (File Storage)
CLOUDINARY_CLOUD_NAME: str
CLOUDINARY_API_KEY: str
CLOUDINARY_API_SECRET: str

# Email (SMTP)
SMTP_HOST: str = "smtp.gmail.com"
SMTP_PORT: int = 587
SMTP_USER: str
SMTP_PASSWORD: str
SMTP_FROM: str = "noreply@collabsphere.com"

# CORS (Frontend URLs)
CORS_ORIGINS: list = ["http://localhost:3000", "https://yourdomain.com"]

# File Upload Limits
MAX_FILE_SIZE_MB: int = 100
ALLOWED_FILE_TYPES: list = [".pdf", ".docx", ".xlsx", ".png", ".jpg", ".mp4", ".zip"]
```

---

#### **Frontend Configuration**

**File**: `frontend/src/config.js`

```javascript
const config = {
  // API endpoints
  API_URL: process.env.REACT_APP_API_URL || 'http://localhost:8000',
  SOCKET_URL: process.env.REACT_APP_SOCKET_URL || 'http://localhost:8000',
  
  // File upload
  MAX_FILE_SIZE: 100 * 1024 * 1024, // 100MB
  ALLOWED_FILE_TYPES: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/png',
    'image/jpeg',
    'video/mp4',
    'application/zip'
  ],
  
  // Pagination
  DEFAULT_PAGE_SIZE: 20,
  
  // Video call
  WEBRTC_ICE_SERVERS: [
    { urls: 'stun:stun.l.google.com:19302' }
  ]
};

export default config;
```

---

#### **Nginx Configuration (Production)**

**File**: `frontend/nginx.conf`

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    
    # Frontend static files
    root /usr/share/nginx/html;
    index index.html;
    
    # React Router support
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # API proxy
    location /api {
        proxy_pass http://backend:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
    
    # WebSocket proxy
    location /socket.io {
        proxy_pass http://backend:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
    
    # File upload size limit
    client_max_body_size 100M;
}
```

---

### 6.2.5. Troubleshooting

#### **Problem 1: Database Connection Failed**

**Error Message**:
```
sqlalchemy.exc.OperationalError: could not connect to server
```

**Solutions**:
1. Check PostgreSQL is running:
   ```bash
   docker compose ps db
   # or
   sudo systemctl status postgresql
   ```

2. Verify connection string in `.env`:
   ```bash
   # Format: postgresql://user:password@host:port/database
   DATABASE_URL=postgresql://collabsphere_user:password@localhost:5432/collabsphere
   ```

3. Check firewall allows port 5432:
   ```bash
   sudo ufw allow 5432
   ```

4. Test connection manually:
   ```bash
   psql -h localhost -U collabsphere_user -d collabsphere
   ```

---

#### **Problem 2: Port Already in Use**

**Error Message**:
```
Error starting userland proxy: listen tcp 0.0.0.0:8000: bind: address already in use
```

**Solutions**:
1. Find process using the port:
   ```bash
   # Linux/macOS
   sudo lsof -i :8000
   
   # Windows PowerShell
   netstat -ano | findstr :8000
   ```

2. Kill the process or change port:
   ```bash
   # Kill process (replace PID)
   kill -9 <PID>
   
   # Or change port in docker-compose.yml
   ports:
     - "8001:8000"  # Use 8001 instead
   ```

---

#### **Problem 3: Frontend Can't Connect to Backend**

**Error**: "Network Error" or CORS errors in browser console

**Solutions**:
1. Check backend is running:
   ```bash
   curl http://localhost:8000/health
   ```

2. Verify CORS configuration in `backend/app/main.py`:
   ```python
   app.add_middleware(
       CORSMiddleware,
       allow_origins=["http://localhost:3000"],  # Add your frontend URL
       allow_credentials=True,
       allow_methods=["*"],
       allow_headers=["*"],
   )
   ```

3. Check `REACT_APP_API_URL` in frontend `.env`:
   ```bash
   # Should match backend URL
   REACT_APP_API_URL=http://localhost:8000
   ```

---

#### **Problem 4: Docker Containers Keep Restarting**

**Solutions**:
1. Check logs for errors:
   ```bash
   docker compose logs backend
   docker compose logs frontend
   ```

2. Common issues:
   - Missing environment variables → Check `.env` file
   - Database not ready → Add `depends_on` with health check
   - Out of memory → Increase Docker memory limit

3. Restart with fresh state:
   ```bash
   docker compose down -v
   docker compose up -d --build
   ```

---

#### **Problem 5: AWS Bedrock AI Not Working**

**Error**: "Credentials not found" or "AccessDenied"

**Solutions**:
1. Verify AWS credentials:
   ```bash
   # Test with AWS CLI
   aws bedrock list-foundation-models --region us-east-1
   ```

2. Check IAM permissions:
   Required policy: `bedrock:InvokeModel`

3. Verify model ID:
   ```python
   # Valid model IDs:
   AWS_BEDROCK_MODEL_ID=anthropic.claude-v2
   # or
   AWS_BEDROCK_MODEL_ID=anthropic.claude-instant-v1
   ```

4. Check region supports Bedrock:
   Currently available in: `us-east-1`, `us-west-2`

---

#### **Problem 6: File Upload Fails**

**Error**: "File too large" or "Invalid file type"

**Solutions**:
1. Check Cloudinary configuration:
   ```bash
   # Test API key
   curl -X POST https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload \
     -F "file=@test.jpg" \
     -F "api_key=YOUR_API_KEY" \
     -F "timestamp=TIMESTAMP" \
     -F "signature=SIGNATURE"
   ```

2. Increase upload limits:
   ```python
   # backend/app/config.py
   MAX_FILE_SIZE_MB = 100
   ```

3. Check nginx client_max_body_size:
   ```nginx
   client_max_body_size 100M;
   ```

---

#### **Problem 7: WebSocket Connection Drops**

**Error**: "WebSocket disconnected" or chat messages not delivered

**Solutions**:
1. Check Redis is running:
   ```bash
   docker compose ps redis
   redis-cli ping  # Should return PONG
   ```

2. Verify Socket.IO configuration:
   ```javascript
   // frontend/src/services/socket.js
   const socket = io(SOCKET_URL, {
     reconnection: true,
     reconnectionAttempts: 5,
     reconnectionDelay: 1000
   });
   ```

3. Check firewall/proxy allows WebSocket:
   ```nginx
   # nginx.conf
   proxy_set_header Upgrade $http_upgrade;
   proxy_set_header Connection "upgrade";
   ```

---

## 6.3. USER MANUAL

### 6.3.1. Lecturer Guide

This guide is for **lecturers** who will create projects, manage student teams, and evaluate submissions.

---

#### **6.3.1.1. Getting Started**

**1. Account Registration**

Option A: **Self-Registration** (if enabled by admin)
1. Navigate to https://collabsphere.yourdomain.com
2. Click "Sign Up"
3. Fill registration form:
   - Full Name: Your full name
   - Email: Your institutional email
   - Username: Choose a unique username
   - Password: Minimum 8 characters
   - Role: Select "Lecturer"
   - Enrollment Code: Enter code provided by admin
4. Click "Register"
5. Check email for verification link
6. Click verification link to activate account

Option B: **Admin-Created Account**
1. Admin creates your account
2. You receive email with temporary password
3. Login and change password on first login

**2. First Login**
1. Go to login page
2. Enter username and password
3. Click "Sign In"
4. You'll be redirected to the lecturer dashboard

![Screenshot: Lecturer Dashboard](../Images/Screenshots/lecturer-dashboard.png)

---

#### **6.3.1.2. Creating Projects**

**Method 1: Manual Project Creation**

1. Click "Projects" in sidebar → "Create New Project"
2. Fill in project details:
   - **Title**: Clear, descriptive name (e.g., "E-Commerce Web Application")
   - **Description**: Detailed project requirements (supports Markdown)
   - **Subject**: Select from dropdown (e.g., "Software Engineering")
   - **Duration**: Number of weeks (typically 12-16 weeks)
   - **Max Teams**: How many teams can pick this project (1 = exclusive)
3. Add milestones manually:
   - Click "+ Add Milestone"
   - Enter title, week range, deliverables
   - Add 3-5 milestones for clear structure
4. Click "Submit for Approval"
5. Wait for Head of Department to approve

![Screenshot: Create Project Form](../Images/Screenshots/create-project-manual.png)

---

**Method 2: AI-Assisted Project Creation** ⭐ Recommended

1. Click "Projects" → "Create New Project"
2. Fill basic details (title, description, subject, duration)
3. Click "✨ Generate Milestones with AI"
4. Wait 5-10 seconds for AI to generate suggestions
5. Review AI-generated milestones:
   - AI creates 4-6 milestones based on duration
   - Includes week ranges and deliverables
   - Follows best practices for project structure
6. **Edit as needed**:
   - Click pencil icon to edit a milestone
   - Click trash icon to remove
   - Click "+ Add Milestone" to add more
7. Click "Submit for Approval"

**AI Milestone Generation Example**:
```
Input: 
- Title: "Mobile Food Delivery App"
- Duration: 12 weeks

AI Output:
1. Requirements & Planning (Week 1-2)
   - Gather requirements, create user stories
   - Design wireframes and mockups
   
2. Backend Development (Week 3-5)
   - Set up database schema
   - Implement REST API endpoints
   - User authentication
   
3. Frontend Development (Week 6-8)
   - Build React Native screens
   - Integrate with backend API
   - Implement navigation
   
4. Advanced Features (Week 9-10)
   - Real-time order tracking
   - Payment integration
   - Push notifications
   
5. Testing & Refinement (Week 11-12)
   - Unit and integration testing
   - Bug fixing and optimization
   - Prepare deployment
```

![Screenshot: AI Milestone Generation](../Images/Screenshots/ai-milestone-generation.png)

---

#### **6.3.1.3. Managing Projects**

**View Your Projects**
1. Go to "Projects" → "My Projects"
2. See list with status indicators:
   - 🟡 **Pending**: Awaiting approval
   - 🟢 **Approved**: Available for students
   - 🔴 **Rejected**: Needs revision
   - ✅ **Active**: Teams are working on it

**Edit Project (Pending/Rejected only)**
1. Click "Edit" button on project card
2. Modify details or milestones
3. Click "Save & Re-submit"
4. Head of Department will review again

**Delete Project (if no teams assigned)**
1. Click "Delete" button
2. Confirm deletion
3. Project and milestones removed

**Note**: Cannot edit or delete projects after teams have been assigned.

---

#### **6.3.1.4. Monitoring Team Progress**

**View Teams Working on Your Projects**
1. Go to "Projects" → Click on a project
2. Click "Teams" tab
3. See list of all teams assigned to this project

**Check Team Progress**
1. Click on a team name
2. View progress dashboard:
   - Milestones completion percentage
   - Submitted checkpoints
   - Pending evaluations
   - Team activity timeline

**View Submissions**
1. In team details, go to "Submissions" tab
2. See all checkpoint submissions:
   - Submission date/time
   - Submitted by (team member name)
   - Files uploaded
   - Current grade (if evaluated)

![Screenshot: Team Progress Dashboard](../Images/Screenshots/team-progress.png)

---

#### **6.3.1.5. Evaluating Checkpoints**

**Evaluate a Submission**
1. Go to "Submissions" or click notification
2. Click on submission to open
3. Review submission details:
   - Read submission text
   - Download and review files
4. Click "Evaluate" button
5. Fill evaluation form:
   - **Grade**: Enter score (0-10)
   - **Feedback**: Detailed comments (required)
     - What was done well
     - What needs improvement
     - Suggestions for next checkpoint
6. Click "Submit Evaluation"

**Evaluation appears immediately to students**

**Best Practices**:
- ✅ Provide specific, actionable feedback
- ✅ Mention both strengths and weaknesses
- ✅ Reference rubric criteria if available
- ✅ Evaluate within 3-5 days of submission
- ✅ Be consistent across teams

**Edit Evaluation** (if needed)
1. Go back to evaluated submission
2. Click "Edit Evaluation"
3. Update grade and/or feedback
4. Click "Update"
5. Students are notified of change

![Screenshot: Evaluation Form](../Images/Screenshots/evaluation-form.png)

---

#### **6.3.1.6. Viewing Peer Reviews**

After a milestone is complete, students submit peer reviews.

**Access Peer Reviews**
1. Go to team details
2. Click "Peer Reviews" tab
3. Select milestone

**View Aggregated Results**
For each student, you'll see:
- Average scores (Cooperation, Contribution, Communication, Technical Skills)
- Anonymous comments from teammates
- Comparison with other team members

**Use Case**:
Use peer review data to:
- Identify students who may need support
- Detect team conflicts early
- Adjust individual grades (if your grading policy includes peer review)
- Provide coaching to struggling students

**Note**: Individual reviews are anonymous. You only see aggregated data.

![Screenshot: Peer Review Dashboard](../Images/Screenshots/peer-review-aggregated.png)

---

#### **6.3.1.7. Communication**

**Receive Notifications**
You'll be notified when:
- 🟢 Your project is approved/rejected
- 📤 A team submits a checkpoint
- 💬 A team sends you a message
- ⚠️ A deadline is approaching

**View Notifications**
1. Click bell icon in top-right
2. See list of recent notifications
3. Click to view details

**Message a Team**
1. Go to team details
2. Click "Send Message" button
3. Type message
4. Click "Send"
5. All team members receive notification

---

#### **6.3.1.8. Reports & Analytics**

**View Class Performance**
1. Go to "Classes" → Select a class
2. Click "Analytics" tab
3. View charts:
   - Average grades per checkpoint
   - Submission timeliness
   - Team progress comparison
   - Grade distribution

**Export Data**
1. Click "Export" button
2. Select format (CSV, Excel)
3. Choose data to export:
   - All submissions
   - All grades
   - Peer review summaries
4. Click "Download"

---

### 6.3.2. Student Guide

This guide is for **students** who will join teams, collaborate on projects, and submit work.

---

#### **6.3.2.1. Getting Started**

**Registration**
1. Go to https://collabsphere.yourdomain.com
2. Click "Sign Up"
3. Fill form:
   - Full Name
   - Student Email
   - Username
   - Password
   - **Student ID**: Your university ID
   - **Enrollment Code**: Get from your lecturer
4. Click "Register"
5. Verify email
6. Login

**First Login**
1. Enter username and password
2. You'll see your dashboard
3. Navigate to "Classes" to see enrolled classes

![Screenshot: Student Dashboard](../Images/Screenshots/student-dashboard.png)

---

#### **6.3.2.2. Joining a Team**

**Option 1: Create Your Own Team**
1. Go to class page → "Teams" tab
2. Click "Create New Team"
3. Enter team name (e.g., "Team Alpha")
4. Click "Create"
5. You become the team leader
6. Invite other students (see next section)

**Option 2: Accept Team Invitation**
1. You'll receive notification when invited
2. Click notification or go to "Notifications"
3. View invitation details (team name, members)
4. Click "Accept" or "Decline"
5. If accepted, you're added to the team

**Team Size**: Typically 4-6 students per team (check with lecturer)

![Screenshot: Create Team](../Images/Screenshots/create-team.png)

---

#### **6.3.2.3. Inviting Team Members** (Team Leaders)

1. Go to team workspace
2. Click "Members" tab
3. Click "+ Invite Member"
4. Search for student by name or username
5. Click "Send Invitation"
6. Student receives notification
7. Wait for acceptance

**Tips**:
- Invite students from your class only
- Can't invite students already in another team (same class)
- Each student can only be in 1 team per class

---

#### **6.3.2.4. Picking a Project**

After your team is formed:

1. Go to team workspace
2. Click "Pick Project" button
3. Browse available projects:
   - Filter by subject
   - Search by keyword
   - View project details (description, milestones)
4. Click on a project to see full details
5. Discuss with team members
6. Click "Select This Project"
7. Confirm selection

**Important**:
- Once selected, **cannot change project**
- If `max_teams = 1`, only first team gets the project
- Project milestones automatically added to your team

![Screenshot: Browse Projects](../Images/Screenshots/browse-projects.png)

---

#### **6.3.2.5. Team Collaboration**

**Team Workspace**
Your central hub for collaboration:
- 📊 **Dashboard**: Progress overview, upcoming deadlines
- 💬 **Chat**: Real-time team communication
- 📹 **Video Call**: Built-in video conferencing
- 📁 **Files**: Shared file storage
- ✅ **Tasks**: Track who's doing what
- 📝 **Milestones**: View checkpoints and deadlines

---

**Real-Time Chat**
1. Go to team workspace → "Chat" tab
2. Type message in text box
3. Press Enter or click Send
4. Message appears instantly for all online members
5. Offline members see messages when they login

**Features**:
- @mention teammates: `@username message`
- Share links and files
- Message history saved
- Unread message counter

![Screenshot: Team Chat](../Images/Screenshots/team-chat.png)

---

**Video Calls**
1. In team workspace, click "📹 Start Video Call"
2. Allow browser to access camera/microphone
3. Wait for teammates to join
4. Controls:
   - 🎤 Mute/Unmute microphone
   - 📹 Turn camera on/off
   - 🖥️ Share screen
   - 📞 Leave call

**Best Practices**:
- Test camera/mic before important meetings
- Use headphones to avoid echo
- Share screen when presenting
- Works best with 2-6 participants

![Screenshot: Video Call](../Images/Screenshots/video-call.png)

---

**File Sharing**
1. Go to "Files" tab
2. Click "Upload File"
3. Select file (max 100MB)
4. Add description (optional)
5. Click "Upload"
6. File appears in shared folder
7. All team members can download

**Supported File Types**:
- Documents: PDF, DOCX, XLSX, PPTX
- Images: PNG, JPG, GIF
- Videos: MP4, AVI
- Archives: ZIP, RAR
- Code: Any text-based files

---

#### **6.3.2.6. Submitting Checkpoints**

When a milestone checkpoint is due:

1. Go to "Milestones" tab
2. Click on the checkpoint to submit
3. Fill submission form:
   - **Submission Text**: Describe what you completed
   - **Upload Files**: Attach deliverables
     - Requirements document
     - Source code (ZIP)
     - Diagrams
     - Presentation slides
4. Review submission
5. Click "Submit"

**Confirmation**:
- Submission timestamp recorded
- Lecturer receives notification
- Cannot edit after submission (contact lecturer if needed)

**Late Submissions**:
- After deadline, submit button disabled
- Contact lecturer to request extension
- Lecturer can reopen submission window

![Screenshot: Submit Checkpoint](../Images/Screenshots/submit-checkpoint.png)

---

#### **6.3.2.7. Viewing Grades & Feedback**

**After lecturer evaluates your submission:**

1. Go to "Grades" tab
2. See list of evaluated checkpoints
3. Click on a checkpoint to view:
   - Grade (e.g., 8.5/10)
   - Detailed feedback from lecturer
   - Evaluation date
   - Submission files (for reference)

**What to do with feedback**:
- Read carefully and discuss with team
- Address mentioned issues in next checkpoint
- Ask lecturer for clarification if needed
- Use feedback to improve

![Screenshot: View Grade](../Images/Screenshots/view-grade-feedback.png)

---

#### **6.3.2.8. Peer Review**

After completing a milestone, you'll evaluate your teammates.

**Submit Peer Reviews**
1. Notification: "Peer review now available"
2. Go to "Peer Reviews" section
3. For each teammate (except yourself), rate:
   - **Cooperation**: How well they worked with team
   - **Contribution**: Amount and quality of work
   - **Communication**: Responsiveness and clarity
   - **Technical Skills**: Competence and problem-solving
4. Optionally add comments (anonymous)
5. Click "Submit Reviews"

**Important**:
- Reviews are **anonymous** – teammates don't see who wrote what
- Be honest and constructive
- Required before next milestone starts
- Lecturer sees aggregated results only

**Rating Scale**: 1-5
- 5: Excellent
- 4: Good
- 3: Satisfactory
- 2: Needs improvement
- 1: Poor

![Screenshot: Peer Review Form](../Images/Screenshots/peer-review-form.png)

---

#### **6.3.2.9. Notifications**

You'll receive notifications for:
- 📨 Team invitations
- 📢 Project announcements
- 💬 New chat messages (when offline)
- ✅ Checkpoint graded
- ⏰ Deadline reminders (3 days, 1 day before)
- 📹 Video call started

**View Notifications**:
1. Click bell icon (top-right)
2. See list of recent notifications
3. Click to view details
4. Notifications marked as read automatically

**Email Notifications**:
Important notifications also sent to your email:
- Grade received
- Submission deadline approaching
- Team invitation

---

#### **6.3.2.10. Tips for Success**

✅ **Communication**:
- Check chat daily
- Respond to messages promptly
- Attend video meetings

✅ **Time Management**:
- Start work early (don't wait for deadline)
- Break milestones into smaller tasks
- Set internal deadlines before official ones

✅ **Collaboration**:
- Divide work fairly among team members
- Help teammates when they're stuck
- Do your fair share (peer reviews matter!)

✅ **Quality**:
- Test your work before submitting
- Follow project requirements carefully
- Read lecturer feedback and improve

✅ **Documentation**:
- Keep files organized
- Use clear naming conventions
- Write README for code submissions

---

### 6.3.3. Admin Guide

This guide is for **system administrators** who manage users, classes, and system configuration.

---

#### **6.3.3.1. Admin Dashboard**

**Login as Admin**:
1. Username: `admin` (default)
2. Password: Set during installation
3. Access admin dashboard at: `/admin`

**Dashboard Overview**:
- 📊 System statistics (users, projects, active teams)
- 📈 Usage charts (daily active users, API requests)
- ⚠️ System alerts (errors, performance issues)
- 📋 Recent activity logs

![Screenshot: Admin Dashboard](../Images/Screenshots/admin-dashboard.png)

---

#### **6.3.3.2. User Management**

**View All Users**
1. Go to "Users" section
2. See list with filters:
   - Role: Admin, Lecturer, Student
   - Status: Active, Inactive, Suspended
   - Search by name, email, username

**Create New User**
1. Click "+ Add User"
2. Fill form:
   - Full Name
   - Email
   - Username
   - **Role**: Select Admin/Lecturer/Student
   - **Temporary Password**: System generates or set manually
3. Click "Create"
4. User receives email with login credentials

**Edit User**
1. Click "Edit" on user row
2. Update information
3. Click "Save"

**Reset Password**
1. Click "Reset Password" on user row
2. System generates temporary password
3. User receives email
4. User must change password on next login

**Suspend/Activate User**
1. Click "Suspend" or "Activate" button
2. Suspended users cannot login
3. Data preserved (can reactivate later)

**Delete User** (Permanent)
1. Click "Delete"
2. Confirm deletion
3. All user data removed (irreversible)
4. Use with caution!

![Screenshot: User Management](../Images/Screenshots/user-management.png)

---

#### **6.3.3.3. Class Management**

**Create Class**
1. Go to "Classes" → "+ Add Class"
2. Fill details:
   - Class Code (e.g., "CS401")
   - Class Name (e.g., "Software Engineering")
   - Subject
   - Semester/Year
   - Lecturer (select from dropdown)
3. Click "Create"
4. **Enrollment Code** automatically generated

**Manage Enrollment Codes**
1. View class details
2. See enrollment code
3. Click "Regenerate" to create new code (old code becomes invalid)
4. Share code with students for self-enrollment

**Assign Students to Class**
1. Open class
2. Go to "Students" tab
3. Click "+ Add Students"
4. Select students from list or search
5. Click "Add"

**Remove Student from Class**
1. In class students list
2. Click "Remove" next to student name
3. Confirm removal

---

#### **6.3.3.4. System Configuration**

**General Settings**
1. Go to "Settings" → "General"
2. Configure:
   - Site Name
   - Support Email
   - Timezone
   - Language

**Feature Toggles**
Enable/disable features:
- ✅ AI Milestone Generation
- ✅ Video Conferencing
- ✅ Peer Reviews
- ✅ Self-Registration

**File Upload Settings**
1. Go to "Settings" → "File Upload"
2. Configure:
   - Max file size (MB)
   - Allowed file types
   - Cloudinary settings

**Email Settings**
1. Go to "Settings" → "Email"
2. Configure SMTP:
   - Host, Port
   - Username, Password
   - From Address
3. Click "Test Email" to verify

**Security Settings**
1. Go to "Settings" → "Security"
2. Configure:
   - JWT expiration time
   - Password requirements
   - Session timeout
   - Max login attempts

![Screenshot: System Settings](../Images/Screenshots/system-settings.png)

---

#### **6.3.3.5. Monitoring & Logs**

**View System Logs**
1. Go to "Logs" section
2. Filter by:
   - Level: Info, Warning, Error
   - Module: Auth, API, Database
   - Date range
3. Search by keyword
4. Export logs (CSV)

**Monitor Performance**
1. Go to "Monitoring" section
2. View metrics:
   - CPU & Memory usage
   - API response times
   - Database query performance
   - Active WebSocket connections
3. Set up alerts for anomalies

**Database Backup**
1. Go to "Database" → "Backup"
2. Click "Create Backup Now"
3. View backup history
4. Download backup files
5. Restore from backup (if needed)

**Scheduled Backups**:
- Automatic daily backups at 2 AM
- Retention: 7 days
- Stored in: `/backups/` directory

---

#### **6.3.3.6. Troubleshooting Common Issues**

**Issue: User Can't Login**
- Check user status (not suspended)
- Verify email is verified
- Reset password if forgotten
- Check logs for error messages

**Issue: File Upload Fails**
- Verify Cloudinary credentials
- Check file size limits
- Ensure allowed file type
- Check network connectivity

**Issue: AI Features Not Working**
- Verify AWS Bedrock credentials
- Check IAM permissions
- Ensure region supports Bedrock
- Review API usage quotas

**Issue: Slow Performance**
- Check database query performance
- Review logs for slow endpoints
- Increase server resources if needed
- Clear Redis cache

---

## CONCLUSION

This completes the **Release Package & User Guides** documentation. 

**Summary of Deliverables**:
- ✅ Complete software package (Backend, Frontend, Database, Docker)
- ✅ Comprehensive documentation (400+ pages)
- ✅ Installation guides (Docker & Manual)
- ✅ User manuals for all roles (Lecturer, Student, Admin)
- ✅ Troubleshooting guides
- ✅ Configuration references

**System Status**: ✅ **PRODUCTION READY**  
**Documentation Status**: ✅ **COMPLETE**

---

**For Technical Support**:
- Email: support@collabsphere.com
- Documentation: https://docs.collabsphere.com
- GitHub Issues: https://github.com/[your-org]/collabsphere/issues

---

*End of Section VI: Release Package & User Guides*
