import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Chip,
  Paper,
  Tooltip,
  Collapse,
  Divider,
} from '@mui/material';
import {
  Search as SearchIcon,
  Clear as ClearIcon,
  FilterList as FilterIcon,
  TuneOutlined as TuneIcon,
} from '@mui/icons-material';

/**
 * AdvancedSearch Component
 * Multi-field search with tag support and filter toggle
 */
const AdvancedSearch = ({
  placeholder = 'Tìm kiếm...',
  onSearch,
  onFilterToggle,
  showFilters = false,
  fields = ['title', 'description'],
  enableTags = false,
  searchDelay = 500,
  initialValue = '',
}) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const [searchTags, setSearchTags] = useState([]);
  const [debouncedTerm, setDebouncedTerm] = useState(initialValue);

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, searchDelay);

    return () => clearTimeout(timer);
  }, [searchTerm, searchDelay]);

  // Trigger search when debounced term changes
  useEffect(() => {
    if (onSearch) {
      onSearch({
        term: debouncedTerm,
        tags: searchTags,
        fields: fields,
      });
    }
  }, [debouncedTerm, searchTags]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Auto-detect tags (words starting with #)
    if (enableTags && value.includes('#')) {
      const tags = value.match(/#[\w]+/g) || [];
      setSearchTags(tags.map(tag => tag.substring(1)));
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    setSearchTags([]);
    if (onSearch) {
      onSearch({ term: '', tags: [], fields });
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    const newTags = searchTags.filter(tag => tag !== tagToRemove);
    setSearchTags(newTags);
    
    // Remove tag from search term
    const newTerm = searchTerm.replace(`#${tagToRemove}`, '').trim();
    setSearchTerm(newTerm);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setDebouncedTerm(searchTerm);
    }
  };

  return (
    <Box>
      <Paper
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          px: 2,
          py: 0.5,
          '&:focus-within': {
            borderColor: 'primary.main',
            boxShadow: (theme) => `0 0 0 2px ${theme.palette.primary.main}25`,
          },
          transition: 'all 0.2s',
        }}
      >
        <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
        
        <TextField
          fullWidth
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyPress={handleKeyPress}
          variant="standard"
          InputProps={{
            disableUnderline: true,
            sx: { fontSize: '0.95rem' },
          }}
        />

        {searchTerm && (
          <Tooltip title="Xóa">
            <IconButton size="small" onClick={handleClear} sx={{ mr: 1 }}>
              <ClearIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}

        {onFilterToggle && (
          <Tooltip title={showFilters ? 'Ẩn bộ lọc' : 'Hiển thị bộ lọc'}>
            <IconButton
              size="small"
              onClick={onFilterToggle}
              color={showFilters ? 'primary' : 'default'}
            >
              <TuneIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </Paper>

      {/* Search Tags */}
      {enableTags && searchTags.length > 0 && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
          {searchTags.map((tag, index) => (
            <Chip
              key={index}
              label={`#${tag}`}
              size="small"
              onDelete={() => handleRemoveTag(tag)}
              color="primary"
              variant="outlined"
            />
          ))}
        </Box>
      )}

      {/* Search Info */}
      {debouncedTerm && (
        <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
          <SearchIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
          <Box sx={{ fontSize: '0.85rem', color: 'text.secondary' }}>
            Tìm trong: {fields.map(f => {
              const fieldNames = {
                title: 'Tiêu đề',
                description: 'Mô tả',
                tags: 'Tags',
                content: 'Nội dung',
                name: 'Tên',
                code: 'Mã',
              };
              return fieldNames[f] || f;
            }).join(', ')}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default AdvancedSearch;
