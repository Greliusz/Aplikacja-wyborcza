import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { candidatesStore } from '../store/candidatesStore';
import { authStore } from '../store/authStore';
import { voteForCandidate } from '../apiService';

const UserVoting: React.FC = observer(() => {
  const [hasVoted, setHasVoted] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      await candidatesStore.fetchCandidatesAndVoters();
      const user = authStore.user;
      if (user) {
        const voter = candidatesStore.voters.find(voter => voter.username === user.username);
        if (voter && voter.glosowal === 1) {
          setHasVoted(true);
        } else {
          setHasVoted(false);
        }
      }
    };

    fetchData();
  }, []);

  const handleVote = async () => {
    if (selectedCandidate !== null && authStore.user) {
      try {
        const response = await voteForCandidate(selectedCandidate.toString(), authStore.user.username);
        console.log('Vote success:', response);
        candidatesStore.updateVotes(selectedCandidate);
        setHasVoted(true);
        await candidatesStore.fetchCandidatesAndVoters(); // Odświeżanie listy kandydatów i głosujących
      } catch (error) {
        console.error('Error voting:', error);
      }
    }
  };

 return (
    <div className="w-3/4 bg-transparent border-2 border-white/20 backdrop-blur-xl shadow-md text-white rounded-lg p-8">
      <h1 className="text-2xl font-bold text-left mb-4">Vote</h1>
      {hasVoted ? (
        <p>The vote has been cast. Thank you for voting!</p>
      ) : (
        authStore.isAuthenticated ? (
          <>
            <select
              className="w-full bg-gray-700 border border-gray-300 rounded px-4 py-2 mb-4"
              value={selectedCandidate ?? ''}
              onChange={(e) => setSelectedCandidate(Number(e.target.value))}
            >
              <option value="" disabled>
                Select a candidate
              </option>
              {candidatesStore.candidates.map(candidate => (
                <option key={candidate.id} value={candidate.id}>
                  {candidate.imie}
                </option>
              ))}
            </select>
            <div className="flex justify-center">
              <button 
                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mt-2" 
                onClick={handleVote}
              >
                Vote
              </button>
            </div>
          </>
        ) : (
          <p>You must log in to vote.</p>
        )
      )}
    </div>
  );
});

export default UserVoting;
