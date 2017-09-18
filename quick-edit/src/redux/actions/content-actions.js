import axios from 'axios';
import {getContentHistoriesByContentId} from './content-history-actions';
import {RETRIEVE_CONTENT_SUCCESS, RETRIEVE_CONTENT_FAILED, UPDATE_CONTENT_SUCCESS, UPDATE_CONTENT_FAILED} from './action-types';

export function getContentsByProjectId(projectId) {
    return dispatch => {
        axios.get(`/api/contents/getContentByProject/${projectId}`)
            .then(response => {
                if (response.status === 200) {
                    response.data.forEach(content => {
                        dispatch(getContentHistoriesByContentId(content.id));
                    });
                    dispatch(getContentsByProjectIdSuccess(projectId, response.data));
                } else {
                    dispatch(getContentsByProjectIdFailed({errMessage: response.data.message}));
                }
            })
            .catch(error => {
                console.error(error);
                dispatch(getContentsByProjectIdFailed(error));
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

export function updateContent(contentId, content) {
    return dispatch => {
        axios.put(`/api/contents/updateContent/${contentId}`, content)
            .then(response => {
                if (response.status === 200) {
                    dispatch(updateContentSuccess(response.data));
                } else {
                    dispatch(updateContentFailed({errMessage: response.data.message}));
                }
            })
            .catch(error => {
                dispatch(updateContentFailed(error));
            });
    };
}

function updateContentSuccess(content) {
    return {
        type: UPDATE_CONTENT_SUCCESS,
        payload: content
    };
}

function updateContentFailed(error) {
    return {
        type: UPDATE_CONTENT_FAILED,
        payload: error
    };
}