import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Header from '../components/Header';

const EventList = (props) => {
  const renderEvents = () => {
    const eventsToRender = props.events || [];

    const formatted = eventsToRender.map((event) => (
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
    ));
    return formatted;
  };

  const test = (e) => {
    console.log(props);

    fetch('/events', {
      method: 'POST',
      headers: {
        'X-CSRF-TOKEN': props.authenticityToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event: {
          topic: 'Test',
          description: 'A description here',
        },
      }),
    });
  };

  return (
    <Fragment>
      <Header />
      <Container className='eventlist'>
        <div className='eventlist-heading'>
          <h1>Events</h1>
          <Button>+ Propose Event</Button>
        </div>
        <div className='eventlist-wrapper'>{renderEvents()}</div>
      </Container>

      <form onSubmit={test} action='/events' method='post'>
        <button>test</button>
      </form>
    </Fragment>
  );
};

EventList.propTypes = {
  events: PropTypes.array,
};

EventList.defaultProps = {
  events: [],
};

export default EventList;
