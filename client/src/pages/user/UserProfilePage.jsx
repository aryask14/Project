// src/pages/user/UserProfilePage.jsx
import React from 'react';
import { Box, Typography, Button, TextField, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';

const UserProfilePage = () => {
  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        My Profile
      </Typography>
      
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Avatar sx={{ width: 80, height: 80, mr: 2 }}>
          {user?.name?.charAt(0)}
        </Avatar>
        <Typography variant="h5">{user?.name}</Typography>
      </Box>

      <Box component="form" sx={{ maxWidth: 500 }}>
        <TextField
          label="Full Name"
          defaultValue={user?.name}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          defaultValue={user?.email}
          fullWidth
          margin="normal"
          disabled
        />
        <TextField
          label="Password"
          type="password"
          placeholder="Enter new password"
          fullWidth
          margin="normal"
        />
        
        <Box sx={{ mt: 3 }}>
          <Button variant="contained" sx={{ mr: 2 }}>
            Update Profile
          </Button>
          <Button variant="outlined" onClick={() => navigate('/dashboard')}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default UserProfilePage;