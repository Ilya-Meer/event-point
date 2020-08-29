import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent, act } from '@testing-library/react';
import EventList from '..';

it('renders without crashing', () => {
  const tree = renderer
    .create(<EventList events={[]} updateEvents={() => {}} user={{}} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders events properly', () => {
  const events = [
    {
      id: 1,
      created_at: new Date(new Date() - 10000).toISOString(),
      topic: 'Test Topic 1',
      description: 'Test Description 1',
      votes: [],
    },
    {
      id: 2,
      created_at: new Date().toISOString(),
      topic: 'Test Topic 2',
      description: 'Test Description 2',
      votes: [],
    },
  ];

  render(<EventList events={events} />);

  expect(screen.getAllByText(/suggested by/)).toHaveLength(2);
});

it('opens and closes the event submission modal dialog', () => {
  const events = [];
  const user = {};
  const updateEvents = () => {};

  render(<EventList events={events} user={user} updateEvents={updateEvents} />);

  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

  fireEvent.click(screen.getByText('+ Propose Event'));

  expect(screen.queryByRole('dialog')).toBeInTheDocument();
});

it('adds an event', async () => {
  const events = [];

  const user = {
    id: 5,
    email: 'test@test.com',
  };

  const updateEvents = jest.fn();

  render(<EventList events={events} user={user} updateEvents={updateEvents} />);

  // open modal to add an event
  fireEvent.click(screen.getByText('+ Propose Event'));

  const topicInput = screen.getByLabelText('Topic');
  const descriptionInput = screen.getByLabelText('Description');
  const submitEventButton = screen.getByText('Propose Event');

  const topic = 'An awesome topic';
  const description = 'A fascinating description';

  // fill out form in modal
  fireEvent.change(topicInput, { target: { value: topic } });
  fireEvent.change(descriptionInput, {
    target: { value: description },
  });

  fetchMock.once(JSON.stringify({ topic, description }));

  // submit event form
  await act(async () => {
    await fireEvent.click(submitEventButton);
  });

  expect(fetchMock).toHaveBeenCalledTimes(1);

  const apiPayload = {
    body: JSON.stringify({
      event: {
        topic,
        description,
        owner_id: user.id,
      },
    }),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  };

  // event has been created on the server
  expect(fetchMock).toHaveBeenCalledWith(
    'http://localhost:3000/events',
    apiPayload
  );

  // local state has been updated
  expect(updateEvents).toHaveBeenCalledWith([
    {
      topic,
      description,
      owner: 'test@test.com',
      votes: [],
    },
  ]);
});
