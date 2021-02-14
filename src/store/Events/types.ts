import { Event } from 'src/types';

export enum EventsActionTypes {
  STORE_EVENTS = 'STORE_EVENTS',
  CLEAR_EVENTS = 'CLEAR_EVENTS',
  DELETE_EVENT = 'DELETE_EVENT',
  INSERT_EVENT = 'INSERT_EVENT',
  SET_LOADING = 'SET_LOADING',
}

export interface EventsState {
  events: Event[];
  loading: boolean;
}

interface StoreEvents {
  type: EventsActionTypes.STORE_EVENTS;
  events: Event[];
}

interface ClearEvents {
  type: EventsActionTypes.CLEAR_EVENTS;
}

interface DeleteEvent {
  type: EventsActionTypes.DELETE_EVENT;
  id: string;
}

interface InsertEvent {
  type: EventsActionTypes.INSERT_EVENT;
  event: Event;
}

interface SetLoading {
  type: EventsActionTypes.SET_LOADING;
}

export type EventsActions =
  | StoreEvents
  | ClearEvents
  | DeleteEvent
  | InsertEvent
  | SetLoading;
