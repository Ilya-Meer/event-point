import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { logout } from '../utils/api';

const Header = ({ isLoggedIn, history }) => {
  const logOut = async () => {
    try {
      await logout();
      history.push('/');
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar bg='light' variant='light' expand='md'>
        <Navbar.Brand as={Link} to='/'>
          EE
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse>
          <Nav className='nav-link-container'>
            <Nav.Link as={Link} to='/events' disabled={!isLoggedIn}>
              Events
            </Nav.Link>
            <Nav.Link as={Link} to='/schedule' disabled={!isLoggedIn}>
              Schedule
            </Nav.Link>
            <span className='nav-link-divider'>|</span>
            {isLoggedIn ? (
              <button onClick={logOut} className='nav-logout-button'>
                Logout
              </button>
            ) : (
              <Fragment>
                <Nav.Link as={Link} to='/login'>
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to='/register'>
                  Register
                </Nav.Link>
              </Fragment>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default withRouter(Header);

Header.propTypes = {
  isLoggedIn: PropTypes.bool,
  history: PropTypes.object,
};
