import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Grid, Paper, Avatar, Divider, Tabs, Tab, Chip } from '@mui/material';
import { CalendarToday, Schedule, LocationOn,Star } from '@mui/icons-material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import doctorService from '../../services/doctorService';
import appointmentService from '../../services/appointmentService';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { TextField } from '@mui/material';  // Correct import for TextField

const DoctorDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [reviews, setReviews] = useState([]);

  
  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const doctorData = await doctorService.getDoctorById(id);
        setDoctor(doctorData);
        
        // Fetch available slots for today by default
        const slots = await doctorService.getAvailableSlots(id, dayjs().format('YYYY-MM-DD'));
        setAvailableSlots(slots);
        
        // Fetch reviews
        const reviewsData = await doctorService.getDoctorReviews(id);
        setReviews(reviewsData);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching doctor details:', error);
        navigate('/doctors');
      }
    };

    fetchDoctorDetails();
  }, [id, navigate]);

  const handleDateChange = async (date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
    
    try {
      const slots = await doctorService.getAvailableSlots(id, date.format('YYYY-MM-DD'));
      setAvailableSlots(slots);
    } catch (error) {
      console.error('Error fetching available slots:', error);
      setAvailableSlots([]);
    }
  };

  const handleBookAppointment = async () => {
    if (!selectedSlot) return;
    
    try {
      const appointment = {
        doctorId: doctor.id,
        date: selectedDate.format('YYYY-MM-DD'),
        time: selectedSlot,
      };
      
      await appointmentService.bookAppointment(appointment);
      navigate('/appointments', { state: { success: true } });
    } catch (error) {
      console.error('Error booking appointment:', error);
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!doctor) {
    return <Typography>Doctor not found</Typography>;
  }

  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Avatar
              src={doctor.image || '/default-doctor.jpg'}
              sx={{ width: 150, height: 150, mx: 'auto', mb: 2 }}
            />
            <Typography variant="h5" gutterBottom>
              {doctor.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              {doctor.specialty}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
              <Star color="warning" />
              <Typography variant="body1" sx={{ ml: 1 }}>
                {doctor.rating} ({doctor.reviewCount} reviews)
              </Typography>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ textAlign: 'left' }}>
              <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Schedule sx={{ mr: 1 }} /> Experience: {doctor.experience} years
              </Typography>
              <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <LocationOn sx={{ mr: 1 }} /> {doctor.hospital}
              </Typography>
              <Typography variant="body1" sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                <span style={{ marginRight: '8px' }}>🏥</span> {doctor.address}
              </Typography>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
              <Tab label="Book Appointment" />
              <Tab label="About" />
              <Tab label="Reviews" />
            </Tabs>
            
            <Box sx={{ mt: 3 }}>
              {activeTab === 0 && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Select Date and Time
                  </Typography>
                  
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Appointment Date"
                      value={selectedDate}
                      onChange={handleDateChange}
                      minDate={dayjs()}
                      maxDate={dayjs().add(30, 'day')}
                      renderInput={(params) => <TextField {...params} fullWidth sx={{ mb: 3 }} />}
                    />
                  </LocalizationProvider>
                  
                  <Typography variant="subtitle1" gutterBottom>
                    Available Time Slots
                  </Typography>
                  
                  {availableSlots.length > 0 ? (
                    <Grid container spacing={1}>
                      {availableSlots.map((slot) => (
                        <Grid item key={slot}>
                          <Chip
                            label={slot}
                            color={selectedSlot === slot ? 'primary' : 'default'}
                            onClick={() => setSelectedSlot(slot)}
                            sx={{ fontSize: '1rem', padding: '10px 15px' }}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  ) : (
                    <Typography variant="body1" color="text.secondary">
                      No available slots for this date. Please select another date.
                    </Typography>
                  )}
                  
                  {selectedSlot && (
                    <Box sx={{ mt: 3 }}>
                      <Button
                        variant="contained"
                        size="large"
                        fullWidth
                        onClick={handleBookAppointment}
                      >
                        Book Appointment for {selectedDate.format('MMMM D, YYYY')} at {selectedSlot}
                      </Button>
                    </Box>
                  )}
                </Box>
              )}
              
              {activeTab === 1 && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    About Dr. {doctor.name}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {doctor.bio || 'No biography available.'}
                  </Typography>
                  
                  <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                    Education
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {doctor.education || 'No education information available.'}
                  </Typography>
                  
                  <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                    Specializations
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {doctor.specializations?.map((spec) => (
                      <Chip key={spec} label={spec} />
                    )) || <Typography>No specializations listed.</Typography>}
                  </Box>
                </Box>
              )}
              
              {activeTab === 2 && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Patient Reviews
                  </Typography>
                  
                  {reviews.length > 0 ? (
                    reviews.map((review) => (
                      <Box key={review.id} sx={{ mb: 3, p: 2, border: '1px solid #eee', borderRadius: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Avatar src={review.patientImage} sx={{ mr: 1 }} />
                          <Typography variant="subtitle1">{review.patientName}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} color={i < review.rating ? 'warning' : 'disabled'} />
                          ))}
                          <Typography variant="body2" sx={{ ml: 1 }}>
                            {new Date(review.date).toLocaleDateString()}
                          </Typography>
                        </Box>
                        <Typography variant="body1">{review.comment}</Typography>
                      </Box>
                    ))
                  ) : (
                    <Typography variant="body1" color="text.secondary">
                      No reviews yet.
                    </Typography>
                  )}
                </Box>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DoctorDetailPage;