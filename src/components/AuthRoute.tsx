import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';

import { GlobalState } from '../store';
import { storeUser } from '../store/User/actions';

interface AuthRouteProps {
  component: React.FC<RouteProps>;
  [rest: string]: any;
}

const AuthRoute: React.FC<AuthRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const dispatch = useDispatch();
  const { id_token } = useSelector((state: GlobalState) => state.user.token);

  const responseGoogleSuccess = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    if (!response.code) dispatch(storeUser(response as GoogleLoginResponse));
  };

  return (
    <>
      <Route
        {...rest}
        render={(props) => {
          return id_token ? <Component {...props} /> : <Redirect to="/" />;
        }}
      />
      <GoogleLogin
        clientId={process.env.REACT_APP_CLIENT_ID || ''}
        onSuccess={responseGoogleSuccess}
        isSignedIn={Boolean(id_token)}
        render={() => <></>}
      />
    </>
  );
};

export default AuthRoute;
