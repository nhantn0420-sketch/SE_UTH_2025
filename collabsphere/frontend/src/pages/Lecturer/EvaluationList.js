import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Tab,
  Tabs,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Rating,
  Divider
} from '@mui/material';
import {
  Assessment as AssessmentIcon,
  Group as GroupIcon,
  Person as PersonIcon,
  CheckCircle as CheckCircleIcon,
  Edit as EditIcon
} from '@mui/icons-material';
import { groupService, evaluationService } from '../../services';
import { useAuth } from '../../context/AuthContext';

function EvaluationList() {
  const { user } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [evaluationDialog, setEvaluationDialog] = useState(false);
  const [evaluationType, setEvaluationType] = useState('group'); // 'group' or 'member'
  const [evaluationForm, setEvaluationForm] = useState({
    score: 0,
    feedback: '',
    presentation_score: 0,
    report_score: 0,
    teamwork_score: 0
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      setLoading(true);
      const data = await groupService.getGroups();
      // Filter groups that lecturer is responsible for (based on class)
      setGroups(data.items || []);
    } catch (err) {
      setError('Không thể tải danh sách nhóm');
      console.error('Error fetching groups:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOpenEvaluation = (group, type) => {
    setSelectedGroup(group);
    setEvaluationType(type);
    setEvaluationDialog(true);
    setEvaluationForm({
      score: 0,
      feedback: '',
      presentation_score: 0,
      report_score: 0,
      teamwork_score: 0
    });
  };

  const handleCloseEvaluation = () => {
    setEvaluationDialog(false);
    setSelectedGroup(null);
    setEvaluationForm({
      score: 0,
      feedback: '',
      presentation_score: 0,
      report_score: 0,
      teamwork_score: 0
    });
  };

  const handleSubmitEvaluation = async () => {
    if (!selectedGroup) return;

    try {
      setSubmitting(true);

      if (evaluationType === 'group') {
        // Submit group evaluation
        await evaluationService.createGroupEvaluation(selectedGroup.id, {
          score: evaluationForm.score,
          feedback: evaluationForm.feedback,
          criteria_scores: {
            presentation: evaluationForm.presentation_score,
            report: evaluationForm.report_score,
            teamwork: evaluationForm.teamwork_score
          }
        });
      }

      alert('Đánh giá đã được lưu thành công!');
      handleCloseEvaluation();
      fetchGroups(); // Refresh data
    } catch (err) {
      console.error('Error submitting evaluation:', err);
      alert(err.response?.data?.detail || 'Có lỗi xảy ra khi lưu đánh giá');
    } finally {
      setSubmitting(false);
    }
  };

  const renderGroupCard = (group) => (
    <Grid item xs={12} md={6} key={group.id}>
      <Card>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
            <Box>
              <Typography variant="h6" gutterBottom>
                {group.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Dự án: {group.project?.title || 'Chưa chọn đề tài'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Số thành viên: {group.members?.length || 0}
              </Typography>
            </Box>
            <Chip
              label={group.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
              color={group.status === 'active' ? 'success' : 'default'}
              size="small"
            />
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box display="flex" gap={1} flexWrap="wrap">
            <Button
              variant="contained"
              size="small"
              startIcon={<GroupIcon />}
              onClick={() => handleOpenEvaluation(group, 'group')}
            >
              Đánh giá nhóm
            </Button>
            <Button
              variant="outlined"
              size="small"
              startIcon={<PersonIcon />}
              onClick={() => window.location.href = `/groups/${group.id}`}
            >
              Xem chi tiết
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Đang tải dữ liệu...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <AssessmentIcon sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
          <Box>
            <Typography variant="h4" gutterBottom>
              Đánh giá
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Quản lý và thực hiện đánh giá cho các nhóm sinh viên
            </Typography>
          </Box>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
          <Tab label="Đánh giá nhóm" icon={<GroupIcon />} iconPosition="start" />
          <Tab label="Đánh giá cá nhân" icon={<PersonIcon />} iconPosition="start" />
          <Tab label="Lịch sử đánh giá" icon={<CheckCircleIcon />} iconPosition="start" />
        </Tabs>

        {tabValue === 0 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Danh sách nhóm cần đánh giá
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Chọn nhóm để thực hiện đánh giá tổng thể
            </Typography>

            {groups.length === 0 ? (
              <Alert severity="info">
                Chưa có nhóm nào để đánh giá
              </Alert>
            ) : (
              <Grid container spacing={3}>
                {groups.map(renderGroupCard)}
              </Grid>
            )}
          </Box>
        )}

        {tabValue === 1 && (
          <Alert severity="info">
            Chức năng đánh giá cá nhân đang được phát triển
          </Alert>
        )}

        {tabValue === 2 && (
          <Alert severity="info">
            Chức năng xem lịch sử đánh giá đang được phát triển
          </Alert>
        )}
      </Paper>

      {/* Evaluation Dialog */}
      <Dialog
        open={evaluationDialog}
        onClose={handleCloseEvaluation}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {evaluationType === 'group' ? 'Đánh giá nhóm' : 'Đánh giá thành viên'}
          {selectedGroup && `: ${selectedGroup.name}`}
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ pt: 1 }}>
            <Typography variant="subtitle2" gutterBottom>
              Điểm tổng thể
            </Typography>
            <Box display="flex" alignItems="center" gap={2} mb={3}>
              <Rating
                value={evaluationForm.score}
                onChange={(e, value) =>
                  setEvaluationForm({ ...evaluationForm, score: value || 0 })
                }
                max={10}
                size="large"
              />
              <Typography variant="h6">
                {evaluationForm.score}/10
              </Typography>
            </Box>

            {evaluationType === 'group' && (
              <>
                <Typography variant="subtitle2" gutterBottom>
                  Điểm thuyết trình
                </Typography>
                <Box display="flex" alignItems="center" gap={2} mb={2}>
                  <Rating
                    value={evaluationForm.presentation_score}
                    onChange={(e, value) =>
                      setEvaluationForm({ ...evaluationForm, presentation_score: value || 0 })
                    }
                    max={10}
                    size="medium"
                  />
                  <Typography>
                    {evaluationForm.presentation_score}/10
                  </Typography>
                </Box>

                <Typography variant="subtitle2" gutterBottom>
                  Điểm báo cáo
                </Typography>
                <Box display="flex" alignItems="center" gap={2} mb={2}>
                  <Rating
                    value={evaluationForm.report_score}
                    onChange={(e, value) =>
                      setEvaluationForm({ ...evaluationForm, report_score: value || 0 })
                    }
                    max={10}
                    size="medium"
                  />
                  <Typography>
                    {evaluationForm.report_score}/10
                  </Typography>
                </Box>

                <Typography variant="subtitle2" gutterBottom>
                  Điểm làm việc nhóm
                </Typography>
                <Box display="flex" alignItems="center" gap={2} mb={3}>
                  <Rating
                    value={evaluationForm.teamwork_score}
                    onChange={(e, value) =>
                      setEvaluationForm({ ...evaluationForm, teamwork_score: value || 0 })
                    }
                    max={10}
                    size="medium"
                  />
                  <Typography>
                    {evaluationForm.teamwork_score}/10
                  </Typography>
                </Box>
              </>
            )}

            <TextField
              label="Nhận xét"
              multiline
              rows={6}
              fullWidth
              value={evaluationForm.feedback}
              onChange={(e) =>
                setEvaluationForm({ ...evaluationForm, feedback: e.target.value })
              }
              placeholder="Nhập nhận xét chi tiết về nhóm/thành viên..."
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEvaluation}>
            Hủy
          </Button>
          <Button
            onClick={handleSubmitEvaluation}
            variant="contained"
            disabled={submitting || evaluationForm.score === 0}
          >
            {submitting ? <CircularProgress size={24} /> : 'Lưu đánh giá'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default EvaluationList;
