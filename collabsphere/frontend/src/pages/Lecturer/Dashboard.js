import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Assignment as AssignmentIcon,
  Groups as GroupsIcon,
  Class as ClassIcon,
  Add as AddIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import projectService from '../../services/projectService';
import groupService from '../../services/groupService';
import config from '../../config';

const StatCard = ({ title, value, icon, color, onClick }) => (
  <Card 
    sx={{ cursor: onClick ? 'pointer' : 'default' }}
    onClick={onClick}
  >
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Typography color="text.secondary" variant="body2" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h4" fontWeight="bold">
            {value}
          </Typography>
        </Box>
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: 2,
            bgcolor: `${color}.light`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {React.cloneElement(icon, { sx: { fontSize: 28, color: `${color}.main` } })}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const LecturerDashboard = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [groups, setGroups] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [projectsRes, groupsRes, statsRes] = await Promise.all([
        projectService.getMyProjects(),
        groupService.getGroups(),
        projectService.getLecturerStatistics(),
      ]);
      setProjects(projectsRes.items || projectsRes);
      setGroups(groupsRes.items || groupsRes);
      setStats(statsRes);
    } catch (err) {
      console.error('Failed to fetch data:', err);
      toast.error('Không thể tải dữ liệu');
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

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Dashboard Giảng viên
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Quản lý đề tài và theo dõi tiến độ nhóm sinh viên
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/projects/create')}
        >
          Tạo đề tài mới
        </Button>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <StatCard
            title="Đề tài của tôi"
            value={stats?.total_projects || 0}
            icon={<AssignmentIcon />}
            color="primary"
            onClick={() => navigate('/projects')}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatCard
            title="Đề tài đã duyệt"
            value={stats?.approved_projects || 0}
            icon={<ClassIcon />}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatCard
            title="Nhóm hướng dẫn"
            value={stats?.groups || 0}
            icon={<GroupsIcon />}
            color="secondary"
            onClick={() => navigate('/groups')}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Recent Projects */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Đề tài gần đây</Typography>
                <Button size="small" onClick={() => navigate('/projects')}>
                  Xem tất cả
                </Button>
              </Box>
              <List>
                {projects.slice(0, 5).map((project, index) => (
                  <React.Fragment key={project.id}>
                    {index > 0 && <Divider />}
                    <ListItem>
                      <ListItemText
                        primary={project.title}
                        secondary={`Trạng thái: ${config.PROJECT_STATUS[project.status] || project.status}`}
                      />
                      <ListItemSecondaryAction>
                        <Chip
                          label={config.PROJECT_STATUS[project.status] || project.status}
                          size="small"
                          color={
                            project.status === 'approved' || project.status === 'active' ? 'success' :
                            project.status === 'pending' ? 'warning' :
                            project.status === 'rejected' ? 'error' : 'default'
                          }
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Groups */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Nhóm sinh viên</Typography>
                <Button size="small" onClick={() => navigate('/groups')}>
                  Xem tất cả
                </Button>
              </Box>
              <List>
                {groups.slice(0, 5).map((group, index) => (
                  <React.Fragment key={group.id}>
                    {index > 0 && <Divider />}
                    <ListItem>
                      <ListItemText
                        primary={group.name}
                        secondary={group.project?.title || 'Chưa có đề tài'}
                      />
                      <ListItemSecondaryAction>
                        <Chip
                          label={`${group.progress || 0}%`}
                          size="small"
                          color={
                            (group.progress || 0) >= 80 ? 'success' :
                            (group.progress || 0) >= 50 ? 'primary' :
                            (group.progress || 0) >= 20 ? 'warning' : 'error'
                          }
                          sx={{ mr: 1 }}
                        />
                        <IconButton
                          edge="end"
                          size="small"
                          onClick={() => navigate(`/groups/${group.id}`)}
                        >
                          <ViewIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LecturerDashboard;
