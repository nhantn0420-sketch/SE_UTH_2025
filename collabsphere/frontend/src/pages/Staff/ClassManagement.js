import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  Alert,
  MenuItem,
  Chip,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Upload as UploadIcon,
  Refresh as RefreshIcon,
  People as PeopleIcon,
} from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import classService from '../../services/classService';
import subjectService from '../../services/subjectService';
import userService from '../../services/userService';

const SEMESTERS = [
  { value: 'HK1_2024', label: 'Học kỳ 1 - 2024' },
  { value: 'HK2_2024', label: 'Học kỳ 2 - 2024' },
  { value: 'HK1_2025', label: 'Học kỳ 1 - 2025' },
  { value: 'HK2_2025', label: 'Học kỳ 2 - 2025' },
];

const ClassManagement = () => {
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, classItem: null });
  const [importDialog, setImportDialog] = useState(false);
  const [importFile, setImportFile] = useState(null);
  const [membersDialog, setMembersDialog] = useState({ open: false, classItem: null });

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [classesRes, subjectsRes, lecturersRes] = await Promise.all([
        classService.getClasses(),
        subjectService.getSubjects(),
        userService.getLecturers(),
      ]);
      setClasses(classesRes.items || classesRes);
      setSubjects(subjectsRes.items || subjectsRes);
      setLecturers(lecturersRes.items || lecturersRes);
    } catch (err) {
      console.error('Failed to fetch data:', err);
      toast.error('Không thể tải dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (classItem = null) => {
    setEditingClass(classItem);
    if (classItem) {
      reset(classItem);
    } else {
      reset({ code: '', name: '', subject_id: '', lecturer_id: '', semester: '', max_students: 40 });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingClass(null);
    reset();
  };

  const onSubmit = async (data) => {
    try {
      if (editingClass) {
        await classService.updateClass(editingClass.id, data);
        toast.success('Cập nhật lớp học thành công');
      } else {
        await classService.createClass(data);
        toast.success('Thêm lớp học thành công');
      }
      handleCloseDialog();
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Thao tác thất bại');
    }
  };

  const handleDelete = async () => {
    try {
      await classService.deleteClass(deleteDialog.classItem.id);
      toast.success('Xóa lớp học thành công');
      setDeleteDialog({ open: false, classItem: null });
      fetchData();
    } catch (err) {
      toast.error('Xóa lớp học thất bại');
    }
  };

  const handleImport = async () => {
    if (!importFile) {
      toast.error('Vui lòng chọn file');
      return;
    }
    try {
      const result = await classService.importClasses(importFile);
      toast.success(`Import thành công ${result.success_count} lớp học`);
      setImportDialog(false);
      setImportFile(null);
      fetchData();
    } catch (err) {
      toast.error('Import thất bại');
    }
  };

  const columns = [
    { field: 'code', headerName: 'Mã lớp', width: 120 },
    { field: 'name', headerName: 'Tên lớp', flex: 1, minWidth: 180 },
    {
      field: 'subject',
      headerName: 'Môn học',
      width: 150,
      renderCell: (params) => params.row.subject?.name || '-',
    },
    {
      field: 'lecturer',
      headerName: 'Giảng viên',
      width: 150,
      renderCell: (params) => params.row.lecturer?.full_name || '-',
    },
    {
      field: 'semester',
      headerName: 'Học kỳ',
      width: 130,
      renderCell: (params) => (
        <Chip label={params.value} size="small" color="primary" variant="outlined" />
      ),
    },
    {
      field: 'student_count',
      headerName: 'Sĩ số',
      width: 100,
      renderCell: (params) => `${params.value || 0}/${params.row.max_students || 40}`,
    },
    {
      field: 'actions',
      headerName: 'Thao tác',
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <Tooltip title="Danh sách sinh viên">
            <IconButton
              size="small"
              onClick={() => setMembersDialog({ open: true, classItem: params.row })}
            >
              <PeopleIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Chỉnh sửa">
            <IconButton size="small" onClick={() => handleOpenDialog(params.row)}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xóa">
            <IconButton
              size="small"
              color="error"
              onClick={() => setDeleteDialog({ open: true, classItem: params.row })}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  const filteredClasses = classes.filter(
    (c) =>
      c.code?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Quản lý lớp học
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Thêm, sửa, xóa và quản lý lớp học
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button startIcon={<UploadIcon />} onClick={() => setImportDialog(true)}>
            Import
          </Button>
          <Button startIcon={<RefreshIcon />} onClick={fetchData}>
            Làm mới
          </Button>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenDialog()}>
            Thêm lớp học
          </Button>
        </Box>
      </Box>

      <Card>
        <CardContent>
          <TextField
            fullWidth
            placeholder="Tìm kiếm theo mã hoặc tên lớp học..."
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

          <Box sx={{ height: 500 }}>
            <DataGrid
              rows={filteredClasses}
              columns={columns}
              loading={loading}
              pageSize={10}
              rowsPerPageOptions={[10, 25, 50]}
              disableSelectionOnClick
            />
          </Box>
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>
            {editingClass ? 'Chỉnh sửa lớp học' : 'Thêm lớp học mới'}
          </DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Mã lớp"
              margin="normal"
              {...register('code', { required: 'Mã lớp là bắt buộc' })}
              error={!!errors.code}
              helperText={errors.code?.message}
            />
            <TextField
              fullWidth
              label="Tên lớp"
              margin="normal"
              {...register('name', { required: 'Tên lớp là bắt buộc' })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <TextField
              fullWidth
              select
              label="Môn học"
              margin="normal"
              {...register('subject_id', { required: 'Môn học là bắt buộc' })}
              error={!!errors.subject_id}
              helperText={errors.subject_id?.message}
              defaultValue=""
            >
              {subjects.map((subject) => (
                <MenuItem key={subject.id} value={subject.id}>
                  {subject.code} - {subject.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              select
              label="Giảng viên"
              margin="normal"
              {...register('lecturer_id')}
              defaultValue=""
            >
              <MenuItem value="">-- Chưa phân công --</MenuItem>
              {lecturers.map((lecturer) => (
                <MenuItem key={lecturer.id} value={lecturer.id}>
                  {lecturer.full_name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              select
              label="Học kỳ"
              margin="normal"
              {...register('semester', { required: 'Học kỳ là bắt buộc' })}
              error={!!errors.semester}
              helperText={errors.semester?.message}
              defaultValue=""
            >
              {SEMESTERS.map((sem) => (
                <MenuItem key={sem.value} value={sem.value}>
                  {sem.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              label="Sĩ số tối đa"
              type="number"
              margin="normal"
              {...register('max_students')}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Hủy</Button>
            <Button type="submit" variant="contained">
              {editingClass ? 'Cập nhật' : 'Thêm'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false, classItem: null })}>
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>
          <Typography>
            Bạn có chắc chắn muốn xóa lớp học <strong>{deleteDialog.classItem?.name}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, classItem: null })}>Hủy</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Xóa
          </Button>
        </DialogActions>
      </Dialog>

      {/* Import Dialog */}
      <Dialog open={importDialog} onClose={() => setImportDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Import lớp học</DialogTitle>
        <DialogContent>
          <Alert severity="info" sx={{ mb: 2 }}>
            Tải lên file Excel (.xlsx) hoặc CSV chứa danh sách lớp học.
          </Alert>
          <input
            type="file"
            accept=".xlsx,.xls,.csv"
            onChange={(e) => setImportFile(e.target.files[0])}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setImportDialog(false)}>Hủy</Button>
          <Button onClick={handleImport} variant="contained">
            Import
          </Button>
        </DialogActions>
      </Dialog>

      {/* Members Dialog */}
      <Dialog
        open={membersDialog.open}
        onClose={() => setMembersDialog({ open: false, classItem: null })}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Danh sách sinh viên - {membersDialog.classItem?.name}
        </DialogTitle>
        <DialogContent>
          <Typography color="text.secondary">
            Chức năng quản lý danh sách sinh viên sẽ được hiển thị ở đây.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setMembersDialog({ open: false, classItem: null })}>
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ClassManagement;
