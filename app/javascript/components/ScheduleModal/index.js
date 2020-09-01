import React, { Fragment, useState, forwardRef, useRef } from 'react';
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
  handleScheduleEvent,
}) => {
  const [selectedEventState, setSelectedEventState] = useState({
    datetime: new Date(),
  });

  const handleChangeScheduledEvent = (key, value) => {
    setSelectedEventState({ ...selectedEventState, [key]: value });
  };

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
            Schedule Event
          </Button>
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
  handleScheduleEvent: PropTypes.func,
};
