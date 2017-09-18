import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import ProjectContent from '../containers/ProjectContent';
import {connect} from 'react-redux';

import {getProjectByProjectId} from '../redux/actions/project-actions';


class ProjectList extends Component {
   componentDidMount() {
       this.props.getProjectByProjectId("513d644e-47d7-453b-8d6b-18a91446c615");
   }

    render() {
       console.log(this.props.projects);
        const hasProjects = Boolean(this.props.projects);
        return (
            <div>
                Yay the list will show here
                {hasProjects ? <div>{this.props.projects.project} <ProjectContent /></div> : <div>test</div>
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        projects: state.projects
    }
}

export default connect(mapStateToProps, {getProjectByProjectId})(ProjectList);

