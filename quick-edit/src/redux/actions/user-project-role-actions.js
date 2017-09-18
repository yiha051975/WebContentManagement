import axios from 'axios';
import {USER_PROJECT_ROLE_SUCCESS, USER_PROJECT_ROLE_FAILED} from '../actions/action-types';

export function getUserProjectRole(userId) {
    return dispatch => {
        axios.get(`/api/userProjectRoles/getUserProjectRoleByByUser/${userId}`)
            .then(response => {
                if (response.status === 200) {
                    dispatch(userProjectRolesRetrieved(response.data));
                } else {
                    dispatch(userProjectRolesNotRetrieved({errMessage: response.data.message}));
                }
            })
            .catch(error => {
                dispatch(userProjectRolesNotRetrieved(error));
            });
    };
}

function userProjectRolesRetrieved(userProjectRoles) {
    return {
        type: USER_PROJECT_ROLE_SUCCESS,
        payload: userProjectRoles
    };
}

function userProjectRolesNotRetrieved(message) {
    return {
        type: USER_PROJECT_ROLE_FAILED,
        payload: message
    }
}