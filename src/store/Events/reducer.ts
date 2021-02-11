import { EventsState, EventsActions } from './types';

const initialState: EventsState = {
  summary: '',
  start: undefined,
  end: undefined,
};

const reducer = (state = initialState, action: EventsActions): EventsState => {
  switch (action.type) {
    default:
      return state;
  }
};

export default reducer;
