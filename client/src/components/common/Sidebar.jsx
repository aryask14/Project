import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, Box, Typography, ListItemText, Divider, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person'; // Added missing import
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { Link, useLocation } from 'react-router-dom';
import authService from '../../services/authService';

const drawerWidth = 240; // Defined drawerWidth

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const Sidebar = ({ open, toggleDrawer }) => {
  const location = useLocation();
  const user = authService.getCurrentUser();

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Profile', icon: <PersonIcon />, path: '/dashboard/profile' }, // Now using properly imported PersonIcon
    { text: 'Doctors', icon: <MedicalServicesIcon />, path: '/doctors' },
    { text: 'Appointments', icon: <CalendarTodayIcon />, path: '/appointments' },
    ...(user?.role === 'admin' ? [
      { text: 'Admin', icon: <AdminPanelSettingsIcon />, path: '/admin' }
    ] : [])
  ];

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        width: open ? drawerWidth : 56,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? drawerWidth : 56,
          boxSizing: 'border-box',
          transition: 'width 0.3s ease',
          overflowX: 'hidden',
        },
      }}
    >
      <DrawerHeader sx={{ 
        backgroundColor: 'primary.main',
        color: 'white',
        justifyContent: 'space-between',
        px: 2,
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <MedicalServicesIcon sx={{ mr: 1 }} />
          {open && <Typography variant="subtitle1" fontWeight="600">
            MediBook Pro
          </Typography>}
        </Box>
        <IconButton onClick={toggleDrawer} sx={{ color: 'white' }}>
          <ChevronLeftIcon />
        </IconButton>
      </DrawerHeader>
      
      <Divider />
      
      <List sx={{ pt: 1 }}>
        {menuItems.map((item) => (
          <ListItem 
            button 
            key={item.text}
            component={Link} 
            to={item.path}
            selected={location.pathname === item.path}
            sx={{
              borderRadius: '8px',
              mx: 1,
              my: 0.5,
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
              '&:hover': {
                backgroundColor: 'primary.light',
                '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                  color: 'white',
                },
              },
              '&.Mui-selected': {
                backgroundColor: 'primary.main',
                '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                  color: 'white',
                },
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              {item.icon}
            </ListItemIcon>
            {open && <ListItemText primary={item.text} />}
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;