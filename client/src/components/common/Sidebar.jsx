import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon,Box,Typography, ListItemText, Divider, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { Link } from 'react-router-dom';
import authService from '../../services/authService';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const user = authService.getCurrentUser();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#ffffff',
          borderRight: '1px solid #e2e8f0',
          boxShadow: '2px 0 10px rgba(0, 0, 0, 0.05)',
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
          <Typography variant="subtitle1" fontWeight="600">
            MediBook Pro
          </Typography>
        </Box>
        <IconButton onClick={toggleDrawer} sx={{ color: 'white' }}>
          <ChevronLeftIcon />
        </IconButton>
      </DrawerHeader>
      
      <Divider />
      
      <List sx={{ pt: 1 }}>
        <ListItem 
          button 
          component={Link} 
          to="/dashboard"
          sx={{
            borderRadius: '8px',
            mx: 1,
            my: 0.5,
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
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        
        {/* Other list items with similar styling */}
      </List>
    </Drawer>
  );
};

export default Sidebar;