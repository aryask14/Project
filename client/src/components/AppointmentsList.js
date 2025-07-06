// src/components/AppointmentsList.js
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import appointmentService from '../services/appointmentService';

const AppointmentsList = ({ userId }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [message, setMessage] = useState(location.state?.message || '');

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const data = await appointmentService.getUserAppointments(userId);
        setAppointments(data);
      } catch (error) {
        console.error('Failed to load appointments:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAppointments();
  }, [userId]);

  if (loading) return <div>Loading appointments...</div>;

  return (
    <div className="appointments-list">
      {message && <div className="success-message">{message}</div>}
      <h2>My Appointments</h2>
      
      {appointments.length === 0 ? (
        <p>No appointments booked yet</p>
      ) : (
        <ul>
          {appointments.map(appt => (
            <li key={appt.id} className="appointment-card">
              <h3>{appt.doctorName} ({appt.specialty})</h3>
              <p>Date: {new Date(appt.date).toLocaleDateString()}</p>
              <p>Time: {appt.time}</p>
              <p>Reason: {appt.reason}</p>
              <p>Status: <span className={`status-${appt.status}`}>{appt.status}</span></p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AppointmentsList;