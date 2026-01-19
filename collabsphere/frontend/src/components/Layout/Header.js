import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Menu,
  MenuItem,
  Box,
  Avatar,
  Divider,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import NotificationMenu from '../Notification/NotificationMenu';
import config from '../../config';

const Header = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { unreadCount } = useNotification();
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchor, setNotificationAnchor] = useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSettings = () => {
    navigate('/settings');
    handleProfileMenuClose();
  };

  const handleNotificationOpen = (event) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchor(null);
  };

  const handleProfile = () => {
    navigate('/profile');
    handleProfileMenuClose();
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: 'background.paper',
        color: 'text.primary',
      }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onMenuClick}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          CollabSphere
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Notifications */}
          <Tooltip title="Thông báo">
            <IconButton
              color="inherit"
              onClick={handleNotificationOpen}
            >
              <Badge badgeContent={unreadCount} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* User menu */}
          <Tooltip title="Tài khoản">
            <IconButton
              onClick={handleProfileMenuOpen}
              sx={{ ml: 1 }}
            >
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  bgcolor: 'primary.main',
                  fontSize: '0.875rem',
                }}
              >
                {getInitials(user?.full_name)}
              </Avatar>
            </IconButton>
          </Tooltip>
        </Box>

        {/* Profile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleProfileMenuClose}
          PaperProps={{
            sx: { width: 240, mt: 1 },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <Box sx={{ px: 2, py: 1 }}>
            <Typography variant="subtitle1" fontWeight={500}>
              {user?.full_name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user?.email}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                display: 'inline-block',
                mt: 0.5,
                px: 1,
                py: 0.25,
                bgcolor: 'primary.light',
                color: 'primary.contrastText',
                borderRadius: 1,
              }}
            >
              {config.ROLE_NAMES[user?.role]}
            </Typography>
          </Box>
          <Divider />
          <MenuItem onClick={handleProfile}>
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Trang cá nhân</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleSettings}>
            <ListItemIcon>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Cài đặt</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" color="error" />
            </ListItemIcon>
            <ListItemText sx={{ color: 'error.main' }}>Đăng xuất</ListItemText>
          </MenuItem>
        </Menu>

        {/* Notification Menu */}
        <NotificationMenu
          anchorEl={notificationAnchor}
          open={Boolean(notificationAnchor)}
          onClose={handleNotificationClose}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
