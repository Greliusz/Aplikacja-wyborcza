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



// /* eslint-disable eqeqeq */
// import React, { useEffect, useState } from 'react';
// import { FaCheck, FaWindowClose } from "react-icons/fa";
// import { getVoters } from '../apiService';

// const VotersList: React.FC = () => {
//   const [voters, setVoters] = useState<{ username: string, glosowal: number }[]>([]);

//   useEffect(() => {
//     const fetchVoters = async () => {
//       try {
//         const data = await getVoters();
//         console.log('Voters data:', data);
//         setVoters(data);
//       } catch (error) {
//         console.error('Error fetching voters:', error);
//       }
//     };

//     fetchVoters();
//   }, []);

//   return (
//     <div className='window_list'>
//       <h1>Voters</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Has voted</th>
//           </tr>
//         </thead>
//         <tbody>
//           {voters.map(voter => (
//             <tr key={voter.username}>
//               <td>{voter.username}</td>
//               <td>{voter.glosowal == 1 ? <FaCheck /> : <FaWindowClose /> }</td>
//             </tr>
//           ))}
//         </tbody>
//         {/*
//           {voters.map(voter => {
//             if (typeof voter === 'object' && voter !== null && 'username' in voter && 'glosowal' in voter) {
//               const v = voter as { username: string, glosowal: number };
//               return (
//                 <tr key={v.username}>
//                   <td>{v.username}</td>
//                   <td>{v.glosowal == 1 ? <FaCheck /> : <FaWindowClose /> }</td>
//                 </tr>
//               );
//             }
//             return null;
//           })}
//         */}
//       </table>
//     </div>
//   );
// };

// export default VotersList;
