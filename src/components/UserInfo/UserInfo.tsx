import { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './userinfo.module.scss';

import { GlobalState } from 'src/store';

interface UserInfoProps {
  timeframe: number;
  setTimeframe: React.Dispatch<React.SetStateAction<number>>;
  setModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserInfo: React.FC<UserInfoProps> = ({
  timeframe,
  setTimeframe,
  setModalOpened,
}) => {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  const user = useSelector((state: GlobalState) => state.user.profile);

  return (
    <section className={styles.root}>
      <div className={styles.container_info}>
        <div className={styles.img_container}>
          <img
            onLoad={() => setImageLoaded(true)}
            src={user.imageUrl}
            alt="profile avatar"
            style={{ display: imageLoaded ? 'block' : 'none' }}
          />
          {!imageLoaded && <div className={styles.img_placeholder} />}
        </div>
        <div>
          <h3>{user.name}</h3>
          <small>{user.email}</small>
        </div>
      </div>
      <div className={styles.actions}>
        <div className={styles.timeframe_select_container}>
          <select
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setTimeframe(+e.target.value)
            }
            value={timeframe}
            id="timeframe"
          >
            <option value={1}>Show 1 day</option>
            <option value={7}>Show 7 days</option>
            <option value={30}>Show 30 days</option>
          </select>
        </div>
        <button onClick={() => setModalOpened(true)}>
          <h4>+ Add Event</h4>
        </button>
      </div>
    </section>
  );
};

export default UserInfo;
