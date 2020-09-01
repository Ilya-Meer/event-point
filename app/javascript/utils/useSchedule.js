import { useEffect, useState } from 'react';
import { getScheduledEvents } from './api';
import { convertToSchedule } from './date';

const useSchedule = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [scheduledEvents, setSchedule] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      setIsLoading(true);
      try {
        const res = await getScheduledEvents().then((res) => res.json());

        const formatted = convertToSchedule(res);

        setSchedule(formatted);
        setIsLoading(false);
      } catch (error) {
        setError(error);
      }
    };

    fetchSchedule();
  }, []);

  return {
    data: scheduledEvents,
    isLoading,
    error,
  };
};

export default useSchedule;
