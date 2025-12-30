import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Grid,
  Avatar,
  Chip,
  CircularProgress,
  Alert,
  Badge,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  Chat as ChatIcon,
  Group as GroupIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import groupService from '../../services/groupService';

const ChatList = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    setLoading(true);
    try {
      const data = await groupService.getGroups();
      const groupList = data.items || data || [];
      setGroups(groupList);
    } catch (err) {
      console.error('Failed to fetch groups:', err);
      // Demo data
      setGroups([
        { 
          id: 1, 
          name: 'Nhóm 1 - Quản lý thư viện', 
          project: { title: 'Hệ thống quản lý thư viện' },
          members: [
            { user: { full_name: 'Nguyễn Văn A', avatar_url: null } },
            { user: { full_name: 'Trần Thị B', avatar_url: null } },
            { user: { full_name: 'Lê Văn C', avatar_url: null } },
          ],
          unread_count: 3,
          last_message: { content: 'Chào mọi người!', created_at: new Date().toISOString() }
        },
        { 
          id: 2, 
          name: 'Nhóm 2 - App từ vựng', 
          project: { title: 'Ứng dụng học tiếng Anh' },
          members: [
            { user: { full_name: 'Phạm Văn D', avatar_url: null } },
            { user: { full_name: 'Hoàng Thị E', avatar_url: null } },
          ],
          unread_count: 0,
          last_message: { content: 'OK, mình đã cập nhật rồi', created_at: new Date().toISOString() }
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChat = (groupId) => {
    navigate(`/chat/${groupId}`);
  };

  const filteredGroups = groups.filter(
    (g) => 
      g.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.project?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Trò chuyện
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Chọn nhóm để bắt đầu trò chuyện
      </Typography>

      {/* Search */}
      <TextField
        fullWidth
        placeholder="Tìm kiếm nhóm..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        size="small"
        sx={{ mb: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      {groups.length === 0 ? (
        <Alert severity="info">
          Bạn chưa tham gia nhóm nào. Liên hệ giảng viên để được thêm vào nhóm.
        </Alert>
      ) : filteredGroups.length === 0 ? (
        <Alert severity="info">
          Không tìm thấy nhóm nào phù hợp.
        </Alert>
      ) : (
        <Grid container spacing={2}>
          {filteredGroups.map((group) => (
            <Grid item xs={12} md={6} key={group.id}>
              <Card sx={{ height: '100%' }}>
                <CardActionArea onClick={() => handleOpenChat(group.id)}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      <Badge
                        badgeContent={group.unread_count}
                        color="error"
                        invisible={!group.unread_count}
                      >
                        <Avatar
                          sx={{
                            width: 56,
                            height: 56,
                            bgcolor: 'primary.main',
                          }}
                        >
                          <ChatIcon />
                        </Avatar>
                      </Badge>
                      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                        <Typography variant="h6" noWrap>
                          {group.name}
                        </Typography>
                        {group.project && (
                          <Chip
                            label={group.project.title}
                            size="small"
                            variant="outlined"
                            sx={{ mt: 0.5, mb: 1 }}
                          />
                        )}
                        {group.last_message && (
                          <Typography 
                            variant="body2" 
                            color="text.secondary" 
                            noWrap
                            sx={{ mt: 1 }}
                          >
                            {group.last_message.content}
                          </Typography>
                        )}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                          <GroupIcon fontSize="small" color="action" />
                          <Typography variant="caption" color="text.secondary">
                            {group.members?.length || 0} thành viên
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ChatList;
