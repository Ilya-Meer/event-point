import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const HomePage = () => (
  <Fragment>
    <Header />
    <h1>
      Welcome to the Home Page! <Link to='/events'>Events</Link>
    </h1>
  </Fragment>
);

export default HomePage;
