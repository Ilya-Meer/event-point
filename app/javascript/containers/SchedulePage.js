import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Page from '../components/Page';
import Schedule from '../components/Schedule';
import useSchedule from '../utils/useSchedule';
import useEvents from '../utils/useEvents';

const SchedulePage = ({ user }) => {
  const { data: eventData } = useEvents();
  const { data: scheduleData, isLoading, error } = useSchedule();

  const [scheduledEvents, setSchedule] = useState({});
  const [allEvents, setAllEvents] = useState([]);

  useEffect(() => {
    setSchedule(scheduleData);
  }, [scheduleData]);

  useEffect(() => {
    setAllEvents(eventData);
  }, [eventData]);

  if (isLoading) {
    return (
      <Page>
        <div>Loading Schedule...</div>
      </Page>
    );
  }

  return (
    <Page>
      <h1>Schedule</h1>
      <p>
        Schedule an event from the list of existing events. To propose a new
        event, or vote on an existing event, visit the{' '}
        <Link to='/events'>events</Link> page.
      </p>
      <div>
        <Schedule
          allEvents={allEvents.filter((event) => !event.datetime)}
          scheduledEvents={scheduledEvents}
          updateSchedule={setSchedule}
          updateAllEvents={setAllEvents}
          user={user}
        />
      </div>
    </Page>
  );
};

export default SchedulePage;

SchedulePage.propTypes = {
  user: PropTypes.object,
};
