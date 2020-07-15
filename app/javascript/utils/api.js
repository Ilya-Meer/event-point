const csrfToken = document.querySelector('[name="csrf-token"]').content;

const APICall = async (url, method, headers, data) => {
  await fetch(url, {
    method,
    headers,
    body: JSON.stringify(data),
  });
};

const addEvent = async (eventData) => {
  const headers = {
    'X-CSRF-TOKEN': csrfToken,
    'Content-Type': 'application/json',
  };

  return APICall('/api/v1/events', 'POST', headers, eventData);
};

export { APICall, addEvent };
