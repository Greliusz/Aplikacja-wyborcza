import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { authStore } from './store/authStore';
import Vote from './components/Vote';
import Login from './components/Login';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

const App: React.FC = observer(() => {
  useEffect(() => {
    authStore.checkAuth();
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/login-form" element={<LoginForm />} />
      <Route path="/register-form" element={<RegisterForm />} />
      <Route path="/vote" element={<PrivateRoute isAuthenticated={authStore.isAuthenticated}><Vote /></PrivateRoute>} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
});

const PrivateRoute: React.FC<{ 
  isAuthenticated: boolean; 
  children: React.ReactNode 
}> = ({ isAuthenticated, children }) => {
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export default App;
