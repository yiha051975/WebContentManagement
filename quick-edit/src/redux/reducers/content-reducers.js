import {RETRIEVE_CONTENT_SUCCESS, RETRIEVE_CONTENT_FAILED, LOGOFF_SUCCESS} from '../actions/action-types';

export default function(state = {}, action = {}) {
    switch(action.type) {
        case RETRIEVE_CONTENT_SUCCESS:
        case RETRIEVE_CONTENT_FAILED:
            return action.payload;
        case LOGOFF_SUCCESS:
            return {};
        default:
            return state;
    }
}