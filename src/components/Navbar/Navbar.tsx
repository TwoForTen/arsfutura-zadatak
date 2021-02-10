import styles from './navbar.module.scss';

import logo from 'src/assets/logo.svg';

const Navbar: React.FC = () => {
  return (
    <div className={styles.root}>
      <div className={styles.logo_container}>
        <img src={logo} alt="logo" />
        <h2>Calendarify</h2>
      </div>
    </div>
  );
};

export default Navbar;
