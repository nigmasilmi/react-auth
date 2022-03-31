import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';

import classes from './MainNavigation.module.css';

const links = {
  loggedIn: (
    <li>
      <button>Logout</button>
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

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  console.log(isLoggedIn, 'está logueado');
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
