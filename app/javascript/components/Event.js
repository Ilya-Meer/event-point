import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

const Event = ({ event }) => {
  return (
    <Card key={event.created_at} className='eventlist-event'>
      <Card.Body>
        <Card.Title>{event.topic}</Card.Title>
        <Card.Text>{event.description}</Card.Text>
        <Card.Text className='text-muted'>proposed by Celeste</Card.Text>
        <Card.Text className='text-muted'>
          added on {event.created_at}
        </Card.Text>
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
