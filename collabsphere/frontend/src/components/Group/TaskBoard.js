import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Grid,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import groupService from '../../services/groupService';

const TaskBoard = ({ groupId }) => {
  const [tasks, setTasks] = useState({
    todo: [],
    in_progress: [],
    completed: [],
  });
  const [loading, setLoading] = useState(true);
  const [taskDialog, setTaskDialog] = useState({ open: false, task: null });
  const [members, setMembers] = useState([]);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    fetchTasks();
    fetchMembers();
  }, [groupId]);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const data = await groupService.getTasks(groupId);
      const taskList = data.items || data;
      
      setTasks({
        todo: taskList.filter(t => t.status === 'todo'),
        in_progress: taskList.filter(t => t.status === 'in_progress'),
        completed: taskList.filter(t => t.status === 'completed'),
      });
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
      // Demo data
      setTasks({
        todo: [
          { id: 1, title: 'Thiết kế UI trang chủ', assignee: { full_name: 'Nguyễn Văn A' } },
          { id: 2, title: 'Viết unit tests', assignee: { full_name: 'Trần Thị B' } },
        ],
        in_progress: [
          { id: 3, title: 'Phát triển API đăng nhập', assignee: { full_name: 'Lê Văn C' } },
        ],
        completed: [
          { id: 4, title: 'Thiết kế database', assignee: { full_name: 'Nguyễn Văn A' } },
        ],
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchMembers = async () => {
    try {
      const data = await groupService.getMembers(groupId);
      setMembers(data.items || data);
    } catch (err) {
      setMembers([]);
    }
  };

  const handleOpenDialog = (task = null) => {
    setTaskDialog({ open: true, task });
    if (task) {
      reset(task);
    } else {
      reset({ title: '', description: '', assignee_id: '', due_date: '' });
    }
  };

  const handleCloseDialog = () => {
    setTaskDialog({ open: false, task: null });
    reset();
  };

  const onSubmit = async (data) => {
    try {
      if (taskDialog.task) {
        await groupService.updateTask(groupId, taskDialog.task.id, data);
        toast.success('Cập nhật công việc thành công');
      } else {
        await groupService.createTask(groupId, { ...data, status: 'todo' });
        toast.success('Thêm công việc thành công');
      }
      handleCloseDialog();
      fetchTasks();
    } catch (err) {
      toast.error('Thao tác thất bại');
    }
  };

  const handleUpdateStatus = async (taskId, newStatus) => {
    try {
      await groupService.updateTaskStatus(groupId, taskId, newStatus);
      fetchTasks();
    } catch (err) {
      toast.error('Cập nhật trạng thái thất bại');
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await groupService.deleteTask(groupId, taskId);
      toast.success('Xóa công việc thành công');
      fetchTasks();
    } catch (err) {
      toast.error('Xóa công việc thất bại');
    }
  };

  const renderTaskCard = (task) => (
    <Card
      key={task.id}
      sx={{
        mb: 1,
        cursor: 'pointer',
        '&:hover': { boxShadow: 3 },
      }}
    >
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Typography variant="subtitle2">{task.title}</Typography>
          <Box>
            <IconButton size="small" onClick={() => handleOpenDialog(task)}>
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" color="error" onClick={() => handleDeleteTask(task.id)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
        {task.assignee && (
          <Chip
            label={task.assignee.full_name}
            size="small"
            variant="outlined"
            sx={{ mt: 1 }}
          />
        )}
      </CardContent>
    </Card>
  );

  const renderColumn = (title, taskList, status, color) => (
    <Card sx={{ height: '100%', bgcolor: 'grey.50' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Chip label={`${title} (${taskList.length})`} color={color} size="small" />
          {status === 'todo' && (
            <IconButton size="small" onClick={() => handleOpenDialog()}>
              <AddIcon />
            </IconButton>
          )}
        </Box>
        <Box sx={{ minHeight: 200 }}>
          {taskList.map(task => renderTaskCard(task))}
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6">Bảng công việc</Typography>
        <Button startIcon={<AddIcon />} variant="contained" onClick={() => handleOpenDialog()}>
          Thêm công việc
        </Button>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          {renderColumn('Chưa làm', tasks.todo, 'todo', 'default')}
        </Grid>
        <Grid item xs={12} md={4}>
          {renderColumn('Đang làm', tasks.in_progress, 'in_progress', 'primary')}
        </Grid>
        <Grid item xs={12} md={4}>
          {renderColumn('Hoàn thành', tasks.completed, 'completed', 'success')}
        </Grid>
      </Grid>

      {/* Task Dialog */}
      <Dialog open={taskDialog.open} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>
            {taskDialog.task ? 'Chỉnh sửa công việc' : 'Thêm công việc mới'}
          </DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Tiêu đề"
              margin="normal"
              {...register('title', { required: 'Tiêu đề là bắt buộc' })}
              error={!!errors.title}
              helperText={errors.title?.message}
            />
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Mô tả"
              margin="normal"
              {...register('description')}
            />
            <TextField
              fullWidth
              select
              label="Phân công cho"
              margin="normal"
              {...register('assignee_id')}
              defaultValue=""
            >
              <MenuItem value="">-- Chưa phân công --</MenuItem>
              {members.map((member) => (
                <MenuItem key={member.id} value={member.user_id}>
                  {member.user?.full_name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              type="date"
              label="Deadline"
              margin="normal"
              InputLabelProps={{ shrink: true }}
              {...register('due_date')}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Hủy</Button>
            <Button type="submit" variant="contained">
              {taskDialog.task ? 'Cập nhật' : 'Thêm'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default TaskBoard;
