import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Page from '../components/Page';
import { login } from '../utils/api';
import { errorMessages, isSuccessfulResponse } from '../utils/error';
import { FlashContext } from '../contexts/FlashContext';

const LoginPage = () => {
  const [loginFormState, setLoginFormState] = useState({});
  const { setMessage } = useContext(FlashContext);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const newState = {
      ...loginFormState,
      [name]: value,
    };

    setLoginFormState(newState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await login(loginFormState);

      if (!isSuccessfulResponse(res)) {
        throw new Error(errorMessages.login);
      }

      window.location.reload();
    } catch (error) {
      console.error(error);
      setMessage({ text: error.message, variant: 'danger' });
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
