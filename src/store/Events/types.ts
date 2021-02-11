export enum EventsActionTypes {
  STORE_EVENTS = 'STORE_EVENTS',
}

export interface EventsState {
  summary: string;
  start: Date | undefined;
  end: Date | undefined;
}

interface StoreEvents extends EventsState {
  type: EventsActionTypes.STORE_EVENTS;
}

export type EventsActions = StoreEvents;
