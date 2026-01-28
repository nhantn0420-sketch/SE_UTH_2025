import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Tabs,
  Tab,
  CircularProgress,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  ArrowBack as BackIcon,
  Chat as ChatIcon,
  VideoCall as VideoIcon,
  Folder as FolderIcon,
  Dashboard as DashboardIcon,
  Event as EventIcon,
  QuestionAnswer as QuestionIcon,
} from '@mui/icons-material';
import groupService from '../../services/groupService';
import TaskBoard from '../../components/Collaboration/TaskBoard';
import MilestoneProgress from '../../components/Group/MilestoneProgress';
import { MeetingScheduler } from '../../components/Meeting';
import { MilestoneQuestions } from '../../components/Milestone';
import { useAuth } from '../../context/AuthContext';
import ResourceManager from '../../components/Common/ResourceManager';

const GroupWorkspace = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    fetchGroup();
  }, [id]);

  const fetchGroup = async () => {
    setLoading(true);
    try {
      const data = await groupService.getGroupById(id);
      setGroup(data);
    } catch (err) {
      console.error('Failed to fetch group:', err);
      setGroup({
        id: 1,
        name: 'Nhóm Alpha',
        project: { title: 'Hệ thống quản lý thư viện' },
        progress: 65,
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button startIcon={<BackIcon />} onClick={() => navigate(`/groups/${id}`)}>
            Quay lại
          </Button>
          <Typography variant="h5" fontWeight="bold">
            {group?.name} - Không gian làm việc
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Trò chuyện">
            <IconButton onClick={() => navigate(`/chat/${id}`)}>
              <ChatIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Video call">
            <IconButton onClick={() => navigate(`/video/${id}`)}>
              <VideoIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Tài liệu">
            <IconButton>
              <FolderIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Tabs */}
      <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)} sx={{ mb: 3 }}>
        <Tab icon={<DashboardIcon />} label="Bảng công việc" iconPosition="start" />
        <Tab label="Milestones" />
        <Tab icon={<EventIcon />} label="Lịch họp" iconPosition="start" />
        <Tab icon={<QuestionIcon />} label="Câu hỏi Milestone" iconPosition="start" />
        <Tab label="Tài liệu" />
      </Tabs>

      {/* Tab Content */}
      {activeTab === 0 && <TaskBoard groupId={id} />}
      {activeTab === 1 && <MilestoneProgress groupId={id} />}
      {activeTab === 2 && <MeetingScheduler groupId={id} />}
      {activeTab === 3 && <MilestoneQuestions groupId={id} userRole={user?.role} />}
      {activeTab === 4 && <ResourceManager groupId={id} canUpload={true} />}
    </Box>
  );
};

export default GroupWorkspace;
