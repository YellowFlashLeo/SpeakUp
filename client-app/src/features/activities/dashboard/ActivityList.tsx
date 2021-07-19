import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent } from 'react';
import { useState } from 'react';
import { Button, Item, ItemHeader, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';


export default observer(function ActivityList() {
    const { activityStore } = useStore();
    const { deleteActivity, activities, loading } = activityStore;
    const [target, setTarget] = useState('');

    function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteActivity(id);
    }
    
    return (
        <Segment>
            <Item.Group divided>
                {activities.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => activityStore.selectActivity(activity.id)} floated='right' content='View' color='blue' />
                                <Button
                                    name={activity.id}
                                    loading={loading && target === activity.id}
                                    onClick={(e) => handleActivityDelete(e, activity.id)}
                                    floated='right' content='Delete' color='red'
                                />
                                <Label basic content={activity.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
})
// Button <Button
/*name={activity.id}
loading={submitting && target === activity.id}
onClick={(e) => handleActivityDelete(e,activity.id)}

Is basically checking if its button which belongs to particualr activity id, so that loading symbol is only displayed on one button not all of them

*/
//  <Button onClick={()=>selectActivity(activity.id)} is written this way, so that it doesnt execute straight away.
// if you say  <Button onClick={selectActivity(activity.id)} it will execute as soon as component was rendered