import { EventsState, EventsActions, EventsActionTypes } from './types';

const initialState: EventsState = [];

const reducer = (state = initialState, action: EventsActions): EventsState => {
  switch (action.type) {
    case EventsActionTypes.STORE_EVENTS:
      return action.events;
    default:
      return state;
  }
};

export default reducer;
