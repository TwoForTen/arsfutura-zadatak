import { EventsActions, EventsState, EventsActionTypes } from './types';

export const storeEvents = ({
  summary,
  start,
  end,
}: EventsState): EventsActions => {
  return {
    type: EventsActionTypes.STORE_EVENTS,
    summary,
    start,
    end,
  };
};
