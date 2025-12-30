import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  IconButton,
  Avatar,
  CircularProgress,
  Paper,
} from '@mui/material';
import { Send as SendIcon, SmartToy as BotIcon } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import aiService from '../../services/aiService';

const AIChatbot = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: 'Xin chào! Tôi là trợ lý AI của CollabSphere. Tôi có thể giúp bạn:\n\n• Đề xuất ý tưởng cho dự án\n• Giải đáp thắc mắc về quy trình\n• Hướng dẫn sử dụng hệ thống\n\nBạn cần hỗ trợ gì?',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await aiService.chat(input.trim());
      const assistantMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: response.response || response.message || 'Xin lỗi, tôi không thể trả lời câu hỏi này.',
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      // Demo response if API fails
      const demoResponses = [
        'Đó là một câu hỏi hay! Để thực hiện điều này trong CollabSphere, bạn có thể vào phần Quản lý nhóm và sử dụng Task Board để phân công công việc.',
        'Tôi hiểu bạn muốn biết thêm về tính năng này. CollabSphere hỗ trợ nhiều công cụ cộng tác như chat, video call và bảng trắng.',
        'Bạn có thể tìm thấy thông tin chi tiết trong phần Hướng dẫn sử dụng. Nếu cần hỗ trợ thêm, hãy liên hệ giảng viên của bạn.',
      ];
      const assistantMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: demoResponses[Math.floor(Math.random() * demoResponses.length)],
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Trợ lý AI
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Chatbot AI hỗ trợ học tập và giải đáp thắc mắc
      </Typography>

      <Card sx={{ height: 'calc(100vh - 250px)', display: 'flex', flexDirection: 'column' }}>
        {/* Messages */}
        <CardContent sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
          {messages.map((message) => (
            <Box
              key={message.id}
              sx={{
                display: 'flex',
                justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
                mb: 2,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  gap: 1,
                  maxWidth: '80%',
                  flexDirection: message.role === 'user' ? 'row-reverse' : 'row',
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: message.role === 'user' ? 'primary.main' : 'secondary.main',
                    width: 36,
                    height: 36,
                  }}
                >
                  {message.role === 'user' ? user?.full_name?.charAt(0) : <BotIcon />}
                </Avatar>
                <Paper
                  elevation={1}
                  sx={{
                    p: 2,
                    bgcolor: message.role === 'user' ? 'primary.main' : 'grey.100',
                    color: message.role === 'user' ? 'white' : 'text.primary',
                    borderRadius: 2,
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  <Typography variant="body2">{message.content}</Typography>
                </Paper>
              </Box>
            </Box>
          ))}
          {loading && (
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <Avatar sx={{ bgcolor: 'secondary.main', width: 36, height: 36 }}>
                <BotIcon />
              </Avatar>
              <Paper elevation={1} sx={{ p: 2, bgcolor: 'grey.100' }}>
                <CircularProgress size={20} />
              </Paper>
            </Box>
          )}
          <div ref={messagesEndRef} />
        </CardContent>

        {/* Input */}
        <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              multiline
              maxRows={3}
              placeholder="Nhập câu hỏi của bạn..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
              size="small"
            />
            <IconButton
              color="primary"
              onClick={handleSend}
              disabled={loading || !input.trim()}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default AIChatbot;
