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
    <div className='vote_styl'>    
      <VotersList />
      <CandidatesList />
      <UserVoting />
      <button className='blogout' onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Vote;