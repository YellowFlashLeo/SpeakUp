import { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { IActivity } from '../modules/activity';
import NavBar from './NavBaR';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { v4 as uuid } from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponents';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

// useState in React Hook which allows to store state inside Component
// [activities] will name of variable where state will be stored
// [setActivities] function to state the state
// useState([]), here we delcare initial state for activities
function App() {
  const { activityStore } = useStore();


  const [activities, setActivities] = useState<IActivity[]>([]);
  // we are saying either IActivity or undefined. Initial state is udefined
  const [selectedActvity, setSelectedActivity] = useState<IActivity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]) // will ensure it only runs once, otherwise we will call api and get data, setActivities will assign data to activities and since React component chnages. It causes rerender of the entire component,
  // so useEffect will be triggered again and again (endless loop)

  function handleDeleteActivity(id: string) {
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(x => x.id !== id)]);
      setSubmitting(false);
    })
  }

  // if we dont have activity.id then we create new 
  // ([...activities.filter(a => a.id !== activity.id), activity]) return [] of activities without newly passed(the one we edit) and add edited later

  function handleCreateOrEditActivity(activity: IActivity) {
    setSubmitting(true);
    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([...activities.filter(x => x.id !== activity.id), activity])
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    }
    // we create new activity iterate over all its properties and values and assigned them to
    // new instance accordingly, we also add guid to id of new activity so that each of them will be unique
    else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity])
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    }
  }

  if (activityStore.loadingInitial) return <LoadingComponent content="Loading app" />
  return (
    <>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          activities={activityStore.activities}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
        />
      </Container>
    </>
  );
}
// will allow this component to observe DOM changes
export default observer(App);
