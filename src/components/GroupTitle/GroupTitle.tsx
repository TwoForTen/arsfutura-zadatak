import styles from './grouptitle.module.scss';

const GroupTitle: React.FC = ({ children }) => {
  return <h1 className={styles.title}>{children}</h1>;
};

export default GroupTitle;
