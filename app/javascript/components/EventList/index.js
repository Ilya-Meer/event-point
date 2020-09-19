import React, { Fragment, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import EventModal from '../EventModal';
import Event from '../Event';
import { deleteEvent } from '../../utils/api';
import { FlashContext } from '../../contexts/FlashContext';
import { SORTING_FILTERS, sortEvents } from '../../utils/sort';
import { isSuccessfulResponse, errorMessages } from '../../utils/error';

const EventList = ({ events, updateEvents, user }) => {
  const [sortingFilter, setSortingFilter] = useState(SORTING_FILTERS.date);
  const { setMessage } = useContext(FlashContext);

  const [eventToEdit, setEventToEdit] = useState({});
  const [showEventModal, setShowEventModal] = useState(false);

  const handleEditEvent = (id) => {
    const toEdit = events.find((event) => event.id === id);
    setEventToEdit(toEdit);
    setShowEventModal(true);
  };

  const handleDeleteEvent = async (id) => {
    try {
      const res = await deleteEvent(id);

      if (!isSuccessfulResponse(res)) {
        throw new Error(errorMessages.deleteEvent);
      }

      updateEvents(events.filter((event) => event.id !== id));
    } catch (error) {
      console.error(error);
      setMessage({ text: error.message, variant: 'danger' });
    }
  };

  const renderEvents = () => {
    const sorted = sortEvents(sortingFilter, events);

    const formatted = sorted.map((event) => (
      <Event
        key={event.id}
        user={user}
        event={event}
        handleEditEvent={handleEditEvent}
        handleDeleteEvent={handleDeleteEvent}
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
