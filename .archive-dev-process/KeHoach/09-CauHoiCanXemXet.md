# Các Câu Hỏi và Considerations Cần Xem Xét

**Mục đích**: Làm rõ các quyết định quan trọng trước khi bắt đầu development

## 1. Phương Pháp Phát Triển

### Câu hỏi:
Nên sử dụng Agile/Scrum với sprint 2 tuần, ưu tiên phát triển backend trước (steps 2-4) để có API sẵn sàng cho frontend, hay phát triển song song frontend/backend theo từng module?

### Khuyến nghị:
**Phương pháp kết hợp (Hybrid Approach)**:

**Giai đoạn 1-2 (Tuần 1-2)**: Backend-first
- Tập trung 100% vào backend core (database models, auth, basic APIs)
- Lý do: Frontend cần API endpoints để integrate
- Team backend: 2-3 người
- Output: Working REST API với Swagger docs

**Giai đoạn 3-5 (Tuần 3-7)**: Parallel development
- Backend team: Phát triển advanced APIs (AI, real-time)
- Frontend team: Build UI components và integrate với existing APIs
- Daily sync meetings để đảm bảo API contracts
- Sử dụng mock APIs nếu backend chưa ready

**Giai đoạn 6-8 (Tuần 8-10)**: Integration và testing
- Full team collaboration
- E2E testing, bug fixing, optimization

**Sprint structure**:
- Sprint 1: Backend core + Design system
- Sprint 2: User management APIs + Auth UI
- Sprint 3: Project APIs + Project UI
- Sprint 4: Real-time features + Collaboration UI
- Sprint 5: Testing + Deployment

---

## 2. Phạm Vi Tính Năng AI

### Câu hỏi:
AI chatbot và auto-generate milestones là core features - cần xác định rõ AWS Bedrock model (Claude v2/v3?), prompt engineering strategy, và fallback mechanism nếu AI service down?

### Khuyến nghị:

**Model selection**:
- **Primary**: AWS Bedrock Claude 3 Sonnet
  - Lý do: Balance giữa cost và quality
  - Cost: ~$3/1M input tokens, $15/1M output tokens
  - Context window: 200k tokens
- **Fallback**: Claude 2.1
  - Khi quota exceeded hoặc service unavailable

**Prompt engineering strategy**:

```python
# Structured prompts với examples
MILESTONE_GENERATION_PROMPT = """
You are an educational AI assistant helping create project milestones.

Project Details:
- Title: {title}
- Description: {description}
- Duration: {duration_weeks} weeks

Generate 6-8 realistic milestones following this structure:
[
  {{
    "title": "Clear, actionable milestone name",
    "description": "Detailed description (2-3 sentences)",
    "week": 2,
    "deliverables": ["Specific output 1", "Specific output 2"],
    "difficulty": "easy|medium|hard"
  }}
]

Example for "E-commerce Website" project:
[
  {{
    "title": "Database Design and Setup",
    "description": "Design entity-relationship diagram for products, users, orders. Implement PostgreSQL schema with proper constraints.",
    "week": 1,
    "deliverables": ["ERD diagram", "SQL schema file"],
    "difficulty": "medium"
  }},
  ...
]

Now generate milestones for the given project. Return ONLY valid JSON array.
"""
```

**Fallback mechanism**:

```python
class AIService:
    def generate_milestones(self, project_data: Dict) -> List[Dict]:
        try:
            # Primary: AWS Bedrock
            return self._bedrock_generate(project_data)
        except Exception as e:
            logger.error(f"Bedrock failed: {e}")
            # Fallback: Template-based generation
            return self._template_generate(project_data)
    
    def _template_generate(self, project_data: Dict) -> List[Dict]:
        # Pre-defined templates cho các loại dự án phổ biến
        templates = {
            "web_development": [
                {"title": "Requirements Analysis", "week": 1, ...},
                {"title": "UI/UX Design", "week": 2, ...},
                ...
            ],
            "mobile_app": [...],
            "data_science": [...]
        }
        # Detect project type và return template
        return templates.get("web_development", default_template)
```

**Cost optimization**:
- Cache AI responses cho similar projects (use Redis)
- Rate limiting: Max 10 AI requests/user/day
- Batch processing nếu có nhiều requests
- Monitor usage với CloudWatch

