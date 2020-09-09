import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import { addVote, removeVote } from '../../utils/api';

const Event = ({ user, event, handleEditEvent, handleDeleteEvent }) => {
  const [voted, setVoted] = useState(false);
  const [numVotes, setNumVotes] = useState(event.votes.length);
  const [showVotes, setShowVotes] = useState(false);
  const votesTooltipRef = useRef(null);

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

  const renderVoterInfo = () => {
    const defaultMessage = 'No votes yet';

    // Nobody has voted, current user's vote has not been added to local state
    if (!voted && !event.votes.length) {
      return defaultMessage;
    }

    // User has unvoted, vote object still exists
    // but local state has been updated
    if (
      !voted &&
      event.votes.length === 1 &&
      event.votes[0].user_id === user.id
    ) {
      return defaultMessage;
    }

    // Get user info from votes array
    const voterInfo = event.votes
      .filter((voteObj) => voteObj.user_id !== user.id)
      .map((voteObj) => voteObj.display_name || voteObj.email);

    // If local state indicates current user has voted
    // Add 'You'
    if (voted) {
      voterInfo.push('You');
    }

    return voterInfo.join(', ');
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
          <div
            ref={votesTooltipRef}
            onMouseEnter={() => setShowVotes(true)}
            onMouseLeave={() => setShowVotes(false)}
          >
            <p className='event-add-info-heading text-muted'>Votes</p>
            <p data-testid='num-votes'>{numVotes}</p>
          </div>
          <Overlay
            target={votesTooltipRef.current}
            show={showVotes}
            placement='right'
          >
            {(props) => <Tooltip {...props}>{renderVoterInfo()}</Tooltip>}
          </Overlay>
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
