import {RETRIEVE_CONTENT_SUCCESS, RETRIEVE_CONTENT_FAILED, LOGOFF_SUCCESS, UPDATE_CONTENT_SUCCESS} from '../actions/action-types';
import _ from 'lodash';

export default function(state = {}, action = {}) {
    let copiedState;
    switch(action.type) {
        case RETRIEVE_CONTENT_SUCCESS:
            copiedState = _.cloneDeep(state);

            copiedState[action.projectId] = action.payload;

            return copiedState;
        case RETRIEVE_CONTENT_FAILED:
            return action.payload;
        case LOGOFF_SUCCESS:
            return {};
        case UPDATE_CONTENT_SUCCESS:
            copiedState = _.cloneDeep(state);

            copiedState[action.payload.projectId] = action.payload;

            return copiedState;
        default:
            return state;
    }
}