import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Box,
  Typography,
  Paper,
  IconButton,
  LinearProgress,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Alert,
  Button,
} from '@mui/material';
import {
  CloudUpload as UploadIcon,
  InsertDriveFile as FileIcon,
  Close as CloseIcon,
  Description as DocIcon,
  PictureAsPdf as PdfIcon,
  Image as ImageIcon,
  Code as CodeIcon,
  VideoLibrary as VideoIcon,
  AudioFile as AudioIcon,
  Archive as ArchiveIcon,
  CheckCircle as CheckIcon,
} from '@mui/icons-material';

const FILE_ICONS = {
  'application/pdf': <PdfIcon sx={{ color: '#f44336' }} />,
  'application/msword': <DocIcon sx={{ color: '#2196f3' }} />,
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': <DocIcon sx={{ color: '#2196f3' }} />,
  'application/vnd.ms-excel': <DocIcon sx={{ color: '#4caf50' }} />,
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': <DocIcon sx={{ color: '#4caf50' }} />,
  'application/vnd.ms-powerpoint': <DocIcon sx={{ color: '#ff9800' }} />,
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': <DocIcon sx={{ color: '#ff9800' }} />,
  'image/jpeg': <ImageIcon sx={{ color: '#9c27b0' }} />,
  'image/png': <ImageIcon sx={{ color: '#9c27b0' }} />,
  'image/gif': <ImageIcon sx={{ color: '#9c27b0' }} />,
  'image/svg+xml': <ImageIcon sx={{ color: '#9c27b0' }} />,
  'video/mp4': <VideoIcon sx={{ color: '#e91e63' }} />,
  'video/mpeg': <VideoIcon sx={{ color: '#e91e63' }} />,
  'audio/mpeg': <AudioIcon sx={{ color: '#00bcd4' }} />,
  'audio/wav': <AudioIcon sx={{ color: '#00bcd4' }} />,
  'application/zip': <ArchiveIcon sx={{ color: '#607d8b' }} />,
  'application/x-rar-compressed': <ArchiveIcon sx={{ color: '#607d8b' }} />,
  'text/javascript': <CodeIcon sx={{ color: '#ff9800' }} />,
  'text/html': <CodeIcon sx={{ color: '#ff9800' }} />,
  'text/css': <CodeIcon sx={{ color: '#ff9800' }} />,
  'application/json': <CodeIcon sx={{ color: '#ff9800' }} />,
};

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
};

const getFileIcon = (file) => {
  const mimeType = file.type;
  return FILE_ICONS[mimeType] || <FileIcon sx={{ color: '#757575' }} />;
};

