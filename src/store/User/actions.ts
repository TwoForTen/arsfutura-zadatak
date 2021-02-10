import { GoogleLoginResponse } from 'react-google-login';

import { UserActions, UserActionTypes } from './types';

export const storeUser = (googleResponse: GoogleLoginResponse): UserActions => {
  return {
    type: UserActionTypes.STORE_USER,
    googleResponse,
  };
};
