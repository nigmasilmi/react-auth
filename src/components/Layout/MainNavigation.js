import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../store/auth-context';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  console.log(isLoggedIn, 'está logueado');

  const logoutHandler = () => {
    authCtx.logout();
    history.replace('/auth');
  };

  const links = {
    loggedIn: (
      <li>
        <button onClick={logoutHandler}>Logout</button>
      </li>
    ),
    notLoggedIn: (
      <li>
        <Link to="auth">Login</Link>
      </li>
    ),
    profile: (
      <li>
        <Link to="/profile">Profile</Link>
      </li>
    ),
  };

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {isLoggedIn ? links.profile : null}

          {isLoggedIn ? links.loggedIn : links.notLoggedIn}
          {/* <li>
            <button>Logout</button>
          </li> */}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
