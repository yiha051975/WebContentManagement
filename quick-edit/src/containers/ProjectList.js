import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {initializeAccordion} from '../utils/accordion-utils';
import {projectSelector} from '../reselect/projects-reselect';
import {getProjectByProjectId} from '../redux/actions/project-actions';
import Content from '../components/Content';

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
                                    <div className="collapsible-body">
                                        <ul className="collection">
                                            {
                                                project.contents.map((content, i) => {
                                                    return (
                                                        <li key={i} className="collection-item">
                                                            <Content content={content} />
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
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

