import { observer } from 'mobx-react-lite';
import { ChangeEvent } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponents';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from 'uuid';
import { Formik } from 'formik';
import { values } from 'mobx';


// ({activity: selectedActivity,closeForm} : Props) { renaming of activity to selectedActivity
export default observer(function ActivityForm() {
    const history = useHistory();
    const { activityStore } = useStore();
    const { createActivity, updateActivity, loadActivity, loading, loadingInitial } = activityStore;
    const { id } = useParams<{ id: string }>();

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

    useEffect(() => {
        if (id) loadActivity(id).then(activity => setActivity(activity!)) //! means we know what we are doing(activity can be undefined)
    }, [id, loadActivity]);

    /*   function handleSubmit() {
          if (activity.id.length === 0) {
              let newActivity = {
                  ...activity,
                  id: uuid()
              };
              createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`))
          } else {
              updateActivity(activity).then(() => history.push(`/activities/${activity.id}`))
          }
  
      }
  
      // we are tracking changes made by user in the input filed of the form
      // spreading(foreach) existing properties of activity and then we target properties which match key [name] to whatever value was written
      function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
          const { name, value } = event.target;
          setActivity({ ...activity, [name]: value })
      }
   */


      // Formik 
      // IntialValues are populated from useState
      // after useEffect we need to update values, so we use enableReinitialize 
      // 
    if (loadingInitial) return <LoadingComponent content='Loading activity...' />
    return (
        <Segment clearing>
            <Formik enableReinitialize initialValues={activity} onSubmit={values => console.log(values)}>
                {({ values:activity, handleChange, handleSubmit }) => (
                    <Form onSubmit={handleSubmit} autoComplete='off'>
                        <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleChange} />
                        <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleChange} />
                        <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleChange} />
                        <Form.Input type='date' placeholder='Date' value={activity.date} name='date' onChange={handleChange} />
                        <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleChange} />
                        <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleChange} />
                        <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                        <Button as={Link} to='/activities' floated='right' type='submit' content='Cancel' />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})