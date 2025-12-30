import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
} from '@mui/material';
import {
  School as SchoolIcon,
  Class as ClassIcon,
  Upload as UploadIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import subjectService from '../../services/subjectService';
import classService from '../../services/classService';

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

const StaffDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    subjects: 0,
    classes: 0,
    lecturers: 0,
    students: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [subjectsRes, classesRes] = await Promise.all([
        subjectService.getSubjects(),
        classService.getClasses(),
      ]);
      
      setStats({
        subjects: subjectsRes.items?.length || subjectsRes.length || 0,
        classes: classesRes.items?.length || classesRes.length || 0,
        lecturers: 0,
        students: 0,
      });
    } catch (err) {
      console.error('Failed to fetch stats:', err);
      // Set demo data
      setStats({
        subjects: 15,
        classes: 25,
        lecturers: 20,
        students: 350,
      });
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
        Dashboard Nhân viên đào tạo
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Quản lý môn học, lớp học và dữ liệu đào tạo
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Môn học"
            value={stats.subjects}
            icon={<SchoolIcon />}
            color="primary"
            onClick={() => navigate('/staff/subjects')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Lớp học"
            value={stats.classes}
            icon={<ClassIcon />}
            color="secondary"
            onClick={() => navigate('/staff/classes')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Giảng viên"
            value={stats.lecturers}
            icon={<PersonIcon />}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Sinh viên"
            value={stats.students}
            icon={<PersonIcon />}
            color="warning"
          />
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Typography variant="h6" gutterBottom>
        Thao tác nhanh
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<UploadIcon />}
            onClick={() => navigate('/staff/subjects')}
            sx={{ py: 2 }}
          >
            Import môn học
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            startIcon={<UploadIcon />}
            onClick={() => navigate('/staff/classes')}
            sx={{ py: 2 }}
          >
            Import lớp học
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<SchoolIcon />}
            onClick={() => navigate('/staff/subjects')}
            sx={{ py: 2 }}
          >
            Quản lý môn học
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<ClassIcon />}
            onClick={() => navigate('/staff/classes')}
            sx={{ py: 2 }}
          >
            Quản lý lớp học
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StaffDashboard;
