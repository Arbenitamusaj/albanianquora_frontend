import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('auth-token');
    setToken(storedToken);
  }, []);

  const login = (newToken) => {
    localStorage.setItem('auth-token', newToken); 
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('auth-token');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, isAuthenticated: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
