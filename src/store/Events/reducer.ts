import { EventsState, EventsActions, EventsActionTypes } from './types';

const initialState: EventsState = [];

const reducer = (state = initialState, action: EventsActions): EventsState => {
  switch (action.type) {
    case EventsActionTypes.STORE_EVENTS:
      return action.events;
    case EventsActionTypes.CLEAR_EVENTS:
      return [];
    case EventsActionTypes.DELETE_EVENT:
      return state.filter((event) => event.id !== action.id);
    default:
      return state;
  }
};

export default reducer;
