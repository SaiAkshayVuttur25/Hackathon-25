// import React, { useState } from 'react';

// const VotingSystem = () => {
//   // State to store votes and user voting status
//   const [votes, setVotes] = useState({ yes: 0, no: 0 });
//   const [userVote, setUserVote] = useState(null); // Tracks whether the user voted "yes", "no", or not at all (null)

//   // Function to handle voting
//   const handleVote = (option) => {
//     const currentVote = userVote;

//     // If user has already voted and is changing their vote
//     if (currentVote === option) {
//       return; // Do nothing if they are clicking the same option again
//     }

//     // If user already voted, decrease the count for the old vote
//     if (currentVote) {
//       setVotes((prevVotes) => ({
//         ...prevVotes,
//         [currentVote]: prevVotes[currentVote] - 1,
//       }));
//     }

//     // Update votes with the new selection
//     setVotes((prevVotes) => ({
//       ...prevVotes,
//       [option]: prevVotes[option] + 1,
//     }));

//     // Update the user's vote
//     setUserVote(option);
//   };

//   return (
//     <div style={{ margin: '20px', fontFamily: 'Arial, sans-serif'}}>
//       <h2>Event Voting System</h2>
//       <div
//         style={{
//           border: '1px solid #ccc',
//           borderRadius: '5px',
//           marginBottom: '20px',
//           padding: '15px',
//           backgroundColor: 'black',
//         }}
//       >
//         <h3 style={{ marginBottom: '10px' }}>Are you interested in this event?</h3>
//         <div>
//           <button
//             onClick={() => handleVote('yes')}
//             style={{
//               padding: '10px 15px',
//               marginRight: '10px',
//               border: '1px solid #0b8457',
//               backgroundColor: userVote === 'yes' ? '#0b8457' : '#e6f4ed',
//               color: userVote === 'yes' ? 'white' : '#0b8457',
//               borderRadius: '5px',
//               cursor: 'pointer',
//             }}
//           >
//             Yes ({votes.yes})
//           </button>
//           <button
//             onClick={() => handleVote('no')}
//             style={{
//               padding: '10px 15px',
//               border: '1px solid #d32f2f',
//               backgroundColor: userVote === 'no' ? '#d32f2f' : '#fce8e8',
//               color: userVote === 'no' ? 'white' : '#d32f2f',
//               borderRadius: '5px',
//               cursor: 'pointer',
//             }}
//           >
//             No ({votes.no})
//           </button>
//         </div>
//         <div style={{ marginTop: '10px' }}>
//           <p>Participants: {votes.yes}</p>
//           <p>Non-Participants: {votes.no}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VotingSystem;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VotingSystemWithOneVote = ({ eventId, Notparticipants, participants ,token }) => {
  const [userVote, setUserVote] = useState(null); 
  const [votes, setVotes] = useState({ yes: participants, no: Notparticipants }); 

  
  const handleVote = (option) => {
    const currentVote = userVote;
    // If user has already voted and is changing their vote
    if (currentVote === option) {
      return; // Do nothing if they are clicking the same option again
    }

    // Update the vote count on the backend

    axios
      .patch(`http://localhost:5000/blog/events/${eventId}/vote`, { vote: option,token }) // PATCH request to update vote count
      .then((response) => {
        
        setVotes({
          yes: response.data.participants,  // Updated participants count
          no: response.data.Notparticipants, // Updated Notparticipants count
        });
        setUserVote(option); // Update the user's vote state
      })
      .catch((error) => {
      });
  };

  return (
    <div style={{ margin: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Event Voting</h3>
      <div>
        <button
          onClick={() => handleVote('yes')}
          style={{
            padding: '10px 15px',
            marginRight: '10px',
            border: '1px solid #0b8457',
            backgroundColor: userVote === 'yes' ? '#0b8457' : '#e6f4ed',
            color: userVote === 'yes' ? 'white' : '#0b8457',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Yes ({votes.yes})
        </button>
        <button
          onClick={() => handleVote('no')}
          style={{
            padding: '10px 15px',
            border: '1px solid #d32f2f',
            backgroundColor: userVote === 'no' ? '#d32f2f' : '#fce8e8',
            color: userVote === 'no' ? 'white' : '#d32f2f',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          No ({votes.no})
        </button>
      </div>
    </div>
  );
};

export default VotingSystemWithOneVote;

