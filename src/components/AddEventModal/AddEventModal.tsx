import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import DatePicker from 'react-datepicker';
import styles from './addeventmodal.module.scss';

import close from 'src/assets/close.svg';

interface AddEventModalProps {
  setModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddEventModal: React.FC<AddEventModalProps> = ({ setModalOpened }) => {
  const [startTime, setStartTime] = useState<any>(new Date());
  const [endTime, setEndTime] = useState<any>(new Date());

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'visible';
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
        <form>
          <div className={styles.form_container}>
            <div className={styles.input_container}>
              <label htmlFor="summary">Summary</label>
              <input id="summary" type="text" placeholder="Enter description" />
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
              />
            </div>
            <div className={styles.input_container}>
              <label htmlFor="endTime">End Time</label>
              <DatePicker
                id="endTime"
                selected={endTime}
                onChange={(date) => setEndTime(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="HH:mm"
                timeFormat="HH:mm"
              />
            </div>
          </div>
          <button>Add Event</button>
        </form>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
};

export default AddEventModal;
