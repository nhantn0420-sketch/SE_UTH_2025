import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Menu,
  Box,
  Typography,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Chip,
  Tabs,
  Tab,
  Badge,
  CircularProgress,
  Tooltip,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Circle as CircleIcon,
  Delete as DeleteIcon,
  DoneAll as DoneAllIcon,
  Assignment as AssignmentIcon,
  Group as GroupIcon,
  Message as MessageIcon,
  CheckBox as CheckBoxIcon,
  Event as EventIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Close as CloseIcon,
  MarkEmailRead as MarkReadIcon,
} from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import { useNotification } from '../../context/NotificationContext';

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

const NotificationMenu = ({ anchorEl, open, onClose }) => {
  const navigate = useNavigate();
  const {
    notifications,
    loading,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  } = useNotification();

  const [activeTab, setActiveTab] = useState(0); // 0: All, 1: Unread

  const handleNotificationClick = (notification) => {
    if (!notification.is_read) {
      markAsRead(notification.id);
    }
    // Navigate based on notification type and link
    if (notification.link) {
      navigate(notification.link);
    } else if (notification.related_id) {
      // Fallback navigation based on type
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
    onClose();
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

  // Filter notifications based on active tab
  const filteredNotifications = activeTab === 1
    ? notifications.filter(n => !n.is_read)
    : notifications;

  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 420,
          maxHeight: 600,
          mt: 1,
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      {/* Header */}
      <Box
        sx={{
          px: 2,
          py: 1.5,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          bgcolor: 'primary.main',
          color: 'white',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="h6">Thông báo</Typography>
          {unreadCount > 0 && (
            <Chip
              label={unreadCount}
              size="small"
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                fontWeight: 'bold',
                height: 20,
              }}
            />
          )}
        </Box>
        <IconButton
          size="small"
          onClick={onClose}
          sx={{ color: 'white' }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onChange={(e, v) => setActiveTab(v)}
        sx={{ px: 2, borderBottom: 1, borderColor: 'divider' }}
      >
        <Tab label={`Tất cả (${notifications.length})`} />
        <Tab
          label={
            <Badge badgeContent={unreadCount} color="error">
              Chưa đọc
            </Badge>
          }
        />
      </Tabs>

      {/* Actions */}
      <Box
        sx={{
          px: 2,
          py: 1,
          display: 'flex',
          gap: 1,
          bgcolor: 'grey.50',
        }}
      >
        <Button
          size="small"
          startIcon={<DoneAllIcon />}
          onClick={markAllAsRead}
          disabled={unreadCount === 0}
          variant="outlined"
          sx={{ fontSize: '0.75rem' }}
        >
          Đọc tất cả
        </Button>
        <Button
          size="small"
          onClick={() => {
            navigate('/notifications');
            onClose();
          }}
          variant="text"
          sx={{ fontSize: '0.75rem' }}
        >
          Xem tất cả
        </Button>
      </Box>

      <Divider />

      <Divider />

      {/* Notification List */}
      <List sx={{ p: 0, maxHeight: 400, overflow: 'auto' }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress size={24} />
          </Box>
        ) : filteredNotifications.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <InfoIcon sx={{ fontSize: 48, color: 'grey.400', mb: 1 }} />
            <Typography color="text.secondary">
              {activeTab === 1 ? 'Không có thông báo chưa đọc' : 'Không có thông báo'}
            </Typography>
          </Box>
        ) : (
          filteredNotifications.slice(0, 15).map((notification, index) => {
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
                    px: 2,
                    py: 1.5,
                  }}
                >
                  {/* Type Icon */}
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <Box
                      sx={{
                        width: 36,
                        height: 36,
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
                          variant="body2"
                          fontWeight={notification.is_read ? 'normal' : 'bold'}
                          sx={{
                            flex: 1,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                          }}
                        >
                          {notification.title}
                        </Typography>
                        {!notification.is_read && (
                          <CircleIcon
                            sx={{ fontSize: 8, color: 'primary.main' }}
                          />
                        )}
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{
                            display: '-webkit-box',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                          }}
                        >
                          {notification.message}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                          <Chip
                            label={typeInfo.label}
                            size="small"
                            sx={{
                              height: 18,
                              fontSize: '0.65rem',
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
                  <Box sx={{ display: 'flex', gap: 0.5, ml: 1 }}>
                    {!notification.is_read && (
                      <Tooltip title="Đánh dấu đã đọc">
                        <IconButton
                          size="small"
                          onClick={(e) => handleMarkAsRead(e, notification.id)}
                          sx={{ opacity: 0.7, '&:hover': { opacity: 1 } }}
                        >
                          <MarkReadIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                    <Tooltip title="Xóa">
                      <IconButton
                        size="small"
                        onClick={(e) => handleDelete(e, notification.id)}
                        sx={{ opacity: 0.7, '&:hover': { opacity: 1 } }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </ListItem>
                {index < filteredNotifications.slice(0, 15).length - 1 && <Divider />}
              </React.Fragment>
            );
          })
        )}
      </List>

      {/* Footer */}
      {filteredNotifications.length > 0 && (
        <>
          <Divider />
          <Box sx={{ p: 1.5, textAlign: 'center', bgcolor: 'grey.50' }}>
            <Button
              size="small"
              onClick={() => {
                navigate('/notifications');
                onClose();
              }}
              fullWidth
            >
              Xem tất cả thông báo
            </Button>
          </Box>
        </>
      )}
    </Menu>
  );
};

export default NotificationMenu;
