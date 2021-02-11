import { combineReducers } from 'redux';

import userReducer from './User/reducer';
import { UserState } from './User/types';

import eventsReducer from './Events/reducer';
import { EventsState } from './Events/types';

export interface GlobalState {
  user: UserState;
  events: EventsState;
}

const reducers = combineReducers({
  user: userReducer,
  events: eventsReducer,
});

export default reducers;
