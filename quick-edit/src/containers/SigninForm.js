import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm, Field, change as fieldChange} from 'redux-form';
import {connect} from 'react-redux';
import TextField from '../components/TextField';
import {authenticateUser} from '../redux/actions/user-actions';

class SigninForm extends Component {
    static propTypes = {
        authenticateUser: PropTypes.func.isRequired,
        fieldChange: PropTypes.func.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        submitting: PropTypes.bool.isRequired,
        values: PropTypes.shape({
            username: PropTypes.string,
            password: PropTypes.string
        })
    };

    constructor(props, context) {
        super(props, context);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(values) {
        this.props.authenticateUser(values);
        this.props.fieldChange('sign-in-form', 'username', '');
        this.props.fieldChange('sign-in-form', 'password', '');
    };

    render() {
        const {handleSubmit, submitting} = this.props;

        return (
            <div>
                <h4>Sign In</h4>
                <form onSubmit={handleSubmit(this.onSubmit)}>
                    <Field name="username" type="text" component={TextField} label="Username" />
                    <Field name="password" type="password" component={TextField} label="Password" />
                    <div className="modal-footer">
                        <button type="submit" className="modal-action modal-close waves-effect waves-light btn" disabled={submitting}>Sign in</button>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        firstName: state.user.firstName,
        lastName: state.user.lastName,
        values: state.form['sign-in-form'].values
    }
}

function validate(values) {
    const errors = {};

    if (!values.username) {
        errors.username = 'Username is required.';
    }

    if (!values.password) {
        errors.password = 'Password is required.';
    }

    return errors;
}

export default reduxForm({
    form: 'sign-in-form',
    validate
})(connect(mapStateToProps, {authenticateUser, fieldChange})(SigninForm));