**Expected AI usage**:
- Milestone generation: ~500 tokens input, ~1000 tokens output per request
- Chatbot: ~200 tokens input, ~300 tokens output per message
- Monthly estimate: 1000 requests → $5-10/month

---

## 3. Real-time Scalability

### Câu hỏi:
Với yêu cầu video conferencing, whiteboard, chat đồng thời cho nhiều groups - cần estimate số users đồng thời tối đa, consider WebRTC mesh vs SFU architecture, và Redis Pub/Sub capacity?

### Khuyến nghị:

**Capacity planning**:
- **Target**: Support 500 concurrent users
- **Groups**: ~100 active groups simultaneously
- **Users per group**: Average 5 students + 1 lecturer = 6
- **Concurrent video calls**: ~30 groups (180 users) at peak

**WebRTC architecture**:

**Mesh (Peer-to-Peer)** - Recommended cho groups nhỏ (≤4 users):
```
Pros:
+ Low latency (direct connection)
+ No server bandwidth cost
+ Simple implementation

Cons:
- Scales poorly (n² connections)
- High client bandwidth (upload n-1 streams)
```

**SFU (Selective Forwarding Unit)** - Recommended cho groups >4:
```
Pros:
+ Better scalability
+ Lower client bandwidth
+ Server controls routing

Cons:
- Additional server cost
- Slightly higher latency
```

**Implementation strategy**:
```javascript
// Adaptive approach
function getVideoArchitecture(groupSize) {
  if (groupSize <= 4) {
    return 'mesh'; // Use SimplePeer direct P2P
  } else {
    return 'sfu'; // Use mediasoup or Janus
  }
}
```

**Redis capacity**:
- **Upstash free tier**: 10k requests/day
- **Paid plan**: $0.2/100k requests
- Chat messages: ~100 msgs/group/hour = 300k msgs/day
- Need: Redis Pro ($10/month) cho 10M requests

**Optimization strategies**:
1. **Message batching**: Bundle 10 chat messages → 1 Redis publish
2. **Presence heartbeat**: Update every 30s instead of real-time
3. **Whiteboard throttling**: Send draw events every 100ms max
4. **Video quality adaptation**: 
   - Start 720p, downgrade to 480p if >4 participants
   - Audio-only mode for weak connections

**Load balancing**:
```
┌─────────────┐
│   Nginx     │ ← HTTPS
│ Load Balancer│
└──────┬──────┘
       │
   ┌───┴───┐
   │       │
┌──▼──┐ ┌──▼──┐
│API-1│ │API-2│ ← FastAPI instances
└─────┘ └─────┘
   │       │
   └───┬───┘
       │
  ┌────▼─────┐
  │  Redis   │ ← Pub/Sub for real-time
  │ Cluster  │
  └──────────┘
```

**Expected infrastructure**:
- **Backend instances**: 2x Azure App Service (B2) = $60/month
- **Redis**: Azure Cache for Redis (Standard C1) = $75/month
- **Bandwidth**: 500GB/month = $40
- **Total**: ~$175/month for 500 concurrent users

---

## 4. Testing Strategy

### Câu hỏi:
Cần mock data cho testing không? Nên tạo seed scripts cho sample users/classes/projects/groups để test full workflow từ đầu đến cuối?

### Khuyến nghị:

**Tạo comprehensive test data**:

