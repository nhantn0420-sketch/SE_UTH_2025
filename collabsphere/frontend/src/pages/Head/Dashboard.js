import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Assignment as AssignmentIcon,
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  Cancel as CancelIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import projectService from '../../services/projectService';

const StatCard = ({ title, value, icon, color }) => (
  <Card>
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

const HeadDashboard = () => {
  const navigate = useNavigate();
  const [pendingProjects, setPendingProjects] = useState([]);
  const [stats, setStats] = useState({
    pending: 0,
    approved: 0,
    rejected: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const projects = await projectService.getPendingProjects();
      setPendingProjects(projects.items || projects);
      
      // Calculate stats
      const allProjects = await projectService.getProjects();
      const projectList = allProjects.items || allProjects;
      setStats({
        pending: projectList.filter(p => p.status === 'pending').length,
        approved: projectList.filter(p => p.status === 'approved').length,
        rejected: projectList.filter(p => p.status === 'rejected').length,
      });
    } catch (err) {
      console.error('Failed to fetch data:', err);
      // Demo data
      setPendingProjects([
        { id: 1, title: 'Hệ thống quản lý thư viện', lecturer: { full_name: 'Nguyễn Văn A' }, created_at: new Date() },
        { id: 2, title: 'Ứng dụng học từ vựng', lecturer: { full_name: 'Trần Thị B' }, created_at: new Date() },
      ]);
      setStats({ pending: 5, approved: 20, rejected: 3 });
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
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Dashboard Trưởng bộ môn
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Duyệt đề tài và quản lý dự án trong bộ môn
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <StatCard
            title="Chờ duyệt"
            value={stats.pending}
            icon={<PendingIcon />}
            color="warning"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatCard
            title="Đã duyệt"
            value={stats.approved}
            icon={<CheckCircleIcon />}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatCard
            title="Từ chối"
            value={stats.rejected}
            icon={<CancelIcon />}
            color="error"
          />
        </Grid>
      </Grid>

      {/* Pending Projects */}
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">
              Đề tài chờ duyệt
            </Typography>
            <Button
              variant="outlined"
              onClick={() => navigate('/head/approvals')}
            >
              Xem tất cả
            </Button>
          </Box>

          {pendingProjects.length === 0 ? (
            <Typography color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
              Không có đề tài nào chờ duyệt
            </Typography>
          ) : (
            <List>
              {pendingProjects.slice(0, 5).map((project, index) => (
                <React.Fragment key={project.id}>
                  {index > 0 && <Divider />}
                  <ListItem>
                    <ListItemText
                      primary={project.title}
                      secondary={`Giảng viên: ${project.lecturer?.full_name || 'N/A'}`}
                    />
                    <ListItemSecondaryAction>
                      <Chip
                        label="Chờ duyệt"
                        size="small"
                        color="warning"
                        sx={{ mr: 1 }}
                      />
                      <IconButton
                        edge="end"
                        onClick={() => navigate(`/projects/${project.id}`)}
                      >
                        <ViewIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                </React.Fragment>
              ))}
            </List>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default HeadDashboard;
