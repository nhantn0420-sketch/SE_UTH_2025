import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Avatar,
  Grid,
  Divider,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Save as SaveIcon,
  Lock as LockIcon,
} from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import authService from '../../services/authService';
import config from '../../config';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
  } = useForm({
    defaultValues: {
      full_name: user?.full_name || '',
      email: user?.email || '',
      student_id: user?.student_id || '',
    },
  });

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    watch,
    reset: resetPassword,
    formState: { errors: passwordErrors },
  } = useForm();

  const newPassword = watch('newPassword');

  const onProfileSubmit = async (data) => {
    setLoading(true);
    try {
      // API call to update profile
      // await userService.updateUser(user.id, data);
      updateUser({ ...user, ...data });
      toast.success('Cập nhật thông tin thành công');
    } catch (err) {
      toast.error('Cập nhật thất bại');
    } finally {
      setLoading(false);
    }
  };

  const onPasswordSubmit = async (data) => {
    setPasswordLoading(true);
    try {
      await authService.changePassword(data.currentPassword, data.newPassword);
      toast.success('Đổi mật khẩu thành công');
      resetPassword();
      setShowPasswordForm(false);
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Đổi mật khẩu thất bại');
    } finally {
      setPasswordLoading(false);
    }
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
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Trang cá nhân
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Quản lý thông tin tài khoản của bạn
      </Typography>

      <Grid container spacing={3}>
        {/* Profile Info */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Thông tin cá nhân
              </Typography>
              <form onSubmit={handleProfileSubmit(onProfileSubmit)}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Họ và tên"
                      {...registerProfile('full_name', { required: 'Họ và tên là bắt buộc' })}
                      error={!!profileErrors.full_name}
                      helperText={profileErrors.full_name?.message}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      disabled
                      {...registerProfile('email')}
                    />
                  </Grid>
                  {user?.role === 'student' && (
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Mã sinh viên"
                        disabled
                        {...registerProfile('student_id')}
                      />
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
                      disabled={loading}
                    >
                      Lưu thay đổi
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>

          {/* Password Change */}
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Đổi mật khẩu</Typography>
                <Button
                  startIcon={<LockIcon />}
                  onClick={() => setShowPasswordForm(!showPasswordForm)}
                >
                  {showPasswordForm ? 'Hủy' : 'Đổi mật khẩu'}
                </Button>
              </Box>

              {showPasswordForm && (
                <form onSubmit={handlePasswordSubmit(onPasswordSubmit)}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        type="password"
                        label="Mật khẩu hiện tại"
                        {...registerPassword('currentPassword', { required: 'Vui lòng nhập mật khẩu hiện tại' })}
                        error={!!passwordErrors.currentPassword}
                        helperText={passwordErrors.currentPassword?.message}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        type="password"
                        label="Mật khẩu mới"
                        {...registerPassword('newPassword', {
                          required: 'Vui lòng nhập mật khẩu mới',
                          minLength: { value: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' },
                        })}
                        error={!!passwordErrors.newPassword}
                        helperText={passwordErrors.newPassword?.message}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        type="password"
                        label="Xác nhận mật khẩu mới"
                        {...registerPassword('confirmPassword', {
                          required: 'Vui lòng xác nhận mật khẩu',
                          validate: (value) => value === newPassword || 'Mật khẩu không khớp',
                        })}
                        error={!!passwordErrors.confirmPassword}
                        helperText={passwordErrors.confirmPassword?.message}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        disabled={passwordLoading}
                      >
                        {passwordLoading ? <CircularProgress size={24} /> : 'Đổi mật khẩu'}
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  fontSize: '2.5rem',
                  bgcolor: 'primary.main',
                  mx: 'auto',
                  mb: 2,
                }}
              >
                {getInitials(user?.full_name)}
              </Avatar>
              <Typography variant="h6">{user?.full_name}</Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {user?.email}
              </Typography>
              <Box
                sx={{
                  display: 'inline-block',
                  px: 2,
                  py: 0.5,
                  bgcolor: 'primary.light',
                  color: 'primary.contrastText',
                  borderRadius: 2,
                  mt: 1,
                }}
              >
                <Typography variant="body2">
                  {config.ROLE_NAMES[user?.role]}
                </Typography>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Box sx={{ textAlign: 'left' }}>
                <Typography variant="body2" color="text.secondary">
                  Thông tin tài khoản
                </Typography>
                <Box sx={{ mt: 2 }}>
                  {user?.student_id && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">MSSV:</Typography>
                      <Typography variant="body2" fontWeight="bold">{user.student_id}</Typography>
                    </Box>
                  )}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Trạng thái:</Typography>
                    <Typography variant="body2" color="success.main" fontWeight="bold">
                      Đang hoạt động
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
