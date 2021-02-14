import { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserInfo from 'src/components/UserInfo/UserInfo';
import { add, format, startOfWeek, endOfWeek } from 'date-fns';
import styles from './calendar.module.scss';

import EventCard from 'src/components/EventCard/EventCard';
import GroupTitle from 'src/components/GroupTitle/GroupTitle';

import { fetchEvents } from 'src/store/Events/actions';
import { GlobalState } from 'src/store';
import { Event, GroupedEvents } from 'src/types';

const DATE_FORMAT: string = 'E, dd/LL';

const Calendar: React.FC = () => {
  const dispatch = useDispatch();

  const events = useSelector((state: GlobalState) => state.events);
  const [groupedEvents, setGroupedEvents] = useState<GroupedEvents>({});
  const [timeframe, setTimeframe] = useState<number>(7);

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

  if (events.loading) {
    return (
      <CalendarMain timeframe={timeframe} setTimeframe={setTimeframe}>
        <div className={styles.events_status_container}>
          <span>Fetching events...</span>
        </div>
      </CalendarMain>
    );
  }

  if (events.events.length < 1 && !events.loading) {
    return (
      <CalendarMain timeframe={timeframe} setTimeframe={setTimeframe}>
        <div className={styles.events_status_container}>
          <span>No events found</span>
        </div>
      </CalendarMain>
    );
  }

  return (
    <CalendarMain timeframe={timeframe} setTimeframe={setTimeframe}>
      {Object.entries(groupedEvents).map(([date, dateEvents]) => {
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
      })}
    </CalendarMain>
  );
};

interface CalendarMainProps {
  timeframe: number;
  setTimeframe: React.Dispatch<React.SetStateAction<number>>;
}

const CalendarMain: React.FC<CalendarMainProps> = ({
  children,
  timeframe,
  setTimeframe,
}) => {
  return (
    <main className={styles.root}>
      <UserInfo timeframe={timeframe} setTimeframe={setTimeframe} />
      <section>{children}</section>
    </main>
  );
};

export default Calendar;
