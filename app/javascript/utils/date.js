import { format } from 'date-fns';

const convertToSchedule = (scheduleData) => {
  return scheduleData.reduce((acc, event) => {
    const date = format(new Date(event.datetime), 'MMM dd, yyyy');

    if (acc[date]) {
      acc[date].push(event);
      return acc;
    }

    acc[date] = [event];
    return acc;
  }, {});
};

export { convertToSchedule };
