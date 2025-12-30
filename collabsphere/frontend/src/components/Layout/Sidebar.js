import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  School as SchoolIcon,
  Class as ClassIcon,
  Assignment as AssignmentIcon,
  Groups as GroupsIcon,
  Assessment as AssessmentIcon,
  Folder as FolderIcon,
  CheckCircle as CheckCircleIcon,
  Chat as ChatIcon,
  Report as ReportIcon,
  LibraryBooks as LibraryBooksIcon,
  AssignmentTurnedIn as AssignmentTurnedInIcon,
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

const Sidebar = ({ open, onClose, width, isMobile }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  // Menu items based on role
  const getMenuItems = () => {
    switch (user?.role) {
      case 'admin':
        return [
          { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin' },
          { text: 'Quản lý người dùng', icon: <PeopleIcon />, path: '/admin/users' },
          { text: 'Báo cáo hệ thống', icon: <ReportIcon />, path: '/admin/reports' },
        ];
      case 'staff':
        return [
          { text: 'Dashboard', icon: <DashboardIcon />, path: '/staff' },
          { text: 'Quản lý môn học', icon: <SchoolIcon />, path: '/staff/subjects' },
          { text: 'Quản lý lớp học', icon: <ClassIcon />, path: '/staff/classes' },
          { text: 'Quản lý giáo trình', icon: <LibraryBooksIcon />, path: '/staff/curricula' },
        ];
      case 'head':
        return [
          { text: 'Dashboard', icon: <DashboardIcon />, path: '/head' },
          { text: 'Duyệt đề tài', icon: <CheckCircleIcon />, path: '/head/approvals' },
          { text: 'Phân công đề tài', icon: <AssignmentTurnedInIcon />, path: '/head/assignments' },
          { text: 'Danh sách lớp học', icon: <ClassIcon />, path: '/head/classes' },
          { text: 'Danh sách đề tài', icon: <AssignmentIcon />, path: '/projects' },
        ];
      case 'lecturer':
        return [
          { text: 'Dashboard', icon: <DashboardIcon />, path: '/lecturer' },
          { text: 'Đề tài', icon: <AssignmentIcon />, path: '/projects' },
          { text: 'Nhóm sinh viên', icon: <GroupsIcon />, path: '/groups' },
          { text: 'Đánh giá', icon: <AssessmentIcon />, path: '/evaluations' },
        ];
      case 'student':
        return [
          { text: 'Dashboard', icon: <DashboardIcon />, path: '/student' },
          { text: 'Nhóm của tôi', icon: <GroupsIcon />, path: '/groups' },
          { text: 'Đề tài', icon: <AssignmentIcon />, path: '/projects' },
          { text: 'Tài liệu', icon: <FolderIcon />, path: '/resources' },
          { text: 'Trò chuyện', icon: <ChatIcon />, path: '/chat' },
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      onClose();
    }
  };

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Logo */}
      <Box
        sx={{
          p: 3,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <Box
          sx={{
            width: 40,
            height: 40,
            bgcolor: 'primary.main',
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h6" color="white" fontWeight="bold">
            CS
          </Typography>
        </Box>
        <Box>
          <Typography variant="h6" fontWeight="bold" color="primary.main">
            CollabSphere
          </Typography>
          <Typography variant="caption" color="text.secondary">
            COSRE
          </Typography>
        </Box>
      </Box>

      <Divider />

      {/* Menu items */}
      <List sx={{ flexGrow: 1, px: 2, py: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              onClick={() => handleNavigation(item.path)}
              selected={location.pathname === item.path}
              sx={{
                borderRadius: 2,
                '&.Mui-selected': {
                  bgcolor: 'primary.light',
                  color: 'primary.main',
                  '&:hover': {
                    bgcolor: 'primary.light',
                  },
                  '& .MuiListItemIcon-root': {
                    color: 'primary.main',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Footer */}
      <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
        <Typography variant="caption" color="text.secondary">
          © 2024 CollabSphere
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'persistent'}
      open={open}
      onClose={onClose}
      sx={{
        width: width,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: width,
          boxSizing: 'border-box',
          borderRight: '1px solid',
          borderColor: 'divider',
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
};

export default Sidebar;
