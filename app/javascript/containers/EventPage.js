import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Page from '../components/Page';
import EventList from '../components/EventList';
import useEvents from '../utils/useEvents';

const EventPage = ({ user }) => {
  const { data, isLoading, error } = useEvents();

  const [events, setEvents] = useState([]);

  useEffect(() => {
    setEvents(data);
  }, [data]);

  if (isLoading) {
    return (
      <Page>
        <div>Loading Events...</div>
      </Page>
    );
  }

  return (
    <Page>
      <h1>Events</h1>
      <div>
        <EventList
          events={events.filter((event) => !event.datetime)}
          updateEvents={setEvents}
          user={user}
        />
      </div>
    </Page>
  );
};

export default EventPage;

EventPage.propTypes = {
  user: PropTypes.object,
};
