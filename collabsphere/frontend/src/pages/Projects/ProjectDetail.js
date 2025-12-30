import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Grid,
  Divider,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  ArrowBack as BackIcon,
  Edit as EditIcon,
  Send as SendIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import projectService from '../../services/projectService';
import config from '../../config';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLecturer, isHead, user } = useAuth();
  const [project, setProject] = useState(null);
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitDialog, setSubmitDialog] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchProject();
  }, [id]);

  const fetchProject = async () => {
    setLoading(true);
    try {
      const projectData = await projectService.getProjectById(id);
      setProject(projectData);
      
      const milestonesData = await projectService.getMilestones(id);
      setMilestones(milestonesData.items || milestonesData);
    } catch (err) {
      console.error('Failed to fetch project:', err);
      toast.error('Không thể tải thông tin đề tài');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitForApproval = async () => {
    setSubmitting(true);
    try {
      await projectService.submitForApproval(id);
      toast.success('Đã gửi đề tài để duyệt');
      fetchProject();
    } catch (err) {
      toast.error('Gửi duyệt thất bại');
    } finally {
      setSubmitting(false);
      setSubmitDialog(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
      case 'active':
        return 'success';
      case 'pending':
        return 'warning';
      case 'rejected':
        return 'error';
      case 'completed':
        return 'info';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!project) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography>Không tìm thấy đề tài</Typography>
        <Button onClick={() => navigate('/projects')}>Quay lại</Button>
      </Box>
    );
  }

  const isOwner = project.lecturer_id === user?.id;
  const canHeadEdit = isHead && project.status === 'approved';

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Button
          startIcon={<BackIcon />}
          onClick={() => navigate('/projects')}
        >
          Quay lại
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Main Info */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                <Box>
                  <Chip
                    label={config.PROJECT_STATUS[project.status] || project.status}
                    color={getStatusColor(project.status)}
                    size="small"
                    sx={{ mb: 1 }}
                  />
                  <Typography variant="h4" fontWeight="bold">
                    {project.title}
                  </Typography>
                </Box>
                {/* Lecturer can edit draft, Head can edit approved */}
                {(isOwner && project.status === 'draft') || canHeadEdit ? (
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      startIcon={<EditIcon />}
                      onClick={() => navigate(`/projects/${id}/edit`)}
                    >
                      Chỉnh sửa
                    </Button>
                    {isOwner && project.status === 'draft' && (
                      <Button
                        variant="contained"
                        startIcon={<SendIcon />}
                        onClick={() => setSubmitDialog(true)}
                      >
                        Gửi duyệt
                      </Button>
                    )}
                  </Box>
                ) : null}
              </Box>

              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Mô tả
              </Typography>
              <Typography paragraph>
                {project.description || 'Không có mô tả'}
              </Typography>

              <Divider sx={{ my: 2 }} />

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

              {project.evaluation_criteria && (
                <>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Tiêu chí đánh giá
                  </Typography>
                  <Typography paragraph>
                    {project.evaluation_criteria}
                  </Typography>
                </>
              )}
            </CardContent>
          </Card>

          {/* Milestones */}
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Milestones
              </Typography>
              {milestones.length === 0 ? (
                <Typography color="text.secondary">Chưa có milestone</Typography>
              ) : (
                <List>
                  {milestones.map((milestone, index) => (
                    <ListItem key={milestone.id || index}>
                      <ListItemIcon>
                        {milestone.is_completed ? (
                          <CheckCircleIcon color="success" />
                        ) : (
                          <ScheduleIcon color="disabled" />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Chip label={`Tuần ${milestone.week}`} size="small" />
                            <Typography>{milestone.title}</Typography>
                          </Box>
                        }
                        secondary={milestone.description}
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Thông tin
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Giảng viên
                  </Typography>
                  <Typography>{project.lecturer?.full_name || 'N/A'}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Số thành viên tối đa
                  </Typography>
                  <Typography>{project.max_members || 'N/A'} người</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Thời gian thực hiện
                  </Typography>
                  <Typography>{project.duration_weeks || 'N/A'} tuần</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Số milestones
                  </Typography>
                  <Typography>{milestones.length}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Submit Dialog */}
      <Dialog open={submitDialog} onClose={() => setSubmitDialog(false)}>
        <DialogTitle>Gửi đề tài để duyệt</DialogTitle>
        <DialogContent>
          <Typography>
            Bạn có chắc chắn muốn gửi đề tài này để Trưởng bộ môn duyệt?
            Sau khi gửi, bạn sẽ không thể chỉnh sửa cho đến khi có kết quả duyệt.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSubmitDialog(false)}>Hủy</Button>
          <Button
            onClick={handleSubmitForApproval}
            variant="contained"
            disabled={submitting}
          >
            {submitting ? <CircularProgress size={24} /> : 'Gửi duyệt'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProjectDetail;
