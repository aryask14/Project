import React from 'react';
import { Box, Typography, Button, Grid, Paper, Container } from '@mui/material';
import { MedicalServices, CalendarToday, People } from '@mui/icons-material'; // Corrected imports
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Hero Section */}
      <Box 
        className="hero-section" 
        sx={{ 
          position: 'relative',
          py: 10,
          textAlign: 'center',
          color: 'white',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(42, 127, 186, 0.9), rgba(255, 126, 51, 0.8))',
            zIndex: 1
          }
        }}
      >
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
          <MedicalServices sx={{ fontSize: '4rem', mb: 2, color: 'white' }} /> {/* Fixed icon */}
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom 
            sx={{ 
              fontWeight: 700,
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            Welcome to <span style={{ color: '#ffd700' }}>MediBook</span> Pro
          </Typography>
          <Typography 
            variant="h5" 
            component="h2" 
            gutterBottom 
            sx={{ 
              mb: 4,
              fontWeight: 400
            }}
          >
            Your premium healthcare appointment platform
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button 
              variant="contained" 
              color="secondary" 
              size="large"
              onClick={() => navigate('/doctors')}
              sx={{
                px: 4,
                py: 1.5,
                fontWeight: 600,
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 8px rgba(0,0,0,0.15)'
                }
              }}
            >
              Find a Doctor
            </Button>
            <Button 
              variant="outlined" 
              color="inherit" 
              size="large"
              onClick={() => navigate('/appointments')}
              sx={{
                px: 4,
                py: 1.5,
                fontWeight: 600,
                borderRadius: '8px',
                borderWidth: '2px',
                '&:hover': {
                  borderWidth: '2px',
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              My Appointments
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ mb: 6 }}>
          Our Services
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, height: '100%', textAlign: 'center' }}>
              <MedicalServices sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                Specialist Doctors
              </Typography>
              <Typography>
                Access to a wide range of specialist doctors across various medical fields.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, height: '100%', textAlign: 'center' }}>
              <CalendarToday sx={{ fontSize: 60, color: 'secondary.main', mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                Easy Booking
              </Typography>
              <Typography>
                Book appointments 24/7 with our easy-to-use online scheduling system.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, height: '100%', textAlign: 'center' }}>
              <People sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                Patient Care
              </Typography>
              <Typography>
                Personalized care and reminders to help you manage your health.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Call to Action */}
      <Box sx={{ backgroundColor: 'background.paper', py: 6 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Ready to book your appointment?
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            Join thousands of patients who have already experienced seamless healthcare with our system.
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            onClick={() => navigate('/doctors')}
          >
            Get Started
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;