import {AUTHENTICATE_SUCCESS, AUTHENTICATE_FAIL, LOGOFF_SUCCESS} from '../actions/action-types';

export default function(state = {}, action = {}) {
    switch(action.type) {
        case AUTHENTICATE_SUCCESS:
            return action.payload;
        case AUTHENTICATE_FAIL:
            return action.payload;
        case LOGOFF_SUCCESS:
            return {};
        default:
            return state;
    }
}