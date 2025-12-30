import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Divider,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Groups as GroupsIcon,
  Assignment as AssignmentIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  Chat as ChatIcon,
  Folder as FolderIcon,
  RateReview as ReviewIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import groupService from '../../services/groupService';
import { PeerReviewView } from '../../components/Evaluation';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [myGroup, setMyGroup] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const groupRes = await groupService.getMyGroup();
      setMyGroup(groupRes);
      
      if (groupRes?.id) {
        const tasksRes = await groupService.getTasks(groupRes.id);
        setTasks(tasksRes.items || tasksRes);
      }
    } catch (err) {
      console.error('Failed to fetch data:', err);
      // Demo data
      setMyGroup({
        id: 1,
        name: 'Nhóm Alpha',
        project: { title: 'Hệ thống quản lý thư viện' },
        progress: 65,
        members: [
          { id: 1, user: { full_name: 'Nguyễn Văn A' }, role: 'leader' },
          { id: 2, user: { full_name: 'Trần Thị B' }, role: 'member' },
          { id: 3, user: { full_name: 'Lê Văn C' }, role: 'member' },
        ],
      });
      setTasks([
        { id: 1, title: 'Thiết kế giao diện đăng nhập', status: 'completed', due_date: '2024-01-20' },
        { id: 2, title: 'Phát triển API xác thực', status: 'in_progress', due_date: '2024-01-25' },
        { id: 3, title: 'Viết test cases', status: 'todo', due_date: '2024-01-30' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const inProgressTasks = tasks.filter(t => t.status === 'in_progress').length;

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Dashboard Sinh viên
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
        Quản lý công việc và theo dõi tiến độ dự án
      </Typography>

      {/* Tabs */}
      <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)} sx={{ mb: 3 }}>
        <Tab label="Tổng quan" />
        <Tab icon={<ReviewIcon />} label="Đánh giá đã nhận" iconPosition="start" />
      </Tabs>

      {activeTab === 1 ? (
        <PeerReviewView />
      ) : (
      <Grid container spacing={3}>
        {/* My Group */}
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: 2,
                    bgcolor: 'primary.light',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <GroupsIcon sx={{ fontSize: 28, color: 'primary.main' }} />
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" fontWeight="bold">
                    {myGroup?.name || 'Chưa có nhóm'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {myGroup?.project?.title || 'Chưa có đề tài'}
                  </Typography>
                </Box>
                {myGroup && (
                  <Button
                    variant="contained"
                    onClick={() => navigate(`/groups/${myGroup.id}/workspace`)}
                  >
                    Vào làm việc
                  </Button>
                )}
              </Box>

              {myGroup && (
                <>
                  <Typography variant="subtitle2" gutterBottom>
                    Tiến độ dự án: {myGroup.progress || 0}%
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={myGroup.progress || 0}
                    sx={{ height: 10, borderRadius: 5, mb: 3 }}
                  />

                  <Typography variant="subtitle2" gutterBottom>
                    Thành viên nhóm
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {myGroup.members?.map((member) => (
                      <Chip
                        key={member.id}
                        label={member.user?.full_name}
                        color={member.role === 'leader' ? 'primary' : 'default'}
                        size="small"
                      />
                    ))}
                  </Box>
                </>
              )}
            </CardContent>
          </Card>

          {/* Tasks */}
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Công việc của tôi</Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Chip label={`Hoàn thành: ${completedTasks}`} size="small" color="success" />
                  <Chip label={`Đang làm: ${inProgressTasks}`} size="small" color="primary" />
                </Box>
              </Box>

              <List>
                {tasks.map((task, index) => (
                  <React.Fragment key={task.id}>
                    {index > 0 && <Divider />}
                    <ListItem>
                      <ListItemIcon>
                        {task.status === 'completed' ? (
                          <CheckCircleIcon color="success" />
                        ) : (
                          <ScheduleIcon color={task.status === 'in_progress' ? 'primary' : 'disabled'} />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={task.title}
                        secondary={`Deadline: ${task.due_date}`}
                        sx={{
                          textDecoration: task.status === 'completed' ? 'line-through' : 'none',
                        }}
                      />
                      <Chip
                        label={
                          task.status === 'completed' ? 'Hoàn thành' :
                          task.status === 'in_progress' ? 'Đang làm' : 'Chưa làm'
                        }
                        size="small"
                        color={
                          task.status === 'completed' ? 'success' :
                          task.status === 'in_progress' ? 'primary' : 'default'
                        }
                      />
                    </ListItem>
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Thao tác nhanh
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<ChatIcon />}
                  onClick={() => myGroup && navigate(`/chat/${myGroup.id}`)}
                  disabled={!myGroup}
                >
                  Trò chuyện nhóm
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<FolderIcon />}
                  onClick={() => navigate('/resources')}
                >
                  Tài liệu học tập
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<AssignmentIcon />}
                  onClick={() => navigate('/projects')}
                >
                  Xem đề tài
                </Button>
              </Box>
            </CardContent>
          </Card>

          {/* Upcoming Deadlines */}
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Deadline sắp tới
              </Typography>
              <List dense>
                {tasks
                  .filter(t => t.status !== 'completed')
                  .slice(0, 3)
                  .map((task) => (
                    <ListItem key={task.id}>
                      <ListItemIcon>
                        <ScheduleIcon fontSize="small" color="warning" />
                      </ListItemIcon>
                      <ListItemText
                        primary={task.title}
                        secondary={task.due_date}
                      />
                    </ListItem>
                  ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      )}
    </Box>
  );
};

export default StudentDashboard;
