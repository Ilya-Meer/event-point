import React, { Fragment } from 'react';
import Header from './Header';

const HomePage = () => (
  <Fragment>
    <Header />
    <h1>
      Welcome to the Home Page! <a href='/events'>Events</a>
    </h1>
  </Fragment>
);

export default HomePage;
