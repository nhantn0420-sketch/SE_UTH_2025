# Giai Đoạn 6: Công Cụ Cộng Tác Real-time

**Thời gian**: 1-2 tuần  
**Mục tiêu**: Implement interactive whiteboard, collaborative text editor, video conferencing, và real-time chat

## Nhiệm Vụ Chính

### 6.1. Real-time Chat Component

**`src/components/Collaboration/Chat.js`**:
```javascript
import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Paper,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
  Avatar
} from '@mui/material';
import { Send } from '@mui/icons-material';
import io from 'socket.io-client';
import { useAuth } from '../../context/AuthContext';

function Chat({ groupId }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const { user } = useAuth();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Connect to Socket.IO server
    const socketInstance = io('http://localhost:8000', {
      path: '/socket.io'
    });

    socketInstance.on('connect', () => {
      console.log('Connected to chat server');
      // Join group chat room
      socketInstance.emit('join_group', {
        group_id: groupId,
        user_id: user.id
      });
    });

    socketInstance.on('new_message', (data) => {
      setMessages(prev => [...prev, data]);
    });

    socketInstance.on('user_joined', (data) => {
      console.log('User joined:', data);
    });

    socketInstance.on('user_typing', (data) => {
      console.log('User typing:', data);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.emit('leave_group', { group_id: groupId });
      socketInstance.disconnect();
    };
  }, [groupId, user.id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && socket) {
      socket.emit('send_message', {
        group_id: groupId,
        user_id: user.id,
        message: newMessage
      });
      setNewMessage('');
    }
  };

  const handleTyping = () => {
    if (socket) {
      socket.emit('typing', {
        group_id: groupId,
        user_id: user.id
      });
    }
  };

  return (
    <Paper sx={{ height: 500, display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6">Group Chat</Typography>
      </Box>

      <List sx={{ flex: 1, overflow: 'auto', p: 2 }}>
        {messages.map((msg, index) => (
          <ListItem key={index} alignItems="flex-start">
            <Avatar sx={{ mr: 2 }}>{msg.user_id}</Avatar>
            <ListItemText
              primary={`User ${msg.user_id}`}
              secondary={
                <>
                  <Typography variant="body2" color="text.primary">
                    {msg.message}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </Typography>
                </>
              }
            />
          </ListItem>
        ))}
        <div ref={messagesEndRef} />
      </List>

      <Box sx={{ p: 2, display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => {
            handleTyping();
            if (e.key === 'Enter') {
              handleSendMessage();
            }
          }}
        />
        <IconButton color="primary" onClick={handleSendMessage}>
          <Send />
        </IconButton>
      </Box>
    </Paper>
  );
}

export default Chat;
```

### 6.2. Video Conference Component

