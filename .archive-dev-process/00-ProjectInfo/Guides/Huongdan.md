### Lộ Trình Code Web CollabSphere (COSRE)

Dựa trên đề bài về hệ thống CollabSphere – một ứng dụng web hỗ trợ học tập dựa trên dự án (PBL) với các tính năng quản lý, cộng tác real-time, đánh giá, AI, và thông báo – tôi sẽ cung cấp lộ trình code tuần tự, chi tiết. Lộ trình này xây dựng trên kế hoạch trước, tập trung vào phần coding thực tế (sau khi đã phân tích yêu cầu và thiết kế). Tôi giả định bạn đã chuẩn bị môi trường (Python 3.12+, Node.js 18+, Git, Docker), và sử dụng công nghệ đề xuất: Backend (Python FastAPI), Frontend (React.js), DB (PostgreSQL), Real-time (Socket.IO, WebRTC), Cloud (Azure/AWS), AI (AWS Bedrock).

Lộ trình chia thành 12 bước chính, theo thứ tự logic (backend trước để có API, sau đó frontend, tích hợp, test). Mỗi bước bao gồm **việc cần làm** (tasks), **cách code** (hướng dẫn cụ thể với snippets mẫu), **thời gian ước tính** (cho developer cá nhân), và **cách đảm bảo đáp ứng yêu cầu đề bài** (liên kết với tính năng cụ thể). Tổng thời gian: 8-16 tuần tùy kinh nghiệm. Sử dụng Git cho version control, commit thường xuyên.

#### Bước 1: Thiết Lập Dự Án Và Backend Cơ Bản (1 tuần)
   - **Việc cần làm**: Tạo cấu trúc dự án, cài đặt dependencies, thiết lập server FastAPI cơ bản với auth.
   - **Cách code**:
     - Tạo folder: `mkdir collabsphere && cd collabsphere`.
     - Backend: `mkdir backend && cd backend`, `python -m venv venv`, activate venv, `pip install fastapi uvicorn sqlmodel pydantic python-jose[cryptography] passlib[bcrypt] python-multipart pandas boto3 socketio python-socketio webrtc`.
     - Tạo `main.py`:
       ```python
       from fastapi import FastAPI
       app = FastAPI(title="CollabSphere API")
       @app.get("/")
       def root():
           return {"message": "Welcome to CollabSphere"}
       ```
     - Chạy: `uvicorn main:app --reload`.
     - Thêm auth: Sử dụng JWT cho RBAC (roles: admin, staff, head, lecturer, student).
       ```python
       from fastapi.security import OAuth2PasswordBearer
       oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
       # Thêm models cho User với roles.
       ```
   - **Thời gian ước tính**: 3-5 ngày.
   - **Cách đảm bảo đáp ứng yêu cầu đề bài**: Xây dựng nền tảng cho quản lý tài khoản (Quản trị viên xem/hủy accounts), đảm bảo phân quyền từ đầu.

#### Bước 2: Thiết Kế Và Code Database Models (1 tuần)
   - **Việc cần làm**: Tạo models cho tất cả entities (users, subjects, curricula, classes, projects, groups, milestones, checkpoints, resources, evaluations).
   - **Cách code**:
     - Sử dụng SQLModel (kết hợp SQLAlchemy + Pydantic).
     - Trong `models.py`:
       ```python
       from sqlmodel import SQLModel, Field, Relationship
       class User(SQLModel, table=True):
           id: int = Field(default=None, primary_key=True)
           username: str
           role: str  # admin, staff, head, lecturer, student
           # Relationships: e.g., lecturer to classes
       class Project(SQLModel, table=True):
           id: int = Field(default=None, primary_key=True)
           description: str
           goals: str
           milestones: str  # JSON for mốc
           status: str  # pending, approved, rejected
           # Relationships: to classes, groups
       # Tương tự cho Subject, Class, Group, Milestone, Evaluation, etc.
       ```
     - Migrate DB: Sử dụng Alembic (`pip install alembic`), init và migrate.
   - **Thời gian ước tính**: 4-6 ngày.
   - **Cách đảm bảo đáp ứng yêu cầu đề bài**: Models hỗ trợ quản lý dự án (tạo, phê duyệt), nhóm (thành viên, tiến độ), đánh giá (phản hồi cho groups/members).

