import React from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login: React.FC = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login-form'); 
    };

    const handleRegister = () => {
        navigate('/register-form'); 
    };

    return (
        <div className='wrapper'>
            <h1>Aplikacja Wyborcza</h1>
            <button onClick={handleLogin}>Zaloguj się</button>
            <button onClick={handleRegister}>Rejestracja</button>
        </div>
    );
};

export default Login;
