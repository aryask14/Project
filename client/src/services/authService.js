const authService = {
  isAuthenticated: () => {
    return localStorage.getItem('authToken') !== null;
  },

  getCurrentUser: () => {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  },

  login: async (email, password) => {
    const mockUsers = [
      { id: 1, name: 'Admin', email: 'admin@example.com', password: 'admin123', role: 'admin' },
      { id: 2, name: 'User', email: 'user@example.com', password: 'user123', role: 'user' }
    ];

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = mockUsers.find(u => u.email === email && u.password === password);
        
        if (user) {
          const { password: _, ...userData } = user;
          localStorage.setItem('authToken', 'mock-token-' + user.id);
          localStorage.setItem('user', JSON.stringify(userData));
          window.location.href = '/'; // Redirect to home after login
          resolve(userData);
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 500);
    });
  },

  register: async (name, email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const newUser = {
            id: Math.floor(Math.random() * 10000),
            name,
            email,
            role: 'user'
          };
          
          localStorage.setItem('authToken', 'mock-token-' + newUser.id);
          localStorage.setItem('user', JSON.stringify(newUser));
          window.location.href = '/'; // Redirect to home after registration
          resolve(newUser);
        } catch (error) {
          reject(new Error('Registration failed'));
        }
      }, 500);
    });
  },

  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    window.location.href = '/login';
  }
};

export default authService;