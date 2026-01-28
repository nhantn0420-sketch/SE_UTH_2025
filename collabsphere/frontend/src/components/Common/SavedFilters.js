import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  IconButton,
  Chip,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Tooltip,
} from '@mui/material';
import {
  Save as SaveIcon,
  BookmarkBorder as BookmarkIcon,
  Bookmark as BookmarkFilledIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  MoreVert as MoreIcon,
} from '@mui/icons-material';
import { toast } from 'react-toastify';

/**
 * SavedFilters Component
 * Save and manage filter presets
 */
const SavedFilters = ({
  currentFilters,
  onApplyFilter,
  storageKey = 'savedFilters',
  maxSaved = 10,
}) => {
  const [savedFilters, setSavedFilters] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [saveDialog, setDialogOpen] = useState(false);
  const [filterName, setFilterName] = useState('');
  const [editingFilter, setEditingFilter] = useState(null);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState(null);

  // Load saved filters from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setSavedFilters(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading saved filters:', error);
    }
  }, [storageKey]);

  // Save to localStorage whenever savedFilters changes
  const persistFilters = (filters) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(filters));
    } catch (error) {
      console.error('Error saving filters:', error);
      toast.error('Không thể lưu bộ lọc');
    }
  };

  const handleOpenSaveDialog = () => {
    setFilterName('');
    setEditingFilter(null);
    setDialogOpen(true);
  };

  const handleSaveFilter = () => {
    if (!filterName.trim()) {
      toast.warning('Vui lòng nhập tên bộ lọc');
      return;
    }

    // Check if filter is empty
    const hasActiveFilters = Object.values(currentFilters).some(value => {
      if (Array.isArray(value)) return value.length > 0;
      return value !== '' && value !== null && value !== undefined;
    });

    if (!hasActiveFilters) {
      toast.warning('Không có bộ lọc nào được áp dụng');
      return;
    }

    const newFilter = {
      id: editingFilter?.id || Date.now(),
      name: filterName.trim(),
      filters: currentFilters,
      createdAt: editingFilter?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    let updated;
    if (editingFilter) {
      // Update existing
      updated = savedFilters.map(f => (f.id === editingFilter.id ? newFilter : f));
      toast.success('Đã cập nhật bộ lọc');
    } else {
      // Add new
      if (savedFilters.length >= maxSaved) {
        toast.warning(`Chỉ có thể lưu tối đa ${maxSaved} bộ lọc`);
        return;
      }
      updated = [...savedFilters, newFilter];
      toast.success('Đã lưu bộ lọc');
    }

    setSavedFilters(updated);
    persistFilters(updated);
    setDialogOpen(false);
  };

  const handleApplyFilter = (filter) => {
    if (onApplyFilter) {
      onApplyFilter(filter.filters);
    }
    toast.success(`Đã áp dụng: ${filter.name}`);
    setAnchorEl(null);
  };

  const handleEditFilter = (filter) => {
    setEditingFilter(filter);
    setFilterName(filter.name);
    setDialogOpen(true);
    setMenuAnchor(null);
  };

  const handleDeleteFilter = (filterId) => {
    const updated = savedFilters.filter(f => f.id !== filterId);
    setSavedFilters(updated);
    persistFilters(updated);
    toast.success('Đã xóa bộ lọc');
    setMenuAnchor(null);
  };

  const handleMenuOpen = (event, filter) => {
    setMenuAnchor(event.currentTarget);
    setSelectedFilter(filter);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedFilter(null);
  };

  const countActiveFilters = (filters) => {
    return Object.values(filters).filter(value => {
      if (Array.isArray(value)) return value.length > 0;
      return value !== '' && value !== null && value !== undefined;
    }).length;
  };

  return (
    <Box>
      {/* Main Button */}
      <Button
        variant="outlined"
        startIcon={<BookmarkIcon />}
        onClick={(e) => setAnchorEl(e.currentTarget)}
        size="small"
      >
        Bộ lọc đã lưu ({savedFilters.length})
      </Button>

      {/* Saved Filters Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          sx: { width: 320, maxHeight: 400 },
        }}
      >
        <Box sx={{ px: 2, py: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle2" fontWeight="bold">
            Bộ lọc đã lưu
          </Typography>
          <Button
            size="small"
            startIcon={<SaveIcon />}
            onClick={handleOpenSaveDialog}
          >
            Lưu hiện tại
          </Button>
        </Box>
        <Divider />

        {savedFilters.length === 0 ? (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <BookmarkIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 1 }} />
            <Typography variant="body2" color="text.secondary">
              Chưa có bộ lọc nào được lưu
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Áp dụng các bộ lọc và nhấn "Lưu hiện tại"
            </Typography>
          </Box>
        ) : (
          <List sx={{ p: 0 }}>
            {savedFilters.map((filter, index) => (
              <React.Fragment key={filter.id}>
                <ListItem
                  button
                  onClick={() => handleApplyFilter(filter)}
                  sx={{
                    '&:hover': {
                      bgcolor: 'action.hover',
                    },
                  }}
                >
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <BookmarkFilledIcon fontSize="small" color="primary" />
                        <Typography variant="body2" fontWeight="medium">
                          {filter.name}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Box sx={{ display: 'flex', gap: 0.5, mt: 0.5 }}>
                        <Chip
                          label={`${countActiveFilters(filter.filters)} bộ lọc`}
                          size="small"
                          sx={{ height: 20, fontSize: '0.7rem' }}
                        />
                        <Typography variant="caption" color="text.secondary">
                          • {new Date(filter.updatedAt).toLocaleDateString('vi-VN')}
                        </Typography>
                      </Box>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMenuOpen(e, filter);
                      }}
                    >
                      <MoreIcon fontSize="small" />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                {index < savedFilters.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        )}
      </Menu>

      {/* Filter Action Menu */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => {
            handleEditFilter(selectedFilter);
          }}
        >
          <EditIcon fontSize="small" sx={{ mr: 1 }} />
          Đổi tên
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleDeleteFilter(selectedFilter?.id);
          }}
          sx={{ color: 'error.main' }}
        >
          <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
          Xóa
        </MenuItem>
      </Menu>

      {/* Save/Edit Dialog */}
      <Dialog open={saveDialog} onClose={() => setDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>
          {editingFilter ? 'Đổi tên bộ lọc' : 'Lưu bộ lọc'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            label="Tên bộ lọc"
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            placeholder="VD: Dự án đang thực hiện"
            sx={{ mt: 1 }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSaveFilter();
              }
            }}
          />
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            Bộ lọc hiện tại sẽ được lưu với {countActiveFilters(currentFilters)} điều kiện
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Hủy</Button>
          <Button variant="contained" onClick={handleSaveFilter}>
            {editingFilter ? 'Cập nhật' : 'Lưu'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SavedFilters;
