import { Event } from 'src/types';

export enum EventsActionTypes {
  STORE_EVENTS = 'STORE_EVENTS',
  CLEAR_EVENTS = 'CLEAR_EVENTS',
  DELETE_EVENT = 'DELETE_EVENT',
}

export type EventsState = Event[];

interface StoreEvents {
  type: EventsActionTypes.STORE_EVENTS;
  events: EventsState;
}

interface ClearEvents {
  type: EventsActionTypes.CLEAR_EVENTS;
}

interface DeleteEvent {
  type: EventsActionTypes.DELETE_EVENT;
  id: string;
}

export type EventsActions = StoreEvents | ClearEvents | DeleteEvent;
