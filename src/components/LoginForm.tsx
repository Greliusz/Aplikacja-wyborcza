import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { GiPadlock } from "react-icons/gi";
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
        navigate('/vote'); 
      } else {
        alert('Invalid username or password');
      }
    } catch (error) {
      console.error('Login error', error);
      alert('An error occurred during login. Please try again.');
    }
  };
  
  return (
    <div className="w-1/2 bg-transparent border-2 border-white/20 backdrop-blur-xl shadow-md text-white rounded-lg p-8">
      <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="relative mb-4">
          <input
            placeholder='Username'
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full h-12 bg-transparent border-2 border-white/20 rounded-full text-lg text-white px-4 py-2 mb-4"
          />
          <span className="absolute right-4 top-6 transform -translate-y-1/2 text-lg"><FaUser /></span>
        </div>
        <div className="relative mb-4 ">
          <input
            placeholder='Password'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-12 bg-transparent border-2 border-white/20 rounded-full text-lg text-white px-4 py-2 mb-4"
          />
          <span className="absolute right-4 top-6 transform -translate-y-1/2 text-lg"><GiPadlock /></span>
        </div>
        <button 
          type="submit"
          className="w-full h-12 bg-white text-gray-800 font-semibold py-2 px-4 border-none rounded-full shadow mt-4 cursor-pointer"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { login } from '../apiService';

// const LoginForm: React.FC = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();

//     try {
//       const response = await login({ username, password });
//       if (response.success) {
//         localStorage.setItem('user', JSON.stringify(response.user));
//         navigate('/vote'); 
//       } else {
//         alert('Invalid username or password');
//       }
//     } catch (error) {
//       console.error('Login error', error);
//       alert('An error occurred during login. Please try again.');
//     }
//   };
  
//   return (
//     <div className='wrapper'>
//       <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
//       <form onSubmit={handleSubmit}>
//         <div className='input-box'>
//           <input
//             placeholder='Username'
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//         </div>
//         <div className='input-box'>
//           <input
//             placeholder='Password'
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default LoginForm;