#### Bước 3: Code API Cho Quản Lý Tài Khoản Và Auth (1 tuần)
   - **Việc cần làm**: API cho tạo/xem/hủy accounts, login/logout.
   - **Cách code**:
     - Trong `routers/auth.py`:
       ```python
       from fastapi import APIRouter, Depends
       router = APIRouter()
       @router.post("/register")
       def register(user: UserCreate):
           # Hash password, save to DB
           pass
       @router.post("/login")
       def login(form_data: OAuth2PasswordRequestForm = Depends()):
           # Verify, return JWT
           pass
       @router.get("/users", dependencies=[Depends(get_current_admin)])
       def get_users():
           # Query all users
           pass
       ```
     - Thêm dependency cho roles (e.g., `get_current_admin` check role == "admin").
   - **Thời gian ước tính**: 4-5 ngày.
   - **Cách đảm bảo đáp ứng yêu cầu đề bài**: Hỗ trợ Quản trị viên xem/hủy accounts, Nhân viên tạo accounts giảng viên/sinh viên.

#### Bước 4: Code API Cho Quản Lý Môn Học, Giáo Trình, Lớp Học (1 tuần)
   - **Việc cần làm**: API cho import file (CSV/Excel), quản lý lists.
   - **Cách code**:
     - Trong `routers/staff.py` (restrict to staff role):
       ```python
       @router.post("/subjects/import")
       async def import_subjects(file: UploadFile = File(...)):
           df = pd.read_csv(file.file)  # or Excel
           # Loop insert to DB
           return {"status": "imported"}
       @router.get("/classes")
       def get_classes():
           # Query DB
           pass
       ```
     - Thêm assign lecturers/students to classes.
   - **Thời gian ước tính**: 4-6 ngày.
   - **Cách đảm bảo đáp ứng yêu cầu đề bài**: Nhân viên nhập file tự động tạo môn học/lớp, quản lý thành viên lớp.

#### Bước 5: Code API Cho Quản Lý Dự Án Và Nhóm (1-2 tuần)
   - **Việc cần làm**: API cho tạo/phê duyệt/chỉ định dự án, tạo/quản lý groups, theo dõi tiến độ/đóng góp.
   - **Cách code**:
     - Trong `routers/projects.py`:
       ```python
       @router.post("/projects/create")
       def create_project(project: ProjectCreate, current_user=Depends(get_current_lecturer)):
           # Save to DB, status="pending"
           pass
       @router.post("/projects/approve/{id}")
       def approve_project(id: int, current_user=Depends(get_current_head)):
           # Update status
           pass
       @router.get("/groups/{group_id}/progress")
       def get_progress(group_id: int):
           # Calculate % hoàn thành milestones from DB
           pass
       ```
     - Theo dõi đóng góp: Sử dụng logs hoặc metrics trong DB.
   - **Thời gian ước tính**: 5-7 ngày.
   - **Cách đảm bảo đáp ứng yêu cầu đề bài**: Giảng viên tạo dự án với AI (sẽ tích hợp sau), Trưởng khoa phê duyệt, Sinh viên mark milestones.

#### Bước 6: Tích Hợp AI Và Thông Báo Vào Backend (1 tuần)
   - **Việc cần làm**: Tích hợp Bedrock cho AI, gửi email/real-time notifications.
   - **Cách code**:
     - AI: `pip install boto3`, trong endpoint:
       ```python
       import boto3
       bedrock = boto3.client('bedrock-runtime')
       @router.post("/ai/generate-milestones")
       def generate_milestones(curriculum: str):
           response = bedrock.invoke_model(modelId='anthropic.claude-v2', body=...)  # Prompt to generate
           return response
       ```
     - Thông báo: Sử dụng smtplib cho email, Socket.IO cho real-time.
       ```python
       import socketio
       sio = socketio.AsyncServer()
       @sio.event
       async def notify(sid, data):
           await sio.emit('notification', data)
       ```
   - **Thời gian ước tính**: 4-6 ngày.
   - **Cách đảm bảo đáp ứng yêu cầu đề bài**: AI hỗ trợ tạo mốc/dự án, thông báo khi hoàn thành mốc/nộp checkpoint.

#### Bước 7: Code API Cho Collab Real-Time Và Tài Nguyên (1-2 tuần)
   - **Việc cần làm**: API cho video/chat/bảng trắng/editor, quản lý files.
   - **Cách code**:
     - Real-time: Tích hợp WebRTC cho video, Socket.IO cho sync.
       ```python
       @app.websocket("/ws")
       async def websocket_endpoint(websocket: WebSocket):
           await websocket.accept()
           # Handle messages for chat/whiteboard
       ```
     - Tài nguyên: Upload to Cloudinary.
       ```python
       from cloudinary.uploader import upload
       @router.post("/resources/upload")
       def upload_resource(file: UploadFile):
           result = upload(file.file)
           # Save URL to DB
           pass
       ```
   - **Thời gian ước tính**: 6-8 ngày.
   - **Cách đảm bảo đáp ứng yêu cầu đề bài**: Công cụ cộng tác thời gian thực (bảng trắng, editor), quản lý tài nguyên cho lớp/nhóm.

