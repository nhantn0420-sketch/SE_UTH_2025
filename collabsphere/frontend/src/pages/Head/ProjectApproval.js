import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from '@mui/material';
import {
  Search as SearchIcon,
  ExpandMore as ExpandMoreIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import projectService from '../../services/projectService';

const ProjectApproval = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [rejectDialog, setRejectDialog] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchPendingProjects();
  }, []);

  const fetchPendingProjects = async () => {
    setLoading(true);
    try {
      const data = await projectService.getPendingProjects();
      console.log('Pending projects data:', data);
      
      // Handle different response formats
      if (Array.isArray(data)) {
        setProjects(data);
      } else if (data.items && Array.isArray(data.items)) {
        setProjects(data.items);
      } else if (data.data && Array.isArray(data.data)) {
        setProjects(data.data);
      } else {
        console.warn('Unexpected data format:', data);
        setProjects([]);
      }
    } catch (err) {
      console.error('Failed to fetch projects:', err);
      console.error('Error details:', err.response?.data);
      
      // Show specific error message
      if (err.response?.status === 403) {
        toast.error('Bạn không có quyền xem danh sách đề tài chờ duyệt');
      } else if (err.response?.status === 401) {
        toast.error('Vui lòng đăng nhập lại');
      } else {
        toast.error(err.response?.data?.detail || 'Không thể tải danh sách đề tài');
      }
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (project) => {
    setActionLoading(true);
    try {
      await projectService.approveProject(project.id);
      toast.success('Đã duyệt đề tài thành công');
      fetchPendingProjects();
    } catch (err) {
      toast.error('Duyệt đề tài thất bại');
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    if (!rejectReason.trim()) {
      toast.error('Vui lòng nhập lý do từ chối');
      return;
    }
    
    setActionLoading(true);
    try {
      await projectService.rejectProject(selectedProject.id, rejectReason);
      toast.success('Đã từ chối đề tài');
      setRejectDialog(false);
      setRejectReason('');
      setSelectedProject(null);
      fetchPendingProjects();
    } catch (err) {
      toast.error('Từ chối đề tài thất bại');
    } finally {
      setActionLoading(false);
    }
  };

  const openRejectDialog = (project) => {
    setSelectedProject(project);
    setRejectDialog(true);
  };

  const filteredProjects = projects.filter(
    (project) =>
      project.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.lecturer?.full_name?.toLowerCase().includes(searchQuery.toLowerCase())
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
        Duyệt đề tài
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Xem xét và duyệt các đề tài được giảng viên đề xuất
      </Typography>

      {/* Search */}
      <TextField
        fullWidth
        placeholder="Tìm kiếm theo tên đề tài hoặc giảng viên..."
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

      {/* Projects List */}
      {filteredProjects.length === 0 ? (
        <Card>
          <CardContent>
            <Typography color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
              Không có đề tài nào chờ duyệt
            </Typography>
          </CardContent>
        </Card>
      ) : (
        filteredProjects.map((project) => (
          <Accordion key={project.id} sx={{ mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%', pr: 2 }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h6">{project.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Giảng viên: {project.lecturer?.full_name || 'N/A'}
                  </Typography>
                </Box>
                <Chip label="Chờ duyệt" size="small" color="warning" />
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Divider sx={{ mb: 2 }} />
              
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Mô tả
              </Typography>
              <Typography paragraph>
                {project.description || 'Không có mô tả'}
              </Typography>

              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Yêu cầu
              </Typography>
              <Typography paragraph>
                {project.requirements || 'Không có yêu cầu cụ thể'}
              </Typography>

              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Kết quả mong đợi
              </Typography>
              <Typography paragraph>
                {project.expected_outcomes || 'Không có mô tả'}
              </Typography>

              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Thông tin khác
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2">
                  • Số thành viên tối đa: {project.max_members || 'N/A'} người
                </Typography>
                <Typography variant="body2">
                  • Thời gian: {project.duration_weeks || 'N/A'} tuần
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<CancelIcon />}
                  onClick={() => openRejectDialog(project)}
                  disabled={actionLoading}
                >
                  Từ chối
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<CheckCircleIcon />}
                  onClick={() => handleApprove(project)}
                  disabled={actionLoading}
                >
                  Duyệt đề tài
                </Button>
              </Box>
            </AccordionDetails>
          </Accordion>
        ))
      )}

      {/* Reject Dialog */}
      <Dialog open={rejectDialog} onClose={() => setRejectDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Từ chối đề tài</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            Đề tài: <strong>{selectedProject?.title}</strong>
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Lý do từ chối"
            placeholder="Nhập lý do từ chối đề tài..."
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRejectDialog(false)}>Hủy</Button>
          <Button
            onClick={handleReject}
            color="error"
            variant="contained"
            disabled={actionLoading}
          >
            {actionLoading ? <CircularProgress size={24} /> : 'Từ chối'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProjectApproval;
