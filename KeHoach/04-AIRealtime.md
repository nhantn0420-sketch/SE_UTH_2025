# Giai Đoạn 4: Tích Hợp AI và Real-time Features

**Thời gian**: 1-2 tuần  
**Mục tiêu**: Implement AI chatbot, auto-generate milestones, real-time notifications, chat, video, và whiteboard

## Nhiệm Vụ Chính

### 4.1. Tích Hợp AWS Bedrock (AI)

#### A. Setup AWS Bedrock Client

**`app/services/ai_service.py`**:
```python
import boto3
import json
from app.config import settings
from typing import Dict, List

class AIService:
    def __init__(self):
        self.client = boto3.client(
            'bedrock-runtime',
            aws_access_key_id=settings.aws_access_key_id,
            aws_secret_access_key=settings.aws_secret_access_key,
            region_name=settings.aws_region
        )
        self.model_id = settings.bedrock_model_id
    
    def generate_milestones(self, project_data: Dict) -> List[Dict]:
        """
        Tự động tạo milestones dựa trên thông tin dự án
        """
        prompt = f"""
        Dựa trên thông tin dự án sau, hãy tạo ra các mốc (milestones) chi tiết cho dự án:
        
        Tiêu đề: {project_data.get('title')}
        Mô tả: {project_data.get('description')}
        Mục tiêu: {project_data.get('goals')}
        Giáo trình: {project_data.get('curriculum', 'Không có')}
        Thời gian: {project_data.get('duration_weeks', 12)} tuần
        
        Hãy tạo 5-8 milestones với format JSON như sau:
        [
            {{
                "title": "Tên milestone",
                "description": "Mô tả chi tiết",
                "week": 1,
                "deliverables": ["Sản phẩm 1", "Sản phẩm 2"]
            }}
        ]
        
        Chỉ trả về JSON array, không thêm text khác.
        """
        
        body = json.dumps({
            "prompt": f"\n\nHuman: {prompt}\n\nAssistant:",
            "max_tokens_to_sample": 2000,
            "temperature": 0.7,
            "top_p": 0.9,
        })
        
        try:
            response = self.client.invoke_model(
                modelId=self.model_id,
                body=body
            )
            
            response_body = json.loads(response['body'].read())
            completion = response_body.get('completion', '')
            
            # Parse JSON from completion
            milestones = json.loads(completion)
            return milestones
        except Exception as e:
            print(f"AI Error: {str(e)}")
            return []
    
    def chatbot_response(self, user_message: str, context: str = "") -> str:
        """
        AI Chatbot để hỗ trợ brainstorming và hướng dẫn
        """
        prompt = f"""
        Bạn là một trợ lý AI giúp sinh viên và giảng viên trong Project-Based Learning.
        
        Context: {context}
        
        User: {user_message}
        
        Hãy trả lời một cách hữu ích, ngắn gọn và thực tế. Tập trung vào:
        - Đưa ra ý tưởng sáng tạo
        - Hướng dẫn cách giải quyết vấn đề
        - Gợi ý các bước tiếp theo
        
        Assistant:
        """
        
        body = json.dumps({
            "prompt": f"\n\nHuman: {prompt}\n\nAssistant:",
            "max_tokens_to_sample": 500,
            "temperature": 0.8,
        })
        
        try:
            response = self.client.invoke_model(
                modelId=self.model_id,
                body=body
            )
            
            response_body = json.loads(response['body'].read())
            return response_body.get('completion', 'Xin lỗi, tôi không thể trả lời lúc này.')
        except Exception as e:
            return f"Error: {str(e)}"
    
    def analyze_progress(self, progress_data: Dict) -> str:
        """
        Phân tích tiến độ nhóm và đưa ra khuyến nghị
        """
        prompt = f"""
        Phân tích tiến độ nhóm sau và đưa ra khuyến nghị:
        
        Tổng số milestones: {progress_data.get('total')}
        Đã hoàn thành: {progress_data.get('completed')}
        Đang làm: {progress_data.get('in_progress')}
        Chưa bắt đầu: {progress_data.get('not_started')}
        Thời gian còn lại: {progress_data.get('weeks_left')} tuần
        
        Đưa ra:
        1. Đánh giá tình hình hiện tại
        2. Rủi ro (nếu có)
        3. Khuyến nghị hành động
        """
        
        body = json.dumps({
            "prompt": f"\n\nHuman: {prompt}\n\nAssistant:",
            "max_tokens_to_sample": 400,
            "temperature": 0.5,
        })
        
        try:
            response = self.client.invoke_model(
                modelId=self.model_id,
                body=body
            )
            response_body = json.loads(response['body'].read())
            return response_body.get('completion', '')
        except Exception as e:
            return f"Error: {str(e)}"

# Singleton instance
ai_service = AIService()
```

