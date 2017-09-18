import React, {Component} from 'react';
import PropTypes from 'prop-types';
/*import ProjectContent from '../containers/ProjectContent';*/
import {connect} from 'react-redux';
import {initializeAccordion} from '../utils/accordion-utils';
import {projectSelector} from '../reselect/projects-reselect';
import {getProjectByProjectId} from '../redux/actions/project-actions';


class ProjectList extends Component {
    static propTypes = {
        projects: PropTypes.array
    };

    render() {
        return (
            <div className="main-content-container">
                <h4>Projects</h4>
                <ul className="collapsible popout" data-collapsible="accordion" ref={initializeAccordion}>
                    {
                        this.props.projects.map((project, i) => {
                            return (
                                <li key={i}>
                                    <div className="collapsible-header">{project.project}</div>
                                    <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        projects: projectSelector(state)
    };
}

export default connect(mapStateToProps, {getProjectByProjectId})(ProjectList);

