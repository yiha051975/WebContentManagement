import './TextField.css';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {componentIdGenerator} from '../utils/form-component-utils';

class TextField extends Component {
    static propTypes = {
        input: PropTypes.object.isRequired,
        label: PropTypes.any.isRequired,
        type: PropTypes.string.isRequired,
        meta: PropTypes.shape({
            touched: PropTypes.bool.isRequired,
            error: PropTypes.any
        }).isRequired
    };

    constructor(props, context) {
        super(props, context);
        this.state = {
            id: componentIdGenerator()
        };
    }

    render() {
        const {
            input,
            label,
            type,
            meta: { touched, error }
        } = this.props;

        let isInvalid = '';
        if (touched && error) {
            isInvalid = ' invalid';
        } else if (!error) {
            isInvalid = ' valid';
        }

        return (
            <div className="input-field col s12">
                <input {...input} id={this.state.id} type={type} className={`text-field validate${isInvalid}`} />
                <label htmlFor={this.state.id} data-error={error}>{label}</label>
            </div>
        );
    }
}

export default TextField;