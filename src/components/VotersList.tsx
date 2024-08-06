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
    <div className='window_list'>
      <h1>Voters</h1>
      <table>
        <thead>
          <tr>
          <th>Name</th>
          <th>Has voted</th>
          </tr>
        </thead>
        <tbody>
          {candidatesStore.voters.map(voter => (
            <tr key={voter.username}>
              <td>{voter.username}</td>
              <td>{voter.glosowal == 1 ? <FaCheck /> : <FaWindowClose /> }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default VotersList;
