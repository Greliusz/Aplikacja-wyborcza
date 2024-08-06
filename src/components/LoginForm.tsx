import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../apiService';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await login({ username, password });
      if (response.success) {
        localStorage.setItem('user', JSON.stringify(response.user));
        navigate('/vote'); // Przekierowanie po zalogowaniu
      } else {
        alert('Invalid username or password');
      }
    } catch (error) {
      console.error('Login error', error);
      alert('An error occurred during login. Please try again.');
    }
  };
  
  return (
    <div className='wrapper'>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className='input-box'>
          <input
            placeholder='Username'
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='input-box'>
          <input
            placeholder='Password'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;