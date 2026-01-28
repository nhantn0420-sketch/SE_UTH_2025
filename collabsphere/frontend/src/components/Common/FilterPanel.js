import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  MenuItem,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  FormGroup,
  Button,
  Divider,
  Chip,
  IconButton,
  Collapse,
  Autocomplete,
  Grid,
  Select,
  InputLabel,
} from '@mui/material';
import {
  Clear as ClearIcon,
  Check as CheckIcon,
  ExpandMore as ExpandIcon,
  ExpandLess as CollapseIcon,
} from '@mui/icons-material';
// Temporarily disabled due to MUI X date-pickers dependency issues
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

/**
 * FilterPanel Component
 * Advanced filtering with multiple filter types
 */
const FilterPanel = ({
  filters = [],
  onFilterChange,
  onClear,
  compact = false,
  collapsible = false,
  initialExpanded = true,
}) => {
  const [expanded, setExpanded] = useState(initialExpanded);
  const [filterValues, setFilterValues] = useState({});
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  // Initialize filter values
  useEffect(() => {
    const initial = {};
    filters.forEach(filter => {
      if (filter.type === 'checkbox-group') {
        initial[filter.key] = filter.defaultValue || [];
      } else {
        initial[filter.key] = filter.defaultValue || '';
      }
    });
    setFilterValues(initial);
  }, [filters]);

  // Count active filters
  useEffect(() => {
    let count = 0;
    Object.entries(filterValues).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) count++;
      else if (value && value !== '') count++;
    });
    setActiveFiltersCount(count);
  }, [filterValues]);

  // Notify parent of filter changes
  useEffect(() => {
    if (onFilterChange) {
      onFilterChange(filterValues);
    }
  }, [filterValues]);

  const handleFilterChange = (key, value) => {
    setFilterValues(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleCheckboxGroupChange = (key, option, checked) => {
    setFilterValues(prev => {
      const current = prev[key] || [];
      if (checked) {
        return { ...prev, [key]: [...current, option] };
      } else {
        return { ...prev, [key]: current.filter(item => item !== option) };
      }
    });
  };

  const handleClearAll = () => {
    const cleared = {};
    filters.forEach(filter => {
      cleared[filter.key] = filter.type === 'checkbox-group' ? [] : '';
    });
    setFilterValues(cleared);
    if (onClear) {
      onClear();
    }
  };

  const renderFilter = (filter) => {
    const value = filterValues[filter.key] || (filter.type === 'checkbox-group' ? [] : '');

    switch (filter.type) {
      case 'select':
        return (
          <FormControl fullWidth size={compact ? 'small' : 'medium'}>
            <InputLabel>{filter.label}</InputLabel>
            <Select
              value={value}
              label={filter.label}
              onChange={(e) => handleFilterChange(filter.key, e.target.value)}
            >
              <MenuItem value="">Tất cả</MenuItem>
              {filter.options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );

      case 'radio':
        return (
          <FormControl component="fieldset">
            <FormLabel component="legend">{filter.label}</FormLabel>
            <RadioGroup
              value={value}
              onChange={(e) => handleFilterChange(filter.key, e.target.value)}
            >
              {filter.options.map((option) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={<Radio size="small" />}
                  label={option.label}
                />
              ))}
            </RadioGroup>
          </FormControl>
        );

      case 'checkbox-group':
        return (
          <FormControl component="fieldset">
            <FormLabel component="legend">{filter.label}</FormLabel>
            <FormGroup>
              {filter.options.map((option) => (
                <FormControlLabel
                  key={option.value}
                  control={
                    <Checkbox
                      size="small"
                      checked={value.includes(option.value)}
                      onChange={(e) =>
                        handleCheckboxGroupChange(filter.key, option.value, e.target.checked)
                      }
                    />
                  }
                  label={option.label}
                />
              ))}
            </FormGroup>
          </FormControl>
        );

      case 'date':
        // Temporarily using TextField instead of DatePicker
        return (
          <TextField
            type="date"
            label={filter.label}
            value={value || ''}
            onChange={(e) => handleFilterChange(filter.key, e.target.value)}
            fullWidth
            size={compact ? 'small' : 'medium'}
            InputLabelProps={{ shrink: true }}
          />
        );

      case 'date-range':
        // Temporarily using TextField instead of DatePicker
        return (
          <Box>
            <Typography variant="caption" color="text.secondary" gutterBottom>
              {filter.label}
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <TextField
                  type="date"
                  label="Từ ngày"
                  value={value?.start || ''}
                  onChange={(e) =>
                    handleFilterChange(filter.key, { ...value, start: e.target.value })
                  }
                  fullWidth
                  size="small"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type="date"
                  label="Đến ngày"
                  value={value?.end || ''}
                  onChange={(e) =>
                    handleFilterChange(filter.key, { ...value, end: e.target.value })
                  }
                  fullWidth
                  size="small"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
          </Box>
        );

      case 'autocomplete':
        return (
          <Autocomplete
            multiple={filter.multiple}
            options={filter.options}
            value={value}
            onChange={(e, newValue) => handleFilterChange(filter.key, newValue)}
            getOptionLabel={(option) => option.label || option}
            renderInput={(params) => (
              <TextField
                {...params}
                label={filter.label}
                size={compact ? 'small' : 'medium'}
              />
            )}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  label={option.label || option}
                  size="small"
                  {...getTagProps({ index })}
                />
              ))
            }
          />
        );

      case 'text':
        return (
          <TextField
            fullWidth
            label={filter.label}
            value={value}
            onChange={(e) => handleFilterChange(filter.key, e.target.value)}
            size={compact ? 'small' : 'medium'}
            placeholder={filter.placeholder}
          />
        );

      default:
        return null;
    }
  };

  const content = (
    <Box>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="subtitle2" fontWeight="bold">
            Bộ lọc
          </Typography>
          {activeFiltersCount > 0 && (
            <Chip label={activeFiltersCount} size="small" color="primary" />
          )}
        </Box>
        <Box>
          {collapsible && (
            <IconButton size="small" onClick={() => setExpanded(!expanded)}>
              {expanded ? <CollapseIcon /> : <ExpandIcon />}
            </IconButton>
          )}
        </Box>
      </Box>

      {/* Filters */}
      <Collapse in={expanded}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {filters.map((filter, index) => (
            <Box key={filter.key}>
              {renderFilter(filter)}
              {index < filters.length - 1 && <Divider sx={{ mt: 2 }} />}
            </Box>
          ))}

          {/* Clear Button */}
          {activeFiltersCount > 0 && (
            <Button
              variant="outlined"
              color="error"
              startIcon={<ClearIcon />}
              onClick={handleClearAll}
              fullWidth
            >
              Xóa tất cả bộ lọc
            </Button>
          )}
        </Box>
      </Collapse>
    </Box>
  );

  if (compact) {
    return <Box sx={{ p: 2 }}>{content}</Box>;
  }

  return (
    <Paper sx={{ p: 2 }}>
      {content}
    </Paper>
  );
};

export default FilterPanel;
