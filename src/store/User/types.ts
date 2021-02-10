import { UserProfile, TokenObj } from 'src/types';

export enum UserActionTypes {
  STORE_USER = 'STORE_USER',
}

export interface UserState {
  profile: UserProfile;
  token: TokenObj;
}

export interface StoreUserAction {
  type: UserActionTypes.STORE_USER;
  googleResponse: any;
}

export type UserActions = StoreUserAction;
