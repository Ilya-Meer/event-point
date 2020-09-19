import { useEffect, useState } from 'react';
import { getScheduledEvents } from './api';
import { convertToSchedule } from './date';
import { isSuccessfulResponse, errorMessages } from './error';

const useSchedule = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [scheduledEvents, setSchedule] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      setIsLoading(true);
      try {
        const res = await getScheduledEvents();

        if (!isSuccessfulResponse(res)) {
          throw new Error(errorMessages.getSchedule);
        }

        const scheduleData = await res.json();
        const formatted = convertToSchedule(scheduleData);
        setSchedule(formatted);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
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
