import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const EventPage = () => (
  <Fragment>
    <Header />
    <h1>
      Welcome to the Events Page! <Link to='/'>Home</Link>
    </h1>
  </Fragment>
);

export default EventPage;
