import React, { Fragment, useEffect, useState } from 'react';
import Header from '../components/Header';
import Page from '../components/Page';
import EventList from '../components/EventList';

const EventPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await (
        await fetch('http://localhost:3500/api/v1/events')
      ).json();
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
