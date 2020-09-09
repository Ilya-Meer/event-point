import React, {
  Fragment,
  useState,
  forwardRef,
  useRef,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const ScheduleModal = ({
  show,
  handleDismiss,
  events,
  eventToReschedule,
  handleScheduleEvent,
  handleUnscheduleEvent,
}) => {
  const [selectedEventState, setSelectedEventState] = useState({
    datetime: new Date(),
    event_id: eventToReschedule.id,
  });

  const handleChangeScheduledEvent = (key, value) => {
    setSelectedEventState({ ...selectedEventState, [key]: value });
  };

  useEffect(() => {
    handleChangeScheduledEvent('event_id', eventToReschedule.id);
  }, [eventToReschedule]);

  const ref = useRef(null);

  const CustomDatePickerInput = forwardRef(({ onClick, value }, ref) => (
    <Fragment>
      <label htmlFor='schedule-datepicker-input'>Date &amp; Time</label>
      <span className='form-input-required'>*</span>
      <input
        id='schedule-datepicker-input'
        className='schedule-date-input'
        onClick={onClick}
        value={value}
        onChange={onClick}
        ref={ref}
      />
    </Fragment>
  ));

  const renderDropdownDisplay = () => {
    if (eventToReschedule.topic) {
      return eventToReschedule.topic;
    }

    const defaultMessage = 'Select Event';

    if (!events || !events.length) {
      return defaultMessage;
    }

    const selectedEvent = events.find(
      (event) => event.id === Number(selectedEventState.event_id)
    );

    if (!selectedEvent) {
      return defaultMessage;
    }

    return selectedEvent.topic;
  };

  return (
    <Modal show={show} onHide={handleDismiss} className='modal'>
      <Modal.Header closeButton>
        <Modal.Title>Schedule Event</Modal.Title>
      </Modal.Header>
      <Modal.Body>Select from existing events</Modal.Body>
      <Form
        className='modal-form'
        onSubmit={(e) => {
          e.preventDefault();

          handleScheduleEvent(selectedEventState);
          setSelectedEventState({ datetime: new Date() });
        }}
      >
        <Dropdown>
          <Dropdown.Toggle
            className='schedule-modal-dropdown'
            data-testid='schedule-dropdown-toggle'
            disabled={!!eventToReschedule.id}
          >
            {renderDropdownDisplay()}
          </Dropdown.Toggle>
          <Dropdown.Menu className='schedule-dropdown-menu'>
            {events.map((event) => (
              <Dropdown.Item
                key={event.id}
                onSelect={(event_id) =>
                  handleChangeScheduledEvent('event_id', event_id)
                }
                eventKey={event.id}
              >
                {event.topic}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <DatePicker
          selected={selectedEventState.datetime}
          onChange={(date) => handleChangeScheduledEvent('datetime', date)}
          showTimeSelect
          minDate={new Date()}
          dateFormat='MMM d, yyyy h:mm aa'
          timeFormat='h:mm aa'
          customInput={<CustomDatePickerInput ref={ref} />}
        />
        <Modal.Footer className='modal-footer'>
          <Button
            variant='primary'
            type='submit'
            className='modal-submit'
            data-testid='schedule-event-button'
          >
            {eventToReschedule.id ? 'Reschedule Event' : 'Schedule Event'}
          </Button>
          {eventToReschedule.id && (
            <Button
              variant='danger'
              className='modal-submit'
              data-testid='schedule-event-button'
              onClick={() => handleUnscheduleEvent(eventToReschedule.id)}
            >
              Unschedule
            </Button>
          )}
          <Button onClick={handleDismiss} variant='secondary' type='button'>
            Close
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ScheduleModal;

ScheduleModal.propTypes = {
  show: PropTypes.bool,
  handleDismiss: PropTypes.func,
  events: PropTypes.array,
  eventToReschedule: PropTypes.object,
  handleScheduleEvent: PropTypes.func,
  handleUnscheduleEvent: PropTypes.func,
};
