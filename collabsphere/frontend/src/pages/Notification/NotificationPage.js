import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Chip,
  Button,
  Tabs,
  Tab,
  Badge,
  CircularProgress,
  Tooltip,
  Divider,
  Grid,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';
import {
  Assignment as AssignmentIcon,
  Group as GroupIcon,
  Message as MessageIcon,
  CheckBox as CheckBoxIcon,
  Event as EventIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  CheckCircle as CheckCircleIcon,
  Circle as CircleIcon,
  Delete as DeleteIcon,
  DoneAll as DoneAllIcon,
  FilterList as FilterIcon,
  MarkEmailRead as MarkReadIcon,
} from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import { useNotification } from '../../context/NotificationContext';
import { useNavigate } from 'react-router-dom';

const NOTIFICATION_TYPES = {
  PROJECT: { icon: <AssignmentIcon />, color: '#2196f3', label: 'Đề tài' },
  GROUP: { icon: <GroupIcon />, color: '#4caf50', label: 'Nhóm' },
  MESSAGE: { icon: <MessageIcon />, color: '#ff9800', label: 'Tin nhắn' },
  TASK: { icon: <CheckBoxIcon />, color: '#9c27b0', label: 'Công việc' },
  MEETING: { icon: <EventIcon />, color: '#f44336', label: 'Họp' },
  EVALUATION: { icon: <CheckCircleIcon />, color: '#00bcd4', label: 'Đánh giá' },
  SYSTEM: { icon: <InfoIcon />, color: '#607d8b', label: 'Hệ thống' },
  WARNING: { icon: <WarningIcon />, color: '#ff5722', label: 'Cảnh báo' },
};

