import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { CalendarToday, MedicalServices, Person } from '@mui/icons-material';
import appointmentService from '../../services/appointmentService';
import authService from '../../services/authService';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [appointmentCount, setAppointmentCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const user = authService.getCurrentUser();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchAppointments = async () => {
      try {
        const appointments = await appointmentService.getUserAppointments(user.id);
        const upcoming = appointments
          .filter(appt => appt.status === 'confirmed')
          .slice(0, 3);
        
        setUpcomingAppointments(upcoming);
        setAppointmentCount(appointments.length);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Welcome, {user.name}
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', cursor: 'pointer' }} onClick={() => navigate('/dashboard/profile')}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Person sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                <Box>
                  <Typography variant="h6">Personal Profile</Typography>
                  <Typography variant="body2">View and update your information</Typography>
                </Box>
              </Box>
              <Button variant="outlined" sx={{ mt: 2 }} fullWidth>
                Manage Profile
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', cursor: 'pointer' }} onClick={() => navigate('/appointments')}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CalendarToday sx={{ fontSize: 40, color: 'secondary.main', mr: 2 }} />
                <Box>
                  <Typography variant="h6">Appointments</Typography>
                  <Typography variant="body2">{appointmentCount} total appointments</Typography>
                </Box>
              </Box>
              <Button variant="outlined" sx={{ mt: 2 }} fullWidth>
                View All
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', cursor: 'pointer' }} onClick={() => navigate('/doctors')}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <MedicalServices sx={{ fontSize: 40, color: 'success.main', mr: 2 }} />
                <Box>
                  <Typography variant="h6">Find Doctors</Typography>
                  <Typography variant="body2">Book new appointments</Typography>
                </Box>
              </Box>
              <Button 
                variant="contained" 
                sx={{ mt: 2 }} 
                fullWidth
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/doctors');
                }}
              >
                Browse Doctors
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
        Upcoming Appointments
      </Typography>
      
      {upcomingAppointments.length > 0 ? (
        <Grid container spacing={3}>
          {upcomingAppointments.map((appointment) => (
            <Grid item xs={12} md={6} key={appointment.id}>
              <Card sx={{ cursor: 'pointer' }} onClick={() => navigate(`/appointments/${appointment.id}`)}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {appointment.doctorName}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    {appointment.specialty}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Time:</strong> {appointment.time}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Status:</strong> {appointment.status}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            No upcoming appointments.
          </Typography>
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => navigate('/doctors')}
          >
            Book an Appointment
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default UserDashboard;