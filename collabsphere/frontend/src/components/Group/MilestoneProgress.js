import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as UncheckedIcon,
  AutoAwesome as AIIcon,
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import groupService from '../../services/groupService';
import aiService from '../../services/aiService';

const MilestoneProgress = ({ groupId }) => {
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [completionDialog, setCompletionDialog] = useState(false);
  const [completionNote, setCompletionNote] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    fetchMilestones();
  }, [groupId]);

  const fetchMilestones = async () => {
    setLoading(true);
    try {
      const data = await groupService.getMilestones(groupId);
      setMilestones(data.items || data);
    } catch (err) {
      console.error('Failed to fetch milestones:', err);
      // Demo data
      setMilestones([
        { id: 1, title: 'Phân tích yêu cầu', description: 'Thu thập và phân tích yêu cầu', week: 1, is_completed: true, completed_at: '2024-01-15' },
        { id: 2, title: 'Thiết kế hệ thống', description: 'Thiết kế kiến trúc và database', week: 2, is_completed: true, completed_at: '2024-01-22' },
        { id: 3, title: 'Phát triển Backend', description: 'Xây dựng API', week: 4, is_completed: false, progress: 60 },
        { id: 4, title: 'Phát triển Frontend', description: 'Xây dựng giao diện', week: 6, is_completed: false, progress: 20 },
        { id: 5, title: 'Testing', description: 'Kiểm thử hệ thống', week: 7, is_completed: false, progress: 0 },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteMilestone = async () => {
    try {
      await groupService.completeMilestone(groupId, selectedMilestone.id);
      toast.success('Đã đánh dấu hoàn thành milestone');
      setCompletionDialog(false);
      setSelectedMilestone(null);
      setCompletionNote('');
      fetchMilestones();
    } catch (err) {
      toast.error('Thao tác thất bại');
    }
  };

  const handleAnalyzeProgress = async () => {
    setAnalyzing(true);
    try {
      const result = await aiService.analyzeProgress(groupId);
      setAnalysis(result);
    } catch (err) {
      // Demo analysis
      setAnalysis({
        overall_progress: 65,
        on_track: true,
        suggestions: [
          'Tiến độ hiện tại đang đúng kế hoạch',
          'Nên tập trung hoàn thành Backend trong tuần này',
          'Bắt đầu song song phát triển Frontend để đảm bảo tiến độ',
        ],
      });
    } finally {
      setAnalyzing(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  const completedCount = milestones.filter(m => m.is_completed).length;
  const overallProgress = milestones.length > 0 
    ? Math.round((completedCount / milestones.length) * 100)
    : 0;

  return (
    <Box>
      {/* Overall Progress */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Tiến độ tổng thể</Typography>
            <Button
              startIcon={analyzing ? <CircularProgress size={20} /> : <AIIcon />}
              onClick={handleAnalyzeProgress}
              disabled={analyzing}
            >
              Phân tích AI
            </Button>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Box sx={{ flexGrow: 1 }}>
              <LinearProgress
                variant="determinate"
                value={overallProgress}
                sx={{ height: 12, borderRadius: 6 }}
              />
            </Box>
            <Typography variant="h6" fontWeight="bold">
              {overallProgress}%
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            {completedCount} / {milestones.length} milestones hoàn thành
          </Typography>
        </CardContent>
      </Card>

      {/* AI Analysis */}
      {analysis && (
        <Alert 
          severity={analysis.on_track ? 'success' : 'warning'} 
          sx={{ mb: 3 }}
          onClose={() => setAnalysis(null)}
        >
          <Typography variant="subtitle2" gutterBottom>
            Phân tích từ AI:
          </Typography>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            {analysis.suggestions?.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </Alert>
      )}

      {/* Milestones List */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Danh sách Milestones
          </Typography>
          <List>
            {milestones.map((milestone, index) => (
              <React.Fragment key={milestone.id}>
                {index > 0 && <Divider />}
                <ListItem
                  secondaryAction={
                    !milestone.is_completed && (
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => {
                          setSelectedMilestone(milestone);
                          setCompletionDialog(true);
                        }}
                      >
                        Đánh dấu hoàn thành
                      </Button>
                    )
                  }
                >
                  <ListItemIcon>
                    {milestone.is_completed ? (
                      <CheckCircleIcon color="success" />
                    ) : (
                      <UncheckedIcon color="disabled" />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Chip
                          label={`Tuần ${milestone.week}`}
                          size="small"
                          color={milestone.is_completed ? 'success' : 'default'}
                        />
                        <Typography
                          sx={{
                            textDecoration: milestone.is_completed ? 'line-through' : 'none',
                            color: milestone.is_completed ? 'text.secondary' : 'text.primary',
                          }}
                        >
                          {milestone.title}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          {milestone.description}
                        </Typography>
                        {!milestone.is_completed && milestone.progress !== undefined && (
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                            <LinearProgress
                              variant="determinate"
                              value={milestone.progress}
                              sx={{ flexGrow: 1, height: 6, borderRadius: 3 }}
                            />
                            <Typography variant="caption">{milestone.progress}%</Typography>
                          </Box>
                        )}
                        {milestone.is_completed && milestone.completed_at && (
                          <Typography variant="caption" color="success.main">
                            Hoàn thành ngày: {new Date(milestone.completed_at).toLocaleDateString('vi-VN')}
                          </Typography>
                        )}
                      </Box>
                    }
                  />
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        </CardContent>
      </Card>

      {/* Completion Dialog */}
      <Dialog open={completionDialog} onClose={() => setCompletionDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Hoàn thành Milestone</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            Đánh dấu hoàn thành: <strong>{selectedMilestone?.title}</strong>
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Ghi chú (không bắt buộc)"
            value={completionNote}
            onChange={(e) => setCompletionNote(e.target.value)}
            margin="normal"
            placeholder="Mô tả những gì đã hoàn thành..."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCompletionDialog(false)}>Hủy</Button>
          <Button onClick={handleCompleteMilestone} variant="contained" color="success">
            Xác nhận hoàn thành
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MilestoneProgress;
