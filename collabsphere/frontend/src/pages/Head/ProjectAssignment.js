import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Chip,
  TextField,
  InputAdornment,
  Alert,
  CircularProgress,
  Divider,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Assignment as ProjectIcon,
  Search as SearchIcon,
  Class as ClassIcon,
  CheckCircle as ApprovedIcon,
  Send as AssignIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import projectService from '../../services/projectService';
import classService from '../../services/classService';
import { AssignProjectToClass } from '../../components/Project';

const ProjectAssignment = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [openAssignDialog, setOpenAssignDialog] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [projectsData, classesData] = await Promise.all([
        projectService.getProjects({ status: 'approved' }),
        classService.getClasses(),
      ]);
      setProjects(projectsData.items || projectsData || []);
      setClasses(classesData.items || classesData || []);
    } catch (err) {
      console.error('Failed to fetch data:', err);
      toast.error('Không thể tải dữ liệu dự án và lớp học');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAssign = (project) => {
    setSelectedProject(project);
    setOpenAssignDialog(true);
  };

  const handleCloseAssign = () => {
    setSelectedProject(null);
    setOpenAssignDialog(false);
  };

  const handleAssigned = () => {
    fetchData();
  };

  const filteredProjects = projects.filter(
    (p) =>
      p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const assignedProjects = filteredProjects.filter(p => (p.assigned_class_count || 0) > 0);
  const unassignedProjects = filteredProjects.filter(p => (p.assigned_class_count || 0) === 0);

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
        Chỉ định dự án cho lớp học
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Chỉ định các dự án đã được phê duyệt cho các lớp học
      </Typography>

      {/* Search */}
      <TextField
        placeholder="Tìm kiếm dự án..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 3, width: 400 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <Grid container spacing={3}>
        {/* Unassigned Projects */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="warning.main" gutterBottom>
                <ProjectIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Dự án chưa chỉ định ({unassignedProjects.length})
              </Typography>
              <Divider sx={{ mb: 2 }} />

              {unassignedProjects.length === 0 ? (
                <Alert severity="success">
                  Tất cả dự án đã được chỉ định cho lớp học
                </Alert>
              ) : (
                <List>
                  {unassignedProjects.map((project) => (
                    <ListItem
                      key={project.id}
                      sx={{
                        bgcolor: 'warning.light',
                        borderRadius: 1,
                        mb: 1,
                      }}
                    >
                      <ListItemIcon>
                        <ProjectIcon color="warning" />
                      </ListItemIcon>
                      <ListItemText
                        primary={project.title}
                        secondary={
                          <>
                            {project.description?.substring(0, 50)}...
                            <br />
                            <Chip
                              label={`${project.milestones_count || 0} milestones`}
                              size="small"
                              sx={{ mt: 0.5 }}
                            />
                          </>
                        }
                      />
                      <ListItemSecondaryAction>
                        <Tooltip title="Xem chi tiết">
                          <IconButton onClick={() => navigate(`/projects/${project.id}`)}>
                            <ViewIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Chỉ định cho lớp">
                          <IconButton
                            color="primary"
                            onClick={() => handleOpenAssign(project)}
                          >
                            <AssignIcon />
                          </IconButton>
                        </Tooltip>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Assigned Projects */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="success.main" gutterBottom>
                <ApprovedIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Dự án đã chỉ định ({assignedProjects.length})
              </Typography>
              <Divider sx={{ mb: 2 }} />

              {assignedProjects.length === 0 ? (
                <Alert severity="info">
                  Chưa có dự án nào được chỉ định
                </Alert>
              ) : (
                <List>
                  {assignedProjects.map((project) => (
                    <ListItem
                      key={project.id}
                      sx={{
                        bgcolor: 'success.light',
                        borderRadius: 1,
                        mb: 1,
                      }}
                    >
                      <ListItemIcon>
                        <ApprovedIcon color="success" />
                      </ListItemIcon>
                      <ListItemText
                        primary={project.title}
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              {project.description?.substring(0, 50)}...
                            </Typography>
                            <Chip
                              icon={<ClassIcon />}
                              label={`Đã chỉ định cho ${project.assigned_class_count || 0} lớp`}
                              size="small"
                              color="success"
                              sx={{ mt: 0.5 }}
                            />
                          </Box>
                        }
                      />
                      <ListItemSecondaryAction>
                        <Tooltip title="Xem chi tiết">
                          <IconButton onClick={() => navigate(`/projects/${project.id}`)}>
                            <ViewIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Chỉnh sửa chỉ định">
                          <IconButton
                            color="primary"
                            onClick={() => handleOpenAssign(project)}
                          >
                            <AssignIcon />
                          </IconButton>
                        </Tooltip>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Assign Dialog */}
      {selectedProject && (
        <AssignProjectToClass
          open={openAssignDialog}
          onClose={handleCloseAssign}
          projectId={selectedProject.id}
          projectName={selectedProject.title}
          onAssigned={handleAssigned}
        />
      )}
    </Box>
  );
};

export default ProjectAssignment;
