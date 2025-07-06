import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const LoadingSpinner = () => (
  <Box sx={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    minHeight: '200px'
  }}>
    <CircularProgress color="primary" />
  </Box>
);

export default LoadingSpinner;