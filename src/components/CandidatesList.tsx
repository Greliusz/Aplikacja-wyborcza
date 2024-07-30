import React, { useEffect, useState } from 'react';

const CandidatesList: React.FC = () => {
  const [candidates, setCandidates] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost/wybory_react/api.php/candidates')
      .then(response => response.json())
      .then(data => setCandidates(data))
      .catch(error => console.error('Error fetching candidates:', error));
  }, []);

  return (
    <div className='okno2'>
      <h1>Lista kandydatów</h1>
      <table>
        <thead>
          <tr>
            <th>Imię</th>
            <th>Ilość głosów</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map(candidate => (
            <tr key={candidate.id}>
              <td>{candidate.imie}</td>
              <td>{candidate.glosy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CandidatesList;
