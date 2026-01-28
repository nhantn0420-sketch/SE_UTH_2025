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
} from '@mui/material';
import TaskBoard from '../../components/Collaboration/TaskBoard';
import groupService from '../../services/groupService';
import { toast } from 'react-toastify';

const TaskManagement = () => {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
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

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Quản lý công việc nhóm
        </Typography>
        <FormControl sx={{ minWidth: 300, mt: 2 }}>
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
      </Box>

      {selectedGroup && <TaskBoard groupId={selectedGroup} />}
    </Box>
  );
};

export default TaskManagement;
