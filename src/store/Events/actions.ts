import { EventsActions, EventsState, EventsActionTypes } from './types';
import { ThunkAction } from 'redux-thunk';
import axios from 'src/axiosInstance';

import { GlobalState } from '../';

const storeEvents = ({ summary, start, end }: EventsState): EventsActions => {
  return {
    type: EventsActionTypes.STORE_EVENTS,
    summary,
    start,
    end,
  };
};

export const fetchEvents = (
  timeMax: string
): ThunkAction<void, GlobalState, unknown, EventsActions> => {
  return async (dispatch, getState) => {
    const { access_token } = getState().user.token;

    await axios
      .get(
        `/primary/events?timeMin=${new Date().toISOString()}&timeMax=${timeMax}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .then(({ data }) => {
        console.log(data);
      });
  };
};
