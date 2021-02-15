import { useEffect } from 'react';
import axios from 'src/axiosInstance';
import { useDispatch } from 'react-redux';

import { logout } from 'src/store/User/actions';

const ErrorBoundary: React.FC = ({ children }) => {
  const dispatch = useDispatch();

  const response = axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      switch (error.response.status) {
        case 403:
        case 401:
          dispatch(logout());
          break;
        default:
          break;
      }
    }
  );

  useEffect(() => {
    return () => {
      axios.interceptors.response.eject(response);
    };
  }, [response]);

  return <>{children}</>;
};

export default ErrorBoundary;
