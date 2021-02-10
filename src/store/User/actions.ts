import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';

import { UserActions, UserActionTypes } from './types';

export const storeUser = (
  googleResponse: GoogleLoginResponse | GoogleLoginResponseOffline
): UserActions => {
  return {
    type: UserActionTypes.STORE_USER,
    googleResponse,
  };
};
