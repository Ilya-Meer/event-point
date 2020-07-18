import { useEffect, useState } from 'react';
import { getEvents } from './api';

const useEvents = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        const res = await getEvents().then((res) => res.json());
        setEvents(res);
        setIsLoading(false);
      } catch (error) {
        setError(error);
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
