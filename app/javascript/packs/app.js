// Run this example by adding <%= javascript_pack_tag 'app' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import ReactDOM from 'react-dom';
import { FlashProvider } from '../contexts/FlashContext';
import AppRouter from '../routes';

const App = () => (
  <FlashProvider>
    <Router>
      <Route path='/' component={AppRouter} />
    </Router>
  </FlashProvider>
);

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.body.appendChild(document.createElement('div'))
  );
});
