import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './pages/Login/Login';
import Calendar from './pages/Calendar';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/calendar" exact component={Calendar} />
      </Switch>
    </Router>
  );
};

export default App;