#### Bước 8: Code API Cho Đánh Giá Và Phản Hồi (1 tuần)
   - **Việc cần làm**: API cho đánh giá groups/members/checkpoints, peer review.
   - **Cách code**:
     - Trong `routers/evaluation.py`:
       ```python
       @router.post("/evaluations/create")
       def create_evaluation(eval: EvaluationCreate):
           # Save to DB, link to group/member
           pass
       @router.get("/evaluations/{id}")
       def get_evaluation(id: int):
           # Fetch for viewing peer reviews
           pass
       ```
   - **Thời gian ước tính**: 4-5 ngày.
   - **Cách đảm bảo đáp ứng yêu cầu đề bài**: Giảng viên/sinh viên đánh giá/phản hồi, xem đánh giá đồng nghiệp.

#### Bước 9: Code Frontend Cơ Bản Và Auth (1 tuần)
   - **Việc cần làm**: Tạo React app, login/register pages.
   - **Cách code**:
     - `npx create-react-app frontend`, `npm install react-router-dom axios socket.io-client jwt-decode material-ui`.
     - Trong `App.js`:
       ```jsx
       import { BrowserRouter, Routes, Route } from 'react-router-dom';
       function App() {
         return (
           <BrowserRouter>
             <Routes>
               <Route path="/login" element={<Login />} />
               {/* Role-based routes */}
             </Routes>
           </BrowserRouter>
         );
       }
       ```
     - Login: Sử dụng axios post to API, store JWT in localStorage.
   - **Thời gian ước tính**: 4-6 ngày.
   - **Cách đảm bảo đáp ứng yêu cầu đề bài**: Giao diện cho từng vai trò, auth để phân quyền.

#### Bước 10: Code Frontend Pages Theo Vai Trò (2-3 tuần)
   - **Việc cần làm**: Pages cho dashboard, lists, forms (e.g., Giảng viên: projects, groups; Sinh viên: tasks, collab).
   - **Cách code**:
     - Sử dụng Material-UI components.
     - Ví dụ page Projects:
       ```jsx
       import { DataGrid } from '@mui/x-data-grid';
       function Projects() {
         const [projects, setProjects] = useState([]);
         useEffect(() => {
           axios.get('/projects').then(res => setProjects(res.data));
         }, []);
         return <DataGrid rows={projects} columns={columns} />;
       }
       ```
     - Collab: Tích hợp Excalidraw cho whiteboard, React-Quill cho editor, PeerJS cho WebRTC video.
   - **Thời gian ước tính**: 7-10 ngày.
   - **Cách đảm bảo đáp ứng yêu cầu đề bài**: Pages hỗ trợ xem/quản lý (e.g., Sinh viên tạo tasks, đánh giá peers), real-time sync via Socket.IO.

#### Bước 11: Tích Hợp, Test, Và Debug (2 tuần)
   - **Việc cần làm**: Kết nối frontend-backend, test full flows.
   - **Cách code**:
     - Tích hợp: Axios calls in components, Socket.IO for real-time.
     - Test: `npm install jest cypress`, viết tests (e.g., Cypress for E2E: simulate create project → approve → collab).
     - Debug: Use Chrome DevTools, Postman for API.
   - **Thời gian ước tính**: 7-10 ngày.
   - **Cách đảm bảo đáp ứng yêu cầu đề bài**: Test end-to-end (e.g., flow từ tạo dự án đến đánh giá), đảm bảo tất cả tính năng hoạt động (quản lý, collab, AI, đánh giá).

#### Bước 12: Deploy Và Finalize (1 tuần)
   - **Việc cần làm**: Deploy lên cloud, soạn docs.
   - **Cách code**:
     - Dockerize: Tạo Dockerfile cho backend/frontend.
     - Deploy: Azure App Service push, configure env vars (DB URL, AWS keys).
     - Docs: Tạo README với installation, API swagger (/docs).
   - **Thời gian ước tính**: 4-5 ngày.
   - **Cách đảm bảo đáp ứng yêu cầu đề bài**: Hệ thống chạy production, hỗ trợ đầy đủ (e.g., thông báo email, real-time) như đề bài.

Theo dõi lộ trình này để tránh thiếu sót. Nếu gặp vấn đề cụ thể (e.g., code sample chi tiết hơn), hãy cung cấp thêm thông tin!