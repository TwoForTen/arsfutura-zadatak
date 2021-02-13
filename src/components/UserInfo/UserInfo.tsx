import { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './userinfo.module.scss';

import { GlobalState } from 'src/store';

interface UserInfoProps {
  timeframe: number;
  setTimeframe: React.Dispatch<React.SetStateAction<number>>;
}

const UserInfo: React.FC<UserInfoProps> = ({ timeframe, setTimeframe }) => {
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
      <div>
        <label htmlFor="timeframe">Choose timeframe</label>
        <select
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setTimeframe(+e.target.value)
          }
          value={timeframe}
          id="timeframe"
        >
          <option value={1}>1</option>
          <option value={7}>7</option>
          <option value={30}>30</option>
        </select>
        <button>
          <h4>+ Add Event</h4>
        </button>
      </div>
    </section>
  );
};

export default UserInfo;
