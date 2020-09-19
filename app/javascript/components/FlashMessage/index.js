import React, { useEffect, useContext } from 'react';
import Alert from 'react-bootstrap/Alert';
import PropTypes from 'prop-types';
import { FlashContext } from '../../contexts/FlashContext';

const FlashMessage = ({ text, variant }) => {
  const flashMessageTimeout = 3500;

  const { setMessage } = useContext(FlashContext);

  useEffect(() => {
    setTimeout(() => {
      setMessage({ text: '' });
    }, flashMessageTimeout);
  });

  return (
    <Alert variant={variant} className='flash-message'>
      {text}
    </Alert>
  );
};

FlashMessage.propTypes = {
  text: PropTypes.string,
  variant: PropTypes.oneOf(['success', 'danger']),
};

export default FlashMessage;
