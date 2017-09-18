import './Header.css';
import logo from '../logo.svg';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {logoffUser} from '../redux/actions/user-actions';
import {withRouter} from 'react-router-dom';

class Header extends Component {

    render() {
        return (
            <div>
                <nav>
                    <div className="nav-wrapper">
                        <a href="#!" className="brand-logo"><img src={logo} className="App-logo" alt="logo"/><span
                            className="nav-main-header-link">USAA Demo App</span></a>
                        <ul className="right hide-on-med-and-down">

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

export default withRouter(connect(mapStateToProps, {logoffUser})(Header));