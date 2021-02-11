import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';
import { useDispatch } from 'react-redux';
import { storeUser } from 'src/store/User/actions';

const useLogin = () => {
  const dispatch = useDispatch();

  return (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    if (!response.code) dispatch(storeUser(response as GoogleLoginResponse));
  };
};

export default useLogin;
