import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Chip,
  CircularProgress,
  LinearProgress,
} from '@mui/material';
import {
  Search as SearchIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import groupService from '../../services/groupService';

const GroupList = () => {
  const navigate = useNavigate();
  const { isLecturer, isStudent } = useAuth();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    setLoading(true);
    try {
      const data = await groupService.getGroups();
      setGroups(data.items || data);
    } catch (err) {
      console.error('Failed to fetch groups:', err);
      // Demo data
      setGroups([
        { id: 1, name: 'Nhóm Alpha', project: { title: 'Hệ thống quản lý thư viện' }, progress: 75, members_count: 4 },
        { id: 2, name: 'Nhóm Beta', project: { title: 'Website bán hàng' }, progress: 50, members_count: 5 },
        { id: 3, name: 'Nhóm Gamma', project: { title: 'Ứng dụng học từ vựng' }, progress: 30, members_count: 3 },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredGroups = groups.filter(
    (group) =>
      group.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.project?.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'success';
    if (progress >= 50) return 'primary';
    if (progress >= 20) return 'warning';
    return 'error';
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold">
            {isLecturer ? 'Nhóm sinh viên hướng dẫn' : 'Danh sách nhóm'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Quản lý và theo dõi tiến độ các nhóm
          </Typography>
        </Box>
      </Box>

      {/* Search */}
      <TextField
        fullWidth
        placeholder="Tìm kiếm theo tên nhóm hoặc đề tài..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        size="small"
        sx={{ mb: 3 }}
      />

      {/* Groups Grid */}
      {filteredGroups.length === 0 ? (
        <Card>
          <CardContent>
            <Typography color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
              Không tìm thấy nhóm nào
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {filteredGroups.map((group) => (
            <Grid item xs={12} sm={6} md={4} key={group.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {group.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {group.project?.title || 'Chưa có đề tài'}
                  </Typography>

                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Tiến độ</Typography>
                      <Typography variant="body2" fontWeight="bold">
                        {group.progress || 0}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={group.progress || 0}
                      color={getProgressColor(group.progress || 0)}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>

                  <Chip
                    label={`${group.members_count || 0} thành viên`}
                    size="small"
                    variant="outlined"
                  />
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    startIcon={<ViewIcon />}
                    onClick={() => navigate(`/groups/${group.id}`)}
                  >
                    Xem chi tiết
                  </Button>
                  {isStudent && (
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => navigate(`/groups/${group.id}/workspace`)}
                    >
                      Vào làm việc
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default GroupList;
