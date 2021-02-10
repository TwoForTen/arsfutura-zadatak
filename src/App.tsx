import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';

import { storeUser } from './store/User/actions';

const App = () => {
  const dispatch = useDispatch();

  const responseGoogle = (response: any) => {
    dispatch(storeUser(response));
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
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default App;
