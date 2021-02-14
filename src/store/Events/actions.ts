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

const deleteEventStore = (id: string): EventsActions => {
  return {
    type: EventsActionTypes.DELETE_EVENT,
    id,
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
  return async (dispatch, getState) => {
    const { access_token } = getState().user.token;
    dispatch(setLoading());
    await axios
      .get('/primary/events', {
        params: {
          timeMin: new Date().toISOString(),
          timeMax,
        },
        headers: {
          Authorization: `Bearer ${access_token}`,
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
      });
  };
};

export const deleteEvent = (
  id: string
): ThunkAction<void, GlobalState, unknown, EventsActions> => {
  return async (dispatch, getState) => {
    const { access_token } = getState().user.token;
    dispatch(setLoading());

    await axios
      .delete(`/primary/events/${id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then(() => dispatch(deleteEventStore(id)));
  };
};
