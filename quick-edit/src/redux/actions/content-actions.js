import axios from 'axios';
import {RETRIEVE_CONTENT_SUCCESS, RETRIEVE_CONTENT_FAILED} from './action-types';

export function getContentsByProjectId(projectId) {console.log(projectId);
    return dispatch => {
        axios.get(`/api/contents/getContentByProject/${projectId}`)
            .then(response => {
                if (response.status === 200) {
                    dispatch(getContentsByProjectIdSuccess(response.data));
                } else {
                    dispatch(getContentsByProjectIdFailed({errMessage: response.data.message}));
                }
            })
            .catch(error => {
                console.error(error);
                // dispatch(getContentsByProjectIdFailed(error));
            });
    };
}

function getContentsByProjectIdSuccess(projectId, contents) {
    return {
        type: RETRIEVE_CONTENT_SUCCESS,
        payload: contents,
        projectId
    };
}

function getContentsByProjectIdFailed(error) {
    return {
        type: RETRIEVE_CONTENT_FAILED,
        payload: error
    };
}