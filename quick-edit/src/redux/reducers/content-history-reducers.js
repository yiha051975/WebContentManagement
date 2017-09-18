import {RETRIEVE_CONTENT_HISTORY_SUCCESS, RETRIEVE_CONTENT_HISTORY_FAILED} from '../actions/action-types';

export default function(state = [], action = {}) {
    switch(action.type) {
        case RETRIEVE_CONTENT_HISTORY_SUCCESS:
        case RETRIEVE_CONTENT_HISTORY_FAILED:
            return action.payload;
        default:
            return state;
    }
}