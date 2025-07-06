import doctorService from './doctorService';
import authService from './authService';

// Initialize from localStorage if available
const loadAppointments = () => {
  const saved = localStorage.getItem('appointments');
  return saved ? JSON.parse(saved) : [
    {
      id: 1,
      doctorId: 1,
      doctorName: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      userId: 2,
      userName: 'Regular User',
      date: '2023-07-15',
      time: '10:00',
      status: 'confirmed',
      reason: 'Annual heart checkup',
    },
    {
      id: 2,
      doctorId: 3,
      doctorName: 'Dr. Emily Rodriguez',
      specialty: 'Pediatrics',
      userId: 2,
      userName: 'Regular User',
      date: '2023-07-20',
      time: '09:00',
      status: 'confirmed',
      reason: 'Child vaccination',
    }
  ];
};

let mockAppointments = loadAppointments();

const saveAppointments = () => {
  localStorage.setItem('appointments', JSON.stringify(mockAppointments));
};

const appointmentService = {
  bookAppointment: async (appointmentData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const doctor = doctorService.getDoctorById(appointmentData.doctorId);
        const user = authService.getCurrentUser();
        
        const newAppointment = {
          id: Date.now(), // Use timestamp for unique ID
          doctorId: appointmentData.doctorId,
          doctorName: doctor.name,
          specialty: doctor.specialty,
          userId: user.id,
          userName: user.name,
          date: appointmentData.date,
          time: appointmentData.time,
          status: 'confirmed',
          reason: appointmentData.reason || '',
        };
        
        mockAppointments.push(newAppointment);
        saveAppointments();
        resolve(newAppointment);
      }, 500);
    });
  },

  getUserAppointments: async (userId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        mockAppointments = loadAppointments(); // Reload from storage
        resolve(mockAppointments.filter(appt => appt.userId === userId));
      }, 300);
    });
  },

  cancelAppointment: async (appointmentId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        mockAppointments = mockAppointments.map(appt => 
          appt.id === appointmentId ? { ...appt, status: 'cancelled' } : appt
        );
        saveAppointments();
        resolve();
      }, 300);
    });
  },

  getAllAppointments: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        mockAppointments = loadAppointments();
        resolve(mockAppointments);
      }, 300);
    });
  },
};

export default appointmentService;