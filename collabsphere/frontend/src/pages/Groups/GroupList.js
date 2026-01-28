import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Chip,
  CircularProgress,
  LinearProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Search as SearchIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import groupService from '../../services/groupService';
import AdvancedSearch from '../../components/Common/AdvancedSearch';
import FilterPanel from '../../components/Common/FilterPanel';
import SavedFilters from '../../components/Common/SavedFilters';

const GroupList = () => {
  const navigate = useNavigate();
  const { isLecturer, isStudent } = useAuth();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filterValues, setFilterValues] = useState({});
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    setLoading(true);
    try {
      const data = await groupService.getGroups();
      setGroups(data.items || data);
    } catch (err) {
      console.error('Failed to fetch groups:', err);
      toast.error('Không thể tải danh sách nhóm');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchData) => {
    setSearchQuery(searchData.term);
  };

  const handleFilterChange = (filters) => {
    setFilterValues(filters);
  };

  const handleApplySavedFilter = (filters) => {
    setFilterValues(filters);
  };

  const filteredGroups = groups.filter((group) => {
    // Search
    const matchesSearch =
      group.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.project?.title?.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Progress filter
    const matchesProgress = !filterValues.progressRange || (
      group.progress >= (filterValues.progressRange.min || 0) &&
      group.progress <= (filterValues.progressRange.max || 100)
    );
    
    // Member count filter
    const matchesMemberCount = !filterValues.memberCount ||
      (group.members?.length || 0) >= parseInt(filterValues.memberCount);

    return matchesSearch && matchesProgress && matchesMemberCount;
  }).sort((a, b) => {
    let comparison = 0;
    switch (sortBy) {
      case 'name':
        comparison = (a.name || '').localeCompare(b.name || '');
        break;
      case 'progress':
        comparison = (b.progress || 0) - (a.progress || 0);
        break;
      case 'members':
        comparison = (b.members?.length || 0) - (a.members?.length || 0);
        break;
      default:
        comparison = 0;
    }
    return sortOrder === 'asc' ? -comparison : comparison;
  });

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'success';
    if (progress >= 50) return 'primary';
    if (progress >= 20) return 'warning';
    return 'error';
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold">
            {isLecturer ? 'Nhóm sinh viên hướng dẫn' : 'Danh sách nhóm'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Quản lý và theo dõi tiến độ các nhóm
          </Typography>
        </Box>
      </Box>

      {/* Advanced Search & Filters */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={showFilters ? 9 : 12}>
          <AdvancedSearch
            placeholder="Tìm kiếm theo tên nhóm hoặc đề tài..."
            onSearch={handleSearch}
            onFilterToggle={() => setShowFilters(!showFilters)}
            showFilters={showFilters}
            fields={['name', 'project']}
            searchDelay={300}
          />
          
          {/* Sort & Saved Filters */}
          <Box sx={{ display: 'flex', gap: 1, mt: 2, alignItems: 'center' }}>
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Sắp xếp</InputLabel>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                label="Sắp xếp"
              >
                <MenuItem value="name">Tên nhóm</MenuItem>
                <MenuItem value="progress">Tiến độ</MenuItem>
                <MenuItem value="members">Số thành viên</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Thứ tự</InputLabel>
              <Select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                label="Thứ tự"
              >
                <MenuItem value="desc">Giảm dần</MenuItem>
                <MenuItem value="asc">Tăng dần</MenuItem>
              </Select>
            </FormControl>

            <SavedFilters
              currentFilters={filterValues}
              onApplyFilter={handleApplySavedFilter}
              storageKey="groupListFilters"
            />

            <Box sx={{ flexGrow: 1 }} />
            
            <Chip
              label={`${filteredGroups.length} / ${groups.length} nhóm`}
              color="primary"
              variant="outlined"
            />
          </Box>
        </Grid>

        {/* Filter Sidebar */}
        {showFilters && (
          <Grid item xs={12} md={3}>
            <FilterPanel
              filters={[
                {
                  key: 'progressRange',
                  label: 'Tiến độ (%)',
                  type: 'text',
                  placeholder: 'Min-Max (VD: 50)',
                  defaultValue: {},
                },
                {
                  key: 'memberCount',
                  label: 'Số thành viên tối thiểu',
                  type: 'text',
                  placeholder: 'VD: 3',
                },
              ]}
              onFilterChange={handleFilterChange}
              onClear={() => setFilterValues({})}
              compact={false}
              collapsible={false}
            />
          </Grid>
        )}
      </Grid>

      {/* Groups Grid */}
      {filteredGroups.length === 0 ? (
        <Card>
          <CardContent>
            <Typography color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
              Không tìm thấy nhóm nào
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {filteredGroups.map((group) => (
            <Grid item xs={12} sm={6} md={4} key={group.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {group.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {group.project?.title || 'Chưa có đề tài'}
                  </Typography>

                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Tiến độ</Typography>
                      <Typography variant="body2" fontWeight="bold">
                        {group.progress || 0}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={group.progress || 0}
                      color={getProgressColor(group.progress || 0)}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>

                  <Chip
                    label={`${group.members_count || 0} thành viên`}
                    size="small"
                    variant="outlined"
                  />
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    startIcon={<ViewIcon />}
                    onClick={() => navigate(`/groups/${group.id}`)}
                  >
                    Xem chi tiết
                  </Button>
                  {isStudent && (
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => navigate(`/groups/${group.id}/workspace`)}
                    >
                      Vào làm việc
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default GroupList;
