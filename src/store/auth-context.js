import React, { useState } from 'react';
const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const eT = new Date(expirationTime).getTime();
  const remainingTime = eT - currentTime;
  return remainingTime;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem('token');
  const storedExpirationDate = localStorage.getItem('expDt');
  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 0) {
    localStorage.removeItem('token');
    localStorage.removeItem('expDt');
    return null;
  }
  return { token: storedToken };
};

// this is the component passes the context
// and the context itself
export const AuthContextProvider = (props) => {
  let logoutTimer;

  const initialToken = localStorage.getItem('token');
  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;

  const logOutHandler = () => {
    setToken(null);
    localStorage.removeItem('token');
    if (logOutHandler) {
      clearTimeout(logOutHandler);
    }
  };

  const loginHandler = (token, expirationTime) => {
    setToken(token);
    localStorage.setItem('token', token);
    localStorage.setItem('expDt', expirationTime);
    logoutTimer = setTimeout(
      logOutHandler,
      calculateRemainingTime(expirationTime)
    );
    // setTimeout(logOutHandler, 3000);
  };

  const contextValue = {
    token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logOutHandler,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
