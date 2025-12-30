import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Chip,
  Avatar,
  AvatarGroup,
  LinearProgress,
  Divider,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemAvatar,
  Tabs,
  Tab,
} from '@mui/material';
import {
  ArrowBack as BackIcon,
  Person as PersonIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  PlayArrow as PlayIcon,
  BarChart as ChartIcon,
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import groupService from '../../services/groupService';
import { ContributionChart } from '../../components/Group';

const GroupDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLecturer, isStudent } = useAuth();
  const [group, setGroup] = useState(null);
  const [members, setMembers] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    fetchGroupData();
  }, [id]);

  const fetchGroupData = async () => {
    setLoading(true);
    try {
      const [groupData, membersData, milestonesData, tasksData] = await Promise.all([
        groupService.getGroupById(id),
        groupService.getMembers(id),
        groupService.getMilestones(id),
        groupService.getTasks(id),
      ]);
      
      setGroup(groupData);
      setMembers(membersData.items || membersData);
      setMilestones(milestonesData.items || milestonesData);
      setTasks(tasksData.items || tasksData);
    } catch (err) {
      console.error('Failed to fetch group data:', err);
      // Demo data
      setGroup({
        id: 1,
        name: 'Nhóm Alpha',
        project: { title: 'Hệ thống quản lý thư viện', description: 'Xây dựng hệ thống quản lý thư viện hoàn chỉnh' },
        progress: 65,
      });
      setMembers([
        { id: 1, user: { full_name: 'Nguyễn Văn A', email: 'a@email.com' }, role: 'leader' },
        { id: 2, user: { full_name: 'Trần Thị B', email: 'b@email.com' }, role: 'member' },
        { id: 3, user: { full_name: 'Lê Văn C', email: 'c@email.com' }, role: 'member' },
      ]);
      setMilestones([
        { id: 1, title: 'Phân tích yêu cầu', is_completed: true, week: 1 },
        { id: 2, title: 'Thiết kế hệ thống', is_completed: true, week: 2 },
        { id: 3, title: 'Phát triển Backend', is_completed: false, week: 4 },
      ]);
      setTasks([
        { id: 1, title: 'Thiết kế database', status: 'completed', assignee: { full_name: 'Nguyễn Văn A' } },
        { id: 2, title: 'Xây dựng API', status: 'in_progress', assignee: { full_name: 'Trần Thị B' } },
        { id: 3, title: 'Viết test', status: 'todo', assignee: { full_name: 'Lê Văn C' } },
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

  if (!group) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography>Không tìm thấy nhóm</Typography>
        <Button onClick={() => navigate('/groups')}>Quay lại</Button>
      </Box>
    );
  }

  const completedMilestones = milestones.filter(m => m.is_completed).length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Button startIcon={<BackIcon />} onClick={() => navigate('/groups')}>
          Quay lại
        </Button>
        {isStudent && (
          <Button
            variant="contained"
            startIcon={<PlayIcon />}
            onClick={() => navigate(`/groups/${id}/workspace`)}
          >
            Vào làm việc
          </Button>
        )}
      </Box>

      {/* Tabs */}
      <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)} sx={{ mb: 3 }}>
        <Tab label="Tổng quan" />
        <Tab icon={<ChartIcon />} label="Đóng góp thành viên" iconPosition="start" />
      </Tabs>

      {activeTab === 1 ? (
        <ContributionChart groupId={id} />
      ) : (
      <Grid container spacing={3}>
        {/* Main Info */}
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                {group.name}
              </Typography>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                {group.project?.title || 'Chưa có đề tài'}
              </Typography>
              <Typography variant="body2" sx={{ mb: 3 }}>
                {group.project?.description || 'Không có mô tả'}
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="subtitle2">Tiến độ tổng thể</Typography>
                  <Typography variant="subtitle2" fontWeight="bold">
                    {group.progress || 0}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={group.progress || 0}
                  sx={{ height: 12, borderRadius: 6 }}
                />
              </Box>

              <Divider sx={{ my: 2 }} />

              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <Typography variant="h4" fontWeight="bold" color="primary">
                    {members.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Thành viên
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="h4" fontWeight="bold" color="success.main">
                    {completedMilestones}/{milestones.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Milestones
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="h4" fontWeight="bold" color="secondary.main">
                    {completedTasks}/{tasks.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Tasks
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Milestones */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Milestones
              </Typography>
              <List>
                {milestones.map((milestone) => (
                  <ListItem key={milestone.id}>
                    <ListItemIcon>
                      {milestone.is_completed ? (
                        <CheckCircleIcon color="success" />
                      ) : (
                        <ScheduleIcon color="disabled" />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Chip label={`Tuần ${milestone.week}`} size="small" />
                          <Typography>{milestone.title}</Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>

          {/* Tasks */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Công việc gần đây
              </Typography>
              <List>
                {tasks.slice(0, 5).map((task) => (
                  <ListItem key={task.id}>
                    <ListItemIcon>
                      {task.status === 'completed' ? (
                        <CheckCircleIcon color="success" />
                      ) : (
                        <ScheduleIcon color={task.status === 'in_progress' ? 'primary' : 'disabled'} />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary={task.title}
                      secondary={`Phân công: ${task.assignee?.full_name || 'Chưa phân công'}`}
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
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          {/* Members */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Thành viên nhóm
              </Typography>
              <List>
                {members.map((member) => (
                  <ListItem key={member.id}>
                    <ListItemAvatar>
                      <Avatar>
                        {member.user?.full_name?.charAt(0) || 'U'}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={member.user?.full_name}
                      secondary={member.user?.email}
                    />
                    {member.role === 'leader' && (
                      <Chip label="Nhóm trưởng" size="small" color="primary" />
                    )}
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

export default GroupDetail;
