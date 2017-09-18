import './Header.css';
import logo from '../logo.svg';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logoffUser} from '../redux/actions/user-actions';
import {modalTriggerLinkOnClick} from '../utils/modal-utils';
import {initializeDropDown} from '../utils/dropdown-utils';

class Header extends Component {
    static propTypes = {
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        logoffUser: PropTypes.func.isRequired
    };

    constructor(props, context) {
        super(props, context);
        this.logoutLinkOnClick = this.logoutLinkOnClick.bind(this);
    }

    logoutLinkOnClick(e) {
        this.props.logoffUser();
    }

    render() {
        const isAuthenticated = Boolean(this.props.firstName || this.props.lastName);

        return (
            <div>
                <nav>
                    <div className="nav-wrapper">
                        <a href="#!" className="brand-logo"><img src={logo} className="App-logo" alt="logo"/><span
                            className="nav-main-header-link">Web Content Management</span></a>
                        <ul className="right hide-on-med-and-down">
                            {isAuthenticated ? (
                                <li>
                                    <a className="dropdown-button" href="#!" data-activates="user-settings-dropdown" ref={initializeDropDown}>{`${this.props.firstName} ${this.props.lastName}`}<i className="material-icons right">arrow_drop_down</i></a>
                                    <ul id="user-settings-dropdown" className="dropdown-content">
                                        <li><a href="#!">Settings</a></li>
                                        <li className="divider" />
                                        <li><a href="#!" onClick={this.logoutLinkOnClick}>Logout</a></li>
                                    </ul>
                                </li>
                            ) : (
                                <li><a className="waves-effect waves-light modal-trigger" data-target="signin-modal" onClick={modalTriggerLinkOnClick}>Sign in</a></li>
                            )}
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        firstName: state.user.firstName,
        lastName: state.user.lastName
    }
}

export default connect(mapStateToProps, {logoffUser})(Header);