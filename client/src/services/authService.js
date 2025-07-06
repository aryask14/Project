const authService = {
  isAuthenticated: () => {
    return localStorage.getItem('authToken') !== null;
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  login: async (email, password) => {
    // This will be replaced with actual API call in the backend phase
    // For now, we'll mock the response
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'admin@example.com' && password === 'admin123') {
          const user = {
            id: 1,
            name: 'Admin User',
            email: 'admin@example.com',
            role: 'admin',
          };
          localStorage.setItem('authToken', 'mock-token');
          localStorage.setItem('user', JSON.stringify(user));
          resolve(user);
        } else if (email === 'user@example.com' && password === 'user123') {
          const user = {
            id: 2,
            name: 'Regular User',
            email: 'user@example.com',
            role: 'user',
          };
          localStorage.setItem('authToken', 'mock-token');
          localStorage.setItem('user', JSON.stringify(user));
          resolve(user);
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 500);
    });
  },

  register: async (name, email, password) => {
    // This will be replaced with actual API call in the backend phase
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password && name) {
          const user = {
            id: Math.floor(Math.random() * 1000),
            name,
            email,
            role: 'user',
          };
          localStorage.setItem('authToken', 'mock-token');
          localStorage.setItem('user', JSON.stringify(user));
          resolve(user);
        } else {
          reject(new Error('Registration failed'));
        }
      }, 500);
    });
  },

  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    window.location.href = '/login';
  },
};

export default authService;