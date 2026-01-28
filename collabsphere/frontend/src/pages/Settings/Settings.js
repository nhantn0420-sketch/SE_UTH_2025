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
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import api from '../../services/api';
import config from '../../config';

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
  const { mode: themeMode, setTheme } = useTheme();
  const { language, changeLanguage, t } = useLanguage();
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

  // Sync theme from context to local state
  useEffect(() => {
    setAppSettings(prev => ({
      ...prev,
      theme: themeMode
    }));
  }, [themeMode]);

  const loadSettings = async () => {
    try {
      console.log('Loading settings from backend...');
      const response = await api.get('/users/settings');
      console.log('Settings response:', response.data);
      
      if (response.data.notifications) {
        console.log('Setting notifications:', response.data.notifications);
        setNotifications(response.data.notifications);
      }
      
      if (response.data.preferences) {
        console.log('Setting preferences:', response.data.preferences);
        const prefs = response.data.preferences;
        setAppSettings({
          theme: prefs.theme || themeMode,
          language: prefs.language || language,
          timezone: prefs.timezone || 'Asia/Ho_Chi_Minh',
        });
        
        // Apply theme if saved
        if (prefs.theme) {
          console.log('Applying saved theme:', prefs.theme);
          setTheme(prefs.theme);
        }
        
        // Apply language if saved
        if (prefs.language && prefs.language !== language) {
          console.log('Applying saved language:', prefs.language);
          changeLanguage(prefs.language);
        }
      }
    } catch (error) {
      console.error('Error loading settings:', error);
      console.error('Error details:', error.response?.data);
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
      console.log('Saving profile...', { full_name: profile.full_name, phone: profile.phone, has_avatar: !!profile.avatar });
      
      const formData = new FormData();
      formData.append('full_name', profile.full_name);
      formData.append('phone', profile.phone || '');
      if (profile.avatar) {
        formData.append('avatar', profile.avatar);
        console.log('Uploading avatar:', profile.avatar.name);
      }

      const response = await api.put('/users/me', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Profile update response:', response.data);
      
      // Update user in auth context
      updateUser(response.data);
      
      // Reload profile data to show updated values
      setProfile({
        full_name: response.data.full_name,
        email: response.data.email,
        phone: response.data.phone || '',
        avatar: null, // Clear file input
      });
      
      console.log('Profile updated successfully');
      setMessage({ open: true, text: 'Cập nhật thông tin thành công!', severity: 'success' });
    } catch (error) {
      console.error('Profile update error:', error);
      console.error('Error response:', error.response?.data);
      setMessage({ 
        open: true, 
        text: error.response?.data?.detail || 'Lỗi khi cập nhật thông tin!', 
        severity: 'error' 
      });
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
      console.log('Saving notifications...', notifications);
      await api.put('/users/settings/notifications', notifications);
      console.log('Notifications saved successfully');
      setMessage({ open: true, text: 'Cập nhật cài đặt thông báo thành công!', severity: 'success' });
    } catch (error) {
      console.error('Notification settings error:', error);
      console.error('Error response:', error.response?.data);
      setMessage({ 
        open: true, 
        text: error.response?.data?.detail || 'Lỗi khi cập nhật cài đặt!', 
        severity: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAppSettings = async () => {
    setLoading(true);
    try {
      console.log('Saving app settings...', appSettings);
      
      // Apply theme immediately
      setTheme(appSettings.theme);
      console.log('Theme applied:', appSettings.theme);
      
      // Apply language immediately
      changeLanguage(appSettings.language);
      console.log('Language changed to:', appSettings.language);
      
      // Save to backend
      const response = await api.put('/users/settings/preferences', appSettings);
      console.log('App settings saved:', response.data);
      
      setMessage({ open: true, text: t('interface.success'), severity: 'success' });
    } catch (error) {
      console.error('App settings error:', error);
      console.error('Error response:', error.response?.data);
      setMessage({ 
        open: true, 
        text: error.response?.data?.detail || t('interface.error'), 
        severity: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        {t('settings')}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {t('settings.subtitle')}
      </Typography>

      <Paper>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={handleTabChange} aria-label="settings tabs">
            <Tab icon={<PersonIcon />} iconPosition="start" label={t('settings.profile')} />
            <Tab icon={<LockIcon />} iconPosition="start" label={t('settings.password')} />
            <Tab icon={<NotificationsIcon />} iconPosition="start" label={t('settings.notifications')} />
            <Tab icon={<PaletteIcon />} iconPosition="start" label={t('settings.interface')} />
          </Tabs>
        </Box>

        {/* Profile Tab */}
        <TabPanel value={activeTab} index={0}>
          <Box sx={{ p: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
                <Avatar
                  sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
                  src={config.getAvatarUrl(user?.avatar_url)}
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
                    {t('profile.avatar.change')}
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
                      label={t('profile.fullname')}
                      value={profile.full_name}
                      onChange={handleProfileChange('full_name')}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label={t('profile.email')}
                      value={profile.email}
                      disabled
                      helperText={t('profile.email.help')}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label={t('profile.phone')}
                      value={profile.phone}
                      onChange={handleProfileChange('phone')}
                      helperText={profile.phone ? `${t('profile.phone.current')}: ${profile.phone}` : t('profile.phone.empty')}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label={t('profile.role')}
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
                    {t('save')}
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
              {t('interface.title')}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {t('interface.subtitle')}
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label={t('interface.theme')}
                  value={appSettings.theme}
                  onChange={handleAppSettingChange('theme')}
                  SelectProps={{ native: true }}
                  helperText={`${t('interface.theme.current')}: ${appSettings.theme === 'light' ? t('interface.theme.light') : appSettings.theme === 'dark' ? t('interface.theme.dark') : t('interface.theme.auto')}`}
                >
                  <option value="light">{t('interface.theme.light')}</option>
                  <option value="dark">{t('interface.theme.dark')}</option>
                  <option value="auto">{t('interface.theme.auto')}</option>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label={t('interface.language')}
                  value={appSettings.language}
                  onChange={handleAppSettingChange('language')}
                  SelectProps={{ native: true }}
                  helperText={`${t('interface.language.current')}: ${appSettings.language === 'vi' ? t('interface.language.vi') : t('interface.language.en')}`}
                >
                  <option value="vi">{t('interface.language.vi')}</option>
                  <option value="en">{t('interface.language.en')}</option>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label={t('interface.timezone')}
                  value={appSettings.timezone}
                  onChange={handleAppSettingChange('timezone')}
                  SelectProps={{ native: true }}
                  helperText={`${t('interface.timezone.current')}: ${appSettings.timezone}`}
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
