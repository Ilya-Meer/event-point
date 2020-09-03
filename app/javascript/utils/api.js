/**
 * Base authentication module
 */
const APICall = async (url, method, data) => {
  const baseURL = process.env.API_BASE_URL;

  const headers = {};

  const requiresApplicationHeader = ['POST', 'PUT', 'PATCH'];
  if (requiresApplicationHeader.includes(method)) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(`${baseURL}${url}`, {
    method,
    headers,
    body: JSON.stringify(data),
  });

  return response;
};

/**
 * Events
 */
const getEvents = async () => {
  const res = await APICall('/events', 'GET');
  return res;
};

const addEvent = async (eventData) => {
  return APICall('/events', 'POST', eventData);
};

const editEvent = async (eventId, eventData) => {
  return APICall(`/events/${eventId}`, 'PATCH', eventData);
};

const deleteEvent = async (eventId) => {
  return APICall(`/events/${eventId}`, 'DELETE');
};

/**
 * Schedule
 */
const getScheduledEvents = async () => {
  const res = await APICall('/schedule', 'GET');
  return res;
};
const scheduleEvent = async (eventData) => {
  const res = await APICall('/schedule_event', 'PATCH', eventData);
  return res;
};
const unscheduleEvent = async (eventData) => {
  const res = await APICall('/unschedule_event', 'PATCH', eventData);
  return res;
};

/**
 * Voting
 */
const addVote = async (payload) => {
  return APICall('/add_vote', 'POST', payload);
};

const removeVote = async (payload) => {
  return APICall('/remove_vote', 'POST', payload);
};

/**
 * Authentication
 */
const login = async (user) => {
  const data = { user };

  return APICall('/sessions', 'POST', data);
};

const register = async (user) => {
  const data = { user };

  return APICall('/registrations', 'POST', data);
};

const logout = async () => {
  return APICall('/logout', 'DELETE');
};

const checkLoggedIn = async () => {
  return APICall('/logged_in', 'GET');
};

export {
  login,
  register,
  logout,
  getEvents,
  addEvent,
  editEvent,
  deleteEvent,
  getScheduledEvents,
  scheduleEvent,
  unscheduleEvent,
  addVote,
  removeVote,
  checkLoggedIn,
};
