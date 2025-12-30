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
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Upload as UploadIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import subjectService from '../../services/subjectService';

const SubjectManagement = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, subject: null });
  const [importDialog, setImportDialog] = useState(false);
  const [importFile, setImportFile] = useState(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    setLoading(true);
    try {
      const data = await subjectService.getSubjects();
      setSubjects(data.items || data);
    } catch (err) {
      console.error('Failed to fetch subjects:', err);
      toast.error('Không thể tải danh sách môn học');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (subject = null) => {
    setEditingSubject(subject);
    if (subject) {
      reset(subject);
    } else {
      reset({ code: '', name: '', credits: '', description: '' });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingSubject(null);
    reset();
  };

  const onSubmit = async (data) => {
    try {
      if (editingSubject) {
        await subjectService.updateSubject(editingSubject.id, data);
        toast.success('Cập nhật môn học thành công');
      } else {
        await subjectService.createSubject(data);
        toast.success('Thêm môn học thành công');
      }
      handleCloseDialog();
      fetchSubjects();
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Thao tác thất bại');
    }
  };

  const handleDelete = async () => {
    try {
      await subjectService.deleteSubject(deleteDialog.subject.id);
      toast.success('Xóa môn học thành công');
      setDeleteDialog({ open: false, subject: null });
      fetchSubjects();
    } catch (err) {
      toast.error('Xóa môn học thất bại');
    }
  };

  const handleImport = async () => {
    if (!importFile) {
      toast.error('Vui lòng chọn file');
      return;
    }
    try {
      const result = await subjectService.importSubjects(importFile);
      toast.success(`Import thành công ${result.success_count} môn học`);
      setImportDialog(false);
      setImportFile(null);
      fetchSubjects();
    } catch (err) {
      toast.error('Import thất bại');
    }
  };

  const columns = [
    { field: 'code', headerName: 'Mã môn', width: 120 },
    { field: 'name', headerName: 'Tên môn học', flex: 1, minWidth: 200 },
    { field: 'credits', headerName: 'Số tín chỉ', width: 100 },
    { field: 'description', headerName: 'Mô tả', flex: 1, minWidth: 200 },
    {
      field: 'actions',
      headerName: 'Thao tác',
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <Tooltip title="Chỉnh sửa">
            <IconButton size="small" onClick={() => handleOpenDialog(params.row)}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xóa">
            <IconButton
              size="small"
              color="error"
              onClick={() => setDeleteDialog({ open: true, subject: params.row })}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  const filteredSubjects = subjects.filter(
    (subject) =>
      subject.code?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subject.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Quản lý môn học
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Thêm, sửa, xóa và import môn học
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button startIcon={<UploadIcon />} onClick={() => setImportDialog(true)}>
            Import
          </Button>
          <Button startIcon={<RefreshIcon />} onClick={fetchSubjects}>
            Làm mới
          </Button>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenDialog()}>
            Thêm môn học
          </Button>
        </Box>
      </Box>

      <Card>
        <CardContent>
          <TextField
            fullWidth
            placeholder="Tìm kiếm theo mã hoặc tên môn học..."
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
              rows={filteredSubjects}
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
            {editingSubject ? 'Chỉnh sửa môn học' : 'Thêm môn học mới'}
          </DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Mã môn học"
              margin="normal"
              {...register('code', { required: 'Mã môn học là bắt buộc' })}
              error={!!errors.code}
              helperText={errors.code?.message}
            />
            <TextField
              fullWidth
              label="Tên môn học"
              margin="normal"
              {...register('name', { required: 'Tên môn học là bắt buộc' })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <TextField
              fullWidth
              label="Số tín chỉ"
              type="number"
              margin="normal"
              {...register('credits', { required: 'Số tín chỉ là bắt buộc' })}
              error={!!errors.credits}
              helperText={errors.credits?.message}
            />
            <TextField
              fullWidth
              label="Mô tả"
              margin="normal"
              multiline
              rows={3}
              {...register('description')}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Hủy</Button>
            <Button type="submit" variant="contained">
              {editingSubject ? 'Cập nhật' : 'Thêm'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false, subject: null })}>
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>
          <Typography>
            Bạn có chắc chắn muốn xóa môn học <strong>{deleteDialog.subject?.name}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, subject: null })}>Hủy</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Xóa
          </Button>
        </DialogActions>
      </Dialog>

      {/* Import Dialog */}
      <Dialog open={importDialog} onClose={() => setImportDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Import môn học</DialogTitle>
        <DialogContent>
          <Alert severity="info" sx={{ mb: 2 }}>
            Tải lên file Excel (.xlsx) hoặc CSV chứa danh sách môn học.
            File cần có các cột: code, name, credits, description
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
    </Box>
  );
};

export default SubjectManagement;
