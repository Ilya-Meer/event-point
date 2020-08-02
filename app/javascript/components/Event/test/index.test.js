import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Event from '..';

it('renders without crashing', () => {
  const user = {};
  const event = {
    votes: [],
  };

  const tree = renderer.create(<Event user={user} event={event} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('displays vote information properly', () => {
  const user = {};
  const event = {
    votes: [
      {
        id: 1,
        user_id: 1,
        event_id: 1,
      },
    ],
  };

  render(<Event user={user} event={event} />);

  expect(screen.getByText(/Votes/)).toBeInTheDocument();
  expect(screen.getByText(/Votes/)).toHaveTextContent('Votes: 1');
});

it('increments vote information in local state if user has not voted', async () => {
  const user = { id: 5 };
  const event = {
    id: 1,
    votes: [
      {
        id: 1,
        user_id: 1,
        event_id: 1,
      },
    ],
  };

  fetchMock.once();

  render(<Event user={user} event={event} />);

  expect(screen.getByText(/Votes/)).toHaveTextContent('Votes: 1');

  await act(async () => {
    await fireEvent.click(screen.getByRole('button'));
  });

  expect(screen.getByText(/Votes/)).toHaveTextContent('Votes: 2');
  expect(fetchMock).toHaveBeenCalledTimes(1);

  const apiPayload = {
    body: '{"user_id":5,"event_id":1}',
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  };

  expect(fetchMock).toHaveBeenCalledWith(
    'http://localhost:3000/add_vote',
    apiPayload
  );
});

it('decrements vote information in local state if user already voted', async () => {
  const user = { id: 1 };
  const event = {
    id: 1,
    votes: [
      {
        id: 1,
        user_id: 1,
        event_id: 1,
      },
    ],
  };

  fetchMock.once();

  render(<Event user={user} event={event} />);

  expect(screen.getByText(/Votes/)).toHaveTextContent('Votes: 1');

  await act(async () => {
    await fireEvent.click(screen.getByRole('button'));
  });

  expect(screen.getByText(/Votes/)).toHaveTextContent('Votes: 0');
  expect(fetchMock).toHaveBeenCalledTimes(1);

  const apiPayload = {
    body: '{"user_id":1,"event_id":1}',
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  };

  expect(fetchMock).toHaveBeenCalledWith(
    'http://localhost:3000/remove_vote',
    apiPayload
  );
});
