import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm, Field} from 'redux-form';
import TextField from './TextField';
import {updateContent} from '../redux/actions/content-actions';
import {connect} from 'react-redux';

class Content extends Component {
    static propTypes = {
        content: PropTypes.object.isRequired
    };

    constructor(props, context) {
        super(props, context);
        this.state = {
            isEdit: false
        };

        this.editLinkOnClick = this.editLinkOnClick.bind(this);
        this.renderContent = this.renderContent.bind(this);
        this.renderCommands = this.renderCommands.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onFormSubmit(values) {console.log(values);
        this.props.updateContent(this.props.content.id, values);
        this.setState({
            isEdit: !this.state.isEdit
        });
    }

    editLinkOnClick(e) {
        this.setState({
            isEdit: !this.state.isEdit
        });
    }

    renderContent() {
        if (this.props.content.content.indexOf('http://localhost:3000') === 0) {
            if (this.state.isEdit) {
                return <span>Document upload coming soon.</span>;
            } else {
                return <span><a href={this.props.content.content}>View Document</a></span>;
            }
        } else {
            if (this.state.isEdit) {
                return <Field name="content" type="text" component={TextField} label="Content" value={this.props.content.content} />;
            } else {
                return <span>{this.props.content.content}</span>;
            }
        }
    }

    renderCommands() {
        if (this.state.isEdit) {
            return [
                <button type="button" onClick={this.editLinkOnClick} className="btn-flat btn" key={0}>Cancel</button>,
                <button type="submit" className="btn" key={1}>Submit</button>
            ];
        } else {
            return <a href="#!" className="right" onClick={this.editLinkOnClick}>Edit</a>;
        }
    }

    render() {
        const {content, handleSubmit} = this.props;

        return (
            <form onSubmit={handleSubmit(this.onFormSubmit)}>
                <div className="flex row">
                    <div>
                        <div>{content.contentName}</div>
                        <div>{this.renderContent()}</div>
                    </div>
                    <div className="margin-left-auto">{this.renderCommands()}</div>
                </div>
            </form>
        )
    }
}

export default reduxForm({
    form: 'content-form'
})(connect(null, {updateContent})(Content));