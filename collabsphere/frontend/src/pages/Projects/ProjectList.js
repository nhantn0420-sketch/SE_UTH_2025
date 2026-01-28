import React, { useState, useEffect } from 'react';
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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Drawer,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Visibility as ViewIcon,
  Sort as SortIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import projectService from '../../services/projectService';
import config from '../../config';
import AdvancedSearch from '../../components/Common/AdvancedSearch';
import FilterPanel from '../../components/Common/FilterPanel';
import SavedFilters from '../../components/Common/SavedFilters';

const ProjectList = () => {
  const navigate = useNavigate();
  const { isLecturer } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [filterValues, setFilterValues] = useState({});
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const data = isLecturer
        ? await projectService.getMyProjects()
        : await projectService.getProjects();
      setProjects(data.items || data);
    } catch (err) {
      console.error('Failed to fetch projects:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle search
  const handleSearch = (searchData) => {
    setSearchQuery(searchData.term);
  };

  // Handle filter changes
  const handleFilterChange = (filters) => {
    setFilterValues(filters);
  };

  // Apply saved filter
  const handleApplySavedFilter = (filters) => {
    setFilterValues(filters);
  };

  // Advanced filtering and sorting
  const filteredProjects = projects.filter((project) => {
    // Search filter
    const matchesSearch =
      project.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Status filter
    const matchesStatus = !filterValues.status || project.status === filterValues.status;
    
    // Lecturer filter
    const matchesLecturer = !filterValues.lecturer || 
      project.lecturer?.id === filterValues.lecturer;
    
    // Date range filter
    const matchesDateRange = () => {
      if (!filterValues.dateRange?.start && !filterValues.dateRange?.end) return true;
      const projectDate = new Date(project.created_at);
      const start = filterValues.dateRange?.start ? new Date(filterValues.dateRange.start) : null;
      const end = filterValues.dateRange?.end ? new Date(filterValues.dateRange.end) : null;
      
      if (start && projectDate < start) return false;
      if (end && projectDate > end) return false;
      return true;
    };
    
    // Max members filter
    const matchesMaxMembers = !filterValues.maxMembers || 
      project.max_members <= parseInt(filterValues.maxMembers);

    return matchesSearch && matchesStatus && matchesLecturer && 
           matchesDateRange() && matchesMaxMembers;
  }).sort((a, b) => {
    // Sorting
    let comparison = 0;
    switch (sortBy) {
      case 'title':
        comparison = (a.title || '').localeCompare(b.title || '');
        break;
      case 'created_at':
        comparison = new Date(b.created_at) - new Date(a.created_at);
        break;
      case 'max_members':
        comparison = (b.max_members || 0) - (a.max_members || 0);
        break;
      default:
        comparison = 0;
    }
    return sortOrder === 'asc' ? -comparison : comparison;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
      case 'active':
        return 'success';
      case 'pending':
        return 'warning';
      case 'rejected':
        return 'error';
      case 'completed':
        return 'info';
      default:
        return 'default';
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Danh sách đề tài
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {isLecturer ? 'Đề tài do bạn tạo' : 'Tất cả đề tài trong hệ thống'}
          </Typography>
        </Box>
        {isLecturer && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/projects/create')}
          >
            Tạo đề tài mới
          </Button>
        )}
      </Box>

      {/* Advanced Search & Filters */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={showFilters ? 9 : 12}>
          <AdvancedSearch
            placeholder="Tìm kiếm đề tài theo tên, mô tả..."
            onSearch={handleSearch}
            onFilterToggle={() => setShowFilters(!showFilters)}
            showFilters={showFilters}
            fields={['title', 'description']}
            enableTags={false}
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
                <MenuItem value="created_at">Ngày tạo</MenuItem>
                <MenuItem value="title">Tiêu đề</MenuItem>
                <MenuItem value="max_members">Số thành viên</MenuItem>
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
              storageKey="projectListFilters"
            />

            <Box sx={{ flexGrow: 1 }} />
            
            <Chip
              label={`${filteredProjects.length} / ${projects.length} đề tài`}
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
                  key: 'status',
                  label: 'Trạng thái',
                  type: 'select',
                  options: [
                    { value: 'draft', label: 'Bản nháp' },
                    { value: 'pending', label: 'Chờ duyệt' },
                    { value: 'approved', label: 'Đã duyệt' },
                    { value: 'active', label: 'Đang hoạt động' },
                    { value: 'rejected', label: 'Từ chối' },
                    { value: 'completed', label: 'Hoàn thành' },
                  ],
                },
                {
                  key: 'dateRange',
                  label: 'Ngày tạo',
                  type: 'date-range',
                  defaultValue: {},
                },
                {
                  key: 'maxMembers',
                  label: 'Số thành viên tối đa',
                  type: 'text',
                  placeholder: 'VD: 5',
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

      {/* Project Grid */}
      {filteredProjects.length === 0 ? (
        <Card>
          <CardContent>
            <Typography color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
              Không tìm thấy đề tài nào
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {filteredProjects.map((project) => (
            <Grid item xs={12} sm={6} md={4} key={project.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Chip
                      label={config.PROJECT_STATUS[project.status] || project.status}
                      size="small"
                      color={getStatusColor(project.status)}
                    />
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    {project.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {project.description || 'Không có mô tả'}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="caption" color="text.secondary" display="block">
                      Giảng viên: {project.lecturer?.full_name || 'N/A'}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" display="block">
                      Số thành viên tối đa: {project.max_members || 'N/A'}
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    startIcon={<ViewIcon />}
                    onClick={() => navigate(`/projects/${project.id}`)}
                  >
                    Xem chi tiết
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ProjectList;
