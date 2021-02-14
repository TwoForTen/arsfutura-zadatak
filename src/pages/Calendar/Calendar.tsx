import { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserInfo from 'src/components/UserInfo/UserInfo';
import { add, format, startOfWeek, endOfWeek } from 'date-fns';
import styles from './calendar.module.scss';

import EventCard from 'src/components/EventCard/EventCard';
import GroupTitle from 'src/components/GroupTitle/GroupTitle';
import AddEventModal from 'src/components/AddEventModal/AddEventModal';

import { fetchEvents } from 'src/store/Events/actions';
import { GlobalState } from 'src/store';
import { Event, GroupedEvents } from 'src/types';

const DATE_FORMAT: string = 'E, dd/LL';

const Calendar: React.FC = () => {
  const dispatch = useDispatch();

  const events = useSelector((state: GlobalState) => state.events);
  const [groupedEvents, setGroupedEvents] = useState<GroupedEvents>({});
  const [timeframe, setTimeframe] = useState<number>(7);
  const [modalOpened, setModalOpened] = useState<boolean>(false);

  useEffect(() => {
    setGroupedEvents({});
    dispatch(fetchEvents(add(new Date(), { days: timeframe }).toISOString()));
  }, [dispatch, timeframe]);

  useEffect(() => {
    setGroupedEvents({});
    let stateUpdate: GroupedEvents = {};

    [...events.events]
      .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
      .forEach((event: Event): void => {
        const eventDate =
          timeframe === 30
            ? `${format(
                new Date(startOfWeek(new Date(event.start))),
                DATE_FORMAT
              )} - ${format(
                new Date(endOfWeek(new Date(event.start))),
                DATE_FORMAT
              )}`
            : format(new Date(event.start), DATE_FORMAT);
        stateUpdate = {
          ...stateUpdate,
          [eventDate]: stateUpdate[eventDate]
            ? [...stateUpdate[eventDate], event]
            : [event],
        };
      });

    setGroupedEvents(stateUpdate);
  }, [events, timeframe]);

  const EVENTS_FETCHING: JSX.Element = (
    <div className={styles.events_status_container}>
      <span>Fetching events...</span>
    </div>
  );
  const EVENTS_NOT_FOUND: JSX.Element = (
    <div className={styles.events_status_container}>
      <span>No events found</span>
    </div>
  );
  const EVENT_LIST: JSX.Element[] = Object.entries(groupedEvents).map(
    ([date, dateEvents]) => {
      return (
        <Fragment key={date}>
          <GroupTitle>{date}</GroupTitle>
          <div className={styles.events_container}>
            {dateEvents.map((event) => {
              return <EventCard key={event.id} event={event} />;
            })}
          </div>
        </Fragment>
      );
    }
  );

  return (
    <>
      {modalOpened && <AddEventModal setModalOpened={setModalOpened} />}
      <main className={styles.root}>
        <UserInfo
          timeframe={timeframe}
          setTimeframe={setTimeframe}
          setModalOpened={setModalOpened}
        />
        <section>
          {events.loading
            ? EVENTS_FETCHING
            : events.events.length < 1 && !events.loading
            ? EVENTS_NOT_FOUND
            : EVENT_LIST}
        </section>
      </main>
    </>
  );
};

export default Calendar;
