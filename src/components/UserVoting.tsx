import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { candidatesStore } from '../store/candidatesStore';
import { authStore } from '../store/authStore';
import { voteForCandidate } from '../apiService';

const UserVoting: React.FC = observer(() => {
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    candidatesStore.fetchCandidatesAndVoters().then(() => {
      const user = authStore.user;
      if (user) {
        const voter = candidatesStore.voters.find(voter => voter.username === user.username);
        if (voter && voter.glosowal === 1) {
          setHasVoted(true);
        }
      }
    });
  }, []);

  const handleVote = async () => {
    if (candidatesStore.selectedCandidate !== null && authStore.user) {
      try {
        const response = await voteForCandidate(candidatesStore.selectedCandidate.toString(), authStore.user.username);
        console.log('Vote success:', response);
        candidatesStore.updateVotes(candidatesStore.selectedCandidate);
        setHasVoted(true);
        candidatesStore.fetchCandidatesAndVoters(); 
      } catch (error) {
        console.error('Error voting:', error);
      }
    }
  };

  return (
    <div className='window_vote'>
      <h1>Vote</h1>
      {hasVoted ? (
        <p>The vote has been cast. Thank you for voting!</p>
      ) : (
        authStore.isAuthenticated ? (
          <>
            <select
              value={candidatesStore.selectedCandidate ?? ''}
              onChange={(e) => candidatesStore.setSelectedCandidate(Number(e.target.value))}
            >
              <option value="" disabled>
                Select a candidate
              </option>
              {candidatesStore.candidates.map(candidate => (
                <option key={candidate.id} value={candidate.id}>
                  {candidate.imie}
                </option>
              ))}
            </select>
            <button onClick={handleVote}>Vote</button>
          </>
        ) : (
          <p>You must log in to vote.</p>
        )
      )}
    </div>
  );
});

export default UserVoting;



// import React, { useEffect, useState } from 'react';
// import { observer } from 'mobx-react-lite';
// import { candidatesStore } from '../store/candidatesStore';
// import { authStore } from '../store/authStore';
// import { voteForCandidate } from '../apiService';

// const UserVoting: React.FC = observer(() => {
//   const [hasVoted, setHasVoted] = useState(false);

//   useEffect(() => {
//     candidatesStore.fetchCandidatesAndVoters();
//     // Sprawdzenie, czy użytkownik już oddał głos
//     const user = authStore.user;
//     if (user) {
//       const voter = JSON.parse(localStorage.getItem('voted') || 'null');
//       if (voter && voter.username === user.username) {
//         setHasVoted(true);
//       }
//     }
//   }, []);

//   const handleVote = async () => {
//     if (candidatesStore.selectedCandidate !== null && authStore.user) {
//       try {
//         const response = await voteForCandidate(candidatesStore.selectedCandidate.toString(), authStore.user.username);
//         console.log('Vote success:', response);
//         candidatesStore.updateVotes(candidatesStore.selectedCandidate);
//         setHasVoted(true);
//         // Zapisanie informacji, że użytkownik oddał głos
//         localStorage.setItem('voted', JSON.stringify({ username: authStore.user.username }));
//         candidatesStore.fetchCandidatesAndVoters(); // Odświeżanie listy kandydatów i głosujących
//       } catch (error) {
//         console.error('Error voting:', error);
//       }
//     }
//   };

//   return (
//     <div className='window_vote'>
//       <h1>Głosowanie</h1>
//       {hasVoted ? (
//         <p>Głos został oddany. Dziękujemy za udział w głosowaniu!</p>
//       ) : (
//         authStore.isAuthenticated ? (
//           <>
//             <select
//               value={candidatesStore.selectedCandidate ?? ''}
//               onChange={(e) => candidatesStore.setSelectedCandidate(Number(e.target.value))}
//             >
//               <option value="" disabled>
//                 Wybierz kandydata
//               </option>
//               {candidatesStore.candidates.map(candidate => (
//                 <option key={candidate.id} value={candidate.id}>
//                   {candidate.imie}
//                 </option>
//               ))}
//             </select>
//             <button onClick={handleVote}>Zagłosuj</button>
//           </>
//         ) : (
//           <p>Musisz się zalogować, aby oddać głos.</p>
//         )
//       )}
//     </div>
//   );
// });

