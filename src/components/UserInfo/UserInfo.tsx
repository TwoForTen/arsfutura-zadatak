import { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './userinfo.module.scss';

import { GlobalState } from 'src/store';

const UserInfo = () => {
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
      <button>
        <h4>+ Add Event</h4>
      </button>
    </section>
  );
};

export default UserInfo;
