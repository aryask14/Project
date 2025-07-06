import React, { useState, useEffect } from 'react';
import { Box, Grid, Card, CardContent, CardMedia, Typography, Button, Chip, TextField } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import doctorService from '../../services/doctorService';
import { Star } from '@mui/icons-material';  // Correct import for Star icon

const specialties = [
  'Cardiology',
  'Dermatology',
  'Neurology',
  'Pediatrics',
  'Orthopedics',
  'Ophthalmology',
  'Gynecology',
  'Dentistry',
  'Psychiatry',
  'General',
];

const DoctorListPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await doctorService.getAllDoctors();
        setDoctors(data);
        setFilteredDoctors(data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  useEffect(() => {
    let results = doctors;
    
    if (searchTerm) {
      results = results.filter(doctor =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedSpecialty) {
      results = results.filter(doctor => doctor.specialty === selectedSpecialty);
    }
    
    setFilteredDoctors(results);
  }, [searchTerm, selectedSpecialty, doctors]);

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Find a Doctor
      </Typography>
      
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search doctors by name or specialty..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1 }} />,
          }}
          sx={{ mb: 2 }}
        />
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          <Chip
            label="All Specialties"
            color={!selectedSpecialty ? 'primary' : 'default'}
            onClick={() => setSelectedSpecialty('')}
          />
          {specialties.map((specialty) => (
            <Chip
              key={specialty}
              label={specialty}
              color={selectedSpecialty === specialty ? 'primary' : 'default'}
              onClick={() => setSelectedSpecialty(specialty)}
            />
          ))}
        </Box>
      </Box>
      
      <Grid container spacing={3}>
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <Grid item xs={12} sm={6} md={4} key={doctor.id}>
              <DoctorCard doctor={doctor} />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="body1" align="center">
              No doctors found matching your criteria.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

const DoctorCard = ({ doctor }) => {
  return (
    <Card className="doctor-card" sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      borderRadius: '12px',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
      }
    }}>
      <CardMedia
        component="img"
        height="200"
        image={doctor.image || '/default-doctor.jpg'}
        alt={doctor.name}
        sx={{
          objectFit: 'cover',
          width: '100%',
          borderBottom: '1px solid #e2e8f0'
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 600 }}>
          {doctor.name}
        </Typography>
        <Chip 
          label={doctor.specialty} 
          color="primary" 
          size="small" 
          sx={{ mb: 1 }}
        />
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {doctor.hospital}
        </Typography>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          mt: 1,
          color: 'warning.main'
        }}>
          <Star fontSize="small" />
          <Typography variant="body2" sx={{ ml: 0.5 }}>
            {doctor.rating} ({doctor.reviewCount} reviews)
          </Typography>
        </Box>
      </CardContent>
      <Box sx={{ p: 2 }}>
        <Button
          variant="contained"
          fullWidth
          component="a"
          href={`/doctors/${doctor.id}`}
          sx={{
            backgroundColor: 'primary.main',
            '&:hover': {
              backgroundColor: 'primary.dark'
            }
          }}
        >
          View Profile & Book
        </Button>
      </Box>
    </Card>
  );
};

export default DoctorListPage;