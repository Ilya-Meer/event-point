import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

const Header = () => {
  return (
    <div>
      <Navbar bg='light' variant='light'>
        <Navbar.Brand href='/'>L&amp;L</Navbar.Brand>
        <Nav className='mr-auto'>
          <Nav.Link href='/events'>Events</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type='text' placeholder='Search' className='mr-sm-2' />
          <Button variant='outline-primary'>Search</Button>
        </Form>
      </Navbar>
    </div>
  );
};

export default Header;
