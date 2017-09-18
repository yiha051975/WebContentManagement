import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {connect} from 'react-redux';

import {getContentsByProjectId} from '../redux/actions/content-actions';


class ProjectContent extends Component {
   componentDidMount() {
       this.props.getContentsByProjectId("513d644e-47d7-453b-8d6b-18a91446c615");

   }

    render() {
       console.log(this.props.contents);
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

