import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import LoadingComponent from '../../../app/layout/LoadingComponents';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';


// {}: Props is destructering.
// we can also do the same by saying props :Props and then props.activities.map

// {activities[0] && means do whats on the right if left is not null or undefined
export default observer(function ActivityDashboard() {
    const { activityStore } = useStore();
    const { selectedActivity, editMode } = activityStore;

    useEffect(() => {
        activityStore.loadActivities();
    }, [activityStore]) // will ensure it only runs once, otherwise we will call api and get data, setActivities will assign data to activities and since React component chnages. It causes rerender of the entire component,
    // so useEffect will be triggered again and again (endless loop)

    if (activityStore.loadingInitial) return <LoadingComponent content="Loading app" />


    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
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