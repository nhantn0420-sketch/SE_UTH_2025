import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  TextField,
  Switch,
  FormControlLabel,
  Button,
  Divider,
  Alert,
  Snackbar,
  Avatar,
  IconButton,
  Tabs,
  Tab,
} from '@mui/material';
import {
  PhotoCamera,
  Save as SaveIcon,
  Lock as LockIcon,
  Notifications as NotificationsIcon,
  Language as LanguageIcon,
  Palette as PaletteIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const Settings = () => {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ open: false, text: '', severity: 'success' });

  // Profile settings
  const [profile, setProfile] = useState({
    full_name: '',
    email: '',
    phone: '',
    avatar: null,
  });

  // Password settings
  const [password, setPassword] = useState({
    current_password: '',
    new_password: '',
    confirm_password: '',
  });

  // Notification settings
  const [notifications, setNotifications] = useState({
    email_notifications: true,
    push_notifications: true,
    project_updates: true,
    group_messages: true,
    deadline_reminders: true,
  });

  // App settings
  const [appSettings, setAppSettings] = useState({
    theme: 'light',
    language: 'vi',
    timezone: 'Asia/Ho_Chi_Minh',
  });

  useEffect(() => {
    if (user) {
      setProfile({
        full_name: user.full_name || '',
        email: user.email || '',
        phone: user.phone || '',
        avatar: null,
      });
      loadSettings();
    }
  }, [user]);

  const loadSettings = async () => {
    try {
      const response = await api.get('/users/settings');
      if (response.data.notifications) {
        setNotifications(response.data.notifications);
      }
      if (response.data.preferences) {
        setAppSettings(response.data.preferences);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleProfileChange = (field) => (event) => {
    setProfile({ ...profile, [field]: event.target.value });
  };

  const handlePasswordChange = (field) => (event) => {
    setPassword({ ...password, [field]: event.target.value });
  };

  const handleNotificationChange = (field) => (event) => {
    setNotifications({ ...notifications, [field]: event.target.checked });
  };

  const handleAppSettingChange = (field) => (event) => {
    setAppSettings({ ...appSettings, [field]: event.target.value });
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfile({ ...profile, avatar: file });
    }
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('full_name', profile.full_name);
      formData.append('phone', profile.phone);
      if (profile.avatar) {
        formData.append('avatar', profile.avatar);
      }

      const response = await api.put('/users/me', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      updateUser(response.data);
      setMessage({ open: true, text: 'Cập nhật thông tin thành công!', severity: 'success' });
    } catch (error) {
      setMessage({ open: true, text: 'Lỗi khi cập nhật thông tin!', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (password.new_password !== password.confirm_password) {
      setMessage({ open: true, text: 'Mật khẩu xác nhận không khớp!', severity: 'error' });
      return;
    }

    if (password.new_password.length < 6) {
      setMessage({ open: true, text: 'Mật khẩu mới phải có ít nhất 6 ký tự!', severity: 'error' });
      return;
    }

    setLoading(true);
    try {
      await api.post('/users/change-password', {
        current_password: password.current_password,
        new_password: password.new_password,
      });

      setMessage({ open: true, text: 'Đổi mật khẩu thành công!', severity: 'success' });
      setPassword({ current_password: '', new_password: '', confirm_password: '' });
    } catch (error) {
      setMessage({ 
        open: true, 
        text: error.response?.data?.detail || 'Lỗi khi đổi mật khẩu!', 
        severity: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveNotifications = async () => {
    setLoading(true);
    try {
      await api.put('/users/settings/notifications', notifications);
      setMessage({ open: true, text: 'Cập nhật cài đặt thông báo thành công!', severity: 'success' });
    } catch (error) {
      setMessage({ open: true, text: 'Lỗi khi cập nhật cài đặt!', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAppSettings = async () => {
    setLoading(true);
    try {
      await api.put('/users/settings/preferences', appSettings);
      setMessage({ open: true, text: 'Cập nhật cài đặt ứng dụng thành công!', severity: 'success' });
    } catch (error) {
      setMessage({ open: true, text: 'Lỗi khi cập nhật cài đặt!', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Cài đặt
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Quản lý thông tin cá nhân và tùy chỉnh hệ thống
      </Typography>

      <Paper>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={handleTabChange} aria-label="settings tabs">
            <Tab icon={<PersonIcon />} iconPosition="start" label="Thông tin cá nhân" />
            <Tab icon={<LockIcon />} iconPosition="start" label="Mật khẩu" />
            <Tab icon={<NotificationsIcon />} iconPosition="start" label="Thông báo" />
            <Tab icon={<PaletteIcon />} iconPosition="start" label="Giao diện" />
          </Tabs>
        </Box>

        {/* Profile Tab */}
        <TabPanel value={activeTab} index={0}>
          <Box sx={{ p: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
                <Avatar
                  sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
                  src={user?.avatar_url}
                  alt={user?.full_name}
                >
                  {user?.full_name?.charAt(0)}
                </Avatar>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="avatar-upload"
                  type="file"
                  onChange={handleAvatarChange}
                />
                <label htmlFor="avatar-upload">
                  <Button
                    variant="outlined"
                    component="span"
                    startIcon={<PhotoCamera />}
                  >
                    Thay đổi ảnh
                  </Button>
                </label>
                {profile.avatar && (
                  <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                    {profile.avatar.name}
                  </Typography>
                )}
              </Grid>

              <Grid item xs={12} md={8}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Họ và tên"
                      value={profile.full_name}
                      onChange={handleProfileChange('full_name')}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      value={profile.email}
                      disabled
                      helperText="Email không thể thay đổi"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Số điện thoại"
                      value={profile.phone}
                      onChange={handleProfileChange('phone')}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Vai trò"
                      value={user?.role?.toUpperCase()}
                      disabled
                    />
                  </Grid>
                </Grid>

                <Box sx={{ mt: 3 }}>
                  <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    onClick={handleSaveProfile}
                    disabled={loading}
                  >
                    Lưu thay đổi
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </TabPanel>

        {/* Password Tab */}
        <TabPanel value={activeTab} index={1}>
          <Box sx={{ p: 3, maxWidth: 600 }}>
            <Typography variant="h6" gutterBottom>
              Đổi mật khẩu
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Mật khẩu mới phải có ít nhất 6 ký tự
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="password"
                  label="Mật khẩu hiện tại"
                  value={password.current_password}
                  onChange={handlePasswordChange('current_password')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="password"
                  label="Mật khẩu mới"
                  value={password.new_password}
                  onChange={handlePasswordChange('new_password')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="password"
                  label="Xác nhận mật khẩu mới"
                  value={password.confirm_password}
                  onChange={handlePasswordChange('confirm_password')}
                />
              </Grid>
            </Grid>

            <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                startIcon={<LockIcon />}
                onClick={handleChangePassword}
                disabled={loading || !password.current_password || !password.new_password}
              >
                Đổi mật khẩu
              </Button>
            </Box>
          </Box>
        </TabPanel>

        {/* Notifications Tab */}
        <TabPanel value={activeTab} index={2}>
          <Box sx={{ p: 3, maxWidth: 600 }}>
            <Typography variant="h6" gutterBottom>
              Cài đặt thông báo
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Chọn các loại thông báo bạn muốn nhận
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.email_notifications}
                    onChange={handleNotificationChange('email_notifications')}
                  />
                }
                label="Thông báo qua Email"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.push_notifications}
                    onChange={handleNotificationChange('push_notifications')}
                  />
                }
                label="Thông báo đẩy trên trình duyệt"
              />
              <Divider />
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.project_updates}
                    onChange={handleNotificationChange('project_updates')}
                  />
                }
                label="Cập nhật dự án"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.group_messages}
                    onChange={handleNotificationChange('group_messages')}
                  />
                }
                label="Tin nhắn nhóm"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.deadline_reminders}
                    onChange={handleNotificationChange('deadline_reminders')}
                  />
                }
                label="Nhắc nhở deadline"
              />
            </Box>

            <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSaveNotifications}
                disabled={loading}
              >
                Lưu cài đặt
              </Button>
            </Box>
          </Box>
        </TabPanel>

        {/* App Settings Tab */}
        <TabPanel value={activeTab} index={3}>
          <Box sx={{ p: 3, maxWidth: 600 }}>
            <Typography variant="h6" gutterBottom>
              Cài đặt giao diện
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Tùy chỉnh giao diện và ngôn ngữ ứng dụng
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="Giao diện"
                  value={appSettings.theme}
                  onChange={handleAppSettingChange('theme')}
                  SelectProps={{ native: true }}
                >
                  <option value="light">Sáng</option>
                  <option value="dark">Tối</option>
                  <option value="auto">Tự động</option>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="Ngôn ngữ"
                  value={appSettings.language}
                  onChange={handleAppSettingChange('language')}
                  SelectProps={{ native: true }}
                >
                  <option value="vi">Tiếng Việt</option>
                  <option value="en">English</option>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="Múi giờ"
                  value={appSettings.timezone}
                  onChange={handleAppSettingChange('timezone')}
                  SelectProps={{ native: true }}
                >
                  <option value="Asia/Ho_Chi_Minh">Việt Nam (GMT+7)</option>
                  <option value="Asia/Bangkok">Bangkok (GMT+7)</option>
                  <option value="Asia/Singapore">Singapore (GMT+8)</option>
                </TextField>
              </Grid>
            </Grid>

            <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSaveAppSettings}
                disabled={loading}
              >
                Lưu cài đặt
              </Button>
            </Box>
          </Box>
        </TabPanel>
      </Paper>

      <Snackbar
        open={message.open}
        autoHideDuration={6000}
        onClose={() => setMessage({ ...message, open: false })}
      >
        <Alert
          onClose={() => setMessage({ ...message, open: false })}
          severity={message.severity}
          sx={{ width: '100%' }}
        >
          {message.text}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Settings;
