import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Login from './pages/Login/Login';
import Calendar from './pages/Calendar/Calendar';
import Navbar from './components/Navbar/Navbar';
import AuthRoute from './components/AuthRoute';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Login} />
        <AuthRoute path="/calendar" exact component={Calendar} />
        <Route path="*" render={() => <Redirect to="/" />} />
      </Switch>
    </Router>
  );
};

export default App;
