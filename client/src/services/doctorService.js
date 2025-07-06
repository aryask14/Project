// Mock data for doctors
const mockDoctors = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    hospital: 'City Heart Center',
    experience: 12,
    rating: 4.8,
    reviewCount: 124,
    image: '/doctor1.jpg',
    address: '123 Heart Lane, Medical City',
    bio: 'Dr. Johnson is a board-certified cardiologist with over 12 years of experience in treating heart conditions. She specializes in interventional cardiology and has performed over 1,000 successful procedures.',
    education: 'MD from Harvard Medical School, Fellowship in Cardiology at Mayo Clinic',
    specializations: ['Interventional Cardiology', 'Heart Failure', 'Preventive Cardiology'],
    availability: {
      'Monday': ['09:00', '10:00', '11:00', '14:00', '15:00'],
      'Wednesday': ['09:00', '10:00', '14:00', '15:00', '16:00'],
      'Friday': ['10:00', '11:00', '13:00', '14:00'],
    },
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialty: 'Neurology',
    hospital: 'Neurocare Institute',
    experience: 8,
    rating: 4.7,
    reviewCount: 89,
    image: '/doctor2.jpg',
    address: '456 Brain Avenue, Neuro City',
    bio: 'Dr. Chen is a neurologist specializing in movement disorders and neurodegenerative diseases. He has published numerous papers on Parkinson\'s disease treatment.',
    education: 'MD from Stanford University, Fellowship in Neurology at Johns Hopkins',
    specializations: ['Movement Disorders', 'Parkinson\'s Disease', 'Alzheimer\'s'],
    availability: {
      'Tuesday': ['08:00', '09:00', '10:00', '13:00', '14:00'],
      'Thursday': ['09:00', '10:00', '11:00', '14:00', '15:00'],
      'Saturday': ['10:00', '11:00', '12:00'],
    },
  },
  {
    id: 3,
    name: 'Dr. Emily Rodriguez',
    specialty: 'Pediatrics',
    hospital: 'Children\'s Wellness Center',
    experience: 10,
    rating: 4.9,
    reviewCount: 156,
    image: '/doctor3.jpg',
    address: '789 Kid Street, Family Town',
    bio: 'Dr. Rodriguez has dedicated her career to pediatric care with a focus on preventive medicine and childhood development.',
    education: 'MD from University of California, Pediatric Residency at Boston Children\'s Hospital',
    specializations: ['Preventive Pediatrics', 'Childhood Development', 'Vaccinations'],
    availability: {
      'Monday': ['08:00', '09:00', '10:00'],
      'Wednesday': ['08:00', '09:00', '13:00', '14:00'],
      'Friday': ['09:00', '10:00', '11:00', '14:00'],
    },
  },
  {
    id: 4,
    name: 'Dr. James Wilson',
    specialty: 'Orthopedics',
    hospital: 'Bone & Joint Center',
    experience: 15,
    rating: 4.6,
    reviewCount: 210,
    image: '/doctor4.jpg',
    address: '321 Skeleton Road, Ortho City',
    bio: 'Dr. Wilson is an orthopedic surgeon specializing in sports medicine and joint replacements. He has worked with professional athletes and Olympic teams.',
    education: 'MD from Duke University, Fellowship in Orthopedic Surgery at Hospital for Special Surgery',
    specializations: ['Sports Medicine', 'Joint Replacement', 'Arthroscopic Surgery'],
    availability: {
      'Tuesday': ['07:00', '08:00', '09:00', '13:00', '14:00'],
      'Thursday': ['08:00', '09:00', '10:00', '14:00', '15:00'],
      'Saturday': ['08:00', '09:00', '10:00'],
    },
  },
  {
    id: 5,
    name: 'Dr. Lisa Park',
    specialty: 'Dermatology',
    hospital: 'Skin Health Clinic',
    experience: 7,
    rating: 4.5,
    reviewCount: 92,
    image: '/doctor5.jpg',
    address: '654 Complexion Blvd, Dermatology District',
    bio: 'Dr. Park specializes in medical and cosmetic dermatology with expertise in skin cancer detection and treatment.',
    education: 'MD from Yale University, Dermatology Residency at NYU Langone',
    specializations: ['Skin Cancer', 'Cosmetic Dermatology', 'Acne Treatment'],
    availability: {
      'Monday': ['10:00', '11:00', '14:00', '15:00'],
      'Wednesday': ['09:00', '10:00', '11:00', '14:00'],
      'Friday': ['08:00', '09:00', '13:00', '14:00'],
    },
  },
  {
    id: 6,
    name: 'Dr. Robert Thompson',
    specialty: 'Ophthalmology',
    hospital: 'Vision Care Center',
    experience: 20,
    rating: 4.8,
    reviewCount: 185,
    image: '/doctor6.jpg',
    address: '987 Sight Avenue, Optics City',
    bio: 'With two decades of experience, Dr. Thompson is a leader in cataract surgery and laser vision correction.',
    education: 'MD from Johns Hopkins University, Fellowship in Corneal Surgery at Wills Eye Hospital',
    specializations: ['Cataract Surgery', 'Laser Vision Correction', 'Glaucoma'],
    availability: {
      'Tuesday': ['08:00', '09:00', '10:00', '14:00'],
      'Thursday': ['09:00', '10:00', '11:00', '15:00'],
      'Saturday': ['09:00', '10:00', '11:00'],
    },
  },
  {
    id: 7,
    name: 'Dr. Angela Martinez',
    specialty: 'Gynecology',
    hospital: 'Women\'s Health Center',
    experience: 11,
    rating: 4.7,
    reviewCount: 132,
    image: '/doctor7.jpg',
    address: '753 Femme Street, Wellness District',
    bio: 'Dr. Martinez provides comprehensive gynecologic care with a focus on minimally invasive procedures and women\'s health education.',
    education: 'MD from University of Pennsylvania, Residency in OB/GYN at Massachusetts General',
    specializations: ['Minimally Invasive Surgery', 'Reproductive Health', 'Menopause Management'],
    availability: {
      'Monday': ['08:00', '09:00', '13:00', '14:00'],
      'Wednesday': ['09:00', '10:00', '14:00', '15:00'],
      'Friday': ['08:00', '09:00', '10:00', '14:00'],
    },
  },
  {
    id: 8,
    name: 'Dr. David Kim',
    specialty: 'Dentistry',
    hospital: 'Bright Smile Dental',
    experience: 9,
    rating: 4.6,
    reviewCount: 98,
    image: '/doctor8.jpg',
    address: '159 Tooth Lane, Oral City',
    bio: 'Dr. Kim is a cosmetic dentist specializing in restorative procedures and smile makeovers using the latest dental technologies.',
    education: 'DDS from University of Southern California, Advanced Education in General Dentistry',
    specializations: ['Cosmetic Dentistry', 'Dental Implants', 'Invisalign'],
    availability: {
      'Tuesday': ['07:00', '08:00', '09:00', '13:00', '14:00'],
      'Thursday': ['08:00', '09:00', '10:00', '14:00', '15:00'],
      'Saturday': ['08:00', '09:00', '10:00'],
    },
  },
  {
    id: 9,
    name: 'Dr. Patricia Williams',
    specialty: 'Psychiatry',
    hospital: 'Mind Wellness Institute',
    experience: 14,
    rating: 4.7,
    reviewCount: 115,
    image: '/doctor9.jpg',
    address: '486 Mind Street, Mental Health District',
    bio: 'Dr. Williams is a psychiatrist with expertise in cognitive behavioral therapy and medication management for mood disorders.',
    education: 'MD from Columbia University, Psychiatry Residency at McLean Hospital',
    specializations: ['Cognitive Behavioral Therapy', 'Anxiety Disorders', 'Depression'],
    availability: {
      'Monday': ['09:00', '10:00', '11:00', '14:00'],
      'Wednesday': ['09:00', '10:00', '14:00', '15:00'],
      'Friday': ['10:00', '11:00', '13:00', '14:00'],
    },
  },
  {
    id: 10,
    name: 'Dr. Thomas Brown',
    specialty: 'General',
    hospital: 'Primary Care Associates',
    experience: 18,
    rating: 4.8,
    reviewCount: 245,
    image: '/doctor10.jpg',
    address: '264 Health Avenue, Wellness City',
    bio: 'As a primary care physician, Dr. Brown provides comprehensive care for the whole family with a focus on preventive medicine.',
    education: 'MD from University of Michigan, Residency in Family Medicine at University of Washington',
    specializations: ['Family Medicine', 'Preventive Care', 'Chronic Disease Management'],
    availability: {
      'Tuesday': ['07:00', '08:00', '09:00', '13:00', '14:00'],
      'Thursday': ['08:00', '09:00', '10:00', '14:00', '15:00'],
      'Saturday': ['08:00', '09:00', '10:00'],
    },
  },
];

