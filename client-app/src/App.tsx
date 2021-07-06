import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

// useState in React Hook which allows to store state inside Component
// [activities] will name of variable where state will be stored
// [setActivities] function to state the state
// useState([]), here we delcare initial state for activities
function App() {
 const [activities,setActivities] = useState([]);

 useEffect(() => {
   axios.get("http://localhost:5000/api/activities").then(response =>{
     setActivities(response.data);
   })
 },[]) // will ensure it only runs once, otherwise we will call api and get data, setActivities will assign data to activities and since React component chnages. It causes rerender of the entire component,
 // so useEffect will be triggered again and again (endless loop)
 

  return (
    <div >
      <Header as='h2' icon='users' content='Reactivities'/>
       <List>
       {activities.map((activity:any) => (
           <List.Item key={activity.id}>
              {activity.title}
           </List.Item>
         ))}
        </List>
    </div>
  );
}

export default App;
