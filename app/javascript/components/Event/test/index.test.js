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

  expect(screen.getByTestId('num-votes')).toBeInTheDocument();
  expect(screen.getByTestId('num-votes')).toHaveTextContent('1');
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

  expect(screen.getByTestId('num-votes')).toHaveTextContent('1');

  await act(async () => {
    await fireEvent.click(screen.getByText('Upvote'));
  });

  expect(screen.getByTestId('num-votes')).toHaveTextContent('2');
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

  expect(screen.getByTestId('num-votes')).toHaveTextContent('1');

  await act(async () => {
    await fireEvent.click(screen.getByText('Unvote'));
  });

  expect(screen.getByTestId('num-votes')).toHaveTextContent('0');
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

it('allows edit and delete privileges if logged in user is event owner', () => {
  const user = {
    id: 3,
  };

  const event = {
    id: 100,
    topic: 'A topic',
    description: 'A description',
    votes: [],
    owner_id: 3,
  };

  const handleEditEvent = () => {};

  render(<Event user={user} event={event} handleEditEvent={handleEditEvent} />);

  expect(screen.getByText('Edit')).toBeInTheDocument();
  expect(screen.getByText('Delete')).toBeInTheDocument();
  expect(screen.getAllByRole('button').length).toEqual(3);
});

it('does not allow edit and delete privileges if logged in user is not event owner', () => {
  const user = {
    id: 3,
  };

  const event = {
    id: 100,
    topic: 'A topic',
    description: 'A description',
    votes: [],
    owner_id: 5,
  };

  const handleEditEvent = () => {};

  render(<Event user={user} event={event} handleEditEvent={handleEditEvent} />);

  expect(screen.queryByText('Edit')).toBeNull();
  expect(screen.queryByText('Delete')).toBeNull();

  expect(screen.getAllByRole('button').length).toEqual(1);
});

it('calls edit event callback when edit button clicked', async () => {
  const user = {};
  const event = {
    id: 100,
    topic: 'A topic',
    description: 'A description',
    votes: [],
  };

  const handleEditEvent = jest.fn();

  render(<Event user={user} event={event} handleEditEvent={handleEditEvent} />);

  expect(screen.getByText('Edit')).toBeInTheDocument();

  await act(async () => {
    await fireEvent.click(screen.getByText('Edit'));
  });

  expect(handleEditEvent).toHaveBeenCalledWith(100);
});
