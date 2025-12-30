import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  List,
  ListItem,
  Chip,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  Divider,
  Alert,
  CircularProgress,
  Tab,
  Tabs,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  ExpandMore as ExpandIcon,
  QuestionAnswer as QuestionIcon,
  Send as SendIcon,
  CheckCircle as CheckIcon,
} from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import { useAuth } from '../../context/AuthContext';
import groupService from '../../services/groupService';

const MilestoneQuestions = ({ groupId, milestoneId, isLecturer = false }) => {
  const { user } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    fetchQuestions();
  }, [groupId, milestoneId]);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const data = await groupService.getMilestoneQuestions(groupId, milestoneId);
      setQuestions(data.questions || data || []);
      
      // Fetch answers for each question
      const answersData = {};
      for (const q of (data.questions || data || [])) {
        try {
          const qAnswers = await groupService.getQuestionAnswers(groupId, milestoneId, q.id);
          answersData[q.id] = qAnswers.answers || qAnswers || [];
        } catch {
          answersData[q.id] = [];
        }
      }
      setAnswers(answersData);
    } catch (err) {
      console.error('Failed to fetch questions:', err);
      // Demo data
      setQuestions([
        {
          id: 1,
          question: 'Nhóm đã hoàn thành những công việc gì trong milestone này?',
          created_at: new Date().toISOString(),
          is_required: true,
        },
        {
          id: 2,
          question: 'Những khó khăn gặp phải và cách giải quyết?',
          created_at: new Date().toISOString(),
          is_required: true,
        },
        {
          id: 3,
          question: 'Kế hoạch cho milestone tiếp theo?',
          created_at: new Date().toISOString(),
          is_required: false,
        },
      ]);
      setAnswers({
        1: [
          { id: 1, user: { full_name: 'Nguyễn Văn A', id: 1 }, content: 'Đã hoàn thành thiết kế database và API cơ bản', created_at: new Date().toISOString() },
        ],
        2: [],
        3: [],
      });
    } finally {
      setLoading(false);
    }
  };

  const onSubmitQuestion = async (data) => {
    setSubmitting(true);
    try {
      if (editingQuestion) {
        await groupService.updateMilestoneQuestion(groupId, milestoneId, editingQuestion.id, data);
        toast.success('Cập nhật câu hỏi thành công');
      } else {
        await groupService.createMilestoneQuestion(groupId, milestoneId, data);
        toast.success('Tạo câu hỏi thành công');
      }
      setOpenDialog(false);
      reset();
      setEditingQuestion(null);
      fetchQuestions();
    } catch (err) {
      toast.error('Thao tác thất bại');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    if (!window.confirm('Bạn có chắc muốn xóa câu hỏi này?')) return;
    try {
      await groupService.deleteMilestoneQuestion(groupId, milestoneId, questionId);
      toast.success('Đã xóa câu hỏi');
      fetchQuestions();
    } catch (err) {
      toast.error('Xóa thất bại');
    }
  };

  const handleEditQuestion = (question) => {
    setEditingQuestion(question);
    setValue('question', question.question);
    setValue('is_required', question.is_required);
    setOpenDialog(true);
  };

  const handleSubmitAnswer = async (questionId, answerContent) => {
    if (!answerContent.trim()) return;
    try {
      await groupService.submitQuestionAnswer(groupId, milestoneId, questionId, {
        content: answerContent,
      });
      toast.success('Đã gửi câu trả lời');
      fetchQuestions();
    } catch (err) {
      toast.error('Gửi câu trả lời thất bại');
    }
  };

  const AnswerInput = ({ questionId }) => {
    const [answer, setAnswer] = useState('');
    const [sending, setSending] = useState(false);

    const handleSend = async () => {
      setSending(true);
      await handleSubmitAnswer(questionId, answer);
      setAnswer('');
      setSending(false);
    };

    return (
      <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Nhập câu trả lời của bạn..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          multiline
          maxRows={3}
        />
        <IconButton
          color="primary"
          onClick={handleSend}
          disabled={sending || !answer.trim()}
        >
          {sending ? <CircularProgress size={24} /> : <SendIcon />}
        </IconButton>
      </Box>
    );
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6">
            <QuestionIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Câu hỏi Milestone
          </Typography>
          {isLecturer && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => {
                setEditingQuestion(null);
                reset();
                setOpenDialog(true);
              }}
            >
              Thêm câu hỏi
            </Button>
          )}
        </Box>

        {questions.length === 0 ? (
          <Alert severity="info">
            Chưa có câu hỏi nào cho milestone này
          </Alert>
        ) : (
          <Box>
            <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)} sx={{ mb: 2 }}>
              <Tab label={`Tất cả câu hỏi (${questions.length})`} />
              <Tab label="Chưa trả lời" />
              <Tab label="Đã trả lời" />
            </Tabs>

            {questions
              .filter(q => {
                if (activeTab === 1) return !(answers[q.id]?.some(a => a.user?.id === user?.id));
                if (activeTab === 2) return answers[q.id]?.some(a => a.user?.id === user?.id);
                return true;
              })
              .map((question, index) => (
                <Accordion key={question.id} defaultExpanded={index === 0}>
                  <AccordionSummary expandIcon={<ExpandIcon />}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
                      <Typography fontWeight="bold">
                        Câu {index + 1}: {question.question}
                      </Typography>
                      {question.is_required && (
                        <Chip label="Bắt buộc" color="error" size="small" />
                      )}
                      {answers[question.id]?.some(a => a.user?.id === user?.id) && (
                        <CheckIcon color="success" fontSize="small" />
                      )}
                    </Box>
                    {isLecturer && (
                      <Box sx={{ mr: 2 }}>
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditQuestion(question);
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteQuestion(question.id);
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    )}
                  </AccordionSummary>
                  <AccordionDetails>
                    {/* Answers List */}
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Câu trả lời ({answers[question.id]?.length || 0})
                    </Typography>
                    
                    {answers[question.id]?.length > 0 ? (
                      <List>
                        {answers[question.id].map((answer) => (
                          <ListItem key={answer.id} alignItems="flex-start" sx={{ px: 0 }}>
                            <Avatar sx={{ mr: 2, width: 32, height: 32 }}>
                              {answer.user?.full_name?.charAt(0)}
                            </Avatar>
                            <Box sx={{ flex: 1 }}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="subtitle2">
                                  {answer.user?.full_name}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {format(new Date(answer.created_at), 'dd/MM/yyyy HH:mm')}
                                </Typography>
                              </Box>
                              <Typography variant="body2" sx={{ mt: 0.5 }}>
                                {answer.content}
                              </Typography>
                            </Box>
                          </ListItem>
                        ))}
                      </List>
                    ) : (
                      <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
                        Chưa có câu trả lời nào
                      </Typography>
                    )}

                    <Divider sx={{ my: 2 }} />

                    {/* Answer Input for Students */}
                    {!isLecturer && (
                      <AnswerInput questionId={question.id} />
                    )}
                  </AccordionDetails>
                </Accordion>
              ))}
          </Box>
        )}

        {/* Create/Edit Question Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
          <form onSubmit={handleSubmit(onSubmitQuestion)}>
            <DialogTitle>
              {editingQuestion ? 'Chỉnh sửa câu hỏi' : 'Thêm câu hỏi mới'}
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Nội dung câu hỏi"
                    multiline
                    rows={3}
                    {...register('question', { required: 'Vui lòng nhập câu hỏi' })}
                    error={!!errors.question}
                    helperText={errors.question?.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <input
                      type="checkbox"
                      {...register('is_required')}
                      id="is_required"
                    />
                    <label htmlFor="is_required">Bắt buộc trả lời</label>
                  </Box>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)}>Hủy</Button>
              <Button type="submit" variant="contained" disabled={submitting}>
                {submitting ? <CircularProgress size={24} /> : (editingQuestion ? 'Cập nhật' : 'Tạo')}
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default MilestoneQuestions;
