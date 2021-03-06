import { UserActions, UserState, UserActionTypes } from './types';

const initialState: UserState = {
  profile: {
    email: '',
    familyName: '',
    givenName: '',
    googleId: '',
    imageUrl: '',
    name: '',
  },
  token: {
    access_token: localStorage.getItem('@access_token') || '',
    id_token: localStorage.getItem('@id_token') || '',
  },
};

const reducer = (state = initialState, action: UserActions): UserState => {
  switch (action.type) {
    case UserActionTypes.STORE_USER:
      return {
        profile: action.googleResponse.profileObj,
        token: {
          access_token: action.googleResponse.tokenObj.access_token,
          id_token: action.googleResponse.tokenObj.id_token,
        },
      };
    case UserActionTypes.LOGOUT:
      return {
        ...initialState,
        token: {
          ...initialState.token,
          access_token: '',
          id_token: '',
        },
      };
    default:
      return state;
  }
};

export default reducer;
