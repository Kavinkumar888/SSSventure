// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const AuthContext = createContext(null);

// Custom hook with better error handling
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  if (context === null) {
    throw new Error('AuthProvider not found in component tree');
  }
  
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Predefined admin credentials
  const adminCredentials = {
    email: 'fathima@sssventures.in',
    password: '6#x4JGcn1uL'
  };

  useEffect(() => {
    // Check if user is logged in on app start
    const savedUser = localStorage.getItem('adminUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('adminUser');
      }
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      if (email === adminCredentials.email && password === adminCredentials.password) {
        const userData = {
          email: email,
          name: 'SSS Ventures Admin',
          role: 'admin'
        };
        setUser(userData);
        localStorage.setItem('adminUser', JSON.stringify(userData));
        resolve(userData);
      } else {
        reject(new Error('Invalid email or password'));
      }
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('adminUser');
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};