import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const Context = createContext(undefined);

const ContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();

  return (
    <Context.Provider value={{ loading, setLoading, user, setUser }}>{children}</Context.Provider>
  );
};

ContextProvider.propTypes = { children: PropTypes.any };

export { Context, ContextProvider };
