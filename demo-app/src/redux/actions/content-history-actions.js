import axios from 'axios';
import {RETRIEVE_CONTENT_HISTORY_SUCCESS, RETRIEVE_CONTENT_HISTORY_FAILED} from './action-types';

export function getContentHistoriesByContentId(contentId) {
    return dispatch => {
        axios.get(`/api/contentHistories/getContentHistory/${contentId}`)
            .then(response => {
                if (response.status === 200) {
                    dispatch(getContentHistoriesSuccess(contentId, response.data));
                } else {
                    dispatch(getContentHistoriesFailed({errMessage: response.data.message}));
                }
            })
            .catch(error => {
                dispatch(getContentHistoriesFailed(error));
            });
    };
}

function getContentHistoriesSuccess(contentId, contentHistories) {
    return {
        type: RETRIEVE_CONTENT_HISTORY_SUCCESS,
        payload: contentHistories,
        contentId
    };
}

function getContentHistoriesFailed(error) {
    return {
        type: RETRIEVE_CONTENT_HISTORY_FAILED,
        payload: error
    };
}