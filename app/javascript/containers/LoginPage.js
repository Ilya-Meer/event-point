import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Page from '../components/Page';

const LoginPage = () => {
  const [eventState, setEventState] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    const newState = {
      ...eventState,
      [name]: value,
    };

    setEventState(newState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(eventState);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Page>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit} className='generic-form'>
        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <span className='form-input-required'>*</span>
          <Form.Control
            type='email'
            name='email'
            required
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <span className='form-input-required'>*</span>
          <Form.Control
            type='password'
            name='password'
            required
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Log In
        </Button>
      </Form>
      <div className='login-page-prompt'>
        <p>
          If you don't have an account yet, you can register{' '}
          <Link to='/register'>here</Link>.
        </p>
      </div>
    </Page>
  );
};

export default LoginPage;
