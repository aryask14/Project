import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, TextField, Typography, Paper, Grid } from '@mui/material';
import { MedicalServices } from '@mui/icons-material';
import authService from '../../services/authService';

const LoginPage = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await authService.login(values.email, values.password);
        navigate('/dashboard');
      } catch (error) {
        setErrors({ submit: error.message });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Paper elevation={3} sx={{ 
      p: 4, 
      maxWidth: 500, 
      width: '100%',
      borderRadius: '12px',
      border: '1px solid #e2e8f0',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)'
    }}>
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <MedicalServices sx={{ 
          fontSize: '3rem', 
          color: 'primary.main',
          mb: 1
        }} />
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Welcome to <span style={{ color: '#2a7fba' }}>MediBook</span> Pro
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Sign in to your account
        </Typography>
      </Box>

      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                },
              }}
            />
          </Grid>
          {formik.errors.submit && (
            <Grid item xs={12}>
              <Typography color="error">{formik.errors.submit}</Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <Button
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
              disabled={formik.isSubmitting}
              sx={{
                py: 1.5,
                borderRadius: '8px',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: 'primary.dark'
                }
              }}
            >
              Login
            </Button>
          </Grid>
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <Typography variant="body2">
              Don't have an account?{' '}
              <Link to="/register" style={{ color: '#2a7fba', fontWeight: 500 }}>
                Register here
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default LoginPage;