#### B. API Endpoints cho AI

**`app/routers/ai.py`**:
```python
from fastapi import APIRouter, Depends, HTTPException
from app.services.ai_service import ai_service
from app.utils.dependencies import get_current_user
from pydantic import BaseModel

router = APIRouter()

class GenerateMilestonesRequest(BaseModel):
    title: str
    description: str
    goals: str
    curriculum: str = ""
    duration_weeks: int = 12

class ChatbotRequest(BaseModel):
    message: str
    context: str = ""

class AnalyzeProgressRequest(BaseModel):
    total: int
    completed: int
    in_progress: int
    not_started: int
    weeks_left: int

@router.post("/generate-milestones")
def generate_milestones(
    request: GenerateMilestonesRequest,
    current_user = Depends(get_current_user)
):
    """AI: Tự động tạo milestones cho dự án"""
    milestones = ai_service.generate_milestones(request.dict())
    return {"milestones": milestones}

@router.post("/chatbot")
def chatbot(
    request: ChatbotRequest,
    current_user = Depends(get_current_user)
):
    """AI Chatbot: Hỗ trợ brainstorming và hướng dẫn"""
    response = ai_service.chatbot_response(request.message, request.context)
    return {"response": response}

@router.post("/analyze-progress")
def analyze_progress(
    request: AnalyzeProgressRequest,
    current_user = Depends(get_current_user)
):
    """AI: Phân tích tiến độ và đưa ra khuyến nghị"""
    analysis = ai_service.analyze_progress(request.dict())
    return {"analysis": analysis}
```

### 4.2. Hệ Thống Thông Báo

#### A. Notification Service

**`app/services/notification_service.py`**:
```python
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import List
from app.config import settings
import redis
import json

class NotificationService:
    def __init__(self):
        self.redis_client = redis.from_url(settings.redis_url)
        self.smtp_host = settings.smtp_host
        self.smtp_port = settings.smtp_port
        self.smtp_user = settings.smtp_user
        self.smtp_password = settings.smtp_password
    
    def send_email(self, to_email: str, subject: str, body: str):
        """Gửi email notification"""
        msg = MIMEMultipart()
        msg['From'] = self.smtp_user
        msg['To'] = to_email
        msg['Subject'] = subject
        
        msg.attach(MIMEText(body, 'html'))
        
        try:
            with smtplib.SMTP(self.smtp_host, self.smtp_port) as server:
                server.starttls()
                server.login(self.smtp_user, self.smtp_password)
                server.send_message(msg)
            print(f"Email sent to {to_email}")
        except Exception as e:
            print(f"Failed to send email: {str(e)}")
    
    def send_realtime_notification(self, user_id: int, notification_data: dict):
        """Gửi real-time notification qua Redis Pub/Sub"""
        channel = f"user:{user_id}:notifications"
        self.redis_client.publish(channel, json.dumps(notification_data))
    
    def notify_milestone_completed(self, group_id: int, milestone_title: str, members: List):
        """Thông báo khi milestone hoàn thành"""
        for member in members:
            # Email notification
            self.send_email(
                to_email=member.email,
                subject="Milestone Completed",
                body=f"<p>Nhóm của bạn đã hoàn thành milestone: <strong>{milestone_title}</strong></p>"
            )
            
            # Real-time notification
            self.send_realtime_notification(
                user_id=member.id,
                notification_data={
                    "type": "milestone_completed",
                    "group_id": group_id,
                    "milestone_title": milestone_title,
                    "timestamp": datetime.utcnow().isoformat()
                }
            )
    
    def notify_checkpoint_submitted(self, group_id: int, checkpoint_title: str, lecturer_email: str):
        """Thông báo khi checkpoint được nộp"""
        self.send_email(
            to_email=lecturer_email,
            subject="Checkpoint Submitted",
            body=f"<p>Nhóm đã nộp checkpoint: <strong>{checkpoint_title}</strong></p>"
        )
    
    def notify_resource_uploaded(self, resource_title: str, members: List):
        """Thông báo khi có tài nguyên mới"""
        for member in members:
            self.send_realtime_notification(
                user_id=member.id,
                notification_data={
                    "type": "resource_uploaded",
                    "resource_title": resource_title,
                    "timestamp": datetime.utcnow().isoformat()
                }
            )
    
    def notify_group_leader_assigned(self, leader_email: str, group_name: str):
        """Thông báo khi được chỉ định làm trưởng nhóm"""
        self.send_email(
            to_email=leader_email,
            subject="You are assigned as Group Leader",
            body=f"<p>Bạn đã được chỉ định làm trưởng nhóm: <strong>{group_name}</strong></p>"
        )

# Singleton
notification_service = NotificationService()
```

