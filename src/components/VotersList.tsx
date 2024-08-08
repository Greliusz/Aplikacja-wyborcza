/* eslint-disable eqeqeq */
import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { FaCheck, FaWindowClose } from "react-icons/fa";
import { candidatesStore } from '../store/candidatesStore';

const VotersList: React.FC = observer(() => {
  useEffect(() => {
    candidatesStore.fetchVoters();
  }, []);

  return (
    <div className="w-1/2 bg-transparent border-2 border-white/20 backdrop-blur-xl shadow-md text-white rounded-lg p-8 basis-2/5">
      <h1 className="text-2xl font-bold text-center mb-4">Voters</h1>
      <table className="min-w-full border-collapse my-6 text-sm shadow-lg border border-blue-700">
        <thead>
          <tr className="bg-custom-blue text-white text-left">
            <th className="p-2 border border-white text-center">Name</th>
            <th className="p-2 border border-white text-center">Has voted</th>
          </tr>
        </thead>
        <tbody>
          {candidatesStore.voters.map(voter => (
            <tr key={voter.username} className="border-b border-custom-blue">
              <td className="p-2 border border-white text-center">{voter.username}</td>
              <td className="p-2 border border-white text-center">
              <div className="inline-block">
                {voter.glosowal == 1 ? <FaCheck className="inline-block" /> : <FaWindowClose className="inline-block" /> }
              </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default VotersList;
