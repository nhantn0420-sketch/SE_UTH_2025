import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Chip,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Tooltip,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {
  Search as SearchIcon,
  Block as BlockIcon,
  CheckCircle as CheckCircleIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import userService from '../../services/userService';
import config from '../../config';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({ open: false, action: null });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await userService.getUsers();
      setUsers(data.items || data);
    } catch (err) {
      console.error('Failed to fetch users:', err);
      toast.error('Không thể tải danh sách người dùng');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleUserStatus = async () => {
    if (!selectedUser) return;

    try {
      if (selectedUser.is_active) {
        await userService.deactivateUser(selectedUser.id);
        toast.success('Đã vô hiệu hóa tài khoản');
      } else {
        await userService.activateUser(selectedUser.id);
        toast.success('Đã kích hoạt tài khoản');
      }
      fetchUsers();
    } catch (err) {
      toast.error('Thao tác thất bại');
    } finally {
      setConfirmDialog({ open: false, action: null });
      setSelectedUser(null);
    }
  };

  const openConfirmDialog = (user, action) => {
    setSelectedUser(user);
    setConfirmDialog({ open: true, action });
  };

  const columns = [
    {
      field: 'full_name',
      headerName: 'Họ và tên',
      flex: 1,
      minWidth: 180,
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
      minWidth: 200,
    },
    {
      field: 'role',
      headerName: 'Vai trò',
      width: 150,
      renderCell: (params) => (
        <Chip
          label={config.ROLE_NAMES[params.value] || params.value}
          size="small"
          color={
            params.value === 'admin' ? 'error' :
            params.value === 'staff' ? 'warning' :
            params.value === 'head' ? 'secondary' :
            params.value === 'lecturer' ? 'primary' :
            'default'
          }
        />
      ),
    },
    {
      field: 'student_id',
      headerName: 'MSSV',
      width: 120,
      renderCell: (params) => params.value || '-',
    },
    {
      field: 'is_active',
      headerName: 'Trạng thái',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value ? 'Hoạt động' : 'Đã khóa'}
          size="small"
          color={params.value ? 'success' : 'error'}
          variant="outlined"
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Thao tác',
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <Tooltip title={params.row.is_active ? 'Vô hiệu hóa' : 'Kích hoạt'}>
          <IconButton
            size="small"
            onClick={() => openConfirmDialog(params.row, params.row.is_active ? 'deactivate' : 'activate')}
            color={params.row.is_active ? 'error' : 'success'}
          >
            {params.row.is_active ? <BlockIcon /> : <CheckCircleIcon />}
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  const filteredUsers = users.filter(
    (user) =>
      user.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.student_id?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Quản lý người dùng
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Quản lý tài khoản người dùng trong hệ thống
          </Typography>
        </Box>
        <Button
          startIcon={<RefreshIcon />}
          onClick={fetchUsers}
          variant="outlined"
        >
          Làm mới
        </Button>
      </Box>

      <Card>
        <CardContent>
          {/* Search */}
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              placeholder="Tìm kiếm theo tên, email hoặc MSSV..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              size="small"
            />
          </Box>

          {/* Data Grid */}
          <Box sx={{ height: 600 }}>
            <DataGrid
              rows={filteredUsers}
              columns={columns}
              loading={loading}
              pageSize={10}
              rowsPerPageOptions={[10, 25, 50]}
              disableSelectionOnClick
              sx={{
                '& .MuiDataGrid-row:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
            />
          </Box>
        </CardContent>
      </Card>

      {/* Confirm Dialog */}
      <Dialog
        open={confirmDialog.open}
        onClose={() => setConfirmDialog({ open: false, action: null })}
      >
        <DialogTitle>
          {confirmDialog.action === 'deactivate' ? 'Vô hiệu hóa tài khoản' : 'Kích hoạt tài khoản'}
        </DialogTitle>
        <DialogContent>
          <Typography>
            Bạn có chắc chắn muốn {confirmDialog.action === 'deactivate' ? 'vô hiệu hóa' : 'kích hoạt'} tài khoản của{' '}
            <strong>{selectedUser?.full_name}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialog({ open: false, action: null })}>
            Hủy
          </Button>
          <Button
            onClick={handleToggleUserStatus}
            color={confirmDialog.action === 'deactivate' ? 'error' : 'success'}
            variant="contained"
          >
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserManagement;
