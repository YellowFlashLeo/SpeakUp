import React from 'react';
import { Grid } from 'semantic-ui-react';
import { IActivity } from '../../../app/modules/activity';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';

interface Props {
    activities: IActivity[];
    selectedActivity: IActivity | undefined;
    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrEdit: (activity: IActivity) => void;
    deleteActivity: (id: string) => void;
}
// {}: Props is destructering.
// we can also do the same by saying props :Props and then props.activities.map

// {activities[0] && means do whats on the right if left is not null or undefined
export default function ActivityDashboard({ activities, selectedActivity, editMode,
    selectActivity, cancelSelectActivity,
    openForm, closeForm, createOrEdit, deleteActivity }: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList 
                 activities={activities}
                 selectActivity={selectActivity} 
                 deleteActivity={deleteActivity}
                 />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode &&
                    <ActivityDetails
                        activity={selectedActivity}
                        cancelSelectActivity={cancelSelectActivity}
                        openForm={openForm}
                    />}
                {editMode &&
                    <ActivityForm closeForm={closeForm} activity={selectedActivity} createOrEdit={createOrEdit} />
                }

            </Grid.Column>
        </Grid>
    )
}