import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { addVote, removeVote } from '../../utils/api';

const Event = ({ user, event, handleEditEvent, handleDeleteEvent }) => {
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
    <Card key={event.created_at} className='event'>
      <Card.Body>
        <div className='event-info'>
          <h2 className='event-info-title'>{event.topic}</h2>
          <p className='event-info-description text-muted'>
            {event.description}
          </p>
        </div>
        <div className='event-add-info'>
          <div className=''>
            <p className='event-add-info-heading text-muted'>Votes</p>
            <p data-testid='num-votes'>{numVotes}</p>
          </div>
          <div className=''>
            <p className='event-add-info-heading text-muted'>suggested by</p>
            <p>{event.owner}</p>
          </div>
        </div>
        <div className='event-button-container'>
          <Button
            onClick={handleVote}
            className={['upvote-button', `${voted ? 'upvoted' : ''}`].join(' ')}
          >
            {!voted ? 'Upvote' : 'Unvote'}
          </Button>
          {event.owner_id === user.id && (
            <div className='modify'>
              <Button
                variant='secondary'
                onClick={() => handleEditEvent(event.id)}
              >
                Edit
              </Button>
              <Button
                variant='danger'
                onClick={() => handleDeleteEvent(event.id)}
              >
                Delete
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Event;

Event.propTypes = {
  user: PropTypes.object,
  event: PropTypes.shape({
    created_at: PropTypes.string,
    topic: PropTypes.string,
    description: PropTypes.string,
  }),
  handleEditEvent: PropTypes.func,
  handleDeleteEvent: PropTypes.func,
};
