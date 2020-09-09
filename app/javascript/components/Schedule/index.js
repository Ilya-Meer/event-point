import React, { Fragment, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import Button from 'react-bootstrap/Button';
import ScheduleModal from '../ScheduleModal';
import {
  getScheduledEvents,
  getEvents,
  scheduleEvent,
  unscheduleEvent,
} from '../../utils/api';
import { convertToSchedule } from '../../utils/date';

const Schedule = ({
  allEvents,
  scheduledEvents,
  updateSchedule,
  updateAllEvents,
}) => {
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [formattedSchedule, setFormattedSchedule] = useState([]);
  const [eventToReschedule, setEventToReschedule] = useState({});

  const handleReschedule = (id) => {
    let eventArr = [];

    for (let arr of Object.values(scheduledEvents)) {
      eventArr = eventArr.concat(arr);
    }

    setEventToReschedule(eventArr.find((event) => event.id === id));
    setShowScheduleModal(true);
  };

  const renderDay = (scheduledDay, eventsForDay) => {
    return (
      <Fragment key={scheduledDay}>
        <div className='scheduled-day'>{scheduledDay}</div>
        <ul>
          {eventsForDay.map((event) => (
            <li key={event.created_at} className='scheduled-event'>
              <div>
                {event.topic}
                <span className='scheduled-event-time'>
                  ----- {`(${format(new Date(event.datetime), 'h:mm aa')})`}
                </span>
              </div>
              <Button
                variant='secondary'
                onClick={() => handleReschedule(event.id)}
              >
                Reschedule
              </Button>
            </li>
          ))}
        </ul>
      </Fragment>
    );
  };

  useMemo(() => {
    let formatted = [];

    const scheduleItems = Object.entries(scheduledEvents).sort((prev, next) => {
      return new Date(prev[0]) - new Date(next[0]);
    });

    for (let [date, events] of scheduleItems) {
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

  const handleUnscheduleEvent = async (event_id) => {
    try {
      await unscheduleEvent({ event_id });

      const updated = await getScheduledEvents().then((res) => res.json());
      updateSchedule(convertToSchedule(updated));

      const eventList = await getEvents().then((res) => res.json());
      updateAllEvents(eventList);

      setEventToReschedule({});
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
        handleDismiss={() => {
          setEventToReschedule({});
          setShowScheduleModal(false);
        }}
        events={allEvents}
        eventToReschedule={eventToReschedule}
        handleScheduleEvent={handleScheduleEvent}
        handleUnscheduleEvent={handleUnscheduleEvent}
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
