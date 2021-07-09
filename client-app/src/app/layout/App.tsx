import { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { IActivity } from '../modules/activity';
import NavBar from './NavBaR';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { v4 as uuid } from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponents';

// useState in React Hook which allows to store state inside Component
// [activities] will name of variable where state will be stored
// [setActivities] function to state the state
// useState([]), here we delcare initial state for activities
function App() {
  const [activities, setActivities] = useState<IActivity[]>([]);
  // we are saying either IActivity or undefined. Initial state is udefined
  const [selectedActvity, setSelectedActivity] = useState<IActivity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    agent.Activities.list().then(response => {
      let activities: IActivity[] = [];
      // we want to take first part of what we split, numbered date no time
      response.forEach(activity =>{
        activity.date = activity.date.split('T')[0];
        activities.push(activity);
      })
      setActivities(activities);
      setLoading(false);
    })
  }, []) // will ensure it only runs once, otherwise we will call api and get data, setActivities will assign data to activities and since React component chnages. It causes rerender of the entire component,
  // so useEffect will be triggered again and again (endless loop)

  function handleSelectActivity(id: string) {
    setSelectedActivity(activities.find(activity => activity.id == id));
  }

  function handleCancelSelectActivity() {
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleDeleteActivity(id: string) {
    setActivities([...activities.filter(x => x.id !== id)]);
  }

  // if we dont have activity.id then we create new 
  // ([...activities.filter(a => a.id !== activity.id), activity]) return [] of activities without newly passed(the one we edit) and add edited later
  function handleCreateOrEditActivity(activity: IActivity) {
    activity.id ? setActivities([...activities.filter(a => a.id !== activity.id), activity])
      : setActivities([...activities, { ...activity, id: uuid() }]); // we create new activity iterate over all its properties and values and assigned them to
    // new instance accordingly, we also add guid to id of new activity so that each of them will be unique
    setEditMode(false);
    setSelectedActivity(activity);
  }

  if(loading) return <LoadingComponent content="Loading app"/>
  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActvity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity = {handleDeleteActivity}
        />
      </Container>
    </>
  );
}

export default App;