**`scripts/seed_test_data.py`**:
```python
from app.models import *
from app.utils.security import get_password_hash

def seed_test_data(session: Session):
    # 1. Create users (5 per role)
    users = []
    roles = ['admin', 'staff', 'head', 'lecturer', 'student']
    for role in roles:
        for i in range(5):
            user = User(
                username=f"{role}{i+1}",
                email=f"{role}{i+1}@test.com",
                hashed_password=get_password_hash("password123"),
                full_name=f"Test {role.title()} {i+1}",
                role=role
            )
            users.append(user)
            session.add(user)
    
    # 2. Create subjects (3 subjects)
    subjects = [
        Subject(code="CS101", name="Web Development", credits=3),
        Subject(code="CS201", name="Mobile Apps", credits=3),
        Subject(code="CS301", name="Data Science", credits=4),
    ]
    for subject in subjects:
        session.add(subject)
    
    # 3. Create classes (6 classes, 2 per subject)
    classes = []
    for i, subject in enumerate(subjects):
        for j in range(2):
            cls = Class(
                code=f"{subject.code}-{j+1}",
                name=f"{subject.name} - Section {j+1}",
                semester="2024-1",
                subject_id=subject.id,
                lecturer_id=users[10+i].id  # lecturers
            )
            classes.append(cls)
            session.add(cls)
    
    # 4. Assign students to classes
    for cls in classes:
        for student_id in range(20, 25):  # 5 students per class
            member = ClassMember(class_id=cls.id, student_id=student_id)
            session.add(member)
    
    # 5. Create projects (10 projects)
    project_templates = [
        ("E-commerce Website", "Build online shopping platform"),
        ("Mobile Fitness Tracker", "Create workout tracking app"),
        ("Learning Management System", "Educational platform"),
        ...
    ]
    projects = []
    for title, desc in project_templates:
        project = Project(
            title=title,
            description=desc,
            goals="Complete working application",
            milestones_json=json.dumps([...]),
            status="approved",
            created_by=users[10].id
        )
        projects.append(project)
        session.add(project)
    
    # 6. Create groups (20 groups)
    for i, cls in enumerate(classes):
        for j in range(3):  # 3 groups per class
            group = Group(
                name=f"Group {j+1}",
                class_id=cls.id,
                project_id=projects[i].id,
                leader_id=20+j  # First 3 students
            )
            session.add(group)
            
            # Add members
            for k in range(5):
                member = GroupMember(
                    group_id=group.id,
                    student_id=20+k,
                    contribution_score=random.randint(60, 100)
                )
                session.add(member)
    
    session.commit()
    print("Test data seeded successfully!")
```

**Test data structure**:
```
1 Admin
5 Staff
5 Heads
5 Lecturers
25 Students
---
3 Subjects
6 Classes (2 per subject)
10 Projects (various types)
20 Groups (3 per class)
100 Group Members
30 Milestones
50 Checkpoints
```

**Usage**:
```bash
# Seed test database
python scripts/seed_test_data.py

# Reset and reseed
python scripts/reset_and_seed.py
```

**Benefits**:
1. Consistent test environment
2. Full workflow testing (create→approve→assign→collaborate→evaluate)
3. Performance testing with realistic data volume
4. Demo environment cho presentations
5. E2E test scenarios sẵn có

**Mock APIs cho development**:
```javascript
// frontend/src/mocks/handlers.js (MSW - Mock Service Worker)
import { rest } from 'msw';

export const handlers = [
  rest.get('/api/v1/projects/', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { id: 1, title: "E-commerce", status: "approved" },
        { id: 2, title: "Mobile App", status: "pending" }
      ])
    );
  }),
];
```

---

## 5. Timeline và Resources

### Câu hỏi:
Với lộ trình 8-16 tuần trong Huongdan.md, dự án này có bao nhiêu members? Cần phân chia tasks như thế nào (backend team vs frontend team vs full-stack individuals)?

### Khuyến nghị:

**Team structure**:

**Option 1: Small team (3-4 người)**:
```
Person 1 (Full-stack lead):
- Backend core + APIs
- Database design
- Deployment
Timeline: 10-12 tuần

Person 2 (Frontend lead):
- React UI components
- State management
- Responsive design
Timeline: 8-10 tuần

Person 3 (Real-time specialist):
- Socket.IO setup
- WebRTC implementation
- Chat, whiteboard, video
Timeline: 6-8 tuần

Person 4 (Optional - QA/DevOps):
- Testing (unit, E2E)
- CI/CD setup
- Documentation
Timeline: 4-6 tuần
```

**Option 2: Larger team (5-6 người)**:
```
Backend team (2 người):
- Person A: Auth, User management, Projects
- Person B: Groups, Evaluations, AI integration

Frontend team (2 người):
- Person C: Admin/Staff/Head UI
- Person D: Lecturer/Student UI

Specialist (1-2 người):
- Person E: Real-time (Socket.IO, WebRTC)
- Person F: Testing + Documentation
```

**Timeline với small team (4 người)**:

