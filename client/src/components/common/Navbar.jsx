import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Avatar, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import { styled } from '@mui/material/styles';
import authService from '../../services/authService';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow: theme.shadows[3],
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const BrandLogo = () => (
  <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
    <MedicalServicesIcon sx={{ 
      color: 'primary.main', 
      fontSize: '2rem',
      mr: 1
    }} />
    <Typography variant="h6" noWrap component="div" sx={{ 
      fontWeight: 700,
      background: 'linear-gradient(135deg, #2a7fba, #ff7e33)',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      color: 'transparent'
    }}>
      MediBook Pro
    </Typography>
  </Box>
);

const Navbar = ({ toggleSidebar }) => {
  const user = authService.getCurrentUser();

  return (
    <StyledAppBar position="fixed">
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={toggleSidebar}
          edge="start"
          sx={{ mr: 2, color: 'text.primary' }}
        >
          <MenuIcon />
        </IconButton>
        
        <BrandLogo />
        
        <Box sx={{ flexGrow: 1 }} />
        
        {user && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar 
              sx={{ 
                mr: 1,
                bgcolor: 'primary.main',
                width: 36,
                height: 36,
                fontSize: '1rem'
              }}
            >
              {user.name.charAt(0)}
            </Avatar>
            <Button 
              variant="outlined" 
              onClick={authService.logout}
              sx={{
                color: 'text.primary',
                borderColor: 'text.primary',
                '&:hover': {
                  backgroundColor: 'action.hover',
                  borderColor: 'text.primary'
                }
              }}
            >
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;