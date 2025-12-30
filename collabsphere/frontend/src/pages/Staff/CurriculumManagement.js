import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Alert,
  CircularProgress,
  InputAdornment,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Upload as UploadIcon,
  Book as BookIcon,
} from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import subjectService from '../../services/subjectService';
import { ExcelImport } from '../../components/Import';

const CURRICULUM_TEMPLATE_COLUMNS = [
  { key: 'code', label: 'Mã giáo trình', required: true, example: 'CUR-CS101' },
  { key: 'name', label: 'Tên giáo trình', required: true, example: 'Giáo trình lập trình cơ bản' },
  { key: 'subject_code', label: 'Mã môn học', required: true, example: 'CS101' },
  { key: 'description', label: 'Mô tả', required: false, example: 'Nội dung giáo trình...' },
  { key: 'objectives', label: 'Mục tiêu', required: false, example: 'Mục tiêu 1; Mục tiêu 2' },
];

const CurriculumManagement = () => {
  const [curricula, setCurricula] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [openImportDialog, setOpenImportDialog] = useState(false);
  const [editingCurriculum, setEditingCurriculum] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [curriculaData, subjectsData] = await Promise.all([
        subjectService.getAllCurricula(),
        subjectService.getSubjects(),
      ]);
      setCurricula(curriculaData.items || curriculaData || []);
      setSubjects(subjectsData.items || subjectsData || []);
    } catch (err) {
      console.error('Failed to fetch data:', err);
      // Demo data
      setCurricula([
        {
          id: 1,
          code: 'CUR-CS101',
          name: 'Giáo trình lập trình Python cơ bản',
          subject: { code: 'CS101', name: 'Lập trình cơ bản' },
          description: 'Giáo trình dành cho sinh viên năm nhất',
          objectives: ['Hiểu cú pháp Python', 'Viết được chương trình đơn giản'],
          created_at: new Date().toISOString(),
        },
        {
          id: 2,
          code: 'CUR-CS201',
          name: 'Giáo trình cấu trúc dữ liệu và giải thuật',
          subject: { code: 'CS201', name: 'Cấu trúc dữ liệu' },
          description: 'Giáo trình nâng cao về CTDL',
          objectives: ['Nắm vững các cấu trúc dữ liệu cơ bản', 'Phân tích độ phức tạp'],
          created_at: new Date().toISOString(),
        },
      ]);
      setSubjects([
        { id: 1, code: 'CS101', name: 'Lập trình cơ bản' },
        { id: 2, code: 'CS201', name: 'Cấu trúc dữ liệu' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      // Parse objectives from string to array
      const objectives = data.objectives 
        ? data.objectives.split(';').map(o => o.trim()).filter(o => o)
        : [];
      
      const curriculumData = {
        code: data.code,
        name: data.name,
        description: data.description || '',
        objectives: objectives,
      };
      
      if (editingCurriculum) {
        await subjectService.updateCurriculum(editingCurriculum.id, curriculumData);
        toast.success('Cập nhật giáo trình thành công');
      } else {
        // Create requires subject_id
        await subjectService.createCurriculum(data.subject_id, curriculumData);
        toast.success('Tạo giáo trình thành công');
      }
      setOpenDialog(false);
      reset();
      setEditingCurriculum(null);
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Thao tác thất bại');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (curriculum) => {
    setEditingCurriculum(curriculum);
    setValue('code', curriculum.code);
    setValue('name', curriculum.name);
    setValue('subject_id', curriculum.subject?.id);
    setValue('description', curriculum.description);
    setValue('objectives', curriculum.objectives?.join('; '));
    setOpenDialog(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa giáo trình này?')) return;
    try {
      await subjectService.deleteCurriculum(id);
      toast.success('Đã xóa giáo trình');
      fetchData();
    } catch (err) {
      toast.error('Xóa thất bại');
    }
  };

  const handleImport = async (file) => {
    try {
      const result = await subjectService.importCurricula(file);
      toast.success(`Import thành công ${result.success_count} giáo trình`);
      if (result.errors && result.errors.length > 0) {
        result.errors.forEach(err => toast.warning(err));
      }
      fetchData();
      return result;
    } catch (err) {
      throw new Error(err.response?.data?.detail || 'Import thất bại');
    }
  };

  const columns = [
    { field: 'code', headerName: 'Mã giáo trình', width: 130 },
    { field: 'name', headerName: 'Tên giáo trình', flex: 1, minWidth: 200 },
    {
      field: 'subject',
      headerName: 'Môn học',
      width: 180,
      renderCell: (params) => (
        <Chip
          icon={<BookIcon />}
          label={params.row.subject?.name || '-'}
          size="small"
          variant="outlined"
        />
      ),
    },
    {
      field: 'objectives',
      headerName: 'Mục tiêu',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={`${params.row.objectives?.length || 0} mục tiêu`}
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
          <IconButton size="small" onClick={() => handleEdit(params.row)}>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" color="error" onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
  ];

  const filteredCurricula = curricula.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          Quản lý Giáo trình
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<UploadIcon />}
            onClick={() => setOpenImportDialog(true)}
          >
            Import Excel
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              setEditingCurriculum(null);
              reset();
              setOpenDialog(true);
            }}
          >
            Thêm giáo trình
          </Button>
        </Box>
      </Box>

      <Card>
        <CardContent>
          <TextField
            placeholder="Tìm kiếm giáo trình..."
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
            rows={filteredCurricula}
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

      {/* Create/Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>
            {editingCurriculum ? 'Chỉnh sửa giáo trình' : 'Thêm giáo trình mới'}
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Mã giáo trình"
                  {...register('code', { required: 'Vui lòng nhập mã' })}
                  error={!!errors.code}
                  helperText={errors.code?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Môn học"
                  select
                  SelectProps={{ native: true }}
                  {...register('subject_id', { required: 'Vui lòng chọn môn học' })}
                  error={!!errors.subject_id}
                  helperText={errors.subject_id?.message}
                >
                  <option value="">-- Chọn môn học --</option>
                  {subjects.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.code} - {s.name}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Tên giáo trình"
                  {...register('name', { required: 'Vui lòng nhập tên' })}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Mô tả"
                  multiline
                  rows={2}
                  {...register('description')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Mục tiêu (phân cách bằng dấu ;)"
                  multiline
                  rows={3}
                  {...register('objectives')}
                  helperText="Ví dụ: Mục tiêu 1; Mục tiêu 2; Mục tiêu 3"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Hủy</Button>
            <Button type="submit" variant="contained" disabled={submitting}>
              {submitting ? <CircularProgress size={24} /> : (editingCurriculum ? 'Cập nhật' : 'Tạo')}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Import Dialog */}
      <ExcelImport
        open={openImportDialog}
        onClose={() => setOpenImportDialog(false)}
        onImport={handleImport}
        templateColumns={CURRICULUM_TEMPLATE_COLUMNS}
        title="Import Giáo trình từ Excel"
        templateName="curriculum"
      />
    </Box>
  );
};

export default CurriculumManagement;
