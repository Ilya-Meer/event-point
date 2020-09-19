import React, { useState } from 'react';

const FlashContext = React.createContext();

const FlashProvider = ({ children }) => {
  const [message, setMessage] = useState({
    text: '',
    variant: null,
  });

  return (
    <FlashContext.Provider value={{ message, setMessage }}>
      {children}
    </FlashContext.Provider>
  );
};

export { FlashContext, FlashProvider };
