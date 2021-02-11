import { GoogleLogout } from 'react-google-login';
import { useSelector, useDispatch } from 'react-redux';
import styles from './navbar.module.scss';

import { logout } from 'src/store/User/actions';
import { GlobalState } from 'src/store';
import logo from 'src/assets/logo.svg';

const Navbar: React.FC = () => {
  const dispatch = useDispatch();

  const { id_token } = useSelector((state: GlobalState) => state.user.token);

  const onLogoutSuccess = (): void => {
    dispatch(logout());
  };

  return (
    <div className={styles.root}>
      <div className={styles.logo_container}>
        <img src={logo} alt="logo" />
        <h2>Calendarify</h2>
      </div>
      {id_token && (
        <GoogleLogout
          clientId={process.env.REACT_APP_CLIENT_ID || ''}
          onLogoutSuccess={onLogoutSuccess}
          render={({ onClick, disabled }) => {
            return (
              <button
                className={styles.button_logout}
                onClick={onClick}
                disabled={disabled}
              >
                <h4>Sign out</h4>
              </button>
            );
          }}
        />
      )}
    </div>
  );
};

export default Navbar;
