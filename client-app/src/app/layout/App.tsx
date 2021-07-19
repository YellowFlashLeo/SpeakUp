import { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBaR';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import LoadingComponent from './LoadingComponents';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

// useState in React Hook which allows to store state inside Component
// [activities] will name of variable where state will be stored
// [setActivities] function to state the state
// useState([]), here we delcare initial state for activities
function App() {
  const { activityStore } = useStore();

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]) // will ensure it only runs once, otherwise we will call api and get data, setActivities will assign data to activities and since React component chnages. It causes rerender of the entire component,
  // so useEffect will be triggered again and again (endless loop)

  if (activityStore.loadingInitial) return <LoadingComponent content="Loading app" />
  return (
    <>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard />
      </Container>
    </>
  );
}
// will allow this component to observe DOM changes
export default observer(App);
