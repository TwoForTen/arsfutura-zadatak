import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import DatePicker from 'react-datepicker';
import styles from './addeventmodal.module.scss';
import axios from 'src/axiosInstance';
import { useSelector, useDispatch } from 'react-redux';

import { insertEvent } from 'src/store/Events/actions';
import { GlobalState } from 'src/store';

import close from 'src/assets/close.svg';

interface AddEventModalProps {
  setModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddEventModal: React.FC<AddEventModalProps> = ({ setModalOpened }) => {
  const dispatch = useDispatch();

  const [summary, setSummary] = useState<string>('');
  const [startTime, setStartTime] = useState<any>(undefined);
  const [endTime, setEndTime] = useState<any>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const { access_token } = useSelector(
    (state: GlobalState) => state.user.token
  );

  const addEvent = () => {
    setLoading(true);
    console.log(endTime, startTime);
    axios
      .post(
        '/primary/events',
        {
          summary,
          end: {
            dateTime: endTime,
          },
          start: {
            dateTime: startTime,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .then(({ data }) => {
        dispatch(
          insertEvent({
            id: data.id,
            summary: data.summary,
            start: data.start.dateTime,
            end: data.end.dateTime,
          })
        );
        setModalOpened(false);
        setLoading(false);
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
              <label htmlFor="summary">Summary</label>
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
              <label htmlFor="startTime">Start Date & Time</label>
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
                placeholderText="Choose start date"
              />
            </div>
            <div className={styles.input_container}>
              <label htmlFor="endTime">End Time</label>
              <DatePicker
                id="endTime"
                selected={endTime}
                onChange={(date) => setEndTime(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="MMMM d, yyyy HH:mm"
                minDate={new Date()}
                placeholderText="Choose end date"
              />
            </div>
          </div>
          <button disabled={loading} type="submit">
            Add Event
          </button>
        </form>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
};

export default AddEventModal;