#### B. WebSocket cho Real-time Notifications

**`app/websockets/notifications.py`**:
```python
from fastapi import WebSocket, WebSocketDisconnect
from typing import Dict
import json
import asyncio

class NotificationManager:
    def __init__(self):
        self.active_connections: Dict[int, WebSocket] = {}
    
    async def connect(self, user_id: int, websocket: WebSocket):
        await websocket.accept()
        self.active_connections[user_id] = websocket
    
    def disconnect(self, user_id: int):
        if user_id in self.active_connections:
            del self.active_connections[user_id]
    
    async def send_personal_message(self, user_id: int, message: dict):
        if user_id in self.active_connections:
            await self.active_connections[user_id].send_json(message)
    
    async def broadcast_to_group(self, group_members: list, message: dict):
        for user_id in group_members:
            await self.send_personal_message(user_id, message)

notification_manager = NotificationManager()

# Add to main.py
@app.websocket("/ws/notifications/{user_id}")
async def websocket_notifications(websocket: WebSocket, user_id: int):
    await notification_manager.connect(user_id, websocket)
    try:
        while True:
            # Keep connection alive
            data = await websocket.receive_text()
            # Echo back for heartbeat
            await websocket.send_text(f"pong: {data}")
    except WebSocketDisconnect:
        notification_manager.disconnect(user_id)
```

### 4.3. Real-time Chat với Socket.IO

#### A. Setup Socket.IO Server

**Install dependencies**:
```bash
pip install python-socketio aiohttp
```

**`app/sockets/chat.py`**:
```python
import socketio
from app.database import get_session
from app.models.chat import ChatMessage

# Create Socket.IO server
sio = socketio.AsyncServer(
    async_mode='asgi',
    cors_allowed_origins='*'
)

socket_app = socketio.ASGIApp(sio)

# Store active rooms
active_rooms = {}

@sio.event
async def connect(sid, environ):
    print(f"Client {sid} connected")
    await sio.emit('connection_response', {'status': 'connected'}, room=sid)

@sio.event
async def disconnect(sid):
    print(f"Client {sid} disconnected")

@sio.event
async def join_group(sid, data):
    """Join group chat room"""
    group_id = data.get('group_id')
    user_id = data.get('user_id')
    
    room = f"group_{group_id}"
    sio.enter_room(sid, room)
    
    await sio.emit('user_joined', {
        'user_id': user_id,
        'message': f'User {user_id} joined the chat'
    }, room=room, skip_sid=sid)

@sio.event
async def leave_group(sid, data):
    """Leave group chat room"""
    group_id = data.get('group_id')
    room = f"group_{group_id}"
    sio.leave_room(sid, room)

@sio.event
async def send_message(sid, data):
    """Send chat message to group"""
    group_id = data.get('group_id')
    user_id = data.get('user_id')
    message = data.get('message')
    
    room = f"group_{group_id}"
    
    # Save to database
    with next(get_session()) as session:
        chat_msg = ChatMessage(
            sender_id=user_id,
            group_id=group_id,
            message=message
        )
        session.add(chat_msg)
        session.commit()
    
    # Broadcast to room
    await sio.emit('new_message', {
        'user_id': user_id,
        'message': message,
        'timestamp': datetime.utcnow().isoformat()
    }, room=room)

@sio.event
async def typing(sid, data):
    """User is typing indicator"""
    group_id = data.get('group_id')
    user_id = data.get('user_id')
    room = f"group_{group_id}"
    
    await sio.emit('user_typing', {
        'user_id': user_id
    }, room=room, skip_sid=sid)
```

**Mount Socket.IO trong main.py**:
```python
from app.sockets.chat import socket_app

# Mount Socket.IO
app.mount("/socket.io", socket_app)
```

### 4.4. Real-time Whiteboard Sync

