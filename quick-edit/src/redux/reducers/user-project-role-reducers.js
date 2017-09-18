import {USER_PROJECT_ROLE_SUCCESS, USER_PROJECT_ROLE_FAILED} from '../actions/action-types';

export default function(state = {}, action = {}) {
    switch(action.type) {
        case USER_PROJECT_ROLE_SUCCESS:
        case USER_PROJECT_ROLE_FAILED:
            return action.payload;
        default:
            return state;
    }
}