import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Chip,
  Avatar,
  Grid,
  CircularProgress,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  DragIndicator as DragIcon,
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import groupService from '../../services/groupService';

const TASK_STATUSES = {
  TODO: { value: 'todo', label: 'To Do', color: '#757575' },
  IN_PROGRESS: { value: 'in_progress', label: 'In Progress', color: '#2196f3' },
  COMPLETED: { value: 'completed', label: 'Completed', color: '#4caf50' },
};

const TaskBoard = ({ groupId }) => {
  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assigned_to: '',
    status: 'todo',
    priority: 'medium',
    due_date: '',
  });

  useEffect(() => {
    if (groupId) {
      fetchTasks();
      fetchMembers();
    }
  }, [groupId]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await groupService.getTasks(groupId);
      setTasks(data.items || data || []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast.error('Không thể tải danh sách công việc');
    } finally {
      setLoading(false);
    }
  };

  const fetchMembers = async () => {
    try {
      const data = await groupService.getMembers(groupId);
      setMembers(data.items || data || []);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  const handleOpenDialog = (task = null) => {
    if (task) {
      setEditingTask(task);
      setFormData({
        title: task.title,
        description: task.description || '',
        assigned_to: task.assigned_to || '',
        status: task.status,
        priority: task.priority || 'medium',
        due_date: task.due_date || '',
      });
    } else {
      setEditingTask(null);
      setFormData({
        title: '',
        description: '',
        assigned_to: '',
        status: 'todo',
        priority: 'medium',
        due_date: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingTask(null);
    setFormData({
      title: '',
      description: '',
      assigned_to: '',
      status: 'todo',
      priority: 'medium',
      due_date: '',
    });
  };

  const handleSubmit = async () => {
    if (!formData.title.trim()) {
      toast.error('Vui lòng nhập tên công việc');
      return;
    }

    try {
      // Prepare data - convert empty strings to null for integer fields
      const taskData = {
        ...formData,
        assigned_to: formData.assigned_to === '' ? null : parseInt(formData.assigned_to),
        due_date: formData.due_date || null,
      };

      if (editingTask) {
        await groupService.updateTask(groupId, editingTask.id, taskData);
        toast.success('Cập nhật công việc thành công');
      } else {
        await groupService.createTask(groupId, taskData);
        toast.success('Tạo công việc thành công');
      }
      fetchTasks();
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving task:', error);
      console.error('Error details:', error.response?.data);
      const errorMsg = error.response?.data?.detail || (editingTask ? 'Không thể cập nhật công việc' : 'Không thể tạo công việc');
      toast.error(errorMsg);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa công việc này?')) {
      return;
    }

    try {
      await groupService.deleteTask(groupId, taskId);
      toast.success('Xóa công việc thành công');
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Không thể xóa công việc');
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await groupService.updateTask(groupId, taskId, { status: newStatus });
      toast.success('Cập nhật trạng thái thành công');
      fetchTasks();
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Không thể cập nhật trạng thái');
    }
  };

  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status);
  };

  const getMemberName = (userId) => {
    const member = members.find(m => m.user_id === userId);
    return member?.user?.full_name || 'Chưa phân công';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'error',
      medium: 'warning',
      low: 'info',
    };
    return colors[priority] || 'default';
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight="bold">
          Bảng công việc
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Thêm công việc
        </Button>
      </Box>

      <Grid container spacing={2}>
        {Object.values(TASK_STATUSES).map((status) => (
          <Grid item xs={12} md={4} key={status.value}>
            <Card sx={{ minHeight: 400, bgcolor: 'grey.50' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      bgcolor: status.color,
                      mr: 1,
                    }}
                  />
                  <Typography variant="h6" fontWeight="bold">
                    {status.label}
                  </Typography>
                  <Chip
                    label={getTasksByStatus(status.value).length}
                    size="small"
                    sx={{ ml: 1 }}
                  />
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {getTasksByStatus(status.value).map((task) => (
                    <Card
                      key={task.id}
                      sx={{
                        cursor: 'pointer',
                        '&:hover': { boxShadow: 3 },
                        transition: 'box-shadow 0.2s',
                      }}
                    >
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="subtitle1" fontWeight="bold">
                            {task.title}
                          </Typography>
                          <Box>
                            <IconButton
                              size="small"
                              onClick={() => handleOpenDialog(task)}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={() => handleDeleteTask(task.id)}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </Box>

                        {task.description && (
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            {task.description.length > 100
                              ? `${task.description.substring(0, 100)}...`
                              : task.description}
                          </Typography>
                        )}

                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
                          {task.priority && (
                            <Chip
                              label={task.priority.toUpperCase()}
                              size="small"
                              color={getPriorityColor(task.priority)}
                            />
                          )}
                          {task.due_date && (
                            <Chip
                              label={new Date(task.due_date).toLocaleDateString('vi-VN')}
                              size="small"
                              variant="outlined"
                            />
                          )}
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="caption" color="text.secondary">
                            {getMemberName(task.assigned_to)}
                          </Typography>
                          
                          {/* Quick status change buttons */}
                          <Box sx={{ display: 'flex', gap: 0.5 }}>
                            {Object.values(TASK_STATUSES)
                              .filter(s => s.value !== task.status)
                              .map(s => (
                                <Chip
                                  key={s.value}
                                  label={s.label}
                                  size="small"
                                  variant="outlined"
                                  sx={{ 
                                    cursor: 'pointer',
                                    fontSize: '0.7rem',
                                    height: 20,
                                  }}
                                  onClick={() => handleStatusChange(task.id, s.value)}
                                />
                              ))}
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Create/Edit Task Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingTask ? 'Chỉnh sửa công việc' : 'Tạo công việc mới'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              label="Tên công việc"
              fullWidth
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />

            <TextField
              label="Mô tả"
              fullWidth
              multiline
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />

            <FormControl fullWidth>
              <InputLabel>Người thực hiện</InputLabel>
              <Select
                value={formData.assigned_to}
                onChange={(e) => setFormData({ ...formData, assigned_to: e.target.value })}
                label="Người thực hiện"
              >
                <MenuItem value="">
                  <em>Chưa phân công</em>
                </MenuItem>
                {members.map((member) => (
                  <MenuItem key={member.user_id} value={member.user_id}>
                    {member.user?.full_name || member.user?.username}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Trạng thái</InputLabel>
              <Select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                label="Trạng thái"
              >
                {Object.values(TASK_STATUSES).map((status) => (
                  <MenuItem key={status.value} value={status.value}>
                    {status.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Độ ưu tiên</InputLabel>
              <Select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                label="Độ ưu tiên"
              >
                <MenuItem value="low">Thấp</MenuItem>
                <MenuItem value="medium">Trung bình</MenuItem>
                <MenuItem value="high">Cao</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Hạn hoàn thành"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formData.due_date}
              onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Hủy</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingTask ? 'Cập nhật' : 'Tạo mới'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TaskBoard;
