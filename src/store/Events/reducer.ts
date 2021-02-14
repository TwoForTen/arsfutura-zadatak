import { EventsState, EventsActions, EventsActionTypes } from './types';

const initialState: EventsState = {
  events: [],
  loading: false,
};

const reducer = (state = initialState, action: EventsActions): EventsState => {
  switch (action.type) {
    case EventsActionTypes.STORE_EVENTS:
      return {
        events: action.events,
        loading: false,
      };
    case EventsActionTypes.CLEAR_EVENTS:
      return initialState;
    case EventsActionTypes.DELETE_EVENT:
      return {
        ...state,
        events: state.events.filter((event) => event.id !== action.id),
      };
    case EventsActionTypes.SET_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    default:
      return state;
  }
};

export default reducer;
