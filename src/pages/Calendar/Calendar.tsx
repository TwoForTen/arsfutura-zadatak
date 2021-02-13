import { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserInfo from 'src/components/UserInfo/UserInfo';
import { add, format } from 'date-fns';
import styles from './calendar.module.scss';

import EventCard from 'src/components/EventCard/EventCard';
import GroupTitle from 'src/components/GroupTitle/GroupTitle';

import { fetchEvents } from 'src/store/Events/actions';
import { GlobalState } from 'src/store';
import { Event, GroupedEvents } from 'src/types';

const DATE_FORMAT_DAYS: string = 'E, dd/LL';
const DATE_FORMAT_WEEKS: string = 'wo';

const Calendar: React.FC = () => {
  const dispatch = useDispatch();

  const events = useSelector((state: GlobalState) => state.events);
  const [groupedEvents, setGroupedEvents] = useState<GroupedEvents>({});
  const [timeframe, setTimeframe] = useState<number>(7);
  const [dateFormat, setDateFormat] = useState<string>(DATE_FORMAT_DAYS);

  useEffect(() => {
    setDateFormat(() => {
      return timeframe === 30 ? DATE_FORMAT_WEEKS : DATE_FORMAT_DAYS;
    });
    dispatch(fetchEvents(add(new Date(), { days: timeframe }).toISOString()));
  }, [dispatch, timeframe]);

  useEffect(() => {
    setGroupedEvents({});
    [...events]
      .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
      .forEach((event: Event): void => {
        const eventDate = format(new Date(event.start), dateFormat);
        setGroupedEvents((prev) => ({
          ...prev,
          [eventDate]: prev[eventDate] ? [...prev[eventDate], event] : [event],
        }));
      });
  }, [events, dateFormat]);

  return (
    <main className={styles.root}>
      <UserInfo timeframe={timeframe} setTimeframe={setTimeframe} />
      <section>
        {Object.entries(groupedEvents).map(([date, dateEvents]) => {
          return (
            <Fragment key={date}>
              <GroupTitle>
                {timeframe === 30 ? `${date} Week` : date}
              </GroupTitle>
              <div className={styles.events_container}>
                {dateEvents.map((event) => {
                  return <EventCard key={event.id} event={event} />;
                })}
              </div>
            </Fragment>
          );
        })}
      </section>
    </main>
  );
};

export default Calendar;
