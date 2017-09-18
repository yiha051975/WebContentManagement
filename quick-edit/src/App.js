import React, {Component} from 'react';
import PropTypes from 'prop-types';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import './App.css';
import Header from './containers/Header';
import SigninForm from './containers/SigninForm';
import ProjectList from './containers/ProjectList';
import LandingPage from './components/LandingPage';
import {connect} from 'react-redux';
import {getUser} from './redux/actions/user-actions';
import {initializeModalContainer} from './utils/modal-utils';
import {Switch, Route, withRouter} from 'react-router-dom';

class App extends Component {
    static propTypes = {
        getUser: PropTypes.func.isRequired,
        history: PropTypes.object.isRequired,
        user: PropTypes.shape({
            id: PropTypes.string
        })
    };

    componentDidMount() {
        this.props.getUser(this.props.history);
    }

    render() {
        const isAuthenticated = Boolean(this.props.user.id);

        // eslint-disable-next-line
        return (
            <div className="App">
                <Header />
                <Switch>
                    <Route exact path="/" component={LandingPage} />
                    <Route path="/projectList" component={ProjectList} />
                </Switch>
                {!isAuthenticated ? (
                    <div id="signin-modal" className="modal" ref={initializeModalContainer}>
                        <div className="modal-content">
                            <SigninForm />
                        </div>
                    </div>
                ) : false}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default withRouter(connect(mapStateToProps, {getUser})(App));
