import classes from './ProfileForm.module.css';
import { useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../store/auth-context';

const ProfileForm = () => {
  const history = useHistory();
  const newPasswordRef = useRef();
  const authCtx = useContext(AuthContext);

  const changePasswordHandler = (event) => {
    event.preventDefault();

    const newPassword = newPasswordRef.current.value;
    const idToken = authCtx.token;

    const url = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.REACT_APP_FIREBASE_API_KEY}`;
    // call to API
    // loading

    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        idToken,
        password: newPassword,
        returnSecureToken: true,
      }),
      headers: { 'Content-type': 'application/json' },
    })
      .then((res) => {
        res.json().then((json) => {
          console.log(json);
          history.replace('/');
        });
      })
      .catch((err) => {
        console.log(err);
      });
    // error
    // success
  };

  return (
    <form className={classes.form} onSubmit={changePasswordHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPasswordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
