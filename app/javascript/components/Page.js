import React, { Fragment } from 'react';
import Container from 'react-bootstrap/Container';

const Page = ({ children }) => (
  <Fragment>
    <Container className='page-layout'>{children}</Container>
  </Fragment>
);

export default Page;
