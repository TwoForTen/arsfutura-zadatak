import { GoogleLoginResponse } from 'react-google-login';
import { ThunkAction } from 'redux-thunk';

import { UserActions, UserActionTypes } from './types';

import { EventsActions } from 'src/store/Events/types';
import { clearEvents } from 'src/store/Events/actions';

export const storeUser = (googleResponse: GoogleLoginResponse): UserActions => {
  localStorage.setItem('@access_token', googleResponse.accessToken);
  localStorage.setItem('@id_token', googleResponse.tokenId);
  return {
    type: UserActionTypes.STORE_USER,
    googleResponse,
  };
};

const clearUser = (): UserActions => {
  localStorage.removeItem('@access_token');
  localStorage.removeItem('@id_token');
  return {
    type: UserActionTypes.LOGOUT,
  };
};

export const logout = (): ThunkAction<
  void,
  unknown,
  unknown,
  UserActions | EventsActions
> => {
  return (dispatch) => {
    dispatch(clearUser());
    dispatch(clearEvents());
  };
};
