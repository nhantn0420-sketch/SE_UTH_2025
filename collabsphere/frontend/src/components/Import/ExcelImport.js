import React, { useState, useRef } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  CircularProgress,
  Chip,
  IconButton,
} from '@mui/material';
import {
  CloudUpload as UploadIcon,
  Download as DownloadIcon,
  CheckCircle as SuccessIcon,
  Error as ErrorIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import * as XLSX from 'xlsx';

const ExcelImport = ({
  open,
  onClose,
  onImport,
  templateColumns,
  title = 'Import từ Excel',
  templateName = 'template',
}) => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imported, setImported] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setErrors([]);
    setImported(false);

    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      // Validate columns
      if (jsonData.length > 0) {
        const fileColumns = Object.keys(jsonData[0]);
        const missingColumns = templateColumns.filter(
          (col) => !fileColumns.includes(col.key) && col.required
        );

        if (missingColumns.length > 0) {
          setErrors([
            `Thiếu các cột bắt buộc: ${missingColumns.map((c) => c.label).join(', ')}`,
          ]);
          return;
        }
      }

      setData(jsonData);
    } catch (err) {
      setErrors(['Không thể đọc file. Vui lòng kiểm tra định dạng Excel.']);
    }
  };

  const handleDownloadTemplate = () => {
    const templateData = [
      templateColumns.reduce((acc, col) => {
        acc[col.key] = col.example || '';
        return acc;
      }, {}),
    ];

    const worksheet = XLSX.utils.json_to_sheet(templateData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Template');
    XLSX.writeFile(workbook, `${templateName}_template.xlsx`);
  };

  const handleImport = async () => {
    if (data.length === 0) return;

    setLoading(true);
    try {
      await onImport(data);
      setImported(true);
    } catch (err) {
      setErrors([err.message || 'Import thất bại']);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFile(null);
    setData([]);
    setErrors([]);
    setImported(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {title}
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        {/* Template download */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" gutterBottom>
            Bước 1: Tải template mẫu
          </Typography>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={handleDownloadTemplate}
          >
            Tải template Excel
          </Button>
        </Box>

        {/* Template columns info */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" gutterBottom>
            Các cột trong template:
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {templateColumns.map((col) => (
              <Chip
                key={col.key}
                label={col.label}
                size="small"
                color={col.required ? 'primary' : 'default'}
                variant={col.required ? 'filled' : 'outlined'}
              />
            ))}
          </Box>
        </Box>

        {/* File upload */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" gutterBottom>
            Bước 2: Chọn file Excel đã điền
          </Typography>
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <Button
            variant="contained"
            startIcon={<UploadIcon />}
            onClick={() => fileInputRef.current?.click()}
          >
            Chọn file
          </Button>
          {file && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              File đã chọn: <strong>{file.name}</strong>
            </Typography>
          )}
        </Box>

        {/* Errors */}
        {errors.length > 0 && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errors.map((error, index) => (
              <div key={index}>{error}</div>
            ))}
          </Alert>
        )}

        {/* Success */}
        {imported && (
          <Alert severity="success" icon={<SuccessIcon />} sx={{ mb: 2 }}>
            Import thành công {data.length} bản ghi!
          </Alert>
        )}

        {/* Preview */}
        {data.length > 0 && !imported && (
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Xem trước dữ liệu ({data.length} bản ghi):
            </Typography>
            <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
              <Table size="small" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    {templateColumns.map((col) => (
                      <TableCell key={col.key}>{col.label}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.slice(0, 10).map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      {templateColumns.map((col) => (
                        <TableCell key={col.key}>
                          {row[col.key] || '-'}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                  {data.length > 10 && (
                    <TableRow>
                      <TableCell colSpan={templateColumns.length + 1} align="center">
                        ... và {data.length - 10} bản ghi khác
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Đóng</Button>
        {data.length > 0 && !imported && (
          <Button
            variant="contained"
            onClick={handleImport}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            Import {data.length} bản ghi
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

// Predefined templates
export const USER_TEMPLATE_COLUMNS = [
  { key: 'email', label: 'Email', required: true, example: 'user@example.com' },
  { key: 'full_name', label: 'Họ và tên', required: true, example: 'Nguyễn Văn A' },
  { key: 'role', label: 'Vai trò', required: true, example: 'student' },
  { key: 'student_id', label: 'MSSV', required: false, example: '20210001' },
  { key: 'password', label: 'Mật khẩu', required: false, example: '123456' },
];

export const SUBJECT_TEMPLATE_COLUMNS = [
  { key: 'code', label: 'Mã môn', required: true, example: 'CS101' },
  { key: 'name', label: 'Tên môn', required: true, example: 'Lập trình cơ bản' },
  { key: 'credits', label: 'Số tín chỉ', required: true, example: '3' },
  { key: 'description', label: 'Mô tả', required: false, example: 'Môn học về lập trình' },
];

export const CLASS_TEMPLATE_COLUMNS = [
  { key: 'code', label: 'Mã lớp', required: true, example: 'CS101-01' },
  { key: 'name', label: 'Tên lớp', required: true, example: 'Lập trình cơ bản - Nhóm 1' },
  { key: 'subject_code', label: 'Mã môn', required: true, example: 'CS101' },
  { key: 'semester', label: 'Học kỳ', required: true, example: '2024.1' },
  { key: 'max_students', label: 'Sĩ số tối đa', required: false, example: '50' },
];

export const CLASS_MEMBER_TEMPLATE_COLUMNS = [
  { key: 'student_id', label: 'MSSV', required: true, example: '20210001' },
  { key: 'email', label: 'Email', required: false, example: 'student@example.com' },
];

export default ExcelImport;
