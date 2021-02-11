import { GoogleLoginResponse } from 'react-google-login';

import { UserActions, UserActionTypes } from './types';

export const storeUser = (googleResponse: GoogleLoginResponse): UserActions => {
  localStorage.setItem('@access_token', googleResponse.accessToken);
  localStorage.setItem('@id_token', googleResponse.tokenId);
  return {
    type: UserActionTypes.STORE_USER,
    googleResponse,
  };
};
