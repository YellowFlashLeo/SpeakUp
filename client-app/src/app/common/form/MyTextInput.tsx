import { useField } from 'formik';
import React from 'react';
import { Form, Label } from 'semantic-ui-react';
import { StringLiteralLike } from 'typescript';


interface Props {
    placeholder: string;
    name: string;
    label?: string;
}

export default function MyTextInput(props: Props) {
    // Formik meta is used to give some UI method ot check if something was touched or if there is an error
    // Spread props across field will give us many function that can be used like OnChange etc..
    const [field, meta] = useField(props.name);  
    // !!meta.error will be true if error exists
    return (
        <Form.Field error={meta.touched && !!meta.error}> 
            <label>{props.label}</label>
            <input {...field} {...props} />
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ) : null}
        </Form.Field>
    )
}