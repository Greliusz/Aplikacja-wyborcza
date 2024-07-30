import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Vote from './components/Vote';
import Login from './components/Login';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

const App: React.FC = () => {
const [isAuthenticated, setIsAuthenticated] = useState(false);

useEffect(() => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.username) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/login-form" element={<LoginForm />} />
      <Route path="/register-form" element={<RegisterForm />} />
      <Route path="/vote" element={<PrivateRoute isAuthenticated={isAuthenticated}><Vote /></PrivateRoute>} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

const PrivateRoute: React.FC<{ 
  isAuthenticated: boolean; 
  children: React.ReactNode }> = ({ isAuthenticated, children }) => {
    return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export default App;
