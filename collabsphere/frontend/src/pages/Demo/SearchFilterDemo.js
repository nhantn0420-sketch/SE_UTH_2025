import React, { useState } from 'react';
import { Box, Typography, Container, Paper, Grid, Chip } from '@mui/material';
import AdvancedSearch from '../../components/Common/AdvancedSearch';
import FilterPanel from '../../components/Common/FilterPanel';
import SavedFilters from '../../components/Common/SavedFilters';

const SearchFilterDemo = () => {
  const [searchResults, setSearchResults] = useState(null);
  const [filterValues, setFilterValues] = useState({});
  const [showFilters, setShowFilters] = useState(true);

  const handleSearch = (searchData) => {
    setSearchResults(searchData);
    console.log('Search:', searchData);
  };

  const handleFilterChange = (filters) => {
    setFilterValues(filters);
    console.log('Filters:', filters);
  };

  const handleApplySavedFilter = (filters) => {
    setFilterValues(filters);
    console.log('Applied saved filter:', filters);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Search & Filter Demo
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Test advanced search, filtering, and saved filter presets.
        </Typography>

        <Grid container spacing={3} sx={{ mt: 2 }}>
          {/* Search & Filters */}
          <Grid item xs={12} md={showFilters ? 9 : 12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Advanced Search
              </Typography>
              <AdvancedSearch
                placeholder="Search projects, groups, tasks..."
                onSearch={handleSearch}
                onFilterToggle={() => setShowFilters(!showFilters)}
                showFilters={showFilters}
                fields={['title', 'description', 'tags']}
                enableTags={true}
                searchDelay={500}
              />

              <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                <SavedFilters
                  currentFilters={filterValues}
                  onApplyFilter={handleApplySavedFilter}
                  storageKey="demoFilters"
                />
              </Box>

              {/* Search Results */}
              {searchResults && (
                <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Search Results:
                  </Typography>
                  <Typography variant="body2">
                    <strong>Term:</strong> {searchResults.term || '(empty)'}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Tags:</strong> {searchResults.tags.join(', ') || '(none)'}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Fields:</strong> {searchResults.fields.join(', ')}
                  </Typography>
                </Box>
              )}
            </Paper>
          </Grid>

          {/* Filter Panel */}
          {showFilters && (
            <Grid item xs={12} md={3}>
              <FilterPanel
                filters={[
                  {
                    key: 'status',
                    label: 'Status',
                    type: 'select',
                    options: [
                      { value: 'active', label: 'Active' },
                      { value: 'pending', label: 'Pending' },
                      { value: 'completed', label: 'Completed' },
                    ],
                  },
                  {
                    key: 'priority',
                    label: 'Priority',
                    type: 'checkbox-group',
                    options: [
                      { value: 'high', label: 'High' },
                      { value: 'medium', label: 'Medium' },
                      { value: 'low', label: 'Low' },
                    ],
                    defaultValue: [],
                  },
                  {
                    key: 'dateRange',
                    label: 'Date Range',
                    type: 'date-range',
                    defaultValue: {},
                  },
                  {
                    key: 'assignee',
                    label: 'Assignee',
                    type: 'text',
                    placeholder: 'Enter name',
                  },
                ]}
                onFilterChange={handleFilterChange}
                onClear={() => setFilterValues({})}
                compact={false}
                collapsible={true}
              />
            </Grid>
          )}
        </Grid>

        {/* Current Filters Display */}
        <Paper sx={{ p: 3, mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Current Filter Values
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {Object.entries(filterValues).length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                No filters applied
              </Typography>
            ) : (
              Object.entries(filterValues).map(([key, value]) => {
                if (!value || (Array.isArray(value) && value.length === 0)) return null;
                
                let displayValue = value;
                if (Array.isArray(value)) {
                  displayValue = value.join(', ');
                } else if (typeof value === 'object') {
                  displayValue = JSON.stringify(value);
                }

                return (
                  <Chip
                    key={key}
                    label={`${key}: ${displayValue}`}
                    color="primary"
                    variant="outlined"
                  />
                );
              })
            )}
          </Box>
        </Paper>

        {/* Features List */}
        <Paper sx={{ p: 3, mt: 3, bgcolor: 'grey.50' }}>
          <Typography variant="h6" gutterBottom>
            Features:
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" gutterBottom>
                AdvancedSearch:
              </Typography>
              <ul style={{ margin: 0 }}>
                <li>Multi-field search</li>
                <li>Debounced input (500ms)</li>
                <li>Tag support (#hashtags)</li>
                <li>Filter toggle button</li>
                <li>Clear button</li>
                <li>Search info display</li>
              </ul>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" gutterBottom>
                FilterPanel:
              </Typography>
              <ul style={{ margin: 0 }}>
                <li>Select dropdown</li>
                <li>Checkbox groups</li>
                <li>Date range picker</li>
                <li>Text input</li>
                <li>Active filter count</li>
                <li>Clear all button</li>
                <li>Collapsible sections</li>
              </ul>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" gutterBottom>
                SavedFilters:
              </Typography>
              <ul style={{ margin: 0 }}>
                <li>Save current filters</li>
                <li>Quick apply saved filters</li>
                <li>Edit filter names</li>
                <li>Delete saved filters</li>
                <li>LocalStorage persistence</li>
                <li>Max 10 saved filters</li>
              </ul>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default SearchFilterDemo;
