import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Page from '../components/Page';
import { register } from '../utils/api';

const RegisterPage = () => {
  const [registerFormState, setRegisterFormState] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    const newState = {
      ...registerFormState,
      [name]: value,
    };

    setRegisterFormState(newState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(registerFormState);
      const res = await register(registerFormState);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Page>
      <h1>Register</h1>
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
        <Form.Group controlId='formConfirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <span className='form-input-required'>*</span>
          <Form.Control
            type='password'
            name='password_confirmation'
            required
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId='formDisplayName'>
          <Form.Label>Display Name</Form.Label>
          <Form.Control
            type='text'
            name='display_name'
            onChange={handleChange}
          />
          <Form.Text className='text-muted'>
            If you don't provide a display name, your email will be used
            instead.
          </Form.Text>
        </Form.Group>
        <Button variant='primary' type='submit'>
          Sign Up
        </Button>
      </Form>
      <div className='register-page-prompt'>
        <p>
          If you already have an account, you can log in{' '}
          <Link to='/login'>here</Link>.
        </p>
      </div>
    </Page>
  );
};

export default RegisterPage;