const NotificationPage = () => {
  const navigate = useNavigate();
  const {
    notifications,
    loading,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    fetchNotifications,
  } = useNotification();

  const [activeTab, setActiveTab] = useState(0); // 0: All, 1: Unread
  const [filterType, setFilterType] = useState('ALL');

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleNotificationClick = (notification) => {
    if (!notification.is_read) {
      markAsRead(notification.id);
    }
    // Navigate based on notification
    if (notification.link) {
      navigate(notification.link);
    } else if (notification.related_id) {
      switch (notification.type) {
        case 'PROJECT':
          navigate(`/projects/${notification.related_id}`);
          break;
        case 'GROUP':
          navigate(`/groups/${notification.related_id}`);
          break;
        case 'TASK':
          navigate(`/tasks`);
          break;
        case 'MEETING':
          navigate(`/groups/${notification.related_id}/workspace`);
          break;
        default:
          break;
      }
    }
  };

  const handleMarkAsRead = (e, notificationId) => {
    e.stopPropagation();
    markAsRead(notificationId);
  };

  const handleDelete = (e, notificationId) => {
    e.stopPropagation();
    deleteNotification(notificationId);
  };

  const getNotificationTypeInfo = (type) => {
    return NOTIFICATION_TYPES[type] || NOTIFICATION_TYPES.SYSTEM;
  };

  const formatTime = (date) => {
    try {
      return formatDistanceToNow(new Date(date), {
        addSuffix: true,
        locale: vi,
      });
    } catch {
      return '';
    }
  };

  // Apply filters
  let filteredNotifications = notifications;
  
  // Filter by read/unread
  if (activeTab === 1) {
    filteredNotifications = filteredNotifications.filter(n => !n.is_read);
  }
  
  // Filter by type
  if (filterType !== 'ALL') {
    filteredNotifications = filteredNotifications.filter(n => n.type === filterType);
  }

  const unreadCount = notifications.filter(n => !n.is_read).length;
  const readCount = notifications.length - unreadCount;

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          Thông báo
        </Typography>
        <Button
          startIcon={<DoneAllIcon />}
          onClick={markAllAsRead}
          disabled={unreadCount === 0}
          variant="contained"
        >
          Đánh dấu tất cả đã đọc
        </Button>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ bgcolor: '#e3f2fd' }}>
            <CardContent>
              <Typography variant="h4" fontWeight="bold" color="primary">
                {notifications.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Tổng thông báo
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ bgcolor: '#fff3e0' }}>
            <CardContent>
              <Typography variant="h4" fontWeight="bold" sx={{ color: '#ff9800' }}>
                {unreadCount}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Chưa đọc
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ bgcolor: '#e8f5e9' }}>
            <CardContent>
              <Typography variant="h4" fontWeight="bold" sx={{ color: '#4caf50' }}>
                {readCount}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Đã đọc
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Main Card */}
      <Card>
        {/* Filters */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)}>
            <Tab label={`Tất cả (${notifications.length})`} />
            <Tab
              label={
                <Badge badgeContent={unreadCount} color="error">
                  Chưa đọc
                </Badge>
              }
            />
          </Tabs>
          <FormControl sx={{ minWidth: 200 }} size="small">
            <InputLabel>Lọc theo loại</InputLabel>
            <Select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              label="Lọc theo loại"
              startAdornment={<FilterIcon sx={{ mr: 1 }} />}
            >
              <MenuItem value="ALL">Tất cả</MenuItem>
              {Object.entries(NOTIFICATION_TYPES).map(([key, value]) => (
                <MenuItem key={key} value={key}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ color: value.color }}>{value.icon}</Box>
                    {value.label}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Notification List */}
        <CardContent sx={{ p: 0 }}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress />
            </Box>
          ) : filteredNotifications.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <InfoIcon sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
                {activeTab === 1 ? 'Không có thông báo chưa đọc' : 'Không có thông báo'}
              </Typography>
            </Box>
          ) : (
            <List sx={{ p: 0 }}>
              {filteredNotifications.map((notification, index) => {
                const typeInfo = getNotificationTypeInfo(notification.type);
                return (
                  <React.Fragment key={notification.id}>
                    <ListItem
                      button
                      onClick={() => handleNotificationClick(notification)}
                      sx={{
                        bgcolor: notification.is_read ? 'transparent' : 'action.hover',
                        '&:hover': {
                          bgcolor: 'action.selected',
                        },
                        px: 3,
                        py: 2,
                      }}
                    >
                      {/* Type Icon */}
                      <ListItemIcon sx={{ minWidth: 56 }}>
                        <Box
                          sx={{
                            width: 48,
                            height: 48,
                            borderRadius: '50%',
                            bgcolor: `${typeInfo.color}20`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: typeInfo.color,
                          }}
                        >
                          {typeInfo.icon}
                        </Box>
                      </ListItemIcon>

                      {/* Content */}
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                            <Typography
                              variant="body1"
                              fontWeight={notification.is_read ? 'normal' : 'bold'}
                              sx={{ flex: 1 }}
                            >
                              {notification.title}
                            </Typography>
                            {!notification.is_read && (
                              <CircleIcon
                                sx={{ fontSize: 10, color: 'primary.main' }}
                              />
                            )}
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ mb: 1 }}
                            >
                              {notification.message}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Chip
                                label={typeInfo.label}
                                size="small"
                                sx={{
                                  height: 20,
                                  fontSize: '0.7rem',
                                  bgcolor: `${typeInfo.color}20`,
                                  color: typeInfo.color,
                                }}
                              />
                              <Typography variant="caption" color="text.secondary">
                                {formatTime(notification.created_at)}
                              </Typography>
                            </Box>
                          </Box>
                        }
                      />

                      {/* Actions */}
                      <Box sx={{ display: 'flex', gap: 1, ml: 2 }}>
                        {!notification.is_read && (
                          <Tooltip title="Đánh dấu đã đọc">
                            <IconButton
                              size="medium"
                              onClick={(e) => handleMarkAsRead(e, notification.id)}
                            >
                              <MarkReadIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                        <Tooltip title="Xóa">
                          <IconButton
                            size="medium"
                            onClick={(e) => handleDelete(e, notification.id)}
                            color="error"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </ListItem>
                    {index < filteredNotifications.length - 1 && <Divider />}
                  </React.Fragment>
                );
              })}
            </List>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default NotificationPage;
