import React, { Fragment, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import ScheduleModal from '../ScheduleModal';
import { scheduleEvent, getScheduledEvents } from '../../utils/api';
import { convertToSchedule } from '../../utils/date';

const renderDay = (scheduledDay, eventsForDay) => {
  return (
    <Fragment key={scheduledDay}>
      <div className='scheduled-day'>{scheduledDay}</div>
      <ul>
        {eventsForDay.map((event) => (
          <li key={event.created_at} className='scheduled-event'>
            {event.topic}
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

const Schedule = ({
  allEvents,
  scheduledEvents,
  updateSchedule,
  updateAllEvents,
}) => {
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  const [formattedSchedule, setFormattedSchedule] = useState([]);

  useMemo(() => {
    let formatted = [];
    for (let [date, events] of Object.entries(scheduledEvents)) {
      formatted.push(renderDay(date, events));
    }

    setFormattedSchedule(formatted);
  }, [scheduledEvents]);

  const handleScheduleEvent = async (eventState) => {
    try {
      await scheduleEvent({
        ...eventState,
        datetime: new Date(eventState.datetime.toUTCString()),
      });

      const updated = await getScheduledEvents().then((res) => res.json());
      updateSchedule(convertToSchedule(updated));

      const newEventsArr = allEvents.map((event) => {
        if (event.id === Number(eventState.event_id)) {
          return { ...event, datetime: eventState.datetime };
        }

        return event;
      });

      updateAllEvents(newEventsArr);

      setShowScheduleModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Fragment>
      <div className='schedule-heading'>
        <h3>Scheduled Events</h3>
        <Button onClick={() => setShowScheduleModal(true)}>
          + Schedule Event
        </Button>
      </div>
      <div className='schedule-wrapper'>{formattedSchedule}</div>
      <ScheduleModal
        show={showScheduleModal}
        handleDismiss={() => setShowScheduleModal(false)}
        events={allEvents}
        handleScheduleEvent={handleScheduleEvent}
      />
    </Fragment>
  );
};

Schedule.propTypes = {
  allEvents: PropTypes.array,
  scheduledEvents: PropTypes.object,
  scheduleEvent: PropTypes.func,
};

Schedule.defaultProps = {
  scheduledEvents: {},
};

export default Schedule;
