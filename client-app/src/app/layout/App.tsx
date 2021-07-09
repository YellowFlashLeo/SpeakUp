import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Header, List } from 'semantic-ui-react';
import { IActivity } from '../modules/activity';
import NavBar from './NavBaR';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

// useState in React Hook which allows to store state inside Component
// [activities] will name of variable where state will be stored
// [setActivities] function to state the state
// useState([]), here we delcare initial state for activities
function App() {
 const [activities,setActivities] = useState<IActivity[]>([]);

 useEffect(() => {
   axios.get<IActivity[]>("http://localhost:5000/api/activities").then(response =>{
     setActivities(response.data);
   })
 },[]) // will ensure it only runs once, otherwise we will call api and get data, setActivities will assign data to activities and since React component chnages. It causes rerender of the entire component,
 // so useEffect will be triggered again and again (endless loop)
 

  return (
    <>
      <NavBar/>
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard activities = {activities}/>
      </Container>
    </>
  );
}

export default App;
