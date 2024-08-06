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
            <h1>Voting App</h1>
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleRegister}>Sign Up</button>
            <button onClick={handleRegister}>Admin</button>
        </div>
    );
};

export default Login;
