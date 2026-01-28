import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Button,
  Grid,
} from '@mui/material';
import {
  Refresh as RefreshIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';
import ContributionTracker from '../../components/Collaboration/ContributionTracker';
import groupService from '../../services/groupService';
import { toast } from 'react-toastify';

const ContributionTracking = () => {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      setLoading(true);
      const data = await groupService.getGroups();
      const groupList = data.items || data || [];
      setGroups(groupList);
      if (groupList.length > 0) {
        setSelectedGroup(groupList[0].id);
      }
    } catch (error) {
      console.error('Error fetching groups:', error);
      toast.error('Không thể tải danh sách nhóm');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchGroups();
  };

  const handleExport = () => {
    toast.info('Tính năng xuất báo cáo đang được phát triển');
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (groups.length === 0) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" color="text.secondary" textAlign="center">
            Chưa có nhóm nào
          </Typography>
        </CardContent>
      </Card>
    );
  }

  const selectedGroupInfo = groups.find(g => g.id === selectedGroup);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Theo dõi đóng góp thành viên
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Xem chi tiết đóng góp và tiến độ làm việc của từng thành viên
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            startIcon={<RefreshIcon />}
            onClick={handleRefresh}
            variant="outlined"
          >
            Làm mới
          </Button>
          <Button
            startIcon={<DownloadIcon />}
            onClick={handleExport}
            variant="outlined"
          >
            Xuất báo cáo
          </Button>
        </Box>
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Chọn nhóm</InputLabel>
                <Select
                  value={selectedGroup}
                  onChange={(e) => setSelectedGroup(e.target.value)}
                  label="Chọn nhóm"
                >
                  {groups.map((group) => (
                    <MenuItem key={group.id} value={group.id}>
                      {group.name} - {group.project?.title || 'Chưa có đề tài'}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {selectedGroupInfo && (
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Số thành viên
                    </Typography>
                    <Typography variant="h6">
                      {selectedGroupInfo.member_count || 0}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Tiến độ nhóm
                    </Typography>
                    <Typography variant="h6" color="primary">
                      {selectedGroupInfo.progress || 0}%
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>

      {selectedGroup && <ContributionTracker groupId={selectedGroup} />}
    </Box>
  );
};

export default ContributionTracking;
