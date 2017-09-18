import {RETRIEVE_PROJECT_SUCCESS, RETRIEVE_PROJECT_FAILED} from '../actions/action-types';

export default function(state = {}, action = {}) {
    switch(action.type) {
        case RETRIEVE_PROJECT_SUCCESS:
            return {
                ...state,
                [action.payload.id]: action.payload
            };
        case RETRIEVE_PROJECT_FAILED:
            return action.payload;
        default:
            return state;
    }
}