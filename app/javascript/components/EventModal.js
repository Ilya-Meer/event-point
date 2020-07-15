import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { addEvent } from '../utils/api';

const EventModal = ({ show, handleDismiss }) => {
  const [eventState, setEventState] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    const newState = {
      ...eventState,
      [name]: value,
    };

    setEventState(newState);
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();

    try {
      const res = await addEvent(eventState);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal show={show} onHide={handleDismiss} className='event-modal'>
      <Modal.Header closeButton>
        <Modal.Title>Event Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>Add basic event information</Modal.Body>
      <Form className='event-modal-form' onSubmit={handleAddEvent}>
        <Form.Group controlId='formEventTopic'>
          <Form.Label>Title</Form.Label>
          <span className='form-input-required'>*</span>
          <Form.Control
            type='text'
            name='title'
            required
            onChange={handleChange}
          />
          <Form.Text className='text-muted'>What's the event about?</Form.Text>
        </Form.Group>
        <Form.Group controlId='formEventDescription'>
          <Form.Label>Description</Form.Label>
          <span className='form-input-required'>*</span>
          <Form.Control
            as='textarea'
            rows='3'
            name='description'
            required
            onChange={handleChange}
          />
          <Form.Text className='text-muted'>
            Provide some more information about the event you're proposing
          </Form.Text>
        </Form.Group>
        <Modal.Footer className='event-modal-footer'>
          <Button
            variant='primary'
            type='submit'
            className='event-modal-submit'
          >
            Propose Event
          </Button>
          <Button onClick={handleDismiss} variant='secondary' type='button'>
            Close
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EventModal;

EventModal.propTypes = {
  show: PropTypes.bool,
  handleDismiss: PropTypes.func,
};
