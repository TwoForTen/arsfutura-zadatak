import { combineReducers } from 'redux';

import userReducer from './User/reducer';
import { UserState } from './User/types';

export interface GlobalState {
  user: UserState;
}

const reducers = combineReducers({
  user: userReducer,
});

export default reducers;
