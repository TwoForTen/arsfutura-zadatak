import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserInfo from 'src/components/UserInfo/UserInfo';
import { add } from 'date-fns';
import styles from './calendar.module.scss';

import EventCard from 'src/components/EventCard/EventCard';

import { fetchEvents } from 'src/store/Events/actions';
import { GlobalState } from 'src/store';
import { Event } from 'src/types';

const Calendar: React.FC = () => {
  const dispatch = useDispatch();

  const events = useSelector((state: GlobalState) => state.events);

  useEffect(() => {
    dispatch(fetchEvents(add(new Date(), { days: 7 }).toISOString()));
  }, [dispatch]);

  return (
    <main className={styles.root}>
      <UserInfo />
      <section className={styles.events_container}>
        {events.map((event: Event) => {
          return <EventCard key={event.summary} event={event} />;
        })}
      </section>
    </main>
  );
};

export default Calendar;