**`src/components/Collaboration/VideoCall.js`**:
```javascript
import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Paper,
  IconButton,
  Grid,
  Typography
} from '@mui/material';
import {
  Videocam,
  VideocamOff,
  Mic,
  MicOff,
  ScreenShare,
  CallEnd
} from '@mui/icons-material';
import SimplePeer from 'simple-peer';
import io from 'socket.io-client';
import { useAuth } from '../../context/AuthContext';

function VideoCall({ roomId }) {
  const [peers, setPeers] = useState([]);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [socket, setSocket] = useState(null);
  const localVideoRef = useRef();
  const localStreamRef = useRef();
  const peersRef = useRef([]);
  const { user } = useAuth();

  useEffect(() => {
    initializeMedia();
    initializeWebRTC();

    return () => {
      cleanup();
    };
  }, [roomId]);

  const initializeMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      localStreamRef.current = stream;
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Failed to get media devices:', error);
    }
  };

  const initializeWebRTC = () => {
    const socketInstance = io('http://localhost:8000', {
      path: '/webrtc'
    });

    socketInstance.on('connect', () => {
      console.log('Connected to WebRTC server');
      socketInstance.emit('join_room', {
        room_id: roomId,
        user_id: user.id
      });
    });

    socketInstance.on('room_users', (data) => {
      // Create peers for existing users
      data.users.forEach(userId => {
        if (userId !== user.id) {
          createPeer(userId, socketInstance, true);
        }
      });
    });

    socketInstance.on('user_joined', (data) => {
      createPeer(data.user_id, socketInstance, false);
    });

    socketInstance.on('offer', async (data) => {
      await handleOffer(data, socketInstance);
    });

    socketInstance.on('answer', async (data) => {
      await handleAnswer(data);
    });

    socketInstance.on('ice_candidate', async (data) => {
      await handleIceCandidate(data);
    });

    socketInstance.on('user_left', (data) => {
      removePeer(data.user_id);
    });

    setSocket(socketInstance);
  };

  const createPeer = (userId, socket, initiator) => {
    const peer = new SimplePeer({
      initiator: initiator,
      trickle: false,
      stream: localStreamRef.current
    });

    peer.on('signal', signal => {
      if (initiator) {
        socket.emit('offer', {
          target_sid: userId,
          offer: signal
        });
      } else {
        socket.emit('answer', {
          target_sid: userId,
          answer: signal
        });
      }
    });

    peer.on('stream', remoteStream => {
      setPeers(prev => [...prev, { userId, stream: remoteStream, peer }]);
    });

    peersRef.current.push({ userId, peer });
    return peer;
  };

  const handleOffer = async (data, socket) => {
    const peer = createPeer(data.sender_sid, socket, false);
    peer.signal(data.offer);
  };

  const handleAnswer = async (data) => {
    const peerObj = peersRef.current.find(p => p.userId === data.sender_sid);
    if (peerObj) {
      peerObj.peer.signal(data.answer);
    }
  };

  const handleIceCandidate = async (data) => {
    const peerObj = peersRef.current.find(p => p.userId === data.sender_sid);
    if (peerObj) {
      peerObj.peer.signal(data.candidate);
    }
  };

  const removePeer = (userId) => {
    const peerObj = peersRef.current.find(p => p.userId === userId);
    if (peerObj) {
      peerObj.peer.destroy();
    }
    peersRef.current = peersRef.current.filter(p => p.userId !== userId);
    setPeers(prev => prev.filter(p => p.userId !== userId));
  };

  const toggleVideo = () => {
    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
      setVideoEnabled(videoTrack.enabled);
    }
  };

  const toggleAudio = () => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      setAudioEnabled(audioTrack.enabled);
    }
  };

  const shareScreen = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true
      });
      
      const screenTrack = screenStream.getVideoTracks()[0];
      
      // Replace video track for all peers
      peersRef.current.forEach(({ peer }) => {
        const sender = peer._pc.getSenders().find(s => s.track?.kind === 'video');
        if (sender) {
          sender.replaceTrack(screenTrack);
        }
      });

      screenTrack.onended = () => {
        // Switch back to camera
        const cameraTrack = localStreamRef.current.getVideoTracks()[0];
        peersRef.current.forEach(({ peer }) => {
          const sender = peer._pc.getSenders().find(s => s.track?.kind === 'video');
          if (sender) {
            sender.replaceTrack(cameraTrack);
          }
        });
      };
    } catch (error) {
      console.error('Screen sharing failed:', error);
    }
  };

  const endCall = () => {
    cleanup();
    window.location.href = '/dashboard';
  };

  const cleanup = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
    }
    peersRef.current.forEach(({ peer }) => peer.destroy());
    if (socket) {
      socket.emit('leave_room', { room_id: roomId });
      socket.disconnect();
    }
  };

  return (
    <Paper sx={{ p: 2, height: '100%' }}>
      <Grid container spacing={2} sx={{ height: 'calc(100% - 80px)' }}>
        {/* Local video */}
        <Grid item xs={12} md={6}>
          <Box sx={{ position: 'relative', height: '100%' }}>
            <video
              ref={localVideoRef}
              autoPlay
              muted
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <Typography
              sx={{ position: 'absolute', bottom: 10, left: 10, color: 'white' }}
            >
              You
            </Typography>
          </Box>
        </Grid>

        {/* Remote videos */}
        {peers.map(({ userId, stream }) => (
          <Grid item xs={12} md={6} key={userId}>
            <Box sx={{ position: 'relative', height: '100%' }}>
              <video
                autoPlay
                ref={ref => {
                  if (ref) ref.srcObject = stream;
                }}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <Typography
                sx={{ position: 'absolute', bottom: 10, left: 10, color: 'white' }}
              >
                User {userId}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Controls */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
        <IconButton
          color={videoEnabled ? 'primary' : 'error'}
          onClick={toggleVideo}
        >
          {videoEnabled ? <Videocam /> : <VideocamOff />}
        </IconButton>
        <IconButton
          color={audioEnabled ? 'primary' : 'error'}
          onClick={toggleAudio}
        >
          {audioEnabled ? <Mic /> : <MicOff />}
        </IconButton>
        <IconButton color="primary" onClick={shareScreen}>
          <ScreenShare />
        </IconButton>
        <IconButton color="error" onClick={endCall}>
          <CallEnd />
        </IconButton>
      </Box>
    </Paper>
  );
}

export default VideoCall;
```

