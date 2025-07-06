import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Box, Container, CssBaseline } from '@mui/material';
import { styled } from '@mui/material/styles';
import authService from '../../services/authService';

const AuthBackground = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(3),
}));

const AuthLayout = () => {
  if (authService.isAuthenticated()) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <AuthBackground>
      <CssBaseline />
      <Container maxWidth="sm">
        <Outlet />
      </Container>
    </AuthBackground>
  );
};

export default AuthLayout;