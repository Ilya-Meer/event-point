import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import EventModal from '../components/EventModal';
import Event from '../components/Event';

const EventList = ({ events }) => {
  const [showProposeEvent, setShowProposeEvent] = useState(false);

  const renderEvents = () => {
    const formatted = events.map((event) => (
      <Event key={event.created_at} event={event} />
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
      />
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
