import React from 'react';
import { Grid, List } from 'semantic-ui-react';
import { IActivity } from '../../../app/modules/activity';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';

interface Props {
    activities: IActivity[];
    selectedActivity : IActivity | undefined;
    selectActivity : (id:string) => void;
    cancelSelectActivity : () => void;
}
// {}: Props is destructering.
// we can also do the same by saying props :Props and then props.activities.map

// {activities[0] && means do whats on the right if left is not null or undefined
export default function ActivityDashboard({ activities, selectActivity,
    selectedActivity,cancelSelectActivity }: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList activities={activities} selectActivity = {selectActivity} />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity&&
                    <ActivityDetails activity={selectedActivity} cancelSelectActivity ={cancelSelectActivity}/>}
                    <ActivityForm/>
            </Grid.Column>
        </Grid>
    )
}