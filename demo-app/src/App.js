import React, {Component} from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import './App.css';
import Header from './containers/Header';
import TextField from './components/TextField';
import {reduxForm, Field, change as fieldChange} from 'redux-form';

import _ from 'lodash';
import {connect} from 'react-redux';
import {getContentsByProjectId} from './redux/actions/content-actions';
import { withRouter} from 'react-router-dom';

class App extends Component {

    componentWillMount() {
        this.props.getContentsByProjectId('513d644e-47d7-453b-8d6b-18a91446c615');
    }

    onSubmit(values) {
    };
    getContent(value){
        if(this.props.contents) {
            console.log(value);
            let contents = this.props.contents['513d644e-47d7-453b-8d6b-18a91446c615'];
            if(contents) {
                let contentObject = _.find(contents, ['contentName', value]);
                console.log(contentObject);
                return contentObject.content;
            }
        }
    }

    render() {

        const {handleSubmit, submitting} = this.props;
        return (
            <div className="App">
                <Header />
                <div className="row">
                    <form onSubmit={handleSubmit(this.onSubmit)}>
                        <Field name="username" type="text" component={TextField} label={this.getContent("test_content_1")} />
                        <Field name="password" type="password" component={TextField} label={this.getContent("test_content_2" +
                            "")} />
                        <div className="right-align">
                            <button type="submit" className="waves-effect waves-light btn right-align" disabled={submitting}>{this.getContent("test_content_1")}</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        contents: state.contents
    }
}

export default reduxForm({
    form: 'sign-in-form'
})(withRouter(connect(mapStateToProps, {getContentsByProjectId})(App)));