| Tuần | Backend | Frontend | Real-time | QA/DevOps |
|------|---------|----------|-----------|-----------|
| 1 | DB models, Auth | Setup, Design system | - | Setup Git, CI |
| 2 | User/Subject APIs | Auth UI | Socket.IO server | - |
| 3 | Project APIs | Project UI | Chat implementation | Unit tests |
| 4 | Group APIs | Group UI | Whiteboard | E2E setup |
| 5 | Evaluation APIs | Evaluation UI | Video calls | Testing |
| 6 | AI integration | AI UI integration | Optimization | Testing |
| 7 | Notifications | Notification UI | Load testing | Bug fixing |
| 8 | - | Polish, responsive | - | Documentation |
| 9 | Deployment prep | Build optimization | - | Final testing |
| 10 | Deploy to cloud | Deploy frontend | - | User manual |

**Parallel work strategy**:
- **Week 1-2**: Backend focus, Frontend can work on mockups
- **Week 3-7**: Full parallel (use Swagger docs cho API contracts)
- **Week 8-10**: Integration focus

**Communication**:
- Daily standups (15 min)
- Weekly sprint planning
- Slack/Discord cho async communication
- Shared Notion/Trello board

**Tools**:
- **Version control**: GitHub (private repo)
- **Project management**: Trello/Jira
- **Design**: Figma
- **Communication**: Discord/Slack
- **CI/CD**: GitHub Actions
- **Deployment**: Azure + AWS

**Realistic timeline**:
- **Minimum viable product (MVP)**: 8 tuần (core features only)
- **Full product**: 12 tuần (all features + testing)
- **Production-ready**: 14-16 tuần (with documentation)

---

## 6. Các Rủi Ro và Mitigation

### Rủi ro 1: AI Service Quota/Cost
**Mitigation**:
- Implement caching
- Use template fallback
- Monitor usage daily
- Set budget alerts ($50/month)

### Rủi ro 2: Real-time Performance
**Mitigation**:
- Load testing early (week 7)
- Implement rate limiting
- Use CDN cho static assets
- Optimize bundle size

### Rủi ro 3: Scope Creep
**Mitigation**:
- Strict adherence to requirements in DeBai.md
- MVP first, then enhancements
- Weekly scope review

### Rủi ro 4: Integration Issues
**Mitigation**:
- API contracts defined early
- Mock APIs cho development
- Integration testing from week 6
- Daily syncs between backend/frontend

### Rủi ro 5: Deployment Complexity
**Mitigation**:
- Docker from day 1
- Test deployment on staging (week 8)
- Detailed deployment checklist
- Rollback plan

---

## 7. Success Criteria

### Technical Requirements ✓
- [ ] All functional requirements từ DeBai.md implemented
- [ ] Code coverage >80%
- [ ] Page load time <3s
- [ ] API response time <2s
- [ ] Real-time latency <1s
- [ ] Support 500+ concurrent users
- [ ] Zero critical bugs
- [ ] HTTPS enabled
- [ ] Responsive design

### Documentation ✓
- [ ] SRS complete
- [ ] UML diagrams (use case, class, sequence)
- [ ] API documentation (Swagger)
- [ ] User manual
- [ ] Installation guide
- [ ] Test reports

### Deployment ✓
- [ ] Backend deployed to Azure
- [ ] Frontend deployed to AWS/Azure
- [ ] Database in cloud
- [ ] Monitoring enabled
- [ ] Backup configured
- [ ] Production URL accessible

---

## Kết Luận và Khuyến Nghị Cuối Cùng

**Khuyến nghị chính**:
1. **Start với backend-first** (2 tuần) để có API foundation
2. **Sử dụng Claude 3 Sonnet** cho AI với template fallback
3. **Adaptive WebRTC**: Mesh cho <4 users, SFU cho larger groups
4. **Comprehensive test data**: Seed scripts cho realistic testing
5. **Team 4 người, 12 tuần** cho full product
6. **MVP approach**: Core features first, then enhancements

**Priority features** (nếu cần giảm scope):
- **Must have**: Auth, Projects, Groups, Basic collaboration
- **Should have**: AI generation, Video calls, Whiteboard
- **Nice to have**: Advanced analytics, Mobile optimization

**Next actions**:
1. Finalize team composition
2. Setup development environment (week 1)
3. Create detailed sprint backlogs
4. Start with phase 1: Analysis & Design

Chúc bạn thành công với dự án! 🚀
