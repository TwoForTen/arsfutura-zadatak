import { EventsState, EventsActions, EventsActionTypes } from './types';

const initialState: EventsState = {
  events: [],
  loading: false,
  error: '',
};

const reducer = (state = initialState, action: EventsActions): EventsState => {
  switch (action.type) {
    case EventsActionTypes.STORE_EVENTS:
      return {
        events: action.events,
        loading: false,
        error: '',
      };
    case EventsActionTypes.CLEAR_EVENTS:
      return initialState;
    case EventsActionTypes.DELETE_EVENT:
      return {
        ...state,
        events: state.events.filter((event) => event.id !== action.id),
      };
    case EventsActionTypes.INSERT_EVENT:
      return {
        ...state,
        events: [...state.events, action.event],
      };
    case EventsActionTypes.SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case EventsActionTypes.SET_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
