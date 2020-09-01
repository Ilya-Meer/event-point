import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Schedule from '..';
import ScheduleModal from '../../ScheduleModal';

it('renders without crashing', () => {
  const tree = renderer
    .create(
      <Schedule
        allEvents={[]}
        scheduledEvents={{}}
        updateSchedule={() => {}}
        updateAllEvents={() => {}}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('brings up the modal', async () => {
  render(
    <Schedule
      allEvents={[]}
      scheduledEvents={{}}
      updateSchedule={() => {}}
      updateAllEvents={() => {}}
    />
  );

  await act(async () => {
    await fireEvent.click(screen.getByText(/Schedule Event/));
  });

  expect(screen.queryByText('Select from existing events')).toBeInTheDocument();
});

it('schedules an event', async () => {
  const allEvents = [
    {
      id: 5,
      topic: 'An interesting topic',
    },
    {
      id: 6,
      topic: 'Another interesting topic',
    },
  ];

  render(
    <Schedule
      allEvents={allEvents}
      scheduledEvents={{}}
      updateSchedule={() => {}}
      updateAllEvents={() => {}}
    />
  );

  await act(async () => {
    await fireEvent.click(screen.getByText(/Schedule Event/));
  });

  await act(async () => {
    await fireEvent.click(screen.getByTestId('schedule-dropdown-toggle'));
  });

  const firstEvent = screen.queryByText('An interesting topic');

  expect(firstEvent).toBeInTheDocument();

  await act(async () => {
    await fireEvent.click(firstEvent);
  });

  const datePickerInput = screen.queryByRole('textbox');
  expect(datePickerInput).toBeInTheDocument();

  // TODO: Research mocking current date in order to correctly simulate datepicker selection

  fetchMock.once(JSON.stringify({})).once(JSON.stringify([]));

  await act(async () => {
    await fireEvent.click(screen.getByTestId('schedule-event-button'));
  });

  const requestBody = JSON.parse(fetchMock.mock.calls[0][1].body);
  expect(requestBody.event_id).toEqual(allEvents[0].id.toString());

  expect(fetchMock.mock.calls[0][0]).toEqual(
    'http://localhost:3000/schedule_event'
  );
});
