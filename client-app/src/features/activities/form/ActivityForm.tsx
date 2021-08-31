import { observer } from 'mobx-react-lite';
import { ChangeEvent } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponents';
import { useStore } from '../../../app/stores/store';


// ({activity: selectedActivity,closeForm} : Props) { renaming of activity to selectedActivity
export default observer(function ActivityForm() {

    const { activityStore } = useStore();
    const { createActivity, updateActivity,loadActivity, loading, loadingInitial } = activityStore;
    const {id} = useParams<{id:string}>();

    // main idea:
    // we check if we get any id which is set when user clicks on activity
    // if we dont then initial state will make all field of the form empty
    // if we DO have an Id then we load that activity and than populate setActivity and override all empty fields with info from id of the activity which user clicked on.
    const [activity, setActivity] = useState({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    });

    useEffect(()=>{
        if(id) loadActivity(id).then(activity => setActivity(activity!)) //! means we know what we are doing(activity can be undefined)
    }, [id,loadActivity]);

    function handleSubmit() {
        activity.id ? updateActivity(activity) : createActivity(activity);
    }

    // we are tracking changes made by user in the input filed of the form
    // spreading(foreach) existing properties of activity and then we target properties which match key [name] to whatever value was written
    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value })
    }

    if(loadingInitial) return <LoadingComponent content='Loading activity...'/>
    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange} />
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleInputChange} />
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleInputChange} />
                <Form.Input type='date' placeholder='Date' value={activity.date} name='date' onChange={handleInputChange} />
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange} />
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange} />
                <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                <Button floated='right' type='submit' content='Cancel' />
            </Form>
        </Segment>
    )
})