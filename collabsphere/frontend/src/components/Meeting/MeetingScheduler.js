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
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  FormControlLabel,
  Switch,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  VideoCall as VideoIcon,
  Schedule as ScheduleIcon,
  Notifications as NotifyIcon,
} from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { format, parseISO, isFuture } from 'date-fns';
import { vi } from 'date-fns/locale';
import { meetingService } from '../../services/communicationService';

const MeetingScheduler = ({ groupId, onMeetingCreated }) => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetchMeetings();
  }, [groupId]);

  const fetchMeetings = async () => {
    setLoading(true);
    try {
      const data = await meetingService.getMeetings(groupId);
      setMeetings(data.items || data || []);
    } catch (err) {
      console.error('Failed to fetch meetings:', err);
      // Demo data
      setMeetings([
        {
          id: 1,
          title: 'Họp tiến độ tuần 1',
          scheduled_at: new Date(Date.now() + 86400000).toISOString(),
          duration_minutes: 60,
          send_notification: true,
          status: 'scheduled',
        },
        {
          id: 2,
          title: 'Review milestone 1',
          scheduled_at: new Date(Date.now() + 172800000).toISOString(),
          duration_minutes: 90,
          send_notification: true,
          status: 'scheduled',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const meetingData = {
        ...data,
        group_id: groupId,
        scheduled_at: new Date(data.scheduled_at).toISOString(),
        duration_minutes: parseInt(data.duration_minutes),
      };
      
      await meetingService.createMeeting(groupId, meetingData);
      toast.success('Đặt lịch họp thành công!');
      setOpenDialog(false);
      reset();
      fetchMeetings();
      if (onMeetingCreated) onMeetingCreated();
    } catch (err) {
      toast.error('Đặt lịch thất bại');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteMeeting = async (meetingId) => {
    try {
      await meetingService.deleteMeeting(meetingId);
      toast.success('Đã hủy cuộc họp');
      fetchMeetings();
    } catch (err) {
      toast.error('Hủy cuộc họp thất bại');
    }
  };

  const handleJoinMeeting = (meetingId) => {
    window.open(`/video/${groupId}?meeting=${meetingId}`, '_blank');
  };

  const formatDateTime = (dateString) => {
    try {
      return format(parseISO(dateString), "EEEE, dd/MM/yyyy 'lúc' HH:mm", { locale: vi });
    } catch {
      return dateString;
    }
  };

  const upcomingMeetings = meetings.filter(m => isFuture(parseISO(m.scheduled_at)));
  const pastMeetings = meetings.filter(m => !isFuture(parseISO(m.scheduled_at)));

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6">
            <ScheduleIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Lịch họp nhóm
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog(true)}
          >
            Đặt lịch họp
          </Button>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {/* Upcoming Meetings */}
            <Typography variant="subtitle2" color="primary" gutterBottom>
              Cuộc họp sắp tới ({upcomingMeetings.length})
            </Typography>
            {upcomingMeetings.length === 0 ? (
              <Alert severity="info" sx={{ mb: 2 }}>
                Chưa có cuộc họp nào được lên lịch
              </Alert>
            ) : (
              <List sx={{ mb: 3 }}>
                {upcomingMeetings.map((meeting) => (
                  <ListItem
                    key={meeting.id}
                    sx={{
                      bgcolor: 'primary.light',
                      borderRadius: 1,
                      mb: 1,
                      color: 'primary.contrastText',
                    }}
                  >
                    <ListItemText
                      primary={
                        <Typography fontWeight="bold">{meeting.title}</Typography>
                      }
                      secondary={
                        <Box sx={{ color: 'inherit', opacity: 0.9 }}>
                          <Typography variant="body2">
                            {formatDateTime(meeting.scheduled_at)}
                          </Typography>
                          <Typography variant="caption">
                            Thời lượng: {meeting.duration_minutes} phút
                          </Typography>
                        </Box>
                      }
                    />
                    <ListItemSecondaryAction>
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        startIcon={<VideoIcon />}
                        onClick={() => handleJoinMeeting(meeting.id)}
                        sx={{ mr: 1 }}
                      >
                        Tham gia
                      </Button>
                      <IconButton
                        edge="end"
                        color="error"
                        onClick={() => handleDeleteMeeting(meeting.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            )}

            {/* Past Meetings */}
            {pastMeetings.length > 0 && (
              <>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Cuộc họp đã qua ({pastMeetings.length})
                </Typography>
                <List>
                  {pastMeetings.slice(0, 5).map((meeting) => (
                    <ListItem key={meeting.id} sx={{ opacity: 0.7 }}>
                      <ListItemText
                        primary={meeting.title}
                        secondary={formatDateTime(meeting.scheduled_at)}
                      />
                      <Chip label="Đã kết thúc" size="small" />
                    </ListItem>
                  ))}
                </List>
              </>
            )}
          </>
        )}

        {/* Schedule Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogTitle>Đặt lịch họp mới</DialogTitle>
            <DialogContent>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Tiêu đề cuộc họp"
                    {...register('title', { required: 'Vui lòng nhập tiêu đề' })}
                    error={!!errors.title}
                    helperText={errors.title?.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Thời gian họp"
                    type="datetime-local"
                    InputLabelProps={{ shrink: true }}
                    {...register('scheduled_at', { required: 'Vui lòng chọn thời gian' })}
                    error={!!errors.scheduled_at}
                    helperText={errors.scheduled_at?.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Thời lượng (phút)"
                    type="number"
                    defaultValue={60}
                    {...register('duration_minutes', { required: true, min: 15 })}
                    error={!!errors.duration_minutes}
                    helperText={errors.duration_minutes && 'Tối thiểu 15 phút'}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Ghi chú"
                    multiline
                    rows={2}
                    {...register('description')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch defaultChecked {...register('send_notification')} />
                    }
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <NotifyIcon fontSize="small" />
                        Gửi thông báo cho thành viên
                      </Box>
                    }
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)}>Hủy</Button>
              <Button
                type="submit"
                variant="contained"
                disabled={submitting}
              >
                {submitting ? <CircularProgress size={24} /> : 'Đặt lịch'}
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default MeetingScheduler;
