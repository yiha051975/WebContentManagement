import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {getContentsByProjectId} from '../redux/actions/content-actions';


class ProjectContent extends Component {
    static propTypes = {
        contents: PropTypes.object
    };

    render() {
        return (
            <div>
                Yay the content will show here
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        contents: state.contents
    }
}

export default connect(mapStateToProps, {getContentsByProjectId})(ProjectContent);

