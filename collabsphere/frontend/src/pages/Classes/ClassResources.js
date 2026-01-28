import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Breadcrumbs,
  Link,
} from '@mui/material';
import {
  ArrowBack as BackIcon,
  Class as ClassIcon,
} from '@mui/icons-material';
import ResourceManager from '../../components/Common/ResourceManager';
import classService from '../../services/classService';
import { useAuth } from '../../context/AuthContext';

const ClassResources = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [classData, setClassData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClass();
  }, [id]);

  const fetchClass = async () => {
    setLoading(true);
    try {
      const data = await classService.getClassById(id);
      setClassData(data);
    } catch (err) {
      console.error('Failed to fetch class:', err);
    } finally {
      setLoading(false);
    }
  };

  const canUpload = user?.role === 'lecturer' || user?.role === 'admin';

  return (
    <Box>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link
          underline="hover"
          color="inherit"
          onClick={() => navigate('/classes')}
          sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
        >
          <ClassIcon sx={{ mr: 0.5 }} fontSize="small" />
          Lớp học
        </Link>
        <Link
          underline="hover"
          color="inherit"
          onClick={() => navigate(`/classes/${id}`)}
          sx={{ cursor: 'pointer' }}
        >
          {classData?.name || 'Chi tiết'}
        </Link>
        <Typography color="text.primary">Tài nguyên</Typography>
      </Breadcrumbs>

      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button startIcon={<BackIcon />} onClick={() => navigate(`/classes/${id}`)}>
            Quay lại
          </Button>
          <Box>
            <Typography variant="h5" fontWeight="bold">
              Tài nguyên lớp học
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {classData?.name} - {classData?.subject?.name}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Resource Manager */}
      <ResourceManager classId={id} canUpload={canUpload} />
    </Box>
  );
};

export default ClassResources;
