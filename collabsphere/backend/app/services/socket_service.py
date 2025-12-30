"""
Socket.IO server for real-time features
"""
import socketio
from fastapi import FastAPI
from app.utils.security import decode_access_token
from app.database import get_session
from app.models.communication import Message
from app.models.notification import Notification
from sqlmodel import select
from datetime import datetime

# Create Socket.IO server
sio = socketio.AsyncServer(
    async_mode='asgi',
    cors_allowed_origins='*',
    logger=True,
    engineio_logger=True
)

# Store active connections
active_connections = {}
group_rooms = {}


def setup_socketio(app: FastAPI):
    """Attach Socket.IO to FastAPI app"""
    socket_app = socketio.ASGIApp(sio, other_asgi_app=app)
    return socket_app


@sio.event
async def connect(sid, environ, auth):
    """Handle client connection"""
    try:
        token = auth.get('token') if auth else None
        if token:
            payload = decode_access_token(token)
            if payload:
                user_id = payload.get('sub')
                active_connections[sid] = {
                    'user_id': user_id,
                    'connected_at': datetime.utcnow()
                }
                print(f"User {user_id} connected with sid {sid}")
                return True
        return False
    except Exception as e:
        print(f"Connection error: {e}")
        return False


@sio.event
async def disconnect(sid):
    """Handle client disconnection"""
    if sid in active_connections:
        user_data = active_connections.pop(sid)
        print(f"User {user_data['user_id']} disconnected")
        
        # Leave all rooms
        for group_id, members in list(group_rooms.items()):
            if sid in members:
                members.remove(sid)
                await sio.emit('user_left', {
                    'user_id': user_data['user_id']
                }, room=f'group_{group_id}')


@sio.event
async def join_group(sid, data):
    """Join a group room for chat"""
    group_id = data.get('group_id')
    if not group_id:
        return
    
    room = f'group_{group_id}'
    await sio.enter_room(sid, room)
    
    if group_id not in group_rooms:
        group_rooms[group_id] = set()
    group_rooms[group_id].add(sid)
    
    user_data = active_connections.get(sid, {})
    await sio.emit('user_joined', {
        'user_id': user_data.get('user_id'),
        'group_id': group_id
    }, room=room, skip_sid=sid)
    
    print(f"User joined group {group_id}")


@sio.event
async def leave_group(sid, data):
    """Leave a group room"""
    group_id = data.get('group_id')
    if not group_id:
        return
    
    room = f'group_{group_id}'
    await sio.leave_room(sid, room)
    
    if group_id in group_rooms and sid in group_rooms[group_id]:
        group_rooms[group_id].remove(sid)
    
    user_data = active_connections.get(sid, {})
    await sio.emit('user_left', {
        'user_id': user_data.get('user_id'),
        'group_id': group_id
    }, room=room)


@sio.event
async def send_message(sid, data):
    """Handle sending a chat message"""
    group_id = data.get('group_id')
    content = data.get('content')
    
    if not group_id or not content:
        return
    
    user_data = active_connections.get(sid, {})
    user_id = user_data.get('user_id')
    
    # Save message to database
    try:
        with next(get_session()) as session:
            message = Message(
                group_id=int(group_id),
                sender_id=int(user_id),
                content=content,
                message_type='text'
            )
            session.add(message)
            session.commit()
            session.refresh(message)
            
            # Get sender info
            sender = session.get(type(message.sender), message.sender_id)
            
            message_data = {
                'id': message.id,
                'content': message.content,
                'sender': {
                    'id': sender.id if sender else user_id,
                    'full_name': sender.full_name if sender else 'Unknown'
                },
                'created_at': message.created_at.isoformat() if message.created_at else datetime.utcnow().isoformat()
            }
    except Exception as e:
        print(f"Error saving message: {e}")
        message_data = {
            'id': None,
            'content': content,
            'sender': {'id': user_id, 'full_name': 'User'},
            'created_at': datetime.utcnow().isoformat()
        }
    
    # Broadcast to group
    room = f'group_{group_id}'
    await sio.emit('new_message', message_data, room=room)


