import { EventsActions, EventsActionTypes } from './types';
import { ThunkAction } from 'redux-thunk';
import axios from 'src/axiosInstance';

import { GlobalState } from '../';
import { Event } from 'src/types';

const storeEvents = (events: Event[]): EventsActions => {
  return {
    type: EventsActionTypes.STORE_EVENTS,
    events,
  };
};

export const clearEvents = (): EventsActions => {
  return {
    type: EventsActionTypes.CLEAR_EVENTS,
  };
};

export const deleteEvent = (id: string): EventsActions => {
  return {
    type: EventsActionTypes.DELETE_EVENT,
    id,
  };
};

export const insertEvent = (event: Event): EventsActions => {
  return {
    type: EventsActionTypes.INSERT_EVENT,
    event,
  };
};

const setLoading = (): EventsActions => {
  return {
    type: EventsActionTypes.SET_LOADING,
  };
};

export const fetchEvents = (
  timeMax: string
): ThunkAction<void, GlobalState, unknown, EventsActions> => {
  return (dispatch) => {
    dispatch(clearEvents());
    dispatch(setLoading());
    axios
      .get('/primary/events', {
        params: {
          timeMin: new Date().toISOString(),
          timeMax,
        },
      })
      .then(({ data }) => {
        const events: Event[] = data.items.map(
          (event: any): Event => {
            return {
              id: event.id,
              summary: event.summary,
              start: event.start.dateTime,
              end: event.end.dateTime,
            };
          }
        );
        dispatch(storeEvents(events));
      })
      .catch((err) => {});
  };
};
