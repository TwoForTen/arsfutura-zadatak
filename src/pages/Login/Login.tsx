import { GoogleLogin } from 'react-google-login';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { GlobalState } from 'src/store';
import useLogin from 'src/hooks/useLogin';

import styles from './login.module.scss';
import loginimg from 'src/assets/loginimg.svg';

const Login: React.FC = () => {
  const login = useLogin();
  const { id_token } = useSelector((state: GlobalState) => state.user.token);

  const responseGoogleError = (error: any) => {
    console.log(error);
  };

  if (id_token) return <Redirect to="/calendar" />;

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
          onSuccess={login}
          onFailure={responseGoogleError}
          cookiePolicy={'single_host_origin'}
          scope={
            'profile email https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events'
          }
        />
      </div>
    </main>
  );
};

export default Login;