@sio.event
async def typing(sid, data):
    """Handle typing indicator"""
    group_id = data.get('group_id')
    is_typing = data.get('is_typing', True)
    
    user_data = active_connections.get(sid, {})
    room = f'group_{group_id}'
    
    await sio.emit('user_typing', {
        'user_id': user_data.get('user_id'),
        'is_typing': is_typing
    }, room=room, skip_sid=sid)


# Whiteboard events
@sio.event
async def join_whiteboard(sid, data):
    """Join whiteboard room"""
    group_id = data.get('group_id')
    room = f'whiteboard_{group_id}'
    await sio.enter_room(sid, room)


@sio.event
async def whiteboard_draw(sid, data):
    """Broadcast whiteboard drawing"""
    group_id = data.get('group_id')
    room = f'whiteboard_{group_id}'
    await sio.emit('whiteboard_update', data, room=room, skip_sid=sid)


@sio.event
async def whiteboard_clear(sid, data):
    """Clear whiteboard"""
    group_id = data.get('group_id')
    room = f'whiteboard_{group_id}'
    await sio.emit('whiteboard_cleared', {}, room=room)


# Document collaboration events
@sio.event
async def join_document(sid, data):
    """Join document editing room"""
    document_id = data.get('document_id')
    room = f'document_{document_id}'
    await sio.enter_room(sid, room)
    
    user_data = active_connections.get(sid, {})
    await sio.emit('user_joined_document', {
        'user_id': user_data.get('user_id')
    }, room=room, skip_sid=sid)


@sio.event
async def document_change(sid, data):
    """Handle document content change"""
    document_id = data.get('document_id')
    delta = data.get('delta')  # Quill delta format
    
    room = f'document_{document_id}'
    await sio.emit('document_update', {
        'delta': delta,
        'user_id': active_connections.get(sid, {}).get('user_id')
    }, room=room, skip_sid=sid)


@sio.event
async def cursor_position(sid, data):
    """Handle cursor position update"""
    document_id = data.get('document_id')
    position = data.get('position')
    
    room = f'document_{document_id}'
    user_data = active_connections.get(sid, {})
    
    await sio.emit('cursor_update', {
        'user_id': user_data.get('user_id'),
        'position': position
    }, room=room, skip_sid=sid)


# Video call signaling
@sio.event
async def join_call(sid, data):
    """Join video call room"""
    group_id = data.get('group_id')
    room = f'call_{group_id}'
    await sio.enter_room(sid, room)
    
    user_data = active_connections.get(sid, {})
    await sio.emit('user_joined_call', {
        'user_id': user_data.get('user_id'),
        'sid': sid
    }, room=room, skip_sid=sid)


@sio.event
async def leave_call(sid, data):
    """Leave video call room"""
    group_id = data.get('group_id')
    room = f'call_{group_id}'
    await sio.leave_room(sid, room)
    
    user_data = active_connections.get(sid, {})
    await sio.emit('user_left_call', {
        'user_id': user_data.get('user_id')
    }, room=room)


@sio.event
async def offer(sid, data):
    """WebRTC offer"""
    target_sid = data.get('target')
    await sio.emit('offer', {
        'sdp': data.get('sdp'),
        'from': sid
    }, room=target_sid)


@sio.event
async def answer(sid, data):
    """WebRTC answer"""
    target_sid = data.get('target')
    await sio.emit('answer', {
        'sdp': data.get('sdp'),
        'from': sid
    }, room=target_sid)


@sio.event
async def ice_candidate(sid, data):
    """WebRTC ICE candidate"""
    target_sid = data.get('target')
    await sio.emit('ice_candidate', {
        'candidate': data.get('candidate'),
        'from': sid
    }, room=target_sid)


# Notification helper
async def send_notification(user_id: int, notification_data: dict):
    """Send notification to specific user"""
    for sid, data in active_connections.items():
        if data.get('user_id') == str(user_id):
            await sio.emit('notification', notification_data, room=sid)
            break
