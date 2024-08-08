import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { candidatesStore } from '../store/candidatesStore';

const CandidatesList: React.FC = observer(() => {
  useEffect(() => {
    candidatesStore.fetchCandidates();
  }, []);

  return (
    <div className="w-1/2 bg-transparent border-2 border-white/20 backdrop-blur-xl shadow-md text-white rounded-lg p-8 basis-2/5">
      <h1 className="text-2xl font-bold text-center mb-4">Candidates</h1>
      <table className="min-w-full border-collapse my-6 text-sm shadow-lg border border-custom-blue">
        <thead>
          <tr className='bg-custom-blue text-white text-left'>
            <th className="p-2 border border-white text-center">Name</th>
            <th className="p-2 border border-white text-center">Votes</th>
          </tr>
        </thead>
        <tbody>
          {candidatesStore.candidates.map(candidate => (
            <tr key={candidate.id} className="border-b border-custom-blue">
              <td className="p-2 border border-white text-center">{candidate.imie}</td>
              <td className="p-2 border border-white text-center">{candidate.glosy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default CandidatesList;
