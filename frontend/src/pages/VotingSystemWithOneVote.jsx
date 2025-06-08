
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VotingSystemWithOneVote = ({ eventId, Notparticipants, participants, token }) => {
  const [userVote, setUserVote] = useState(null); 
  const [votes, setVotes] = useState({ yes: participants, no: Notparticipants }); 
  const [voted, setVoted] = useState(false);

  useEffect(() => {
    // Get all votes from localStorage
    const votesFromStorage = localStorage.getItem('eventVotes');
    if (votesFromStorage) {
      const parsedVotes = JSON.parse(votesFromStorage);
      // Check if this event has a vote stored
      if (parsedVotes[eventId]) {
        setUserVote(parsedVotes[eventId]);
        setVoted(true);
      }
    }
  }, [eventId]); // Add eventId as dependency

  const handleVote = async (option) => {
    if (userVote === option) {
      setVoted(true);
      return;
    }
  
    const previousVote = userVote;
    const isIncrease = !voted || userVote !== option;
  
    try {
      const response = await axios.patch(
        `http://localhost:5000/blog/events/${eventId}/vote`,
        { 
          vote: option,
          increase: isIncrease,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setVotes({
        yes: response.data.participants,
        no: response.data.Notparticipants,
      });
  
      if (voted && previousVote && previousVote !== option) {
        const undoResponse = await axios.patch(
          `http://localhost:5000/blog/events/${eventId}/vote`, 
          {
            vote: previousVote,
            increase: false,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        setVotes({
          yes: undoResponse.data.participants,
          no: undoResponse.data.Notparticipants,
        });
      }
  
      setUserVote(option); 
      setVoted(true);
      
      // Update localStorage with all votes
      const votesFromStorage = localStorage.getItem('eventVotes');
      const allVotes = votesFromStorage ? JSON.parse(votesFromStorage) : {};
      
      // Update the vote for this specific event
      allVotes[eventId] = option;
      localStorage.setItem('eventVotes', JSON.stringify(allVotes));
    } catch (error) {
      console.error("Error updating vote:", error);
    }
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


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';

// const VotingSystemWithOneVote = ({ eventId, Notparticipants, participants, token }) => {
//   const [userVote, setUserVote] = useState(null);
//   const [votes, setVotes] = useState({ yes: participants, no: Notparticipants });
//   const [voted, setVoted] = useState(false);
//   const [userId, setUserId] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (token) {
//       try {
//         const decoded = jwtDecode(token);
//         setUserId(decoded.id);
//       } catch (error) {
//         console.error("Error decoding token:", error);
//       }
//     }
//   }, [token]);

//   useEffect(() => {
//     if (!userId) return;

//     const userVotes = localStorage.getItem('userEventVotes');
//     if (userVotes) {
//       const parsedVotes = JSON.parse(userVotes);
//       if (parsedVotes[userId] && parsedVotes[userId][eventId]) {
//         setUserVote(parsedVotes[userId][eventId]);
//         setVoted(true);
//       }
//     }
//   }, [eventId, userId]);

//   const handleVote = async (option) => {
//     if (!userId || isLoading) return;
    
//     setIsLoading(true);
//     setError(null);

//     try {
//       // First, undo previous vote if exists
//       if (voted && userVote) {
//         await axios.patch(
//           `http://localhost:5000/blog/events/${eventId}/vote`,
//           { vote: userVote, increase: false },
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//       }

//       // Then apply new vote
//       const response = await axios.patch(
//         `http://localhost:5000/blog/events/${eventId}/vote`,
//         { vote: option, increase: true },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       // Update state
//       setVotes({
//         yes: response.data.participants,
//         no: response.data.Notparticipants,
//       });
//       setUserVote(option);
//       setVoted(true);

//       // Update localStorage
//       const allUserVotes = JSON.parse(localStorage.getItem('userEventVotes') || '{}');
//       if (!allUserVotes[userId]) allUserVotes[userId] = {};
//       allUserVotes[userId][eventId] = option;
//       localStorage.setItem('userEventVotes', JSON.stringify(allUserVotes));

//     } catch (error) {
//       console.error("Error updating vote:", error);
//       setError("Failed to update vote. Please try again.");
//       // Revert to previous state if error occurs
//       if (voted && userVote) {
//         try {
//           const revertResponse = await axios.patch(
//             `http://localhost:5000/blog/events/${eventId}/vote`,
//             { vote: userVote, increase: true },
//             { headers: { Authorization: `Bearer ${token}` } }
//           );
//           setVotes({
//             yes: revertResponse.data.participants,
//             no: revertResponse.data.Notparticipants,
//           });
//         } catch (revertError) {
//           console.error("Error reverting vote:", revertError);
//         }
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div style={{ margin: '20px', fontFamily: 'Arial, sans-serif' }}>
//       <h3>Event Voting</h3>
//       {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
//       <div>
//         <button
//           onClick={() => handleVote('yes')}
//           disabled={isLoading}
//           style={{
//             padding: '10px 15px',
//             marginRight: '10px',
//             border: '1px solid #0b8457',
//             backgroundColor: userVote === 'yes' ? '#0b8457' : '#e6f4ed',
//             color: userVote === 'yes' ? 'white' : '#0b8457',
//             borderRadius: '5px',
//             cursor: isLoading ? 'not-allowed' : 'pointer',
//             opacity: isLoading ? 0.7 : 1,
//           }}
//         >
//           {isLoading && userVote === 'yes' ? 'Processing...' : `Yes (${votes.yes})`}
//         </button>
//         <button
//           onClick={() => handleVote('no')}
//           disabled={isLoading}
//           style={{
//             padding: '10px 15px',
//             border: '1px solid #d32f2f',
//             backgroundColor: userVote === 'no' ? '#d32f2f' : '#fce8e8',
//             color: userVote === 'no' ? 'white' : '#d32f2f',
//             borderRadius: '5px',
//             cursor: isLoading ? 'not-allowed' : 'pointer',
//             opacity: isLoading ? 0.7 : 1,
//           }}
//         >
//           {isLoading && userVote === 'no' ? 'Processing...' : `No (${votes.no})`}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default VotingSystemWithOneVote;