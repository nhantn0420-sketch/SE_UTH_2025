import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  InputAdornment,
  Alert,
  CircularProgress,
  Divider,
} from '@mui/material';
import {
  Report as ReportIcon,
  Search as SearchIcon,
  Email as EmailIcon,
  CheckCircle as ResolvedIcon,
  Warning as PendingIcon,
} from '@mui/icons-material';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

const SystemReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    setLoading(true);
    try {
      // In real app, fetch from API
      // const data = await reportService.getSystemReports();
      
      // Demo data
      setReports([
        {
          id: 1,
          subject: 'Lỗi không upload được file',
          content: 'Tôi không thể upload file lớn hơn 10MB',
          user: { full_name: 'Nguyễn Văn A', email: 'nva@example.com', role: 'student' },
          status: 'pending',
          created_at: new Date(Date.now() - 86400000).toISOString(),
        },
        {
          id: 2,
          subject: 'Không nhận được email thông báo',
          content: 'Tôi đã bật thông báo nhưng không nhận được email',
          user: { full_name: 'Trần Thị B', email: 'ttb@example.com', role: 'lecturer' },
          status: 'resolved',
          created_at: new Date(Date.now() - 172800000).toISOString(),
          resolved_at: new Date(Date.now() - 86400000).toISOString(),
        },
        {
          id: 3,
          subject: 'Video call bị lag',
          content: 'Khi họp video thường xuyên bị giật, lag',
          user: { full_name: 'Lê Văn C', email: 'lvc@example.com', role: 'student' },
          status: 'pending',
          created_at: new Date().toISOString(),
        },
      ]);
    } catch (err) {
      console.error('Failed to fetch reports:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkResolved = async (reportId) => {
    // In real app, call API
    setReports((prev) =>
      prev.map((r) =>
        r.id === reportId
          ? { ...r, status: 'resolved', resolved_at: new Date().toISOString() }
          : r
      )
    );
  };

  const filteredReports = reports
    .filter((r) =>
      r.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.user.full_name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((r) => {
      if (filter === 'pending') return r.status === 'pending';
      if (filter === 'resolved') return r.status === 'resolved';
      return true;
    });

  const pendingCount = reports.filter((r) => r.status === 'pending').length;
  const resolvedCount = reports.filter((r) => r.status === 'resolved').length;

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Báo cáo hệ thống
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Xem và xử lý các báo cáo từ người dùng
      </Typography>

      {/* Stats */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="text.primary">
                {reports.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Tổng báo cáo
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ bgcolor: 'warning.light' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="warning.dark">
                {pendingCount}
              </Typography>
              <Typography variant="body2">
                Chờ xử lý
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ bgcolor: 'success.light' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="success.dark">
                {resolvedCount}
              </Typography>
              <Typography variant="body2">
                Đã xử lý
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField
          placeholder="Tìm kiếm báo cáo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flex: 1, maxWidth: 400 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant={filter === 'all' ? 'contained' : 'outlined'}
          onClick={() => setFilter('all')}
        >
          Tất cả
        </Button>
        <Button
          variant={filter === 'pending' ? 'contained' : 'outlined'}
          color="warning"
          onClick={() => setFilter('pending')}
        >
          Chờ xử lý
        </Button>
        <Button
          variant={filter === 'resolved' ? 'contained' : 'outlined'}
          color="success"
          onClick={() => setFilter('resolved')}
        >
          Đã xử lý
        </Button>
      </Box>

      {/* Reports List */}
      <Card>
        <CardContent>
          {filteredReports.length === 0 ? (
            <Alert severity="info">Không có báo cáo nào</Alert>
          ) : (
            <List>
              {filteredReports.map((report, index) => (
                <React.Fragment key={report.id}>
                  {index > 0 && <Divider />}
                  <ListItem
                    sx={{
                      py: 2,
                      bgcolor: report.status === 'pending' ? 'warning.lighter' : 'inherit',
                    }}
                  >
                    <ListItemIcon>
                      {report.status === 'pending' ? (
                        <PendingIcon color="warning" />
                      ) : (
                        <ResolvedIcon color="success" />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography fontWeight="bold">{report.subject}</Typography>
                          <Chip
                            label={report.status === 'pending' ? 'Chờ xử lý' : 'Đã xử lý'}
                            size="small"
                            color={report.status === 'pending' ? 'warning' : 'success'}
                          />
                        </Box>
                      }
                      secondary={
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="body2" sx={{ mb: 1 }}>
                            {report.content}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Chip
                              icon={<EmailIcon />}
                              label={`${report.user.full_name} (${report.user.email})`}
                              size="small"
                              variant="outlined"
                            />
                            <Typography variant="caption" color="text.secondary">
                              {format(new Date(report.created_at), 'dd/MM/yyyy HH:mm', { locale: vi })}
                            </Typography>
                          </Box>
                        </Box>
                      }
                    />
                    {report.status === 'pending' && (
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={() => handleMarkResolved(report.id)}
                      >
                        Đánh dấu đã xử lý
                      </Button>
                    )}
                  </ListItem>
                </React.Fragment>
              ))}
            </List>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default SystemReports;
