import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';
import { useDispatch } from 'react-redux';

import { storeUser } from './store/User/actions';

const App = () => {
  const dispatch = useDispatch();

  const responseGoogleSuccess = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    dispatch(storeUser(response));
  };

  const responseGoogleError = (error: any) => {
    console.log(error);
  };

  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_CLIENT_ID || ''}
      // render={({ onClick, disabled }) => (
      //   <button onClick={onClick} disabled={disabled}>
      //     This is my custom Google button
      //   </button>
      // )}
      buttonText="Login With Google"
      onSuccess={responseGoogleSuccess}
      onFailure={responseGoogleError}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default App;
