import React from 'react';
import UserVoting from './UserVoting';
import VotersList from './VotersList';
import CandidatesList from './CandidatesList';
import { useNavigate } from 'react-router-dom';

const Vote: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className='flex content-start justify-center flex-wrap gap-2.5 my-5'>    
      <VotersList />
      <CandidatesList />
      <UserVoting />
      <button className="w-2/5 h-11 bg-white border-none outline-none rounded-full shadow cursor-pointer text-base text-gray-800 font-bold my-5" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Vote;