### 6.3. Interactive Whiteboard

**`src/components/Collaboration/Whiteboard.js`**:
```javascript
import React, { useState, useEffect } from 'react';
import { Box, Paper, IconButton, Toolbar } from '@mui/material';
import { Excalidraw, MainMenu, WelcomeScreen } from '@excalidraw/excalidraw';
import io from 'socket.io-client';
import { useAuth } from '../../context/AuthContext';

function Whiteboard({ sessionId }) {
  const [excalidrawAPI, setExcalidrawAPI] = useState(null);
  const [socket, setSocket] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    // Connect to whiteboard Socket.IO server
    const socketInstance = io('http://localhost:8000', {
      path: '/whiteboard'
    });

    socketInstance.on('connect', () => {
      console.log('Connected to whiteboard server');
      socketInstance.emit('join_whiteboard', {
        session_id: sessionId
      });
    });

    socketInstance.on('draw_update', (data) => {
      if (excalidrawAPI) {
        // Update whiteboard with remote changes
        const elements = data.elements;
        excalidrawAPI.updateScene({ elements });
      }
    });

    socketInstance.on('board_cleared', () => {
      if (excalidrawAPI) {
        excalidrawAPI.resetScene();
      }
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [sessionId]);

  const handleChange = (elements, appState) => {
    // Broadcast changes to other users
    if (socket && elements.length > 0) {
      socket.emit('draw_event', {
        session_id: sessionId,
        elements: elements,
        user_id: user.id
      });
    }
  };

  const clearBoard = () => {
    if (socket) {
      socket.emit('clear_board', {
        session_id: sessionId
      });
    }
    if (excalidrawAPI) {
      excalidrawAPI.resetScene();
    }
  };

  return (
    <Paper sx={{ height: 600, position: 'relative' }}>
      <Box sx={{ height: '100%' }}>
        <Excalidraw
          ref={(api) => setExcalidrawAPI(api)}
          onChange={handleChange}
          initialData={{
            appState: { viewBackgroundColor: '#ffffff' }
          }}
        >
          <MainMenu>
            <MainMenu.DefaultItems.ClearCanvas />
            <MainMenu.DefaultItems.SaveAsImage />
            <MainMenu.DefaultItems.Export />
          </MainMenu>
          <WelcomeScreen>
            <WelcomeScreen.Hints.MenuHint />
            <WelcomeScreen.Hints.ToolbarHint />
          </WelcomeScreen>
        </Excalidraw>
      </Box>
    </Paper>
  );
}

export default Whiteboard;
```

### 6.4. Collaborative Text Editor

