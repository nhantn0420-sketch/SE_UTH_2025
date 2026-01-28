import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  Chip,
  LinearProgress,
  Tooltip,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tabs,
  Tab,
} from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  LineChart,
  Line,
  Area,
  AreaChart,
} from 'recharts';
import {
  TrendingUp as TrendingUpIcon,
  Stars as StarsIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import groupService from '../../services/groupService';

const COLORS = ['#4A90D9', '#50C878', '#FF6B6B', '#FFB347', '#9B59B6', '#3498DB', '#1ABC9C', '#E74C3C'];

const ContributionTracker = ({ groupId }) => {
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (groupId) {
      fetchData();
    }
  }, [groupId]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [membersData, tasksData] = await Promise.all([
        groupService.getMembers(groupId),
        groupService.getTasks(groupId),
      ]);
      
      setMembers(membersData.items || membersData || []);
      setTasks(tasksData.items || tasksData || []);
    } catch (error) {
      console.error('Error fetching contribution data:', error);
      setMembers([]);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  // Calculate contribution data
  const contributionData = members.map((member, index) => {
    const memberTasks = tasks.filter(t => t.assigned_to === member.user_id);
    const completedTasks = memberTasks.filter(t => t.status === 'completed');
    const inProgressTasks = memberTasks.filter(t => t.status === 'in_progress');
    const todoTasks = memberTasks.filter(t => t.status === 'todo');
    
    const highPriorityTasks = memberTasks.filter(t => t.priority === 'high');
    const completedHighPriority = completedTasks.filter(t => t.priority === 'high');
    
    // Calculate contribution score
    let contributionScore = 0;
    contributionScore += completedTasks.length * 10; // Base points
    contributionScore += completedHighPriority.length * 5; // Bonus for high priority
    contributionScore += inProgressTasks.length * 2; // Working on tasks
    
    const completionRate = memberTasks.length > 0 
      ? Math.round((completedTasks.length / memberTasks.length) * 100)
      : 0;

    return {
      user_id: member.user_id,
      name: member.user?.full_name || member.user?.username || 'Unknown',
      email: member.user?.email,
      role: member.role,
      avatar: member.user?.avatar,
      totalTasks: memberTasks.length,
      completedTasks: completedTasks.length,
      inProgressTasks: inProgressTasks.length,
      todoTasks: todoTasks.length,
      highPriorityTasks: highPriorityTasks.length,
      completedHighPriority: completedHighPriority.length,
      contributionScore,
      completionRate,
      color: COLORS[index % COLORS.length],
    };
  }).sort((a, b) => b.contributionScore - a.contributionScore);

  // Statistics
  const totalTasks = tasks.length;
  const totalCompleted = tasks.filter(t => t.status === 'completed').length;
  const totalInProgress = tasks.filter(t => t.status === 'in_progress').length;
  const overallProgress = totalTasks > 0 ? Math.round((totalCompleted / totalTasks) * 100) : 0;

  // Pie chart data - completed tasks distribution
  const pieData = contributionData
    .filter(d => d.completedTasks > 0)
    .map(d => ({
      name: d.name,
      value: d.completedTasks,
      color: d.color,
    }));

  // Bar chart data - task status by member
  const barData = contributionData.map(d => ({
    name: d.name.split(' ').slice(-2).join(' '), // Last 2 words for shorter labels
    'Hoàn thành': d.completedTasks,
    'Đang làm': d.inProgressTasks,
    'Chưa làm': d.todoTasks,
  }));

  // Line chart data - contribution scores
  const scoreData = contributionData.map(d => ({
    name: d.name.split(' ').pop(),
    'Điểm đóng góp': d.contributionScore,
  }));

  // Leaderboard - top 3
  const topContributors = contributionData.slice(0, 3);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (members.length === 0) {
    return (
      <Card>
        <CardContent>
          <Typography color="text.secondary" textAlign="center">
            Chưa có thành viên trong nhóm
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Box>
      {/* Overall Statistics */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={3}>
          <Card sx={{ bgcolor: '#e3f2fd' }}>
            <CardContent>
              <Typography variant="h4" fontWeight="bold" color="primary">
                {totalTasks}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Tổng công việc
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card sx={{ bgcolor: '#e8f5e9' }}>
            <CardContent>
              <Typography variant="h4" fontWeight="bold" sx={{ color: '#4caf50' }}>
                {totalCompleted}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Đã hoàn thành
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card sx={{ bgcolor: '#fff3e0' }}>
            <CardContent>
              <Typography variant="h4" fontWeight="bold" sx={{ color: '#ff9800' }}>
                {totalInProgress}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Đang thực hiện
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card sx={{ bgcolor: '#f3e5f5' }}>
            <CardContent>
              <Typography variant="h4" fontWeight="bold" sx={{ color: '#9c27b0' }}>
                {overallProgress}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Tiến độ chung
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Top Contributors */}
      {topContributors.length > 0 && (
        <Card sx={{ mb: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
          <CardContent>
            <Typography variant="h6" sx={{ color: 'white', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <StarsIcon /> Top Đóng góp
            </Typography>
            <Grid container spacing={2}>
              {topContributors.map((member, idx) => (
                <Grid item xs={12} sm={4} key={member.user_id}>
                  <Card sx={{ bgcolor: 'white' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ position: 'relative' }}>
                          <Avatar sx={{ bgcolor: member.color, width: 56, height: 56 }}>
                            {member.name.charAt(0)}
                          </Avatar>
                          <Chip
                            label={`#${idx + 1}`}
                            size="small"
                            sx={{
                              position: 'absolute',
                              bottom: -5,
                              right: -5,
                              bgcolor: idx === 0 ? '#ffd700' : idx === 1 ? '#c0c0c0' : '#cd7f32',
                              color: 'white',
                              fontWeight: 'bold',
                            }}
                          />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="subtitle1" fontWeight="bold">
                            {member.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {member.completedTasks} tasks hoàn thành
                          </Typography>
                          <Box sx={{ mt: 1 }}>
                            <Chip
                              icon={<TrendingUpIcon />}
                              label={`${member.contributionScore} điểm`}
                              size="small"
                              color="primary"
                            />
                          </Box>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Tabs */}
      <Card>
        <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)} sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tab label="Biểu đồ" />
          <Tab label="Bảng xếp hạng" />
          <Tab label="Chi tiết" />
        </Tabs>

        <CardContent>
          {/* Tab 0: Charts */}
          {activeTab === 0 && (
            <Grid container spacing={3}>
              {/* Pie Chart */}
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Phân bố công việc hoàn thành
                </Typography>
                <Box sx={{ height: 300 }}>
                  {pieData.length > 0 ? (
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name.split(' ').pop()}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <RechartsTooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                      <Typography color="text.secondary">Chưa có dữ liệu</Typography>
                    </Box>
                  )}
                </Box>
              </Grid>

              {/* Bar Chart */}
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Phân bổ công việc theo trạng thái
                </Typography>
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer>
                    <BarChart data={barData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <RechartsTooltip />
                      <Legend />
                      <Bar dataKey="Hoàn thành" fill="#4caf50" />
                      <Bar dataKey="Đang làm" fill="#ff9800" />
                      <Bar dataKey="Chưa làm" fill="#f44336" />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </Grid>

              {/* Score Chart */}
              <Grid item xs={12}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Điểm đóng góp theo thành viên
                </Typography>
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer>
                    <AreaChart data={scoreData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <RechartsTooltip />
                      <Area type="monotone" dataKey="Điểm đóng góp" stroke="#8884d8" fill="#8884d8" />
                    </AreaChart>
                  </ResponsiveContainer>
                </Box>
              </Grid>
            </Grid>
          )}

          {/* Tab 1: Leaderboard */}
          {activeTab === 1 && (
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: 'grey.100' }}>
                    <TableCell width="50px" align="center"><strong>#</strong></TableCell>
                    <TableCell><strong>Thành viên</strong></TableCell>
                    <TableCell align="center"><strong>Tổng CV</strong></TableCell>
                    <TableCell align="center"><strong>Hoàn thành</strong></TableCell>
                    <TableCell align="center"><strong>Đang làm</strong></TableCell>
                    <TableCell align="center"><strong>Tỷ lệ</strong></TableCell>
                    <TableCell align="center"><strong>Điểm</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {contributionData.map((member, idx) => (
                    <TableRow key={member.user_id} hover>
                      <TableCell align="center">
                        <Chip
                          label={idx + 1}
                          size="small"
                          sx={{
                            bgcolor: idx < 3 ? (idx === 0 ? '#ffd700' : idx === 1 ? '#c0c0c0' : '#cd7f32') : 'grey.300',
                            color: idx < 3 ? 'white' : 'black',
                            fontWeight: 'bold',
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Avatar sx={{ bgcolor: member.color, width: 32, height: 32 }}>
                            {member.name.charAt(0)}
                          </Avatar>
                          <Box>
                            <Typography variant="body2" fontWeight="medium">
                              {member.name}
                            </Typography>
                            {member.role === 'leader' && (
                              <Chip label="Nhóm trưởng" size="small" color="primary" sx={{ height: 18 }} />
                            )}
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell align="center">{member.totalTasks}</TableCell>
                      <TableCell align="center">
                        <Chip
                          icon={<CheckCircleIcon />}
                          label={member.completedTasks}
                          size="small"
                          sx={{ bgcolor: '#e8f5e9', color: '#2e7d32' }}
                        />
                      </TableCell>
                      <TableCell align="center">{member.inProgressTasks}</TableCell>
                      <TableCell align="center">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
                          <Box sx={{ width: 60 }}>
                            <LinearProgress
                              variant="determinate"
                              value={member.completionRate}
                              sx={{
                                height: 8,
                                borderRadius: 4,
                                bgcolor: 'grey.200',
                                '& .MuiLinearProgress-bar': {
                                  bgcolor: member.color,
                                },
                              }}
                            />
                          </Box>
                          <Typography variant="caption">{member.completionRate}%</Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          label={member.contributionScore}
                          size="small"
                          color={member.contributionScore >= 50 ? 'success' : member.contributionScore >= 20 ? 'warning' : 'default'}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {/* Tab 2: Detailed Cards */}
          {activeTab === 2 && (
            <Grid container spacing={2}>
              {contributionData.map((member) => (
                <Grid item xs={12} sm={6} md={4} key={member.user_id}>
                  <Card variant="outlined" sx={{ height: '100%' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <Avatar sx={{ bgcolor: member.color, width: 48, height: 48 }}>
                          {member.name.charAt(0)}
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="subtitle1" fontWeight="bold" noWrap>
                            {member.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" noWrap>
                            {member.email}
                          </Typography>
                        </Box>
                        {member.role === 'leader' && (
                          <Chip label="👑" size="small" />
                        )}
                      </Box>

                      <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                          <Typography variant="caption">Tiến độ hoàn thành</Typography>
                          <Typography variant="caption" fontWeight="bold">
                            {member.completedTasks}/{member.totalTasks}
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={member.completionRate}
                          sx={{
                            height: 10,
                            borderRadius: 5,
                            bgcolor: 'grey.200',
                            '& .MuiLinearProgress-bar': {
                              bgcolor: member.color,
                            },
                          }}
                        />
                      </Box>

                      <Grid container spacing={1} sx={{ mb: 2 }}>
                        <Grid item xs={4}>
                          <Box sx={{ textAlign: 'center', p: 1, bgcolor: '#e8f5e9', borderRadius: 1 }}>
                            <Typography variant="h6" fontWeight="bold" sx={{ color: '#2e7d32' }}>
                              {member.completedTasks}
                            </Typography>
                            <Typography variant="caption">Hoàn thành</Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={4}>
                          <Box sx={{ textAlign: 'center', p: 1, bgcolor: '#fff3e0', borderRadius: 1 }}>
                            <Typography variant="h6" fontWeight="bold" sx={{ color: '#e65100' }}>
                              {member.inProgressTasks}
                            </Typography>
                            <Typography variant="caption">Đang làm</Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={4}>
                          <Box sx={{ textAlign: 'center', p: 1, bgcolor: '#fce4ec', borderRadius: 1 }}>
                            <Typography variant="h6" fontWeight="bold" sx={{ color: '#c2185b' }}>
                              {member.todoTasks}
                            </Typography>
                            <Typography variant="caption">Chưa làm</Typography>
                          </Box>
                        </Grid>
                      </Grid>

                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Chip
                          label={`${member.completionRate}% hoàn thành`}
                          size="small"
                          color={member.completionRate >= 70 ? 'success' : member.completionRate >= 40 ? 'warning' : 'default'}
                        />
                        <Tooltip title="Điểm đóng góp">
                          <Chip
                            icon={<TrendingUpIcon />}
                            label={member.contributionScore}
                            size="small"
                            variant="outlined"
                          />
                        </Tooltip>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ContributionTracker;
