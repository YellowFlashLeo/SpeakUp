import React from 'react';
import { Button, Item, ItemHeader, Label, Segment } from 'semantic-ui-react';
import { IActivity } from '../../../app/modules/activity';

interface Props {
    activities: IActivity[];
    selectActivity : (id:string) => void;
    deleteActivity: (id: string) => void;
}
export default function ActivityList({activities, selectActivity,deleteActivity}: Props){
    return (
       <Segment>
           <Item.Group divided>
               {activities.map(activity =>(
                   <Item key={activity.id}>
                      <Item.Content>
                          <Item.Header as='a'>{activity.title}</Item.Header>
                          <Item.Meta>{activity.date}</Item.Meta>
                          <Item.Description>
                              <div>{activity.description}</div>
                              <div>{activity.city}, {activity.venue}</div>
                          </Item.Description>
                          <Item.Extra>
                              <Button onClick={() => selectActivity(activity.id)} floated='right' content='View' color='blue'/>
                              <Button onClick={() => deleteActivity(activity.id)} floated='right' content='Delete' color='red'/>
                              <Label basic content={activity.category}/>
                          </Item.Extra>
                      </Item.Content>
                   </Item>
               ))}
           </Item.Group>
       </Segment>
    )
}

//  <Button onClick={()=>selectActivity(activity.id)} is written this way, so that it doesnt execute straight away.
// if you say  <Button onClick={selectActivity(activity.id)} it will execute as soon as component was rendered