const FileUploadZone = ({
  onFilesSelected,
  maxFiles = 10,
  maxSize = 10485760, // 10MB default
  acceptedTypes = {},
  multiple = true,
  showPreview = true,
}) => {
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    // Handle rejected files
    if (rejectedFiles.length > 0) {
      rejectedFiles.forEach(({ file, errors }) => {
        errors.forEach((error) => {
          if (error.code === 'file-too-large') {
            alert(`File ${file.name} quá lớn. Tối đa ${formatFileSize(maxSize)}`);
          } else if (error.code === 'file-invalid-type') {
            alert(`File ${file.name} không đúng định dạng`);
          } else if (error.code === 'too-many-files') {
            alert(`Chỉ được tải tối đa ${maxFiles} files`);
          }
        });
      });
    }

    // Handle accepted files
    if (acceptedFiles.length > 0) {
      const newFiles = acceptedFiles.map((file) => ({
        file,
        id: `${file.name}-${Date.now()}`,
        preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
        uploaded: false,
      }));
      
      setFiles((prev) => [...prev, ...newFiles]);
      
      if (onFilesSelected) {
        onFilesSelected(acceptedFiles);
      }
    }
  }, [maxFiles, maxSize, onFilesSelected]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles,
    maxSize,
    accept: acceptedTypes,
    multiple,
  });

  const removeFile = (fileId) => {
    setFiles((prev) => {
      const file = prev.find((f) => f.id === fileId);
      if (file?.preview) {
        URL.revokeObjectURL(file.preview);
      }
      return prev.filter((f) => f.id !== fileId);
    });
    setUploadProgress((prev) => {
      const newProgress = { ...prev };
      delete newProgress[fileId];
      return newProgress;
    });
  };

  const simulateUpload = (fileId) => {
    // Simulate upload progress (replace with real upload logic)
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress((prev) => ({ ...prev, [fileId]: progress }));
      
      if (progress >= 100) {
        clearInterval(interval);
        setFiles((prev) =>
          prev.map((f) => (f.id === fileId ? { ...f, uploaded: true } : f))
        );
        setUploadedFiles((prev) => [...prev, fileId]);
      }
    }, 200);
  };

  const uploadAll = () => {
    files.forEach((file) => {
      if (!file.uploaded && !uploadProgress[file.id]) {
        simulateUpload(file.id);
      }
    });
  };

  const clearAll = () => {
    files.forEach((file) => {
      if (file.preview) {
        URL.revokeObjectURL(file.preview);
      }
    });
    setFiles([]);
    setUploadProgress({});
    setUploadedFiles([]);
  };

  return (
    <Box>
      {/* Drop Zone */}
      <Paper
        {...getRootProps()}
        sx={{
          p: 4,
          border: '2px dashed',
          borderColor: isDragActive ? 'primary.main' : 'grey.300',
          bgcolor: isDragActive ? 'primary.50' : 'grey.50',
          cursor: 'pointer',
          transition: 'all 0.3s',
          '&:hover': {
            borderColor: 'primary.main',
            bgcolor: 'primary.50',
          },
          textAlign: 'center',
        }}
      >
        <input {...getInputProps()} />
        <UploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
        <Typography variant="h6" gutterBottom>
          {isDragActive ? 'Thả file vào đây...' : 'Kéo thả file hoặc click để chọn'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Hỗ trợ: PDF, Word, Excel, PowerPoint, Images, Videos
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          Tối đa {maxFiles} files, mỗi file tối đa {formatFileSize(maxSize)}
        </Typography>
      </Paper>

      {/* File List */}
      {files.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              Files đã chọn ({files.length})
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                size="small"
                variant="contained"
                onClick={uploadAll}
                disabled={uploadedFiles.length === files.length}
              >
                Upload tất cả
              </Button>
              <Button size="small" variant="outlined" onClick={clearAll}>
                Xóa tất cả
              </Button>
            </Box>
          </Box>

          <List sx={{ bgcolor: 'background.paper', borderRadius: 1 }}>
            {files.map((fileItem) => (
              <ListItem
                key={fileItem.id}
                sx={{
                  borderBottom: 1,
                  borderColor: 'divider',
                  '&:last-child': { borderBottom: 0 },
                }}
              >
                <ListItemIcon>{getFileIcon(fileItem.file)}</ListItemIcon>
                
                {/* Preview for images */}
                {showPreview && fileItem.preview && (
                  <Box
                    component="img"
                    src={fileItem.preview}
                    alt={fileItem.file.name}
                    sx={{
                      width: 60,
                      height: 60,
                      objectFit: 'cover',
                      borderRadius: 1,
                      mr: 2,
                    }}
                  />
                )}

                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body2" noWrap sx={{ maxWidth: 300 }}>
                        {fileItem.file.name}
                      </Typography>
                      {fileItem.uploaded && (
                        <Chip
                          icon={<CheckIcon />}
                          label="Đã upload"
                          size="small"
                          color="success"
                          sx={{ height: 20 }}
                        />
                      )}
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        {formatFileSize(fileItem.file.size)}
                      </Typography>
                      {uploadProgress[fileItem.id] !== undefined && (
                        <Box sx={{ mt: 0.5 }}>
                          <LinearProgress
                            variant="determinate"
                            value={uploadProgress[fileItem.id]}
                            sx={{ height: 6, borderRadius: 3 }}
                          />
                        </Box>
                      )}
                    </Box>
                  }
                />

                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    onClick={() => removeFile(fileItem.id)}
                    disabled={uploadProgress[fileItem.id] !== undefined && uploadProgress[fileItem.id] < 100}
                  >
                    <CloseIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>

          {uploadedFiles.length > 0 && (
            <Alert severity="success" sx={{ mt: 2 }}>
              Đã upload thành công {uploadedFiles.length}/{files.length} files
            </Alert>
          )}
        </Box>
      )}
    </Box>
  );
};

export default FileUploadZone;
