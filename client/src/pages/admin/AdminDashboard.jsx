import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { People, CalendarToday, MedicalServices, Add } from '@mui/icons-material';
import doctorService from '../../services/doctorService';
import appointmentService from '../../services/appointmentService';

const AdminDashboard = () => {
  const [doctorCount, setDoctorCount] = useState(0);
  const [appointmentCount, setAppointmentCount] = useState(0);
  const [recentAppointments, setRecentAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const doctors = await doctorService.getAllDoctors();
        const appointments = await appointmentService.getAllAppointments();
        
        setDoctorCount(doctors.length);
        setAppointmentCount(appointments.length);
        setRecentAppointments(appointments.slice(0, 5));
      } catch (error) {
        console.error('Error fetching admin data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Typography>Loading admin dashboard...</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <People sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                <Box>
                  <Typography variant="h6">Doctors</Typography>
                  <Typography variant="body2">{doctorCount} registered doctors</Typography>
                </Box>
              </Box>
              <Button 
                variant="outlined" 
                sx={{ mt: 2 }} 
                fullWidth
                startIcon={<Add />}
              >
                Add New Doctor
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
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
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <MedicalServices sx={{ fontSize: 40, color: 'success.main', mr: 2 }} />
                <Box>
                  <Typography variant="h6">Manage</Typography>
                  <Typography variant="body2">System configuration</Typography>
                </Box>
              </Box>
              <Button variant="contained" sx={{ mt: 2 }} fullWidth>
                System Settings
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
        Recent Appointments
      </Typography>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Patient</TableCell>
              <TableCell>Doctor</TableCell>
              <TableCell>Specialty</TableCell>
              <TableCell>Date & Time</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recentAppointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell>{appointment.userName}</TableCell>
                <TableCell>{appointment.doctorName}</TableCell>
                <TableCell>{appointment.specialty}</TableCell>
                <TableCell>
                  {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                </TableCell>
                <TableCell>
                  {appointment.status === 'confirmed' ? (
                    <Typography color="success.main">Confirmed</Typography>
                  ) : (
                    <Typography color="error.main">Cancelled</Typography>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminDashboard;