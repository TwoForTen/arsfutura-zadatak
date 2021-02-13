import { EventsActions, EventsState, EventsActionTypes } from './types';
import { ThunkAction } from 'redux-thunk';
import axios from 'src/axiosInstance';

import { GlobalState } from '../';
import { Event } from 'src/types';

const storeEvents = (events: EventsState): EventsActions => {
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

export const fetchEvents = (
  timeMax: string
): ThunkAction<void, GlobalState, unknown, EventsActions> => {
  return async (dispatch, getState) => {
    const { access_token } = getState().user.token;

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
