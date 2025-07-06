import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AuthLayout from './components/layout/AuthLayout';
import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import DoctorListPage from './pages/doctor/DoctorListPage';
import DoctorDetailPage from './pages/doctor/DoctorDetailPage';
import AppointmentPage from './pages/appointment/AppointmentPage';
import UserDashboard from './pages/user/UserDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import NotFoundPage from './pages/NotFoundPage';
import UserProfilePage from './pages/user/UserProfilePage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2a7fba',
      light: '#5dabdf',
      dark: '#00568a',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ff7e33',
      light: '#ffb062',
      dark: '#c44f00',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Public routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          {/* Protected routes */}
          <Route element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/dashboard/profile" element={<UserProfilePage />} />
            <Route path="/doctors" element={<DoctorListPage />} />
            <Route path="/doctors/:id" element={<DoctorDetailPage />} />
            <Route path="/appointments" element={<AppointmentPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>

          {/* 404 page */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;