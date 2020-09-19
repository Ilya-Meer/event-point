import React from 'react';
import renderer from 'react-test-renderer';
import FlashMessage from '..';
import { FlashProvider } from '../../../contexts/FlashContext';

it('renders without crashing', () => {
  const text = 'An error occurred';

  const tree = renderer
    .create(
      <FlashProvider>
        <FlashMessage text={text} variant='danger' />
      </FlashProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
