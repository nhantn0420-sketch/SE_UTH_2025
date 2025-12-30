import React from 'react';
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
} from 'recharts';

const COLORS = ['#4A90D9', '#50C878', '#FF6B6B', '#FFB347', '#9B59B6', '#3498DB', '#1ABC9C'];

const ContributionChart = ({ members = [], tasks = [], showDetails = true }) => {
  // Calculate contribution data
  const contributionData = members.map((member, index) => {
    const memberTasks = tasks.filter(t => t.assignee_id === member.id);
    const completedTasks = memberTasks.filter(t => t.status === 'completed');
    const inProgressTasks = memberTasks.filter(t => t.status === 'in_progress');
    
    const contribution = tasks.length > 0 
      ? Math.round((completedTasks.length / tasks.length) * 100)
      : 0;

    return {
      id: member.id,
      name: member.full_name || member.name || `Member ${index + 1}`,
      avatar: member.avatar,
      totalTasks: memberTasks.length,
      completedTasks: completedTasks.length,
      inProgressTasks: inProgressTasks.length,
      pendingTasks: memberTasks.length - completedTasks.length - inProgressTasks.length,
      contribution,
      color: COLORS[index % COLORS.length],
    };
  });

  // Pie chart data
  const pieData = contributionData
    .filter(d => d.completedTasks > 0)
    .map(d => ({
      name: d.name,
      value: d.completedTasks,
      color: d.color,
    }));

  // Bar chart data
  const barData = contributionData.map(d => ({
    name: d.name.split(' ').pop(), // Last name only for shorter labels
    'Hoàn thành': d.completedTasks,
    'Đang làm': d.inProgressTasks,
    'Chờ xử lý': d.pendingTasks,
  }));

  const totalCompleted = contributionData.reduce((sum, d) => sum + d.completedTasks, 0);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Biểu đồ đóng góp thành viên
        </Typography>

        <Grid container spacing={3}>
          {/* Pie Chart */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" align="center" gutterBottom>
              Tỷ lệ hoàn thành công việc
            </Typography>
            <Box sx={{ height: 250 }}>
              {pieData.length > 0 ? (
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
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
            <Typography variant="subtitle2" align="center" gutterBottom>
              Phân bổ công việc theo trạng thái
            </Typography>
            <Box sx={{ height: 250 }}>
              <ResponsiveContainer>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <RechartsTooltip />
                  <Legend />
                  <Bar dataKey="Hoàn thành" stackId="a" fill="#50C878" />
                  <Bar dataKey="Đang làm" stackId="a" fill="#FFB347" />
                  <Bar dataKey="Chờ xử lý" stackId="a" fill="#FF6B6B" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Grid>

          {/* Member Details */}
          {showDetails && (
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
                Chi tiết đóng góp
              </Typography>
              <Grid container spacing={2}>
                {contributionData.map((member) => (
                  <Grid item xs={12} sm={6} md={4} key={member.id}>
                    <Card variant="outlined" sx={{ p: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <Avatar sx={{ bgcolor: member.color }}>
                          {member.name.charAt(0)}
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="subtitle2" noWrap>
                            {member.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {member.totalTasks} công việc
                          </Typography>
                        </Box>
                        <Tooltip title="Tỷ lệ đóng góp">
                          <Chip
                            label={`${member.contribution}%`}
                            size="small"
                            color={
                              member.contribution >= 20 ? 'success' :
                              member.contribution >= 10 ? 'warning' : 'default'
                            }
                          />
                        </Tooltip>
                      </Box>

                      <Box sx={{ mb: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                          <Typography variant="caption">Tiến độ</Typography>
                          <Typography variant="caption">
                            {member.completedTasks}/{member.totalTasks}
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={member.totalTasks > 0 ? (member.completedTasks / member.totalTasks) * 100 : 0}
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

                      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                        <Chip
                          label={`✓ ${member.completedTasks}`}
                          size="small"
                          sx={{ bgcolor: '#e8f5e9', fontSize: '0.7rem' }}
                        />
                        <Chip
                          label={`⏳ ${member.inProgressTasks}`}
                          size="small"
                          sx={{ bgcolor: '#fff3e0', fontSize: '0.7rem' }}
                        />
                        <Chip
                          label={`○ ${member.pendingTasks}`}
                          size="small"
                          sx={{ bgcolor: '#fce4ec', fontSize: '0.7rem' }}
                        />
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ContributionChart;
