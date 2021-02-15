import { useEffect } from 'react';
import axios from 'src/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';

import { logout } from 'src/store/User/actions';

import { GlobalState } from 'src/store';

const ErrorBoundary: React.FC = ({ children }) => {
  const dispatch = useDispatch();
  const { access_token } = useSelector(
    (state: GlobalState) => state.user.token
  );

  const request = axios.interceptors.request.use((request) => {
    request.headers = {
      ...request.headers,
      Authorization: `Bearer ${access_token}`,
    };
    return request;
  });

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
      axios.interceptors.request.eject(request);
      axios.interceptors.response.eject(response);
    };
  }, [response, request]);

  return <>{children}</>;
};

export default ErrorBoundary;
