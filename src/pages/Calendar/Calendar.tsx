import { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserInfo from 'src/components/UserInfo/UserInfo';
import { add, format, parse } from 'date-fns';
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

  useEffect(() => {
    dispatch(fetchEvents(add(new Date(), { days: 7 }).toISOString()));
  }, [dispatch]);

  useEffect(() => {
    [...events]
      .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
      .forEach((event: Event): void => {
        const eventDate = format(new Date(event.start), DATE_FORMAT);
        setGroupedEvents((prev) => ({
          ...prev,
          [eventDate]: prev[eventDate] ? [...prev[eventDate], event] : [event],
        }));
      });
  }, [events]);

  return (
    <main className={styles.root}>
      <UserInfo />
      <section>
        {Object.entries(groupedEvents).map(([date, dateEvents]) => {
          return (
            <>
              <GroupTitle>{date}</GroupTitle>
              <div className={styles.events_container}>
                {dateEvents.map((event) => {
                  return <EventCard key={event.summary} event={event} />;
                })}
              </div>
            </>
          );
        })}
      </section>
    </main>
  );
};

export default Calendar;
