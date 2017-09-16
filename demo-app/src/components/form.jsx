import React from 'react';
import {reduxForm} from 'redux-form';
import FormSection from 'usaa-form/lib/layout/form-section';
import FormGroup from 'usaa-form/lib/layout/form-group';
import TextInput from 'usaa-form/lib/fields/text-input';
import Button from 'usaa-buttons/lib/button';
import ButtonContainer from 'usaa-buttons/lib/button-container';



export const fields = ["email", "password"]; //list out fields here

class MyForm extends React.Component {

    onSubmit(event) {
        //do something
    }

    render() {
        let {handleSubmit} = this.props;
        let primaryAction = <Button variant="primary" type="submit">Primary Button</Button>;

        let secondaryActions = [];

        return (
            <form onSubmit={handleSubmit(this.onSubmit)} className="my-form">

                <FormSection label="Form Label" labelTag="h1" subtext="Sample subtext">

                    <FormGroup subtext="Subtext Message to be displayed">
                        <TextInput
                            className="col-1-2"
                            inputType="email"
                            label="Email Address"
                            placeholder="john.doe@usaa.com"
                            formField="email"
                        />
                        <TextInput
                            className="col-1-2"
                            inputType="password"
                            label="Password"
                            placeholder="password"
                            formField="password"
                        />
                    </FormGroup>

                </FormSection>

                <ButtonContainer primaryAction={primaryAction} secondaryActions={secondaryActions} />
            </form>
        );
    }
}

MyForm.propTypes = {
    fields: React.PropTypes.object,
    handleSubmit: React.PropTypes.func
};

export default reduxForm({
    form: 'myForm',
    fields
})(MyForm);