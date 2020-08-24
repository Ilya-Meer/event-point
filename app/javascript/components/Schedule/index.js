import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

const renderDay = (scheduledDay, eventsForDay) => {
  return (
    <Fragment key={scheduledDay}>
      <div className='scheduledDay'>{scheduledDay}</div>
      {eventsForDay.map((event) => (
        <div key={event.created_at}>
          {event.topic} scheduled on {event.datetime}
        </div>
      ))}
    </Fragment>
  );
};

const Schedule = ({ scheduledEvents, scheduleEvent, user }) => {
  const formattedSchedule = [];

  for (let [date, events] of Object.entries(scheduledEvents)) {
    formattedSchedule.push(renderDay(date, events));
  }

  return (
    <Fragment>
      <div className='schedule-heading'>
        <h3>Scheduled Events</h3>
        <Button onClick={() => console.log('open event scheduling modal')}>
          + Schedule Event
        </Button>
      </div>
      <div className='schedule-wrapper'>{formattedSchedule}</div>
    </Fragment>
  );
};

Schedule.propTypes = {
  scheduledEvents: PropTypes.object,
  scheduleEvent: PropTypes.func,
};

Schedule.defaultProps = {
  scheduledEvents: {},
};

export default Schedule;
