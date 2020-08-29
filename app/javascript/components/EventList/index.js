import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import EventModal from '../EventModal';
import Event from '../Event';

const EventList = ({ events, updateEvents, user }) => {
  const [eventToEdit, setEventToEdit] = useState({});
  const [showEventModal, setShowEventModal] = useState(false);

  const handleEditEvent = (id) => {
    const toEdit = events.find((event) => event.id === id);
    setEventToEdit(toEdit);
    setShowEventModal(true);
  };

  const renderEvents = () => {
    const formatted = events.map((event) => (
      <Event
        key={event.id}
        user={user}
        event={event}
        handleEditEvent={handleEditEvent}
      />
    ));
    return formatted;
  };

  return (
    <Fragment>
      <div className='eventlist-heading'>
        <h3>Proposed Events</h3>
        <Button onClick={() => setShowEventModal(true)}>+ Propose Event</Button>
      </div>
      <div className='eventlist-wrapper'>{renderEvents()}</div>
      <EventModal
        eventToEdit={eventToEdit}
        show={showEventModal}
        handleDismiss={() => {
          setEventToEdit({});
          setShowEventModal(false);
        }}
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
