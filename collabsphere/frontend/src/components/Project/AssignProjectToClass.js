import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  Chip,
  TextField,
  InputAdornment,
  Alert,
  CircularProgress,
  Divider,
} from '@mui/material';
import {
  Assignment as AssignIcon,
  Search as SearchIcon,
  Class as ClassIcon,
  CheckCircle as CheckIcon,
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import projectService from '../../services/projectService';
import classService from '../../services/classService';

const AssignProjectToClass = ({ open, onClose, projectId, projectName, onAssigned }) => {
  const [classes, setClasses] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [assignedClasses, setAssignedClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (open && projectId) {
      fetchData();
    }
  }, [open, projectId]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch all classes
      const classesData = await classService.getClasses();
      setClasses(classesData.items || classesData || []);

      // Fetch classes already assigned to this project
      try {
        const assignedData = await projectService.getProjectAssignedClasses(projectId);
        const assigned = assignedData.map(item => item.class_id);
        setAssignedClasses(assigned);
        setSelectedClasses(assigned);
      } catch (err) {
        console.error('Failed to fetch assigned classes:', err);
        // If API fails, continue with empty assigned list
        setAssignedClasses([]);
        setSelectedClasses([]);
      }
    } catch (err) {
      console.error('Failed to fetch data:', err);
      toast.error('Không thể tải danh sách lớp học');
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = (classId) => {
    setSelectedClasses((prev) => {
      if (prev.includes(classId)) {
        return prev.filter(id => id !== classId);
      } else {
        return [...prev, classId];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedClasses.length === filteredClasses.length) {
      setSelectedClasses([]);
    } else {
      setSelectedClasses(filteredClasses.map(c => c.id));
    }
  };

  const handleAssign = async () => {
    setSubmitting(true);
    try {
      // Only assign newly selected classes (not already assigned)
      const classesToAssign = selectedClasses.filter(id => !assignedClasses.includes(id));
      
      if (classesToAssign.length === 0) {
        toast.info('Không có lớp mới để chỉ định');
        onClose();
        return;
      }

      const result = await projectService.assignProjectToClasses(projectId, classesToAssign);
      
      if (result.failed > 0) {
        toast.warning(`Đã chỉ định ${result.assigned}/${result.total} lớp. ${result.failed} lớp thất bại.`);
      } else {
        toast.success(`Đã chỉ định dự án cho ${result.assigned} lớp`);
      }
      
      if (onAssigned) onAssigned();
      onClose();
    } catch (err) {
      console.error('Assignment error:', err);
      const errorMsg = err.message || 'Chỉ định dự án thất bại';
      toast.error(errorMsg);
    } finally {
      setSubmitting(false);
    }
  };

  const filteredClasses = classes.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const newlySelected = selectedClasses.filter(id => !assignedClasses.includes(id));
  const removedClasses = assignedClasses.filter(id => !selectedClasses.includes(id));

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AssignIcon color="primary" />
          <Typography variant="h6">Chỉ định dự án cho lớp học</Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          Dự án: <strong>{projectName}</strong>
        </Typography>
      </DialogTitle>
      <DialogContent>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {/* Search */}
            <TextField
              fullWidth
              placeholder="Tìm kiếm lớp học..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />

            {/* Select All */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Button size="small" onClick={handleSelectAll}>
                {selectedClasses.length === filteredClasses.length ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}
              </Button>
              <Typography variant="body2" color="text.secondary">
                Đã chọn: {selectedClasses.length} / {classes.length} lớp
              </Typography>
            </Box>

            {/* Classes List */}
            <List sx={{ maxHeight: 400, overflow: 'auto', border: 1, borderColor: 'divider', borderRadius: 1 }}>
              {filteredClasses.map((classItem) => {
                const isSelected = selectedClasses.includes(classItem.id);
                const wasAssigned = assignedClasses.includes(classItem.id);

                return (
                  <ListItem
                    key={classItem.id}
                    dense
                    button
                    onClick={() => handleToggle(classItem.id)}
                    sx={{
                      bgcolor: isSelected ? 'action.selected' : 'inherit',
                    }}
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={isSelected}
                        tabIndex={-1}
                        disableRipple
                      />
                    </ListItemIcon>
                    <ListItemIcon>
                      <ClassIcon color={isSelected ? 'primary' : 'action'} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography fontWeight={isSelected ? 'bold' : 'normal'}>
                            {classItem.code} - {classItem.name}
                          </Typography>
                          {wasAssigned && (
                            <Chip
                              label="Đã chỉ định"
                              size="small"
                              color="success"
                              icon={<CheckIcon />}
                            />
                          )}
                        </Box>
                      }
                      secondary={`Học kỳ: ${classItem.semester} • ${classItem.student_count || 0} sinh viên`}
                    />
                  </ListItem>
                );
              })}
            </List>

            {/* Summary */}
            {(newlySelected.length > 0 || removedClasses.length > 0) && (
              <Box sx={{ mt: 2 }}>
                <Divider sx={{ mb: 2 }} />
                {newlySelected.length > 0 && (
                  <Alert severity="info" sx={{ mb: 1 }}>
                    Sẽ thêm: {newlySelected.length} lớp mới
                  </Alert>
                )}
                {removedClasses.length > 0 && (
                  <Alert severity="warning">
                    Sẽ gỡ: {removedClasses.length} lớp
                  </Alert>
                )}
              </Box>
            )}
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button
          variant="contained"
          onClick={handleAssign}
          disabled={submitting || selectedClasses.length === 0}
          startIcon={submitting ? <CircularProgress size={20} /> : <AssignIcon />}
        >
          Chỉ định ({selectedClasses.length} lớp)
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssignProjectToClass;
