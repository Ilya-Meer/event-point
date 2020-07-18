import React, { Fragment, useEffect, useState } from 'react';
import Page from '../components/Page';
import EventList from '../components/EventList';
import { getEvents } from '../utils/api';

const EventPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await (await getEvents()).json();
      setEvents(res);
    };

    fetchEvents();
  }, []);

  return (
    <Page>
      <h1>
        Events
        <div>
          <EventList events={events} />
        </div>
      </h1>
    </Page>
  );
};

export default EventPage;
