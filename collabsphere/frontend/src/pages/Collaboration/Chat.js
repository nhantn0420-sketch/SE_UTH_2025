import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  IconButton,
  List,
  ListItem,
  Avatar,
  Divider,
  CircularProgress,
  Button,
} from '@mui/material';
import {
  Send as SendIcon,
  ArrowBack as BackIcon,
  AttachFile as AttachIcon,
  VideoCall as VideoIcon,
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { chatService } from '../../services/communicationService';

const Chat = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchMessages();
  }, [groupId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const data = await chatService.getMessages(groupId);
      setMessages(data.items || data);
    } catch (err) {
      console.error('Failed to fetch messages:', err);
      // Demo data
      setMessages([
        { id: 1, content: 'Chào mọi người!', sender: { full_name: 'Nguyễn Văn A' }, created_at: new Date().toISOString() },
        { id: 2, content: 'Hi, bắt đầu họp nhé', sender: { full_name: 'Trần Thị B' }, created_at: new Date().toISOString() },
        { id: 3, content: 'OK, mình đã chuẩn bị tài liệu rồi', sender: { full_name: 'Lê Văn C' }, created_at: new Date().toISOString() },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setSending(true);
    try {
      // Send via REST API and add to messages
      const sentMessage = await chatService.sendMessage(groupId, newMessage);
      setMessages((prev) => [...prev, sentMessage]);
      setNewMessage('');
    } catch (err) {
      console.error('Failed to send message:', err);
    } finally {
      setSending(false);
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  };

  const isMyMessage = (message) => message.sender?.id === user?.id;

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ height: 'calc(100vh - 150px)', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button startIcon={<BackIcon />} onClick={() => navigate(`/groups/${groupId}`)}>
            Quay lại
          </Button>
          <Typography variant="h6">Chat nhóm</Typography>
        </Box>
        <IconButton color="primary" onClick={() => navigate(`/video/${groupId}`)}>
          <VideoIcon />
        </IconButton>
      </Box>

      {/* Messages */}
      <Card sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <CardContent
          sx={{
            flexGrow: 1,
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <List sx={{ flexGrow: 1 }}>
            {messages.map((message, index) => {
              const isMe = isMyMessage(message);
              return (
                <ListItem
                  key={message.id || index}
                  sx={{
                    flexDirection: 'column',
                    alignItems: isMe ? 'flex-end' : 'flex-start',
                    py: 0.5,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 1,
                      flexDirection: isMe ? 'row-reverse' : 'row',
                      maxWidth: '70%',
                    }}
                  >
                    <Avatar sx={{ width: 32, height: 32, fontSize: '0.875rem' }}>
                      {message.sender?.full_name?.charAt(0) || 'U'}
                    </Avatar>
                    <Box>
                      <Box
                        sx={{
                          bgcolor: isMe ? 'primary.main' : 'grey.100',
                          color: isMe ? 'white' : 'text.primary',
                          px: 2,
                          py: 1,
                          borderRadius: 2,
                          borderTopRightRadius: isMe ? 0 : 16,
                          borderTopLeftRadius: isMe ? 16 : 0,
                        }}
                      >
                        {!isMe && (
                          <Typography variant="caption" fontWeight="bold" display="block">
                            {message.sender?.full_name}
                          </Typography>
                        )}
                        <Typography variant="body2">{message.content}</Typography>
                      </Box>
                      <Typography variant="caption" color="text.secondary" sx={{ px: 1 }}>
                        {formatTime(message.created_at)}
                      </Typography>
                    </Box>
                  </Box>
                </ListItem>
              );
            })}
            <div ref={messagesEndRef} />
          </List>
        </CardContent>

        <Divider />

        {/* Input */}
        <Box
          component="form"
          onSubmit={handleSendMessage}
          sx={{
            p: 2,
            display: 'flex',
            gap: 1,
            bgcolor: 'background.paper',
          }}
        >
          <IconButton>
            <AttachIcon />
          </IconButton>
          <TextField
            fullWidth
            placeholder="Nhập tin nhắn..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            size="small"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
              },
            }}
          />
          <IconButton
            type="submit"
            color="primary"
            disabled={sending || !newMessage.trim()}
          >
            {sending ? <CircularProgress size={24} /> : <SendIcon />}
          </IconButton>
        </Box>
      </Card>
    </Box>
  );
};

export default Chat;
