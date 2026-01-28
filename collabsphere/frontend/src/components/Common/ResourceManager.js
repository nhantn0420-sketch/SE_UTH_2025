import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Chip,
  CircularProgress,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Tabs,
  Tab,
  Menu,
  MenuItem,
  Tooltip,
  Divider,
  Alert,
} from '@mui/material';
import {
  Search as SearchIcon,
  Upload as UploadIcon,
  Download as DownloadIcon,
  Delete as DeleteIcon,
  MoreVert as MoreIcon,
  Folder as FolderIcon,
  InsertDriveFile as FileIcon,
  Description as DocIcon,
  PictureAsPdf as PdfIcon,
  Image as ImageIcon,
  Code as CodeIcon,
  VideoLibrary as VideoIcon,
  FilterList as FilterIcon,
  Sort as SortIcon,
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import FileUploadZone from '../../components/Common/FileUploadZone';
import resourceService from '../../services/resourceService';
import { uploadMultipleFiles, getResourceType } from '../../utils/fileUpload';

const FILE_ICONS = {
  pdf: <PdfIcon sx={{ color: '#f44336' }} />,
  doc: <DocIcon sx={{ color: '#2196f3' }} />,
  docx: <DocIcon sx={{ color: '#2196f3' }} />,
  xls: <DocIcon sx={{ color: '#4caf50' }} />,
  xlsx: <DocIcon sx={{ color: '#4caf50' }} />,
  ppt: <DocIcon sx={{ color: '#ff9800' }} />,
  pptx: <DocIcon sx={{ color: '#ff9800' }} />,
  jpg: <ImageIcon sx={{ color: '#9c27b0' }} />,
  jpeg: <ImageIcon sx={{ color: '#9c27b0' }} />,
  png: <ImageIcon sx={{ color: '#9c27b0' }} />,
  gif: <ImageIcon sx={{ color: '#9c27b0' }} />,
  svg: <ImageIcon sx={{ color: '#9c27b0' }} />,
  mp4: <VideoIcon sx={{ color: '#e91e63' }} />,
  avi: <VideoIcon sx={{ color: '#e91e63' }} />,
  js: <CodeIcon sx={{ color: '#ff9800' }} />,
  html: <CodeIcon sx={{ color: '#ff9800' }} />,
  css: <CodeIcon sx={{ color: '#ff9800' }} />,
  json: <CodeIcon sx={{ color: '#ff9800' }} />,
};

const RESOURCE_TYPES = [
  { value: 'all', label: 'Tất cả', icon: <FolderIcon /> },
  { value: 'document', label: 'Tài liệu', icon: <DocIcon /> },
  { value: 'video', label: 'Video', icon: <VideoIcon /> },
  { value: 'code', label: 'Code', icon: <CodeIcon /> },
  { value: 'other', label: 'Khác', icon: <FileIcon /> },
];

const SORT_OPTIONS = [
  { value: 'name', label: 'Tên' },
  { value: 'date', label: 'Ngày tải lên' },
  { value: 'size', label: 'Kích thước' },
  { value: 'type', label: 'Loại file' },
];

const ResourceManager = ({ groupId, classId, canUpload = false }) => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [uploadDialog, setUploadDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedResource, setSelectedResource] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchResources();
  }, [groupId, classId]);

  const fetchResources = async () => {
    setLoading(true);
    try {
      let data;
      if (groupId) {
        data = await resourceService.getGroupResources(groupId);
      } else if (classId) {
        data = await resourceService.getClassResources(classId);
      }
      setResources(data?.items || data || []);
    } catch (error) {
      console.error('Error fetching resources:', error);
      toast.error('Không thể tải tài nguyên');
    } finally {
      setLoading(false);
    }
  };

  const handleUploadSuccess = () => {
    toast.success('Upload thành công');
    setUploadDialog(false);
    setSelectedFiles([]);
    fetchResources();
  };

  const handleFilesSelected = (files) => {
    setSelectedFiles(files);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      toast.warning('Vui lòng chọn file để upload');
      return;
    }

    setUploading(true);
    try {
      // Upload files to storage and get URLs
      const urls = await uploadMultipleFiles(selectedFiles, (index, progress) => {
        console.log(`File ${index}: ${progress}%`);
      });

      // Create resource records in backend
      const uploadPromises = selectedFiles.map(async (file, index) => {
        const resourceData = {
          name: file.name,
          url: urls[index],
          type: getResourceType(file.type),
          description: `Uploaded ${file.name}`,
        };

        if (groupId) {
          return resourceService.uploadGroupResource(groupId, resourceData);
        } else if (classId) {
          return resourceService.uploadClassResource(classId, resourceData);
        }
      });

      await Promise.all(uploadPromises);
      handleUploadSuccess();
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Lỗi khi upload file');
    } finally {
      setUploading(false);
    }
  };

  const handleDownload = (resource) => {
    if (resource.url) {
      window.open(resource.url, '_blank');
    } else {
      toast.info('Chức năng download đang được phát triển');
    }
  };

  const handleDelete = async (resourceId) => {
    if (!window.confirm('Bạn có chắc muốn xóa tài nguyên này?')) return;
    
    try {
      await resourceService.deleteResource(resourceId);
      toast.success('Đã xóa tài nguyên');
      fetchResources();
    } catch (error) {
      toast.error('Không thể xóa tài nguyên');
    }
  };

  const handleMenuOpen = (event, resource) => {
    setAnchorEl(event.currentTarget);
    setSelectedResource(resource);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedResource(null);
  };

  const getFileExtension = (filename) => {
    return filename?.split('.').pop()?.toLowerCase() || '';
  };

  const getFileIcon = (filename) => {
    const ext = getFileExtension(filename);
    return FILE_ICONS[ext] || <FileIcon sx={{ color: '#757575' }} />;
  };

  const formatTime = (date) => {
    try {
      return formatDistanceToNow(new Date(date), {
        addSuffix: true,
        locale: vi,
      });
    } catch {
      return '';
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) return 'N/A';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
  };

  // Apply filters and sorting
  let filteredResources = resources;

  // Filter by search term
  if (searchTerm) {
    filteredResources = filteredResources.filter((r) =>
      r.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Filter by type
  if (filterType !== 'all') {
    filteredResources = filteredResources.filter((r) => r.type === filterType);
  }

  // Sort
  filteredResources = [...filteredResources].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return (a.name || '').localeCompare(b.name || '');
      case 'date':
        return new Date(b.created_at) - new Date(a.created_at);
      case 'size':
        return (b.file_size || 0) - (a.file_size || 0);
      case 'type':
        return (a.type || '').localeCompare(b.type || '');
      default:
        return 0;
    }
  });

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight="bold">
          Tài nguyên
        </Typography>
        {canUpload && (
          <Button
            variant="contained"
            startIcon={<UploadIcon />}
            onClick={() => setUploadDialog(true)}
          >
            Tải lên
          </Button>
        )}
      </Box>

      {/* Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Tìm kiếm tài nguyên..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                select
                label="Loại"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FilterIcon />
                    </InputAdornment>
                  ),
                }}
              >
                {RESOURCE_TYPES.map((type) => (
                  <MenuItem key={type.value} value={type.value}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {type.icon}
                      {type.label}
                    </Box>
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                select
                label="Sắp xếp"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SortIcon />
                    </InputAdornment>
                  ),
                }}
              >
                {SORT_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Resource List */}
      <Card>
        <CardContent>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress />
            </Box>
          ) : filteredResources.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <FolderIcon sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                {searchTerm || filterType !== 'all'
                  ? 'Không tìm thấy tài nguyên'
                  : 'Chưa có tài nguyên'}
              </Typography>
              {canUpload && (
                <Button
                  variant="contained"
                  startIcon={<UploadIcon />}
                  onClick={() => setUploadDialog(true)}
                  sx={{ mt: 2 }}
                >
                  Tải lên tài nguyên đầu tiên
                </Button>
              )}
            </Box>
          ) : (
            <List>
              {filteredResources.map((resource, index) => (
                <React.Fragment key={resource.id}>
                  <ListItem
                    sx={{
                      '&:hover': {
                        bgcolor: 'action.hover',
                      },
                    }}
                  >
                    <ListItemIcon>{getFileIcon(resource.name)}</ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="body1" fontWeight="medium">
                          {resource.name}
                        </Typography>
                      }
                      secondary={
                        <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                          <Chip
                            label={resource.type}
                            size="small"
                            sx={{ height: 20, fontSize: '0.7rem' }}
                          />
                          <Typography variant="caption" color="text.secondary">
                            {formatFileSize(resource.file_size)}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            • {formatTime(resource.created_at)}
                          </Typography>
                          {resource.uploader && (
                            <Typography variant="caption" color="text.secondary">
                              • {resource.uploader.full_name}
                            </Typography>
                          )}
                        </Box>
                      }
                    />
                    <ListItemSecondaryAction>
                      <Tooltip title="Tải xuống">
                        <IconButton
                          edge="end"
                          onClick={() => handleDownload(resource)}
                        >
                          <DownloadIcon />
                        </IconButton>
                      </Tooltip>
                      {canUpload && (
                        <>
                          <IconButton
                            edge="end"
                            onClick={(e) => handleMenuOpen(e, resource)}
                          >
                            <MoreIcon />
                          </IconButton>
                        </>
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  {index < filteredResources.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          )}
        </CardContent>
      </Card>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => {
            handleDownload(selectedResource);
            handleMenuClose();
          }}
        >
          <DownloadIcon sx={{ mr: 1 }} fontSize="small" />
          Tải xuống
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleDelete(selectedResource?.id);
            handleMenuClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <DeleteIcon sx={{ mr: 1 }} fontSize="small" />
          Xóa
        </MenuItem>
      </Menu>

      {/* Upload Dialog */}
      <Dialog
        open={uploadDialog}
        onClose={() => !uploading && setUploadDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Tải lên tài nguyên</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <FileUploadZone
              onFilesSelected={handleFilesSelected}
              maxFiles={5}
              maxSize={10485760} // 10MB
              multiple={true}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUploadDialog(false)} disabled={uploading}>
            Hủy
          </Button>
          <Button
            variant="contained"
            onClick={handleUpload}
            disabled={uploading || selectedFiles.length === 0}
            startIcon={uploading ? <CircularProgress size={20} /> : <UploadIcon />}
          >
            {uploading ? 'Đang upload...' : 'Upload'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ResourceManager;
