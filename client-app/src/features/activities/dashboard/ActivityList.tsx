import { loadavg } from 'os';
import React, { SyntheticEvent } from 'react';
import { useState } from 'react';
import { Button, Item, ItemHeader, Label, Segment } from 'semantic-ui-react';
import { IActivity } from '../../../app/modules/activity';
import { useStore } from '../../../app/stores/store';

interface Props {
    activities: IActivity[];
    deleteActivity: (id: string) => void;
    submitting: boolean;
}
export default function ActivityList({ activities, submitting, deleteActivity }: Props) {
    const [target, setTarget] = useState('');

    function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteActivity(id);
    }

    const {activityStore} = useStore();

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
                                    loading={submitting && target === activity.id}
                                    onClick={(e) => handleActivityDelete(e,activity.id)}
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
}
// Button <Button
/*name={activity.id}
loading={submitting && target === activity.id}
onClick={(e) => handleActivityDelete(e,activity.id)}

Is basically checking if its button which belongs to particualr activity id, so that loading symbol is only displayed on one button not all of them

*/
//  <Button onClick={()=>selectActivity(activity.id)} is written this way, so that it doesnt execute straight away.
// if you say  <Button onClick={selectActivity(activity.id)} it will execute as soon as component was rendered