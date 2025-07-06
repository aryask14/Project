import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import Navbar from '../common/Navbar';
import Sidebar from '../common/Sidebar';

const drawerWidth = 240;

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Navbar 
        sidebarOpen={sidebarOpen} 
        toggleSidebar={toggleSidebar} 
      />
      <Sidebar 
        open={sidebarOpen} 
        toggleDrawer={toggleSidebar} 
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          transition: 'margin 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
          marginLeft: sidebarOpen ? `${drawerWidth}px` : '56px',
          width: `calc(100% - ${sidebarOpen ? drawerWidth : 56}px)`
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;