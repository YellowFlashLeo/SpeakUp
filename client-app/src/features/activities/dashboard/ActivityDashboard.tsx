import { observer } from 'mobx-react-lite';
import React from 'react';
import { Grid } from 'semantic-ui-react';
import { IActivity } from '../../../app/modules/activity';
import { useStore } from '../../../app/stores/store';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';

interface Props {
    activities: IActivity[];
    deleteActivity: (id: string) => void;
    submitting: boolean;
}
// {}: Props is destructering.
// we can also do the same by saying props :Props and then props.activities.map

// {activities[0] && means do whats on the right if left is not null or undefined
export default observer(function ActivityDashboard({ activities, submitting,
     deleteActivity }: Props) {

    const { activityStore } = useStore();
    const { selectedActivity, editMode } = activityStore;
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList
                    activities={activities}
                    deleteActivity={deleteActivity}
                    submitting={submitting}
                />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode &&
                    <ActivityDetails />}
                {editMode &&
                    <ActivityForm />
                }

            </Grid.Column>
        </Grid>
    )
})