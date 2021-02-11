import { Event } from 'src/types';

export enum EventsActionTypes {
  STORE_EVENTS = 'STORE_EVENTS',
}

export type EventsState = Event[];

interface StoreEvents {
  type: EventsActionTypes.STORE_EVENTS;
  events: EventsState;
}

export type EventsActions = StoreEvents;
