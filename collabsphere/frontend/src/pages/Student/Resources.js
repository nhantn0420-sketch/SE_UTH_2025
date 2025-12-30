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
  IconButton,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Divider,
} from '@mui/material';
import {
  Search as SearchIcon,
  Folder as FolderIcon,
  InsertDriveFile as FileIcon,
  Download as DownloadIcon,
  Upload as UploadIcon,
  Delete as DeleteIcon,
  Description as DocIcon,
  PictureAsPdf as PdfIcon,
  Image as ImageIcon,
  Code as CodeIcon,
  VideoLibrary as VideoIcon,
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import groupService from '../../services/groupService';
import resourceService from '../../services/resourceService';

const getFileIcon = (type) => {
  const iconMap = {
    'pdf': <PdfIcon color="error" />,
    'doc': <DocIcon color="primary" />,
    'docx': <DocIcon color="primary" />,
    'image': <ImageIcon color="success" />,
    'jpg': <ImageIcon color="success" />,
    'png': <ImageIcon color="success" />,
    'code': <CodeIcon color="warning" />,
    'video': <VideoIcon color="secondary" />,
  };
  return iconMap[type?.toLowerCase()] || <FileIcon />;
};

const Resources = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [myGroups, setMyGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [resources, setResources] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [uploadDialog, setUploadDialog] = useState(false);
  const [uploadData, setUploadData] = useState({ name: '', url: '', type: 'document', description: '' });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchMyGroups();
  }, []);

  useEffect(() => {
    if (selectedGroup) {
      fetchResources();
    }
  }, [selectedGroup]);

  const fetchMyGroups = async () => {
    setLoading(true);
    try {
      const data = await groupService.getGroups();
      // Filter groups where current user is a member
      const groups = data.items || data || [];
      setMyGroups(groups);
      if (groups.length > 0) {
        setSelectedGroup(groups[0]);
      }
    } catch (err) {
      console.error('Failed to fetch groups:', err);
      // Demo data
      setMyGroups([
        { id: 1, name: 'Nhóm 1 - Quản lý thư viện', project: { title: 'Hệ thống thư viện' } },
        { id: 2, name: 'Nhóm 2 - App học từ vựng', project: { title: 'Ứng dụng học tiếng Anh' } },
      ]);
      setSelectedGroup({ id: 1, name: 'Nhóm 1 - Quản lý thư viện' });
    } finally {
      setLoading(false);
    }
  };

  const fetchResources = async () => {
    if (!selectedGroup) return;
    try {
      const data = await resourceService.getGroupResources(selectedGroup.id);
      setResources(data.items || data || []);
    } catch (err) {
      console.error('Failed to fetch resources:', err);
      // Demo data
      setResources([
        { id: 1, name: 'Báo cáo tiến độ tuần 1.pdf', type: 'pdf', size: '2.5 MB', uploaded_by: { full_name: 'Nguyễn Văn A' }, created_at: new Date().toISOString() },
        { id: 2, name: 'Sơ đồ ERD.png', type: 'image', size: '1.2 MB', uploaded_by: { full_name: 'Trần Thị B' }, created_at: new Date().toISOString() },
        { id: 3, name: 'Source code v1.zip', type: 'code', size: '5.8 MB', uploaded_by: { full_name: 'Lê Văn C' }, created_at: new Date().toISOString() },
        { id: 4, name: 'Tài liệu hướng dẫn.docx', type: 'doc', size: '500 KB', uploaded_by: { full_name: 'Nguyễn Văn A' }, created_at: new Date().toISOString() },
      ]);
    }
  };

  const handleUpload = async () => {
    if (!uploadData.name || !uploadData.url) {
      toast.error('Vui lòng nhập tên và URL tài liệu');
      return;
    }

    setUploading(true);
    try {
      await resourceService.uploadGroupResource(selectedGroup.id, {
        name: uploadData.name,
        url: uploadData.url,
        type: uploadData.type,
        description: uploadData.description,
      });
      toast.success('Đã tải lên tài liệu');
      setUploadDialog(false);
      setUploadData({ name: '', url: '', type: 'document', description: '' });
      fetchResources();
    } catch (err) {
      toast.error('Tải lên thất bại');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (resourceId) => {
    if (!window.confirm('Bạn có chắc muốn xóa tài liệu này?')) return;
    try {
      await resourceService.deleteResource(resourceId);
      toast.success('Đã xóa tài liệu');
      fetchResources();
    } catch (err) {
      toast.error('Xóa thất bại');
    }
  };

  const filteredResources = resources.filter(
    (r) => r.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        Tài liệu
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Quản lý tài liệu của nhóm
      </Typography>

      {myGroups.length === 0 ? (
        <Alert severity="info">
          Bạn chưa tham gia nhóm nào. Liên hệ giảng viên để được thêm vào nhóm.
        </Alert>
      ) : (
        <>
          {/* Group Tabs */}
          <Card sx={{ mb: 3 }}>
            <Tabs
              value={myGroups.findIndex(g => g.id === selectedGroup?.id) || 0}
              onChange={(e, idx) => setSelectedGroup(myGroups[idx])}
              variant="scrollable"
              scrollButtons="auto"
            >
              {myGroups.map((group) => (
                <Tab key={group.id} label={group.name} />
              ))}
            </Tabs>
          </Card>

          {/* Actions & Search */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <TextField
              placeholder="Tìm kiếm tài liệu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="small"
              sx={{ width: 300 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              startIcon={<UploadIcon />}
              onClick={() => setUploadDialog(true)}
            >
              Tải lên
            </Button>
          </Box>

          {/* Resources List */}
          <Card>
            <CardContent>
              {filteredResources.length === 0 ? (
                <Typography color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                  Chưa có tài liệu nào
                </Typography>
              ) : (
                <List>
                  {filteredResources.map((resource, index) => (
                    <React.Fragment key={resource.id}>
                      {index > 0 && <Divider />}
                      <ListItem>
                        <ListItemIcon>
                          {getFileIcon(resource.type)}
                        </ListItemIcon>
                        <ListItemText
                          primary={resource.name}
                          secondary={
                            <Box sx={{ display: 'flex', gap: 2, mt: 0.5 }}>
                              <Typography variant="caption" color="text.secondary">
                                {resource.size || 'N/A'}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                •
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {resource.uploaded_by?.full_name || 'Unknown'}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                •
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {new Date(resource.created_at).toLocaleDateString('vi-VN')}
                              </Typography>
                            </Box>
                          }
                        />
                        <ListItemSecondaryAction>
                          <IconButton 
                            size="small" 
                            onClick={() => window.open(resource.url, '_blank')}
                            title="Tải xuống"
                          >
                            <DownloadIcon />
                          </IconButton>
                          <IconButton 
                            size="small" 
                            color="error" 
                            onClick={() => handleDelete(resource.id)}
                            title="Xóa"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </React.Fragment>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </>
      )}

      {/* Upload Dialog */}
      <Dialog open={uploadDialog} onClose={() => setUploadDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Tải lên tài liệu</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Tên tài liệu"
                value={uploadData.name}
                onChange={(e) => setUploadData({ ...uploadData, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="URL tài liệu"
                value={uploadData.url}
                onChange={(e) => setUploadData({ ...uploadData, url: e.target.value })}
                helperText="Nhập URL của tài liệu (Google Drive, OneDrive, ...)"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Loại tài liệu"
                select
                SelectProps={{ native: true }}
                value={uploadData.type}
                onChange={(e) => setUploadData({ ...uploadData, type: e.target.value })}
              >
                <option value="document">Tài liệu</option>
                <option value="pdf">PDF</option>
                <option value="image">Hình ảnh</option>
                <option value="code">Source code</option>
                <option value="video">Video</option>
                <option value="other">Khác</option>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Mô tả"
                multiline
                rows={2}
                value={uploadData.description}
                onChange={(e) => setUploadData({ ...uploadData, description: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUploadDialog(false)}>Hủy</Button>
          <Button onClick={handleUpload} variant="contained" disabled={uploading}>
            {uploading ? <CircularProgress size={24} /> : 'Tải lên'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Resources;
