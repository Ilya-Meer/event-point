import { useEffect, useState } from 'react';
import { getEvents } from './api';
import { isSuccessfulResponse, errorMessages } from './error';

const useEvents = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        const res = await getEvents();

        if (!isSuccessfulResponse(res)) {
          throw new Error(errorMessages.getEvents);
        }

        const eventData = await res.json();
        setEvents(eventData);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return {
    data: events,
    isLoading,
    error,
  };
};

export default useEvents;
