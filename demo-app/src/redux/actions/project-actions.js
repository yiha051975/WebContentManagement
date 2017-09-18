import axios from 'axios';
import {RETRIEVE_PROJECT_SUCCESS, RETRIEVE_PROJECT_FAILED} from './action-types';

export function getProjectByProjectId(projectId) {
    return dispatch => {
        axios.get(`/api/projects/getProject/${projectId}`)
            .then(response => {
                if (response.status === 200) {
                    dispatch(retrieveProjectSuccess(response.data));
                } else {
                    dispatch(retrieveProjectFailed(response.data));
                }
            })
            .catch(error => {
                dispatch(retrieveProjectFailed(error));
            });
    }
}

function retrieveProjectSuccess(project) {
    return {
        type: RETRIEVE_PROJECT_SUCCESS,
        payload: project
    };
}

function retrieveProjectFailed(error) {
    return {
        type: RETRIEVE_PROJECT_FAILED,
        payload: error
    }
}