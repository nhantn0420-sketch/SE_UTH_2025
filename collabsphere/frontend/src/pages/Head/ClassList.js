import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Chip,
  CircularProgress,
  InputAdornment,
  IconButton,
  Tooltip,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {
  Search as SearchIcon,
  Visibility as ViewIcon,
  Group as GroupIcon,
  Person as PersonIcon,
  School as SchoolIcon,
  Folder as FolderIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import classService from '../../services/classService';

const ClassList = () => {
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    setLoading(true);
    try {
      const data = await classService.getClasses();
      setClasses(data.items || data || []);
    } catch (err) {
      console.error('Failed to fetch classes:', err);
      toast.error('Không thể tải danh sách lớp học');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { field: 'code', headerName: 'Mã lớp', width: 130 },
    { field: 'name', headerName: 'Tên lớp', flex: 1, minWidth: 200 },
    {
      field: 'subject',
      headerName: 'Môn học',
      width: 180,
      renderCell: (params) => (
        <Chip
          icon={<SchoolIcon />}
          label={params.row.subject?.name || '-'}
          size="small"
          variant="outlined"
        />
      ),
    },
    {
      field: 'lecturer',
      headerName: 'Giảng viên',
      width: 180,
      renderCell: (params) => (
        params.row.lecturer ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PersonIcon fontSize="small" color="primary" />
            <Typography variant="body2">{params.row.lecturer.full_name}</Typography>
          </Box>
        ) : (
          <Chip label="Chưa phân công" size="small" color="warning" />
        )
      ),
    },
    {
      field: 'student_count',
      headerName: 'Sinh viên',
      width: 120,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <GroupIcon fontSize="small" color="action" />
          <Typography>{params.row.student_count || 0}</Typography>
        </Box>
      ),
    },
    { field: 'semester', headerName: 'Học kỳ', width: 130 },
    {
      field: 'status',
      headerName: 'Trạng thái',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.row.status === 'active' ? 'Hoạt động' : 'Chờ xử lý'}
          color={params.row.status === 'active' ? 'success' : 'warning'}
          size="small"
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Thao tác',
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <Tooltip title="Xem nhóm">
            <IconButton size="small" onClick={() => navigate(`/groups?classId=${params.row.id}`)}>
              <ViewIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Tài nguyên">
            <IconButton size="small" onClick={() => navigate(`/classes/${params.row.id}/resources`)}>
              <FolderIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  const filteredClasses = classes.filter(
    (c) =>
      c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.subject?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Danh sách Lớp học
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Xem tất cả các lớp học trong hệ thống
          </Typography>
        </Box>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" variant="body2" gutterBottom>
                Tổng số lớp
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                {classes.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" variant="body2" gutterBottom>
                Lớp có giảng viên
              </Typography>
              <Typography variant="h4" fontWeight="bold" color="success.main">
                {classes.filter(c => c.lecturer).length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" variant="body2" gutterBottom>
                Chưa phân công GV
              </Typography>
              <Typography variant="h4" fontWeight="bold" color="warning.main">
                {classes.filter(c => !c.lecturer).length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card>
        <CardContent>
          <TextField
            placeholder="Tìm kiếm lớp học..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ mb: 2, width: 300 }}
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          <DataGrid
            rows={filteredClasses}
            columns={columns}
            loading={loading}
            autoHeight
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
            disableSelectionOnClick
            sx={{ border: 'none' }}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default ClassList;
