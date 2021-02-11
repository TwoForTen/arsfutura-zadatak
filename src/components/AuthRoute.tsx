import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { GlobalState } from '../store';

interface AuthRouteProps {
  component: React.FC<RouteProps>;
  [rest: string]: any;
}

const AuthRoute: React.FC<AuthRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { id_token } = useSelector((state: GlobalState) => state.user.token);

  return (
    <Route
      {...rest}
      render={(props) => {
        return id_token ? <Component {...props} /> : <Redirect to="/" />;
      }}
    />
  );
};

export default AuthRoute;
