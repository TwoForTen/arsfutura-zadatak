import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './pages/Login/Login';
import Calendar from './pages/Calendar';
import Navbar from './components/Navbar/Navbar';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/calendar" exact component={Calendar} />
      </Switch>
    </Router>
  );
};

export default App;
