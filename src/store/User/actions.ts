import { UserActions, UserActionTypes } from './types';

export const storeUser = (googleResponse: any): UserActions => {
  return {
    type: UserActionTypes.STORE_USER,
    googleResponse,
  };
};
