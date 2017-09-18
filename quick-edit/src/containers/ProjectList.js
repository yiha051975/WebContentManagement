import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {getProjectByProjectId} from '../redux/actions/project-actions';


class ProjectList extends Component {
   componentDidMount() {

   }
    render() {
        getProjectByProjectId("513d644e-47d7-453b-8d6b-18a91446c615");
        return (
            <div>
                Yay the list will show here
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
    }
}

export default connect(mapStateToProps, {getProjectByProjectId})(ProjectList);

