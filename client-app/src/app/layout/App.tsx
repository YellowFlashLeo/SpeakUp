import { Container } from 'semantic-ui-react';
import NavBar from './NavBaR';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Route, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import TestErrors from '../../features/activities/errors/TestErrors';
import { ToastContainer } from 'react-toastify';

// useState in React Hook which allows to store state inside Component
// [activities] will name of variable where state will be stored
// [setActivities] function to state the state
// useState([]), here we delcare initial state for activities
function App() {
  const location = useLocation(); // this will make sure that component is rerendered if path props change
  return (
    <>
    <ToastContainer position='bottom-right' hideProgressBar />
      <Route exact path='/' component={HomePage} />
      <Route
        path={`/(.+)`}
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
              <Route exact path='/activities' component={ActivityDashboard} />
              <Route path='/activities/:id' component={ActivityDetails} />
              <Route key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm} />
              <Route path='/errors' component={TestErrors} />
            </Container>
          </>
        )}
      />

    </>
  );
}
// will allow this component to observe DOM changes
export default observer(App);
