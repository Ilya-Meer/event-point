import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { addVote, removeVote } from '../utils/api';

const Event = ({ user, event }) => {
  const [voted, setVoted] = useState(false);
  const [numVotes, setNumVotes] = useState(event.votes.length);

  useEffect(() => {
    const voters = event.votes.map((v) => v.user_id);
    if (voters.includes(user.id)) {
      setVoted(true);
      setNumVotes(event.votes.length);
    }
  }, []);

  const handleVote = async () => {
    const payload = {
      user_id: user.id,
      event_id: event.id,
    };

    try {
      if (voted) {
        const res = await removeVote(payload);
        setNumVotes(numVotes - 1);
      } else {
        const res = await addVote(payload);
        setNumVotes(numVotes + 1);
      }
    } catch (error) {
      console.error(error);
    }

    setVoted(!voted);
  };

  return (
    <Card key={event.created_at} className='eventlist-event'>
      <Card.Body>
        <Card.Title>{event.topic}</Card.Title>
        <Card.Text>{event.description}</Card.Text>
        <Card.Text className='text-muted'>{`proposed by ${event.owner}`}</Card.Text>
        <Card.Text className='text-muted'>
          added on {event.created_at}
        </Card.Text>
        <div>
          <h3>
            Votes: <span>{numVotes}</span>
          </h3>
        </div>
        <div>
          <button onClick={handleVote}>{!voted ? 'Upvote' : 'Unvote'}</button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Event;

Event.propTypes = {
  event: PropTypes.shape({
    created_at: PropTypes.string,
    topic: PropTypes.string,
    description: PropTypes.string,
  }),
};
