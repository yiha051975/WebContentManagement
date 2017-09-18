import React, {Component} from 'react';
import PropTypes from 'prop-types';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize';
import './App.css';
import Header from './containers/Header';
import SigninForm from './containers/SigninForm';
import {connect} from 'react-redux';

import {initializeModalContainer} from './utils/modal-utils';
// import {Route} from 'react-router-dom';

class App extends Component {
    static propTypes = {
        user: PropTypes.shape({
            id: PropTypes.string
        })
    };

    render() {
        const isAuthenticated = Boolean(this.props.user.id);

        // eslint-disable-next-line
        return (
            <div className="App">
                <Header />
                {!isAuthenticated ? (
                    <div id="signin-modal" className="modal" ref={initializeModalContainer}>
                        <div className="modal-content">
                            <SigninForm />
                        </div>
                    </div>
                ) : null}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(App);
