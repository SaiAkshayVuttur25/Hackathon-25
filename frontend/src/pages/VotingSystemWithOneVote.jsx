
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const VotingSystemWithOneVote = ({ eventId, Notparticipants, participants, token }) => {
//   const [userVote, setUserVote] = useState(null); 
//   const [votes, setVotes] = useState({ yes: participants, no: Notparticipants }); 
//   const [voted, setVoted] = useState(false);

//   useEffect(() => {
//     // Get all votes from localStorage
//     const votesFromStorage = localStorage.getItem('eventVotes');
//     if (votesFromStorage) {
//       const parsedVotes = JSON.parse(votesFromStorage);
//       // Check if this event has a vote stored
//       if (parsedVotes[eventId]) {
//         setUserVote(parsedVotes[eventId]);
//         setVoted(true);
//       }
//     }
//   }, [eventId]); // Add eventId as dependency

//   const handleVote = async (option) => {
//     if (userVote === option) {
//       setVoted(true);
//       return;
//     }
  
//     const previousVote = userVote;
//     const isIncrease = !voted || userVote !== option;
  
//     try {
//       const response = await axios.patch(
//         `http://localhost:5000/blog/events/${eventId}/vote`,
//         { 
//           vote: option,
//           increase: isIncrease,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setVotes({
//         yes: response.data.participants,
//         no: response.data.Notparticipants,
//       });
  
//       if (voted && previousVote && previousVote !== option) {
//         const undoResponse = await axios.patch(
//           `http://localhost:5000/blog/events/${eventId}/vote`, 
//           {
//             vote: previousVote,
//             increase: false,
//           },
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
  
//         setVotes({
//           yes: undoResponse.data.participants,
//           no: undoResponse.data.Notparticipants,
//         });
//       }
  
//       setUserVote(option); 
//       setVoted(true);
      
//       // Update localStorage with all votes
//       const votesFromStorage = localStorage.getItem('eventVotes');
//       const allVotes = votesFromStorage ? JSON.parse(votesFromStorage) : {};
      
//       // Update the vote for this specific event
//       allVotes[eventId] = option;
//       localStorage.setItem('eventVotes', JSON.stringify(allVotes));
//     } catch (error) {
//       // console.error("Error updating vote:", error);
//     }
//   };

//   return (
//     <div style={{ margin: '20px', fontFamily: 'Arial, sans-serif' }}>
//       <h3>Event Voting</h3>
//       <div>
//         <button
//           onClick={() => handleVote('yes')}
//           style={{
//             padding: '10px 15px',
//             marginRight: '10px',
//             border: '1px solid #0b8457',
//             backgroundColor: userVote === 'yes' ? '#0b8457' : '#e6f4ed',
//             color: userVote === 'yes' ? 'white' : '#0b8457',
//             borderRadius: '5px',
//             cursor: 'pointer',
//           }}
//         >
//           Yes ({votes.yes})
//         </button>
//         <button
//           onClick={() => handleVote('no')}
//           style={{
//             padding: '10px 15px',
//             border: '1px solid #d32f2f',
//             backgroundColor: userVote === 'no' ? '#d32f2f' : '#fce8e8',
//             color: userVote === 'no' ? 'white' : '#d32f2f',
//             borderRadius: '5px',
//             cursor: 'pointer',
//           }}
//         >
//           No ({votes.no})
//         </button>
//       </div>
//     </div>
//   );
// };

// export default VotingSystemWithOneVote;


import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VotingSystemWithOneVote = ({ eventId, Notparticipants, participants, token }) => {
  const [userVote, setUserVote] = useState(null); 
  const [votes, setVotes] = useState({ yes: participants || 0, no: Notparticipants || 0 }); 
  const [voted, setVoted] = useState(false);
  const [loading, setLoading] = useState(false);
  // console.log(token);
  useEffect(() => {
    // Get user's current interaction status from backend
    fetchUserInteraction();
  }, [eventId]);

  const fetchUserInteraction = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/event/events/${eventId}/getEventInteraction`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      if (response.data.hasInteraction) {
        setUserVote(response.data.liked);
        setVoted(true);
      }
    } catch (error) {
      // console.error("Error fetching user interaction:", error);
    }
  };

  const handleVote = async (option) => {
    if (loading) return;
    
    // If user clicks the same option they already voted for, do nothing
    if (userVote === option) {
      return;
    }

    setLoading(true);

    try {

      const response = await axios.post(
        `http://localhost:5000/event/events/${eventId}/like`,
        { 
          like: option
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update local state
      setUserVote(option);
      setVoted(true);
      
      // Fetch updated stats to get current vote counts
      const statsResponse = await axios.get(
        `http://localhost:5000/event/events/${eventId}/getStats`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      setVotes({
        yes: statsResponse.data.participants,
        no: statsResponse.data.nonParticipants
      });

    } catch (error) {
      // console.error("Error updating vote:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReminder = async () => {
    if (loading) return;
    
    setLoading(true);
    
    try {
      const userId = getUserIdFromToken(token);
      
      const response = await axios.post(
        `http://localhost:5000/event/events/${eventId}/remind-me`,
        { 
          userId: userId,
          remind: true
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      // console.log("Reminder set successfully:", response.data);
      
    } catch (error) {
      // console.error("Error setting reminder:", error);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to extract userId from token
  // You'll need to implement this based on your token structure
  const getUserIdFromToken = (token) => {
    try {
      // If using JWT, you can decode it
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.userId || payload.id;
    } catch (error) {
      // console.error("Error decoding token:", error);
      // Fallback - you might store userId in localStorage
      return localStorage.getItem('userId');
    }
  };

  // console.log(eventId)

  return (
    <div style={{ margin: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Event Voting</h3>
      <div style={{ marginBottom: '15px' }}>
        <button
          onClick={() => handleVote('yes')}
          disabled={loading}
          style={{
            padding: '10px 15px',
            marginRight: '10px',
            border: '1px solid #0b8457',
            backgroundColor: userVote === 'yes' ? '#0b8457' : '#e6f4ed',
            color: userVote === 'yes' ? 'white' : '#0b8457',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1,
          }}
        >
          {loading && userVote !== 'yes' ? 'Voting...' : `Yes (${votes.yes})`}
        </button>
        <button
          onClick={() => handleVote('no')}
          disabled={loading}
          style={{
            padding: '10px 15px',
            marginRight: '10px',
            border: '1px solid #d32f2f',
            backgroundColor: userVote === 'no' ? '#d32f2f' : '#fce8e8',
            color: userVote === 'no' ? 'white' : '#d32f2f',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1,
          }}
        >
          {loading && userVote !== 'no' ? 'Voting...' : `No (${votes.no})`}
        </button>
        <button
          onClick={() => handleVote('not_sure')}
          disabled={loading}
          style={{
            padding: '10px 15px',
            border: '1px solid #f57c00',
            backgroundColor: userVote === 'not_sure' ? '#f57c00' : '#fff3e0',
            color: userVote === 'not_sure' ? 'white' : '#f57c00',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1,
          }}
        >
          {loading && userVote !== 'not_sure' ? 'Voting...' : 'Not Sure'}
        </button>
      </div>
      
      <div>
        <button
          onClick={handleReminder}
          disabled={loading}
          style={{
            padding: '8px 12px',
            border: '1px solid #1976d2',
            backgroundColor: '#e3f2fd',
            color: '#1976d2',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1,
          }}
        >
          {loading ? 'Setting Reminder...' : 'Remind Me'}
        </button>
      </div>
      
      {voted && (
        <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
          Your vote: <strong>{userVote}</strong>
        </div>
      )}
    </div>
  );
};

export default VotingSystemWithOneVote;