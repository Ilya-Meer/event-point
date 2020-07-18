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
const addEvent = async (eventData) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  return APICall('/events', 'POST', headers, eventData);
};

const getEvents = async () => {
  const res = await APICall('/events', 'GET');
  return res;
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

const checkLoggedIn = async () => {
  return APICall('/logged_in', 'GET');
};

export { login, register, addEvent, getEvents, checkLoggedIn };
