// Mock data for appointments
let mockAppointments = [
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
  },
];

const appointmentService = {
  bookAppointment: async (appointmentData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const doctor = doctorService.getDoctorById(appointmentData.doctorId);
        const user = authService.getCurrentUser();
        
        const newAppointment = {
          id: mockAppointments.length + 1,
          doctorId: appointmentData.doctorId,
          doctorName: doctor.name,
          specialty: doctor.specialty,
          userId: user.id,
          userName: user.name,
          date: appointmentData.date,
          time: appointmentData.time,
          status: 'confirmed',
          reason: '',
        };
        
        mockAppointments.push(newAppointment);
        resolve(newAppointment);
      }, 500);
    });
  },

  getUserAppointments: async (userId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
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
        resolve();
      }, 300);
    });
  },

  getAllAppointments: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockAppointments);
      }, 300);
    });
  },
};

export default appointmentService;