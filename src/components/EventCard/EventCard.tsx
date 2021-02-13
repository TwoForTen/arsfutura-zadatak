import styles from './eventcard.module.scss';
import { format } from 'date-fns';
import { useDispatch } from 'react-redux';

import { deleteEvent } from 'src/store/Events/actions';

import { Event } from 'src/types';
import deleteIcon from 'src/assets/delete.svg';
import time from 'src/assets/time.svg';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.root}>
      <div className={styles.top_section}>
        <h2 className={styles.summary}>{event.summary}</h2>
        <button
          className={styles.button_delete}
          onClick={() => dispatch(deleteEvent(event.id))}
        >
          <img src={deleteIcon} alt="delete" />
        </button>
      </div>
      <div className={styles.bottom_section}>
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
