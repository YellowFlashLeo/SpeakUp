import { observer } from 'mobx-react-lite';
import { ChangeEvent } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Label, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponents';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from 'uuid';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { values } from 'mobx';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryOptions } from '../../../app/common/options/categoryOptions';
import MyDateInput from '../../../app/common/form/MyDateInput';
import { IActivity } from '../../../app/modules/activity';


// ({activity: selectedActivity,closeForm} : Props) { renaming of activity to selectedActivity
export default observer(function ActivityForm() {
    const history = useHistory();
    const { activityStore } = useStore();
    const { createActivity, updateActivity, loadActivity, loading, loadingInitial } = activityStore;
    const { id } = useParams<{ id: string }>();

    // main idea:
    // we check if we get any id which is set when user clicks on activity
    // if we dont then initial state will make all MyTextInput of the form empty
    // if we DO have an Id then we load that activity and than populate setActivity and override all empty MyTextInputs with info from id of the activity which user clicked on.
    const [activity, setActivity] = useState<IActivity>({
        id: '',
        title: '',
        category: '',
        description: '',
        date: null,
        city: '',
        venue: ''
    });

    const validationSchema = Yup.object({
        title: Yup.string().required('The activity title is required'),
        description: Yup.string().required('The activity description is required'),
        category: Yup.string().required(),
        date: Yup.string().required(),
        venue: Yup.string().required(),
        city: Yup.string().required(),
    })
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
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={activity}
                onSubmit={values => console.log(values)}>
                {({ handleSubmit }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name='title' placeholder='title' />
                        <MyTextArea rows={3} placeholder='Description' name='description' />
                        <MySelectInput options={categoryOptions} placeholder='Category' name='category' />
                        <MyDateInput
                            placeholderText='Date'
                            name='date'
                            showTimeSelect
                            timeCaption='time'
                            dateFormat='MMMM d, yyyy h:mm aa'
                        />
                        <MyTextInput placeholder='City' name='city' />
                        <MyTextInput placeholder='Venue' name='venue' />
                        <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                        <Button as={Link} to='/activities' floated='right' type='submit' content='Cancel' />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})