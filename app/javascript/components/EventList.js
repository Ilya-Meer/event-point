import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import EventModal from '../components/EventModal';
import Event from '../components/Event';

const EventList = ({ events, updateEvents, user }) => {
  const [showProposeEvent, setShowProposeEvent] = useState(false);

  const renderEvents = () => {
    const formatted = events.map((event) => (
      <Event key={event.created_at} user={user} event={event} />
    ));
    return formatted;
  };

  return (
    <Fragment>
      <div className='eventlist-heading'>
        <h3>Proposed Events</h3>
        <Button onClick={() => setShowProposeEvent(true)}>
          + Propose Event
        </Button>
      </div>
      <div className='eventlist-wrapper'>{renderEvents()}</div>
      <EventModal
        show={showProposeEvent}
        handleDismiss={() => setShowProposeEvent(false)}
        user={user}
        events={events}
        updateEvents={updateEvents}
      />
    </Fragment>
  );
};

EventList.propTypes = {
  events: PropTypes.array,
  updateEvents: PropTypes.func,
  user: PropTypes.object,
};

EventList.defaultProps = {
  events: [],
  user: {},
};

export default EventList;
