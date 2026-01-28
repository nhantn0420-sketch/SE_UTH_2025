import React from 'react';
import { Box, Typography, Container, Paper } from '@mui/material';
import FileUploadZone from '../../components/Common/FileUploadZone';

const FileUploadDemo = () => {
  const handleFilesSelected = (files) => {
    console.log('Files selected:', files);
    files.forEach((file) => {
      console.log(`- ${file.name} (${file.size} bytes, ${file.type})`);
    });
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          File Upload Demo
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Test drag-and-drop file upload functionality with preview, progress, and validation.
        </Typography>

        <Paper sx={{ p: 4, mt: 4 }}>
          <FileUploadZone
            onFilesSelected={handleFilesSelected}
            maxFiles={10}
            maxSize={10485760} // 10MB
            multiple={true}
            showPreview={true}
          />
        </Paper>

        <Paper sx={{ p: 3, mt: 4, bgcolor: 'grey.50' }}>
          <Typography variant="h6" gutterBottom>
            Features:
          </Typography>
          <ul>
            <li>Drag & drop multiple files</li>
            <li>Click to browse files</li>
            <li>Image preview thumbnails</li>
            <li>Upload progress bars</li>
            <li>File type validation (18 types supported)</li>
            <li>File size validation (max 10MB)</li>
            <li>File count limit (max 10 files)</li>
            <li>Individual file removal</li>
            <li>Bulk upload/clear actions</li>
            <li>Error handling for rejected files</li>
          </ul>
        </Paper>
      </Box>
    </Container>
  );
};

export default FileUploadDemo;
