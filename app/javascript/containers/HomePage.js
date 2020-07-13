import React from 'react';
import { Link } from 'react-router-dom';
import Page from '../components/Page';

const HomePage = () => (
  <Page>
    <h1>
      Ev<span className='homepage-ep-flourish'>id</span>ent Point
    </h1>
    <h3>Welcome to the Evident Point event tracker!</h3>
    <p>
      To view, upvote, or schedule events, please <Link to='/login'>login</Link>{' '}
      or <Link to='/register'>register</Link>.
    </p>
  </Page>
);

export default HomePage;
