import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import UserInfo from 'src/components/UserInfo/UserInfo';
import { add } from 'date-fns';

import { fetchEvents } from 'src/store/Events/actions';

const Calendar: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEvents(add(new Date(), { days: 7 }).toISOString()));
  }, [dispatch]);

  return (
    <main>
      <UserInfo />
    </main>
  );
};

export default Calendar;
