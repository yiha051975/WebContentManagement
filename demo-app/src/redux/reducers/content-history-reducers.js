import _ from 'lodash';
import {RETRIEVE_CONTENT_HISTORY_SUCCESS, RETRIEVE_CONTENT_HISTORY_FAILED, LOGOFF_SUCCESS} from '../actions/action-types';

export default function(state = {}, action = {}) {
    switch(action.type) {
        case RETRIEVE_CONTENT_HISTORY_SUCCESS:
            const copiedState = _.cloneDeep(state);

            copiedState[action.contentId] = action.payload;

            return copiedState;
        case RETRIEVE_CONTENT_HISTORY_FAILED:
            return action.payload;
        case LOGOFF_SUCCESS:
            return {};
        default:
            return state;
    }
}