import React, { useState } from "react";
const AuthContext = React.createContext({
  token: "",
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

// this is the component passes the context
// and the context itself
export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;
  const logOutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const loginHandler = (token, expirationTime) => {
    // the journey begins here
    localStorage.setItem("token", token);
    // validación y retorno de respuesta
    setToken(token);

    // how much time does the token have left?
    const remainingTime = calculateRemainingTime(expirationTime);

    // start the timer
    setTimeout(logOutHandler, remainingTime);
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
