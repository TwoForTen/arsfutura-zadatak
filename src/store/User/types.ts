import { GoogleLoginResponse } from 'react-google-login';

import { UserProfile, TokenObj } from 'src/types';

export enum UserActionTypes {
  STORE_USER = 'STORE_USER',
  LOGOUT = 'LOGOUT',
}

export interface UserState {
  profile: UserProfile;
  token: TokenObj;
}

export interface StoreUserAction {
  type: UserActionTypes.STORE_USER;
  googleResponse: GoogleLoginResponse;
}

export interface Logout {
  type: UserActionTypes.LOGOUT;
}

export type UserActions = StoreUserAction | Logout;
