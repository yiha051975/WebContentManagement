import {RETRIEVE_PROJECT_SUCCESS, RETRIEVE_PROJECT_FAILED, LOGOFF_SUCCESS} from '../actions/action-types';

export default function(state = {}, action = {}) {
    switch(action.type) {
        case RETRIEVE_PROJECT_SUCCESS:
        case RETRIEVE_PROJECT_FAILED:
            return action.payload;
        case LOGOFF_SUCCESS:
            return {};
        default:
            return state;
    }
}