// export default UserVoting;


// import React, { useEffect, useState } from 'react';
// import { observer } from 'mobx-react-lite';
// import { candidatesStore } from '../store/candidatesStore';
// import { authStore } from '../store/authStore';
// import { voteForCandidate } from '../apiService';

// const UserVoting: React.FC = observer(() => {
//   const [hasVoted, setHasVoted] = useState(false);

//   useEffect(() => {
//     candidatesStore.fetchCandidates();

//     const user = authStore.user;
//     if (user) {
//       const voter = JSON.parse(localStorage.getItem('voted') || 'null');
//       if (voter && voter.username === user.username) {
//         setHasVoted(true);
//       }
//     }
//   }, []);

//   const handleVote = async () => {
//     if (candidatesStore.selectedCandidate !== null && authStore.user) {
//       try {
//         const response = await voteForCandidate(candidatesStore.selectedCandidate.toString(), authStore.user.username);
//         console.log('Vote success:', response);
//         candidatesStore.updateVotes(candidatesStore.selectedCandidate);
//         setHasVoted(true);
//         // Zapisanie informacji, że użytkownik oddał głos
//         localStorage.setItem('voted', JSON.stringify({ username: authStore.user.username }));
//       } catch (error) {
//         console.error('Error voting:', error);
//       }
//     }
//   };

//   return (
//     <div className='window_vote'>
//       <h1>Vote!</h1>
//       {hasVoted ? (
//         <p>The vote has been cast. Thank you for voting!</p>
//       ) : (
//         authStore.isAuthenticated ? (
//           <>
//             <select
//               value={candidatesStore.selectedCandidate ?? ''}
//               onChange={(e) => candidatesStore.setSelectedCandidate(Number(e.target.value))}
//             >
//               <option value="" disabled>
//                 Select a candidate
//               </option>
//               {candidatesStore.candidates.map(candidate => (
//                 <option key={candidate.id} value={candidate.id}>
//                   {candidate.imie}
//                 </option>
//               ))}
//             </select>
//             <button onClick={handleVote}>Vote</button>
//           </>
//         ) : (
//           <p>You must log in to vote.</p>
//         )
//       )}
//     </div>
//   );
// });

// export default UserVoting;




// import React, { useEffect } from 'react';
// import { observer } from 'mobx-react-lite';
// import { candidatesStore } from '../store/candidatesStore';
// import { authStore } from '../store/authStore';
// import { voteForCandidate } from '../apiService';

// const UserVoting: React.FC = observer(() => {
//   useEffect(() => {
//     candidatesStore.fetchCandidates();
//   }, []);

//   const handleVote = async () => {
//     if (candidatesStore.selectedCandidate !== null && authStore.user) {
//       try {
//         const response = await voteForCandidate(candidatesStore.selectedCandidate.toString(), authStore.user.username);
//         console.log('Vote success:', response);
//       } catch (error) {
//         console.error('Error voting:', error);
//       }
//     }
//   };

//   return (
//     <div className='window_vote'>
//       <h1>Głosowanie</h1>
//       {authStore.isAuthenticated ? (
//         <>
//           <select
//             value={candidatesStore.selectedCandidate ?? ''}
//             onChange={(e) => candidatesStore.setSelectedCandidate(Number(e.target.value))}
//           >
//             <option value="" disabled>
//               Wybierz kandydata
//             </option>
//             {candidatesStore.candidates.map(candidate => (
//               <option key={candidate.id} value={candidate.id}>
//                 {candidate.imie}
//               </option>
//             ))}
//           </select>
//           <button onClick={handleVote}>Zagłosuj</button>
//         </>
//       ) : (
//         <p>Musisz się zalogować, aby oddać głos.</p>
//       )}
//     </div>
//   );
// });

// export default UserVoting;
