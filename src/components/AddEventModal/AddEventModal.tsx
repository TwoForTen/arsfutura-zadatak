import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import DatePicker from 'react-datepicker';
import styles from './addeventmodal.module.scss';
import axios from 'src/axiosInstance';
import { useDispatch } from 'react-redux';
import { isBefore, add } from 'date-fns';

import { insertEvent } from 'src/store/Events/actions';

import close from 'src/assets/close.svg';

interface AddEventModalProps {
  setModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
  timeframe: number;
}

const AddEventModal: React.FC<AddEventModalProps> = ({
  setModalOpened,
  timeframe,
}) => {
  const dispatch = useDispatch();

  const [summary, setSummary] = useState<string>('');
  const [startTime, setStartTime] = useState<any>(undefined);
  const [endTime, setEndTime] = useState<any>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const addEvent = () => {
    if (!summary || !startTime || !endTime) {
      setError('All fields must be filled');
      return;
    }

    if (isBefore(endTime, startTime)) {
      setError('End time must be after start time');
      return;
    }

    setLoading(true);
    setError('');
    axios
      .post('/primary/events', {
        summary,
        end: {
          dateTime: endTime,
        },
        start: {
          dateTime: startTime,
        },
      })
      .then(({ data }) => {
        if (
          isBefore(
            new Date(data.start.dateTime),
            new Date(add(new Date(), { days: timeframe }))
          )
        ) {
          dispatch(
            insertEvent({
              id: data.id,
              summary: data.summary,
              start: data.start.dateTime,
              end: data.end.dateTime,
            })
          );
        }
        setModalOpened(false);
        setLoading(false);
        setError('');
      })
      .catch((err) => {
        setLoading(false);
        setError('Something went wrong');
      });
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const modal = (
    <div className={styles.backdrop} onClick={() => setModalOpened(false)}>
      <div
        className={styles.root}
        onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
          e.stopPropagation()
        }
      >
        <div className={styles.top_title}>
          <button onClick={() => setModalOpened(false)}>
            <img src={close} alt="close" />
          </button>
          <h2>Add New Event</h2>
        </div>
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            addEvent();
          }}
        >
          <div className={styles.form_container}>
            <div className={styles.input_container}>
              <label htmlFor="summary">
                Summary<small>*</small>
              </label>
              <input
                id="summary"
                type="text"
                placeholder="Enter description"
                value={summary}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSummary(e.target.value)
                }
              />
            </div>
            <div className={styles.input_container}>
              <label htmlFor="startTime">
                Start Time<small>*</small>
              </label>
              <DatePicker
                id="startTime"
                selected={startTime}
                onChange={(date) => setStartTime(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="MMMM d, yyyy HH:mm"
                minDate={new Date()}
                placeholderText="Choose start time"
              />
            </div>
            <div className={styles.input_container}>
              <label htmlFor="endTime">
                End Time<small>*</small>
              </label>
              <DatePicker
                id="endTime"
                selected={endTime}
                onChange={(date) => setEndTime(date)}
                onFocus={() => setEndTime(startTime)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="MMMM d, yyyy HH:mm"
                minDate={startTime || new Date()}
                placeholderText="Choose end time"
              />
            </div>
          </div>
          <button disabled={loading} type="submit">
            Add Event
          </button>
          {error && <small>Error: {error}</small>}
        </form>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
};

export default AddEventModal;
