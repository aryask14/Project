// src/components/BookingConfirmation.js
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Clock, Calendar, User, Clipboard } from 'react-feather';
import './BookingConfirmation.css'; // Styling file

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (location.state?.appointment) {
      setAppointment(location.state.appointment);
      setLoading(false);
    } else {
      navigate('/appointments');
    }
  }, [location, navigate]);

  if (loading) return <div className="loading-spinner">Loading confirmation...</div>;

  return (
    <div className="confirmation-container">
      <div className="confirmation-header">
        <CheckCircle className="success-icon" size={48} />
        <h1>Appointment Confirmed!</h1>
        <p className="confirmation-number">
          Confirmation #: {appointment.confirmationNumber}
        </p>
      </div>

      <div className="confirmation-details">
        <div className="detail-card">
          <User className="detail-icon" />
          <div>
            <h3>Doctor</h3>
            <p>{appointment.doctorName}</p>
            <p className="specialty">{appointment.specialty}</p>
          </div>
        </div>

        <div className="detail-card">
          <Calendar className="detail-icon" />
          <div>
            <h3>Date</h3>
            <p>{new Date(appointment.date).toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</p>
          </div>
        </div>

        <div className="detail-card">
          <Clock className="detail-icon" />
          <div>
            <h3>Time</h3>
            <p>{appointment.time}</p>
          </div>
        </div>

        {appointment.reason && (
          <div className="detail-card">
            <Clipboard className="detail-icon" />
            <div>
              <h3>Reason</h3>
              <p>{appointment.reason}</p>
            </div>
          </div>
        )}
      </div>

      <div className="confirmation-actions">
        <button 
          className="primary-button"
          onClick={() => window.print()}
        >
          Print Confirmation
        </button>
        <button 
          className="secondary-button"
          onClick={() => navigate('/appointments')}
        >
          View All Appointments
        </button>
      </div>

      <div className="confirmation-footer">
        <p>A confirmation has been sent to your email.</p>
        <p>Please arrive 15 minutes before your scheduled time.</p>
      </div>
    </div>
  );
};

export default BookingConfirmation;