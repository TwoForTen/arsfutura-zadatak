import { Event } from 'src/types';

export enum EventsActionTypes {
  STORE_EVENTS = 'STORE_EVENTS',
  CLEAR_EVENTS = 'CLEAR_EVENTS',
}

export type EventsState = Event[];

interface StoreEvents {
  type: EventsActionTypes.STORE_EVENTS;
  events: EventsState;
}

interface ClearEvents {
  type: EventsActionTypes.CLEAR_EVENTS;
}

export type EventsActions = StoreEvents | ClearEvents;
