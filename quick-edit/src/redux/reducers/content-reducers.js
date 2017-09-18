import {RETRIEVE_CONTENT_SUCCESS, RETRIEVE_CONTENT_FAILED, LOGOFF_SUCCESS} from '../actions/action-types';
import _ from 'lodash';

export default function(state = {}, action = {}) {
    switch(action.type) {
        case RETRIEVE_CONTENT_SUCCESS:
            const copiedState = _.cloneDeep(state);

            copiedState[action.projectId] = action.payload;

            return copiedState;
        case RETRIEVE_CONTENT_FAILED:
            return action.payload;
        case LOGOFF_SUCCESS:
            return {};
        default:
            return state;
    }
}