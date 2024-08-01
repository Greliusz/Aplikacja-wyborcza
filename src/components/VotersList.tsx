import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VotersList: React.FC = () => {
  const [voters, setVoters] = useState<any[]>([]);

  useEffect(() => {
    axios.get('http://localhost/wybory_react/api.php/voters')
      .then(response => {
        console.log('Voters data:', response.data);
        setVoters(response.data);
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
              <td>{voter.glosowal == 1 ? 'V' : 'X'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VotersList;