// Mock reviews data
const mockReviews = {
  1: [
    {
      id: 1,
      patientName: 'John Smith',
      patientImage: '/patient1.jpg',
      rating: 5,
      date: '2023-05-15',
      comment: 'Dr. Johnson was very thorough and explained everything clearly. My heart condition has improved significantly under her care.',
    },
    {
      id: 2,
      patientName: 'Mary Johnson',
      patientImage: '/patient2.jpg',
      rating: 4,
      date: '2023-04-22',
      comment: 'Excellent cardiologist. The wait time was a bit long but worth it for the quality of care.',
    },
  ],
  2: [
    {
      id: 1,
      patientName: 'Robert Davis',
      patientImage: '/patient3.jpg',
      rating: 5,
      date: '2023-06-10',
      comment: 'Dr. Chen is very knowledgeable about Parkinson\'s disease. He adjusted my medication and I feel much better now.',
    },
  ],
  // Add reviews for other doctors as needed
};

const doctorService = {
  getAllDoctors: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...mockDoctors]); // Return a copy to prevent direct modification
      }, 300); // Simulate network delay
    });
  },

  getDoctorById: async (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const doctor = mockDoctors.find(d => d.id === parseInt(id));
        if (doctor) {
          resolve({ ...doctor }); // Return a copy
        } else {
          reject(new Error(`Doctor with ID ${id} not found`));
        }
      }, 300);
    });
  },

  getAvailableSlots: async (doctorId, date) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const doctor = mockDoctors.find(d => d.id === parseInt(doctorId));
        if (!doctor) {
          resolve([]);
          return;
        }

        const dayOfWeek = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
        let slots = doctor.availability[dayOfWeek] || [];
        
        // Filter out past slots if date is today
        if (new Date(date).toDateString() === new Date().toDateString()) {
          const now = new Date();
          const currentHour = now.getHours();
          const currentMinute = now.getMinutes();
          
          slots = slots.filter(slot => {
            const [hour, minute] = slot.split(':').map(Number);
            return hour > currentHour || (hour === currentHour && minute > currentMinute);
          });
        }
        
        resolve([...slots]); // Return a copy
      }, 300);
    });
  },

  getDoctorReviews: async (doctorId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...(mockReviews[doctorId] || [])]); // Return a copy
      }, 300);
    });
  },

  searchDoctors: async (query) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const results = mockDoctors.filter(doctor =>
          doctor.name.toLowerCase().includes(query.toLowerCase()) ||
          doctor.specialty.toLowerCase().includes(query.toLowerCase()) ||
          doctor.specializations.some(s => 
            s.toLowerCase().includes(query.toLowerCase())
          )
        );
        resolve([...results]);
      }, 300);
    });
  }
};

export default doctorService;