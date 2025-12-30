import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Menu,
  MenuItem,
  Box,
  Typography,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Circle as CircleIcon,
  Delete as DeleteIcon,
  DoneAll as DoneAllIcon,
} from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import { useNotification } from '../../context/NotificationContext';
import config from '../../config';

const NotificationMenu = ({ anchorEl, open, onClose }) => {
  const navigate = useNavigate();
  const {
    notifications,
    loading,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  } = useNotification();

  const handleNotificationClick = (notification) => {
    if (!notification.is_read) {
      markAsRead(notification.id);
    }
    // Navigate based on notification type
    if (notification.link) {
      navigate(notification.link);
    }
    onClose();
  };

  const getNotificationIcon = (item) => {
    // Return icon based on notification type
    return item.is_read ? (
      <CheckCircleIcon color="disabled" fontSize="small" />
    ) : (
      <CircleIcon color="primary" fontSize="small" />
    );
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

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 360,
          maxHeight: 480,
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
        }}
      >
        <Typography variant="h6">Thông báo</Typography>
        <Button
          size="small"
          startIcon={<DoneAllIcon />}
          onClick={markAllAsRead}
        >
          Đánh dấu tất cả
        </Button>
      </Box>
      <Divider />

      {/* Notification list */}
      {notifications.length === 0 ? (
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography color="text.secondary">
            Không có thông báo mới
          </Typography>
        </Box>
      ) : (
        <List sx={{ p: 0 }}>
          {notifications.slice(0, 10).map((notification) => (
            <ListItem
              key={notification.id}
              sx={{
                bgcolor: notification.is_read ? 'transparent' : 'action.hover',
                '&:hover': {
                  bgcolor: 'action.selected',
                },
              }}
              secondaryAction={
                <IconButton
                  edge="end"
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNotification(notification.id);
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              }
            >
              <ListItemIcon sx={{ minWidth: 36 }}>
                {notification.is_read ? (
                  <CheckCircleIcon color="disabled" fontSize="small" />
                ) : (
                  <CircleIcon color="primary" fontSize="small" />
                )}
              </ListItemIcon>
              <ListItemText
                primary={notification.title}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        display: 'block',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {notification.message}
                    </Typography>
                    <Typography
                      component="span"
                      variant="caption"
                      color="text.disabled"
                    >
                      {formatTime(notification.created_at)}
                    </Typography>
                  </React.Fragment>
                }
                onClick={() => handleNotificationClick(notification)}
                sx={{ cursor: 'pointer' }}
              />
            </ListItem>
          ))}
        </List>
      )}

      {/* Footer */}
      {notifications.length > 10 && (
        <>
          <Divider />
          <MenuItem
            onClick={() => {
              navigate('/notifications');
              onClose();
            }}
            sx={{ justifyContent: 'center', py: 1.5 }}
          >
            <Typography color="primary">Xem tất cả thông báo</Typography>
          </MenuItem>
        </>
      )}
    </Menu>
  );
};

export default NotificationMenu;
