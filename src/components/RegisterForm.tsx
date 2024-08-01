import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Hasła nie są zgodne!');
      return;
    }

    try {
      const response = await axios.post('http://localhost/wybory_react/api.php/register', {
        username,
        password
      });

      if (response.data.success) {
        navigate('/login-form'); // Przekierowanie po rejestracji
      } else {
        alert('Rejestracja nie powiodła się');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Rejestracja nie powiodła się');
    }
  };

  return (
    <div className='wrapper'>
      <h1>Rejestracja</h1>
      <form onSubmit={handleSubmit}>
        <div className='input-box'>
          <input
            placeholder='Nazwa użytkownika'
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='input-box'>
          <input
            placeholder='Nowe hasło'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='input-box'>
          <input
            placeholder='Powtórz nowe hasło'
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit">Zarejestruj się</button>
      </form>
    </div>
  );
};

export default RegisterForm;
