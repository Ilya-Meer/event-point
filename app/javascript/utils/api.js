const APICall = async (url, method, data) => {
  const baseURL = process.env.API_BASE_URL;

  const headers = {};

  const requiresApplicationHeader = ['POST', 'PUT', 'PATCH'];
  if (requiresApplicationHeader.includes(method)) {
    headers['Content-Type'] = 'application/json';
  }

  await fetch(`${baseURL}${url}`, {
    method,
    headers,
    body: JSON.stringify(data),
  });
};

const addEvent = async (eventData) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  return APICall('/events', 'POST', headers, eventData);
};

const getEvents = async () => {
  return APICall('/events', 'GET');
};

export { addEvent, getEvents };
