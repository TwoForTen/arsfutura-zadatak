import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';
import { useDispatch } from 'react-redux';

import { storeUser } from 'src/store/User/actions';

import styles from './login.module.scss';
import loginimg from 'src/assets/loginimg.svg';

const Login: React.FC = () => {
  const dispatch = useDispatch();

  const responseGoogleSuccess = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    if (!response.code) dispatch(storeUser(response as GoogleLoginResponse));
  };

  const responseGoogleError = (error: any) => {
    console.log(error);
  };

  return (
    <main className={styles.container}>
      <div className={styles.col}>
        <div className={styles.img_container}>
          <img className={styles.img} src={loginimg} alt="Login" />
        </div>
      </div>
      <div className={styles.col}>
        <h1>Manage Your Events</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad odio
          voluptatem atque ipsam tenetur cupiditate ex beatae optio, possimus
          inventore?
        </p>
        <GoogleLogin
          clientId={process.env.REACT_APP_CLIENT_ID || ''}
          buttonText="Login With Google"
          onSuccess={responseGoogleSuccess}
          onFailure={responseGoogleError}
          cookiePolicy={'single_host_origin'}
        />
      </div>
    </main>
  );
};

export default Login;
