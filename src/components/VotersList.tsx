import React, { useEffect, useState } from 'react';

const VotersList: React.FC = () => {
  const [voters, setVoters] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost/wybory_react/api.php/voters')
      .then(response => response.json())
      .then(data => {
        console.log('Voters data:', data);
        setVoters(data);
      })
      .catch(error => console.error('Error fetching voters:', error));
  }, []);

  return (
    <div className='okno'>
      <h1>Lista głosujących</h1>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Głosował</th>
          </tr>
        </thead>
        <tbody>
          {voters.map(voter => (
            <tr key={voter.username}>
              <td>{voter.username}</td>
              <td>{voter.glosowal ? 'V' : 'X'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VotersList;
