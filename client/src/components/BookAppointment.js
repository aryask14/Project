// src/components/BookAppointment.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import appointmentService from '../services/appointmentService';

const BookAppointment = ({ doctor }) => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    reason: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const newAppointment = await appointmentService.bookAppointment({
        doctorId: doctor.id,
        ...formData
      });

      // Redirect to confirmation page with appointment details
      navigate('/booking-confirmation', {
        state: { appointment: newAppointment }
      });

    } catch (err) {
      setError(err.message || 'Failed to book appointment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-form-container">
      <h2>Book Appointment with {doctor.name}</h2>
      <p className="doctor-specialty">{doctor.specialty}</p>
      
      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="booking-form">
        <div className="form-group">
          <label>Appointment Date</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({...formData, date: e.target.value})}
            required
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
        
        <div className="form-group">
          <label>Appointment Time</label>
          <input
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({...formData, time: e.target.value})}
            required
            min="09:00"
            max="17:00"
          />
        </div>
        
        <div className="form-group">
          <label>Reason for Visit</label>
          <textarea
            value={formData.reason}
            onChange={(e) => setFormData({...formData, reason: e.target.value})}
            placeholder="Please describe the reason for your visit"
            rows={4}
          />
        </div>
        
        <button 
          type="submit" 
          className="submit-button"
          disabled={loading}
        >
          {loading ? 'Confirming...' : 'Confirm Appointment'}
        </button>
      </form>
    </div>
  );
};

export default BookAppointment;