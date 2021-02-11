import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { GoogleLogin } from 'react-google-login';

import { GlobalState } from '../store';
import useLogin from 'src/hooks/useLogin';

interface AuthRouteProps {
  component: React.FC<RouteProps>;
  [rest: string]: any;
}

const AuthRoute: React.FC<AuthRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { id_token } = useSelector((state: GlobalState) => state.user.token);
  const login = useLogin();

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
        onSuccess={login}
        isSignedIn={Boolean(id_token)}
        render={() => <></>}
      />
    </>
  );
};

export default AuthRoute;
