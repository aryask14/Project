import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import authService from '../../services/authService';

const AuthLayout = () => {
  if (authService.isAuthenticated()) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      p: 3
    }}>
      <Container maxWidth="sm">
        <Outlet />
      </Container>
    </Box>
  );
};

export default AuthLayout;