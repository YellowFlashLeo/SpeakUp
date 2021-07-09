import React from 'react';
import { Grid, List } from 'semantic-ui-react';
import { IActivity } from '../../../app/modules/activity';
import ActivityDetails from '../details/ActivityDetails';
import ActivityList from './ActivityList';

interface Props {
    activities: IActivity[];
}
// {}: Props is destructering.
// we can also do the same by saying props :Props and then props.activities.map

// {activities[0] && means do whats on the right if left is not null or undefined
export default function ActivityDashboard({ activities }: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList activities={activities} />
            </Grid.Column>
            <Grid.Column width='6'>
                {activities[0] &&
                    <ActivityDetails activity={activities[0]} />}
            </Grid.Column>
        </Grid>
    )
}