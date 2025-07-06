import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Snackbar, Alert } from '@mui/material';
import { CalendarToday, Cancel, CheckCircle, AccessTime } from '@mui/icons-material';
import dayjs from 'dayjs';
import appointmentService from '../../services/appointmentService';
import authService from '../../services/authService';
import doctorService from '../../services/doctorService';

const AppointmentPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  useEffect(() => {
    if (location.state?.success) {
      setSuccessMessage('Appointment booked successfully!');
      // Clear the state
      navigate(location.pathname, { replace: true, state: {} });
    }

    const fetchAppointments = async () => {
  try {
    const data = await appointmentService.getUserAppointments(user.id);
    // Ensure doctor info is complete
    const appointmentsWithDoctorInfo = await Promise.all(
      data.map(async appt => {
        if (!appt.doctorName || !appt.specialty) {
          const doctor = await doctorService.getDoctorById(appt.doctorId);
          return {
            ...appt,
            doctorName: doctor?.name || 'Unknown Doctor',
            specialty: doctor?.specialty || 'General'
          };
        }
        return appt;
      })
    );
    setAppointments(appointmentsWithDoctorInfo);
  } catch (error) {
    console.error('Error fetching appointments:', error);
  } finally {
    setLoading(false);
  }
};

    fetchAppointments();
  }, [location.state, navigate, user.id]);

  const handleCancel = async (appointmentId) => {
    try {
      await appointmentService.cancelAppointment(appointmentId);
      setAppointments(prev => 
        prev.map(appt => 
          appt.id === appointmentId ? { ...appt, status: 'cancelled' } : appt
        )
      );
      setSuccessMessage('Appointment cancelled successfully');
    } catch (error) {
      console.error('Error cancelling appointment:', error);
    }
  };

  const handleCloseSnackbar = () => {
    setSuccessMessage('');
  };

  if (loading) {
    return <Typography>Loading appointments...</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        My Appointments
      </Typography>
      
      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>
      
      {appointments.length === 0 ? (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            No appointments scheduled
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            You don't have any upcoming appointments. Book one now!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/doctors')}
          >
            Find a Doctor
          </Button>
        </Paper>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Doctor</TableCell>
                <TableCell>Specialty</TableCell>
                <TableCell>Date & Time</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>{appointment.doctorName}</TableCell>
                  <TableCell>{appointment.specialty}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CalendarToday sx={{ mr: 1, fontSize: '1rem' }} />
                      {dayjs(appointment.date).format('MMM D, YYYY')}
                      <AccessTime sx={{ ml: 2, mr: 1, fontSize: '1rem' }} />
                      {appointment.time}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {appointment.status === 'confirmed' ? (
                        <>
                          <CheckCircle color="success" sx={{ mr: 1 }} />
                          Confirmed
                        </>
                      ) : (
                        <>
                          <Cancel color="error" sx={{ mr: 1 }} />
                          Cancelled
                        </>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>
                    {appointment.status === 'confirmed' && (
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        startIcon={<Cancel />}
                        onClick={() => handleCancel(appointment.id)}
                      >
                        Cancel
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default AppointmentPage;