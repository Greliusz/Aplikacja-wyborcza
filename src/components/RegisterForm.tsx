import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { register as registerUser } from '../apiService';
import './login.css';

interface IFormInput {
  username: string;
  password: string;
  confirmPassword: string;
}

const RegisterForm: React.FC = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<IFormInput>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFormInput> = async data => {
    if (data.password !== data.confirmPassword) {
      alert('Passwords are not the same!');
      return;
    }

    try {
      const response = await registerUser({ username: data.username, password: data.password });
      if (response.success) {
        navigate('/login-form');
      } else {
        alert('Registration failed');
      }
    } catch (error) {
      console.error('Registration failed', error);
      alert('An error occurred during registration. Try again.');
    }
  };

  return (
    <div className='wrapper'>
      <h1 className="text-2xl font-bold text-center mb-4">Registration</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='input-box'>
          <input
            placeholder='Username'
            {...register("username", { required: "Nazwa użytkownika jest wymagana" })}
          />
          {errors.username && <p>{errors.username.message}</p>}
        </div>
        <div className='input-box'>
          <input
            placeholder='New password'
            type="password"
            {...register("password", { required: "Password is required", minLength: { value: 6, message: "The password must be at least 6 characters long" } })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div className='input-box'>
          <input
            placeholder='Repeat new password'
            type="password"
            {...register("confirmPassword", { required: "Password confirmation is required", validate: value => value === watch('password') || "The passwords are not the same" })}
          />
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        </div>
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};

export default RegisterForm;




// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { register } from '../apiService';
// import './login.css';

// const RegisterForm: React.FC = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const navigate = useNavigate();
  
//     const handleSubmit = async (event: React.FormEvent) => {
//       event.preventDefault();
  
//       if (password !== confirmPassword) {
//         alert('Hasła nie są takie same!');
//         return;
//       }
  
//       try {
//         const response = await register({ username, password });
//         if (response.success) {
//           navigate('/login-form'); // Przekierowanie po rejestracji
//         } else {
//           alert('Rejestracja nie powiodła się');
//         }
//       } catch (error) {
//         console.error('Rejestracja nie powiodła się', error);
//         alert('Wystąpił błąd podczas rejestracji. Spróbuj ponownie.');
//       }
//     };

//     return (
//         <div className='wrapper'>
//         <h1>Registration</h1>
//         <form onSubmit={handleSubmit}>
//         <div className='input-box'>
//             <input
//                 placeholder='Username '
//                 type="text"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//             />
//         </div>
//         <div className='input-box'>
//             <input
//                 placeholder='New password'
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//             />
//         </div>
//         <div className='input-box'>
//             <input
//                 placeholder='Repeat new password'
//                 type="password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//             />
//         </div>
//         <button type="submit">Sign Up</button>
//         </form>
//     </div>
//     );
// };

// export default RegisterForm;
