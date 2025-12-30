import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { SentimentDissatisfied as SadIcon } from '@mui/icons-material';

const EmptyState = ({ 
  title = 'Không có dữ liệu', 
  description = 'Hiện tại chưa có dữ liệu nào.',
  action,
  actionText,
  icon: Icon = SadIcon,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 300,
        gap: 2,
        p: 4,
        textAlign: 'center',
      }}
    >
      <Icon sx={{ fontSize: 64, color: 'text.disabled' }} />
      <Typography variant="h6" color="text.secondary">
        {title}
      </Typography>
      <Typography variant="body2" color="text.disabled" sx={{ maxWidth: 400 }}>
        {description}
      </Typography>
      {action && actionText && (
        <Button variant="contained" onClick={action}>
          {actionText}
        </Button>
      )}
    </Box>
  );
};

export default EmptyState;
