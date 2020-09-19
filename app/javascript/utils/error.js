const isSuccessfulResponse = (res) => res.status >= 200 && res.status < 300;

const errorMessages = {
  login: 'Invalid login. Please try again.',
  register: 'Unable to register your account. Please try again.',
  deleteEvent: 'Unable to delete event. Please try again.',
};

export { isSuccessfulResponse, errorMessages };
