import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Page from '../components/Page';
import Schedule from '../components/Schedule';
import useSchedule from '../utils/useSchedule';

const SchedulePage = ({ user }) => {
  const { data, isLoading, error } = useSchedule();

  const [scheduledEvents, setSchedule] = useState({});

  useEffect(() => {
    setSchedule(data);
  }, [data]);

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
      <div>
        <Schedule
          scheduledEvents={scheduledEvents}
          scheduleEvent={setSchedule}
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
