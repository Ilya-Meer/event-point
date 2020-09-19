const isSuccessfulResponse = (res) => res.status >= 200 && res.status < 300;

const errorMessages = {
  login: 'Invalid login. Please try again.',
  register: 'Unable to register your account. Please try again.',
  getEvents: 'Unable to fetch events. Please refresh the page to try again.',
  deleteEvent: 'Unable to delete event. Please try again.',
  getSchedule:
    'Unable to fetch schedule. Please refresh the page to try again.',
  scheduleEvent: 'Unable to modify schedule. Please try again.',
  vote: 'Unable to register vote status. Please try again.',
};

export { isSuccessfulResponse, errorMessages };
