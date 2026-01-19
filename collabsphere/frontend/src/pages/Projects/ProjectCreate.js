import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Stepper,
  Step,
  StepLabel,
  Alert,
  CircularProgress,
  Chip,
  IconButton,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  AutoAwesome as AIIcon,
} from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import projectService from '../../services/projectService';

const steps = ['Thông tin cơ bản', 'Yêu cầu & Kết quả', 'Milestones'];

const ProjectCreate = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [generatingMilestones, setGeneratingMilestones] = useState(false);
  const [projectData, setProjectData] = useState({});
  const [milestones, setMilestones] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const handleNext = () => {
    const values = getValues();
    setProjectData((prev) => ({ ...prev, ...values }));
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleGenerateMilestones = async () => {
    setGeneratingMilestones(true);
    try {
      // Simulate AI generation
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const generatedMilestones = [
        { title: 'Phân tích yêu cầu', description: 'Thu thập và phân tích yêu cầu hệ thống', week: 1 },
        { title: 'Thiết kế hệ thống', description: 'Thiết kế kiến trúc và database', week: 2 },
        { title: 'Phát triển Backend', description: 'Xây dựng API và logic nghiệp vụ', week: 4 },
        { title: 'Phát triển Frontend', description: 'Xây dựng giao diện người dùng', week: 6 },
        { title: 'Testing & Bug fixing', description: 'Kiểm thử và sửa lỗi', week: 7 },
        { title: 'Triển khai', description: 'Triển khai và bàn giao sản phẩm', week: 8 },
      ];
      setMilestones(generatedMilestones);
      toast.success('Đã tạo milestones bằng AI thành công');
    } catch (err) {
      toast.error('Không thể tạo milestones');
    } finally {
      setGeneratingMilestones(false);
    }
  };

  const handleAddMilestone = () => {
    setMilestones([
      ...milestones,
      { title: '', description: '', week: milestones.length + 1 },
    ]);
  };

  const handleRemoveMilestone = (index) => {
    setMilestones(milestones.filter((_, i) => i !== index));
  };

  const handleMilestoneChange = (index, field, value) => {
    const updated = [...milestones];
    updated[index][field] = value;
    setMilestones(updated);
  };

  const handleSubmitProject = async () => {
    const values = getValues();
    const finalData = {
      title: projectData.title || values.title,
      description: projectData.description || values.description,
      goals: projectData.goals || values.goals || null,
      requirements: projectData.requirements || values.requirements || null,
      duration_weeks: parseInt(projectData.duration_weeks || values.duration_weeks || 12),
      max_group_size: parseInt(projectData.max_members || values.max_members || 5),
      min_group_size: parseInt(projectData.min_members || values.min_members || 3),
      curriculum_id: projectData.curriculum_id || values.curriculum_id || null
    };

    setLoading(true);
    try {
      // Step 1: Create project first
      const project = await projectService.createProject(finalData);
      
      // Step 2: If milestones exist, add them one by one
      if (milestones && milestones.length > 0) {
        for (const milestone of milestones) {
          await projectService.createMilestone(project.id, {
            title: milestone.title,
            description: milestone.description || '',
            week_number: parseInt(milestone.week) || 1,
            deliverables: null
          });
        }
      }
      
      toast.success('Tạo đề tài thành công');
      navigate(`/projects/${project.id}`);
    } catch (err) {
      console.error('Create project error:', err);
      toast.error(err.response?.data?.detail || 'Tạo đề tài thất bại');
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Tên đề tài"
                {...register('title', { required: 'Tên đề tài là bắt buộc' })}
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Mô tả đề tài"
                {...register('description', { required: 'Mô tả là bắt buộc' })}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Số thành viên tối đa"
                {...register('max_members')}
                defaultValue={5}
                inputProps={{ min: 2, max: 10 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Số thành viên tối thiểu"
                {...register('min_members')}
                defaultValue={3}
                inputProps={{ min: 1, max: 10 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Thời gian thực hiện (tuần)"
                {...register('duration_weeks')}
                defaultValue={12}
                inputProps={{ min: 1, max: 52 }}
              />
            </Grid>
          </Grid>
        );

      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Yêu cầu đề tài"
                placeholder="Mô tả các yêu cầu, công nghệ cần sử dụng..."
                {...register('requirements')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Kết quả mong đợi"
                placeholder="Mô tả sản phẩm, tài liệu cần nộp..."
                {...register('expected_outcomes')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Tiêu chí đánh giá"
                placeholder="Các tiêu chí để đánh giá kết quả..."
                {...register('evaluation_criteria')}
              />
            </Grid>
          </Grid>
        );

      case 2:
        return (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6">Milestones</Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  startIcon={generatingMilestones ? <CircularProgress size={20} /> : <AIIcon />}
                  onClick={handleGenerateMilestones}
                  disabled={generatingMilestones}
                >
                  Tạo bằng AI
                </Button>
                <Button
                  startIcon={<AddIcon />}
                  onClick={handleAddMilestone}
                >
                  Thêm milestone
                </Button>
              </Box>
            </Box>

            {milestones.length === 0 ? (
              <Alert severity="info">
                Chưa có milestone nào. Nhấn "Tạo bằng AI" để tự động tạo hoặc thêm thủ công.
              </Alert>
            ) : (
              milestones.map((milestone, index) => (
                <Card key={index} sx={{ mb: 2 }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <Chip label={`Tuần ${milestone.week}`} size="small" color="primary" />
                      <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
                        Milestone {index + 1}
                      </Typography>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleRemoveMilestone(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={3}>
                        <TextField
                          fullWidth
                          size="small"
                          type="number"
                          label="Tuần"
                          value={milestone.week}
                          onChange={(e) => handleMilestoneChange(index, 'week', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={9}>
                        <TextField
                          fullWidth
                          size="small"
                          label="Tiêu đề"
                          value={milestone.title}
                          onChange={(e) => handleMilestoneChange(index, 'title', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          size="small"
                          multiline
                          rows={2}
                          label="Mô tả"
                          value={milestone.description}
                          onChange={(e) => handleMilestoneChange(index, 'description', e.target.value)}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              ))
            )}
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Tạo đề tài mới
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Điền thông tin để tạo đề tài cho sinh viên thực hiện
      </Typography>

      <Card>
        <CardContent>
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <form onSubmit={handleSubmit(activeStep === steps.length - 1 ? handleSubmitProject : handleNext)}>
            {renderStepContent()}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                Quay lại
              </Button>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/projects')}
                >
                  Hủy
                </Button>
                {activeStep === steps.length - 1 ? (
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                  >
                    {loading ? <CircularProgress size={24} /> : 'Tạo đề tài'}
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="contained"
                  >
                    Tiếp theo
                  </Button>
                )}
              </Box>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProjectCreate;
