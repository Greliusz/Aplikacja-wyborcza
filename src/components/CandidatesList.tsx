import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { candidatesStore } from '../store/candidatesStore';

const CandidatesList: React.FC = observer(() => {
  useEffect(() => {
    candidatesStore.fetchCandidates();
  }, []);

  return (
    <div className='window_list'>
      <h1>Candidates</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Votes</th>
          </tr>
        </thead>
        <tbody>
          {candidatesStore.candidates.map(candidate => (
            <tr key={candidate.id}>
              <td>{candidate.imie}</td>
              <td>{candidate.glosy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default CandidatesList;
