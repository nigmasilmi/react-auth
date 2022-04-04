import React, { useState, useEffect, useCallback } from 'react';

let logoutTimer;

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  // timestamp of the time in the future as string
  // this timestamp is calculated in the then function waiting for the response
  const adjustedExpTime = new Date(expirationTime).getTime();
  const remainingDuration = adjustedExpTime - currentTime;
  return remainingDuration;
};

// check if the token is still valid, if not, log the user out
const retrieveStorageToken = () => {
  const storedToken = localStorage.getItem('token');
  const storedExpirationDate = localStorage.getItem('expirationTime');

  // how much time left does the token have?
  const timeLeft = calculateRemainingTime(storedExpirationDate);

  if (timeLeft <= 0) {
    // remove token and expirationTime
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    // don't log the user in
    return null;
  }
  return { token: storedToken, timeLeft };
};

// this is the component passes the context
// and the context itself
export const AuthContextProvider = (props) => {
  // is the token still valid?
  const tokenData = retrieveStorageToken();
  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
  }

  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;

  const logOutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');

    // if the user logs out manually, clear the timer
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (token, expirationTime) => {
    // the journey begins here
    localStorage.setItem('token', token);
    localStorage.setItem('expirationTime', expirationTime);
    // validación y retorno de respuesta
    setToken(token);

    // how much time does the token have left?
    const remainingTime = calculateRemainingTime(expirationTime);

    // start the timer to log the user out
    logoutTimer = setTimeout(logOutHandler, remainingTime);
  };

  // if the tokenData is still valid, start the logout timer
  // with the remaining time
  useEffect(() => {
    if (tokenData) {
      console.log('timeLeft', tokenData.timeLeft);
      logoutTimer = setTimeout(logOutHandler, tokenData.timeLeft);
    }
  }, [tokenData, logOutHandler]);

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
