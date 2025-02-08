import React, { useState } from 'react';
import axios from 'axios';

const VotingSystemWithOneVote = ({ eventId, Notparticipants, participants ,token }) => {
  const [userVote, setUserVote] = useState(null); 
  const [votes, setVotes] = useState({ yes: participants, no: Notparticipants }); 
  const [voted , setVoted] = useState(false);

  const handleVote = async (option) => {
    if (userVote === option) {
      setVoted(true);
      return;
    }
  
    const previousVote = userVote;
    const isIncrease = !voted || userVote !== option;
  
    try {
      const response = await axios.patch(`http://localhost:5000/blog/events/${eventId}/vote`, {
        vote: option,
        token,
        increase: isIncrease,
      });
  
      setVotes({
        yes: response.data.participants,
        no: response.data.Notparticipants,
      });
  
      if (voted && previousVote && previousVote !== option) {
        const undoResponse = await axios.patch(`http://localhost:5000/blog/events/${eventId}/vote`, {
          vote: previousVote,
          token,
          increase: false,
        });
  
        setVotes({
          yes: undoResponse.data.participants,
          no: undoResponse.data.Notparticipants,
        });
      }
  
      setUserVote(option); 
      setVoted(true); 
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

