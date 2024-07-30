import React, { useEffect, useState } from 'react';

const UserVoting: React.FC = () => {
  const [candidates, setCandidates] = useState<any[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.username) {
      setUsername(user.username);
    }

    fetch('http://localhost/wybory_react/api.php/candidates')
      .then(response => response.json())
      .then(data => {
        setCandidates(data);
      })
      .catch(error => console.error('Error fetching candidates:', error));

    fetch(`http://localhost/wybory_react/api.php/voters?username=${user.username}`)
      .then(response => response.json())
      .then(data => {
        const voter = data.find((voter: any) => voter.username === user.username);
        if (voter && voter.glosowal) {
          setHasVoted(true);
        }
      })
      .catch(error => console.error('Error fetching voter status:', error));
  }, []);

  const handleVote = () => {
    if (selectedCandidate !== null) {
      const user = JSON.parse(localStorage.getItem('user') || '{}');

      fetch('http://localhost/wybory_react/api.php/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ candidateId: selectedCandidate, username: user.username }),
      })
        .then(response => response.json())
        .then(data => {
          setHasVoted(true);
          console.log('Vote success:', data);
        })
        .catch(error => console.error('Error voting:', error));
    } else {
      alert('Proszę wybrać kandydata');
    }
  };

  return (
    <div className='okno3'>
      <h1>Głosowanie</h1>
      {username && <p>{username} głosuje</p>}
      {hasVoted ? (
        <p>Twój głos został oddany</p>
      ) : (
        <>
          <select
            value={selectedCandidate ?? ''}
            onChange={(e) => setSelectedCandidate(Number(e.target.value))}
          >
            <option value="" disabled>
              Wybierz kandydata
            </option>
            {candidates.map(candidate => (
              <option key={candidate.id} value={candidate.id}>
                {candidate.imie}
              </option>
            ))}
          </select>
          <button onClick={handleVote}>Głosuj</button>
        </>
      )}
    </div>
  );
};

export default UserVoting;
