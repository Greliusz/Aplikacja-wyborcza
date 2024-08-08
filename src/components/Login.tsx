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
        <div className="w-1/2 bg-transparent border-2 border-white/20 backdrop-blur-xl shadow-md text-white rounded-lg p-8">
            <h1 className="text-2xl font-bold text-center mb-4">Voting App</h1>
            <button 
                onClick={handleLogin}
                className="w-full h-12 bg-white text-gray-800 font-semibold py-2 px-4 border-none rounded-full shadow mt-4 cursor-pointer"
            >
                Login
            </button>
            <button 
                onClick={handleRegister}
                className="w-full h-12 bg-white text-gray-800 font-semibold py-2 px-4 border-none rounded-full shadow mt-4 cursor-pointer"
            >
                Sign Up
            </button>
            <button 
                onClick={handleRegister}
                className="w-full h-12 bg-white text-gray-800 font-semibold py-2 px-4 border-none rounded-full shadow mt-4 cursor-pointer"
            >
                Admin
            </button>
        </div>
    );
};

export default Login;
