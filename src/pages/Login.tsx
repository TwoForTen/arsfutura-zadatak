import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';
import { useDispatch } from 'react-redux';

import { storeUser } from 'src/store/User/actions';

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
    <GoogleLogin
      clientId={process.env.REACT_APP_CLIENT_ID || ''}
      buttonText="Login With Google"
      onSuccess={responseGoogleSuccess}
      onFailure={responseGoogleError}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default Login;
