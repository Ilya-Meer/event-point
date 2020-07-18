import React from 'react';
import Page from '../components/Page';
import EventList from '../components/EventList';
import useEvents from '../utils/useEvents';

const EventPage = () => {
  const { data, isLoading, error } = useEvents();

  if (isLoading) {
    return (
      <Page>
        <div>Loading Events...</div>
      </Page>
    );
  }

  return (
    <Page>
      <h1>
        Events
        <div>
          <EventList events={data} />
        </div>
      </h1>
    </Page>
  );
};

export default EventPage;
