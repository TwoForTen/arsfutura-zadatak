import { useState } from 'react';
import styles from './eventcard.module.scss';
import { format } from 'date-fns';
import { useDispatch } from 'react-redux';
import axios from 'src/axiosInstance';

import { deleteEvent } from 'src/store/Events/actions';

import { Event } from 'src/types';
import time from 'src/assets/time.svg';
import eventIcon from 'src/assets/event_icon.svg';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState<boolean>(false);

  const deleteEventFunc = async () => {
    setLoading(true);
    await axios.delete(`/primary/events/${event.id}`).then(() => {
      dispatch(deleteEvent(event.id));
      setLoading(false);
    });
  };

  return (
    <div className={styles.root}>
      <div className={styles.top_section}>
        <h2 className={styles.summary}>{event.summary}</h2>
        <button
          className={styles.button_delete}
          disabled={loading}
          onClick={deleteEventFunc}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path
              fill="red"
              d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
            />
          </svg>
        </button>
      </div>
      <div className={styles.bottom_section}>
        <div className={`${styles.time_container} ${styles.date_container}`}>
          <img src={eventIcon} alt="event" />
          <div className={styles.event_title}>
            <small>Date</small>
            <span>{format(new Date(event.start), 'dd/LL')}</span>
          </div>
        </div>
        <div className={styles.time_container}>
          <img src={time} alt="time" />
          <div className={styles.event_title}>
            <small>Start</small>
            <span>{format(new Date(event.start), 'kk:mm')}</span>
          </div>
        </div>
        <div className={styles.time_container}>
          <div className={styles.event_title}>
            <small>End</small>
            <span>{format(new Date(event.end), 'kk:mm')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
