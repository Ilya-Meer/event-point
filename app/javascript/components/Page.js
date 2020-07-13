import React, { Fragment } from 'react';
import Container from 'react-bootstrap/Container';
import Header from '../components/Header';

const Page = ({ children }) => (
  <Fragment>
    <Header />
    <Container className='page-layout'>{children}</Container>
  </Fragment>
);

export default Page;
