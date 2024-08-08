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



// import React, { useEffect } from 'react';
// import { observer } from 'mobx-react-lite';
// import { candidatesStore } from '../store/candidatesStore';

// const CandidatesList: React.FC = observer(() => {
//   useEffect(() => {
//     candidatesStore.fetchCandidates();
//   }, []);

//   return (
//     <div className='window_list'>
//       <h1>Kandydaci</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>Imię</th>
//             <th>Głosy</th>
//           </tr>
//         </thead>
//         <tbody>
//           {candidatesStore.candidates.map(candidate => (
//             <tr key={candidate.id}>
//               <td>{candidate.imie}</td>
//               <td>{candidate.glosy}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// });

// export default CandidatesList;




// import React, { useEffect, useState } from 'react';
// import { getCandidates } from '../apiService';

// const CandidatesList: React.FC = () => {
//   const [candidates, setCandidates] = useState<{ id: number, imie: string, glosy: number }[]>([]);

//   useEffect(() => {
//     const fetchCandidates = async () => {
//       try {
//         const data = await getCandidates();
//         setCandidates(data);
//       } catch (error) {
//         console.error('Error fetching candidates:', error);
//       }
//     };

//     fetchCandidates();
//   }, []);

//   return (
//     <div className='window_list'>
//       <h1>Candidates</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Votes</th>
//           </tr>
//         </thead>
//         <tbody>
//           {candidates.map(candidate => {
//             if (typeof candidate === 'object' && candidate !== null && 'id' in candidate && 'imie' in candidate && 'glosy' in candidate) {
//               const c = candidate as { id: number, imie: string, glosy: number };
//               return (
//                 <tr key={c.id}>
//                   <td>{c.imie}</td>
//                   <td>{c.glosy}</td>
//                 </tr>
//               );
//             }
//             return null;
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default CandidatesList;
