import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  Slider,
  Chip,
  CircularProgress,
  Alert,
  Grid,
} from '@mui/material';
import { Save as SaveIcon } from '@mui/icons-material';
import { toast } from 'react-toastify';
import evaluationService from '../../services/evaluationService';

const EvaluationForm = ({ groupId, checkpointId, onComplete }) => {
  const [evaluation, setEvaluation] = useState({
    completion_score: 70,
    quality_score: 70,
    teamwork_score: 70,
    presentation_score: 70,
    comment: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const criteria = [
    { key: 'completion_score', label: 'Mức độ hoàn thành', description: 'Đánh giá tiến độ và khối lượng công việc hoàn thành' },
    { key: 'quality_score', label: 'Chất lượng sản phẩm', description: 'Đánh giá chất lượng mã nguồn, thiết kế, tài liệu' },
    { key: 'teamwork_score', label: 'Làm việc nhóm', description: 'Đánh giá khả năng phối hợp và tinh thần đội nhóm' },
    { key: 'presentation_score', label: 'Trình bày', description: 'Đánh giá kỹ năng thuyết trình và báo cáo' },
  ];

  const handleScoreChange = (key, value) => {
    setEvaluation((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const calculateTotal = () => {
    const scores = [
      evaluation.completion_score,
      evaluation.quality_score,
      evaluation.teamwork_score,
      evaluation.presentation_score,
    ];
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'warning';
    return 'error';
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await evaluationService.evaluateGroup(groupId, checkpointId, evaluation);
      toast.success('Đánh giá nhóm thành công');
      if (onComplete) onComplete();
    } catch (err) {
      toast.error('Gửi đánh giá thất bại');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6">Đánh giá nhóm</Typography>
          <Chip
            label={`Điểm trung bình: ${calculateTotal()}/100`}
            color={getScoreColor(calculateTotal())}
            sx={{ fontWeight: 'bold' }}
          />
        </Box>

        <Grid container spacing={3}>
          {criteria.map((criterion) => (
            <Grid item xs={12} key={criterion.key}>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {criterion.label}
                  </Typography>
                  <Chip
                    label={`${evaluation[criterion.key]}/100`}
                    size="small"
                    color={getScoreColor(evaluation[criterion.key])}
                  />
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {criterion.description}
                </Typography>
                <Slider
                  value={evaluation[criterion.key]}
                  onChange={(e, value) => handleScoreChange(criterion.key, value)}
                  min={0}
                  max={100}
                  valueLabelDisplay="auto"
                  marks={[
                    { value: 0, label: '0' },
                    { value: 50, label: '50' },
                    { value: 100, label: '100' },
                  ]}
                />
              </Box>
            </Grid>
          ))}

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Nhận xét"
              placeholder="Nhập nhận xét chi tiết về nhóm..."
              value={evaluation.comment}
              onChange={(e) => setEvaluation((prev) => ({ ...prev, comment: e.target.value }))}
            />
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          <Button
            variant="contained"
            startIcon={submitting ? <CircularProgress size={20} /> : <SaveIcon />}
            onClick={handleSubmit}
            disabled={submitting}
          >
            Lưu đánh giá
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default EvaluationForm;