**`src/components/Collaboration/TextEditor.js`**:
```javascript
import React, { useState, useEffect, useRef } from 'react';
import { Box, Paper } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import io from 'socket.io-client';

function TextEditor({ documentId }) {
  const [content, setContent] = useState('');
  const [socket, setSocket] = useState(null);
  const quillRef = useRef(null);
  const isRemoteChange = useRef(false);

  useEffect(() => {
    // Connect to document collaboration server
    const socketInstance = io('http://localhost:8000', {
      path: '/documents'
    });

    socketInstance.on('connect', () => {
      console.log('Connected to document server');
      socketInstance.emit('join_document', {
        document_id: documentId
      });
    });

    socketInstance.on('document_content', (data) => {
      isRemoteChange.current = true;
      setContent(data.content);
    });

    socketInstance.on('content_update', (data) => {
      isRemoteChange.current = true;
      setContent(data.content);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [documentId]);

  const handleChange = (value) => {
    setContent(value);
    
    // Only emit if it's a local change
    if (!isRemoteChange.current && socket) {
      socket.emit('update_content', {
        document_id: documentId,
        content: value
      });
    }
    
    isRemoteChange.current = false;
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ],
  };

  return (
    <Paper sx={{ p: 2 }}>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={content}
        onChange={handleChange}
        modules={modules}
        style={{ height: 400 }}
      />
    </Paper>
  );
}

export default TextEditor;
```

### 6.5. Integrated Collaboration Workspace

**`src/components/Student/GroupWorkspace.js`**:
```javascript
import React, { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Tabs,
  Tab,
  Typography
} from '@mui/material';
import Chat from '../Collaboration/Chat';
import VideoCall from '../Collaboration/VideoCall';
import Whiteboard from '../Collaboration/Whiteboard';
import TextEditor from '../Collaboration/TextEditor';
import TaskBoard from './TaskBoard';

function GroupWorkspace({ groupId }) {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { label: 'Tasks', component: <TaskBoard groupId={groupId} /> },
    { label: 'Chat', component: <Chat groupId={groupId} /> },
    { label: 'Video Call', component: <VideoCall roomId={`group_${groupId}`} /> },
    { label: 'Whiteboard', component: <Whiteboard sessionId={`group_${groupId}`} /> },
    { label: 'Document', component: <TextEditor documentId={`group_${groupId}`} /> },
  ];

  return (
    <Box>
      <Paper sx={{ mb: 2 }}>
        <Typography variant="h5" sx={{ p: 2 }}>
          Group Workspace - Group {groupId}
        </Typography>
        <Tabs
          value={activeTab}
          onChange={(e, v) => setActiveTab(v)}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          {tabs.map((tab, index) => (
            <Tab key={index} label={tab.label} />
          ))}
        </Tabs>
      </Paper>

      <Box sx={{ mt: 2 }}>
        {tabs[activeTab].component}
      </Box>
    </Box>
  );
}

export default GroupWorkspace;
```

### 6.6. Meeting Scheduler

**`src/components/Collaboration/MeetingScheduler.js`**:
```javascript
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import api from '../../services/api';

function MeetingScheduler({ open, onClose, groupId }) {
  const [title, setTitle] = useState('');
  const [scheduledAt, setScheduledAt] = useState(new Date());

  const handleSchedule = async () => {
    try {
      await api.post('/meetings/', {
        group_id: groupId,
        title: title,
        scheduled_at: scheduledAt.toISOString()
      });
      onClose();
      // Notification will be sent automatically by backend
    } catch (error) {
      console.error('Failed to schedule meeting', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Schedule Meeting</DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2 }}>
          <TextField
            label="Meeting Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mb: 2 }}
          />
          <DateTimePicker
            label="Date and Time"
            value={scheduledAt}
            onChange={setScheduledAt}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSchedule} variant="contained">
          Schedule
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default MeetingScheduler;
```

## Deliverables Giai Đoạn 6

- [ ] Real-time chat với Socket.IO
- [ ] Video conferencing với WebRTC
- [ ] Screen sharing capability
- [ ] Interactive whiteboard (Excalidraw)
- [ ] Collaborative text editor (Quill)
- [ ] Task board với drag-and-drop
- [ ] Meeting scheduler
- [ ] Integrated workspace interface
- [ ] Multi-user synchronization
- [ ] Low latency (<1s) for all real-time features

## Testing

```javascript
// Test Socket.IO connection
const socket = io('http://localhost:8000');
socket.on('connect', () => {
  console.log('Connected:', socket.id);
});

// Test WebRTC peer connection
navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  .then(stream => console.log('Media stream obtained'))
  .catch(err => console.error('Media error:', err));
```

## Next Steps

Chuyển sang `07-Testing.md` để testing toàn bộ hệ thống.
