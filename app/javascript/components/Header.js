import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const Header = () => {
  return (
    <div>
      <Navbar bg='light' variant='light' expand='md'>
        <Navbar.Brand as={Link} to='/'>
          EE
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse>
          <Nav className='nav-link-container'>
            <Nav.Link as={Link} to='/events'>
              Events
            </Nav.Link>
            <span className='nav-link-divider'>|</span>
            <Nav.Link as={Link} to='/login'>
              Login
            </Nav.Link>
            <Nav.Link as={Link} to='/register'>
              Register
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