**`app/sockets/whiteboard.py`**:
```python
import socketio

sio_whiteboard = socketio.AsyncServer(async_mode='asgi', cors_allowed_origins='*')
whiteboard_app = socketio.ASGIApp(sio_whiteboard, socketio_path='/whiteboard')

@sio_whiteboard.event
async def connect(sid, environ):
    print(f"Whiteboard client {sid} connected")

@sio_whiteboard.event
async def join_whiteboard(sid, data):
    """Join whiteboard session"""
    session_id = data.get('session_id')
    room = f"whiteboard_{session_id}"
    sio_whiteboard.enter_room(sid, room)

@sio_whiteboard.event
async def draw_event(sid, data):
    """Broadcast drawing events to all clients in session"""
    session_id = data.get('session_id')
    room = f"whiteboard_{session_id}"
    
    # Broadcast to all except sender
    await sio_whiteboard.emit('draw_update', data, room=room, skip_sid=sid)

@sio_whiteboard.event
async def clear_board(sid, data):
    """Clear whiteboard"""
    session_id = data.get('session_id')
    room = f"whiteboard_{session_id}"
    
    await sio_whiteboard.emit('board_cleared', {}, room=room)
```

### 4.5. WebRTC Signaling Server (Video/Audio)

**`app/sockets/webrtc.py`**:
```python
import socketio

sio_webrtc = socketio.AsyncServer(async_mode='asgi', cors_allowed_origins='*')
webrtc_app = socketio.ASGIApp(sio_webrtc, socketio_path='/webrtc')

# Store peers in rooms
rooms = {}

@sio_webrtc.event
async def join_room(sid, data):
    """Join video call room"""
    room_id = data.get('room_id')
    user_id = data.get('user_id')
    
    if room_id not in rooms:
        rooms[room_id] = {}
    
    rooms[room_id][sid] = user_id
    sio_webrtc.enter_room(sid, room_id)
    
    # Notify others in room
    await sio_webrtc.emit('user_joined', {
        'user_id': user_id,
        'sid': sid
    }, room=room_id, skip_sid=sid)
    
    # Send current room members to new user
    await sio_webrtc.emit('room_users', {
        'users': list(rooms[room_id].values())
    }, room=sid)

@sio_webrtc.event
async def leave_room(sid, data):
    """Leave video call"""
    room_id = data.get('room_id')
    
    if room_id in rooms and sid in rooms[room_id]:
        user_id = rooms[room_id][sid]
        del rooms[room_id][sid]
        
        sio_webrtc.leave_room(sid, room_id)
        
        await sio_webrtc.emit('user_left', {
            'user_id': user_id
        }, room=room_id)

@sio_webrtc.event
async def offer(sid, data):
    """Send WebRTC offer"""
    target_sid = data.get('target_sid')
    offer = data.get('offer')
    
    await sio_webrtc.emit('offer', {
        'offer': offer,
        'sender_sid': sid
    }, room=target_sid)

@sio_webrtc.event
async def answer(sid, data):
    """Send WebRTC answer"""
    target_sid = data.get('target_sid')
    answer = data.get('answer')
    
    await sio_webrtc.emit('answer', {
        'answer': answer,
        'sender_sid': sid
    }, room=target_sid)

@sio_webrtc.event
async def ice_candidate(sid, data):
    """Exchange ICE candidates"""
    target_sid = data.get('target_sid')
    candidate = data.get('candidate')
    
    await sio_webrtc.emit('ice_candidate', {
        'candidate': candidate,
        'sender_sid': sid
    }, room=target_sid)
```

## Deliverables Giai Đoạn 4

- [ ] AWS Bedrock integration cho AI chatbot
- [ ] AI auto-generate milestones function
- [ ] AI analyze progress function
- [ ] Email notification service (SMTP)
- [ ] Real-time notification system (Redis + WebSocket)
- [ ] Socket.IO chat server với rooms
- [ ] Real-time whiteboard sync server
- [ ] WebRTC signaling server cho video/audio
- [ ] Notification triggers trong API endpoints

## Testing

```python
# Test AI service
from app.services.ai_service import ai_service

# Test generate milestones
milestones = ai_service.generate_milestones({
    "title": "E-commerce Website",
    "description": "Build online shopping platform",
    "goals": "Create full-stack web app",
    "duration_weeks": 12
})
print(milestones)

# Test chatbot
response = ai_service.chatbot_response(
    "How do I design a database for e-commerce?"
)
print(response)
```

## Next Steps

Chuyển sang `05-FrontendReact.md` để phát triển giao diện người dùng.
