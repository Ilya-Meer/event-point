import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Page from '../components/Page';

const HomePage = ({ isLoggedIn, user }) => {
  const loggedInContent = (
    <Fragment>
      <h3>{`Welcome, ${user.display_name || user.email}!`}</h3>
      <p>
        Visit the <Link to='/events'>events</Link> page to upvote existing
        events or propose one of your own.
      </p>
      <p>
        Or, visit the <Link to='/schedule'>schedule</Link> page to schedule an
        event for the future.
      </p>
    </Fragment>
  );

  const loggedOutContent = (
    <Fragment>
      <h3>Welcome to the Evident Point event tracker!</h3>
      <p>
        To view, upvote, or schedule events, please{' '}
        <Link to='/login'>login</Link> or <Link to='/register'>register</Link>.
      </p>
    </Fragment>
  );

  return (
    <Page>
      <h1>
        Ev<span className='homepage-ep-flourish'>id</span>ent Point
      </h1>
      {isLoggedIn ? loggedInContent : loggedOutContent}
    </Page>
  );
};

export default HomePage;

HomePage.defaultProps = {
  user: {},
};
