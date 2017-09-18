import axios from 'axios';
import {AUTHENTICATE_SUCCESS, AUTHENTICATE_FAIL, LOGOFF_SUCCESS, LOGOFF_FAIL} from './action-types';
import {getUserProjectRole} from './user-project-role-actions';

export function getUser(history) {
    return dispatch => {
        axios.get('/api/users/getUser')
            .then(response => {
                if (response.status === 200) {
                    dispatch(getUserProjectRole(response.data.id));
                    dispatch(authenticateSuccess(response.data));
                    history.push('/projectList');
                } else {
                    dispatch(authenticateFail());
                }
            })
            .catch(error => {
                console.error(error);
            });
    };
}

export function authenticateUser(values, history) {
    return dispatch => {
        axios.post('/api/users/authenticate', values)
            .then(response => {
                if (response.status === 200) {
                    dispatch(getUserProjectRole(response.data.id));
                    dispatch(authenticateSuccess(response.data));
                    history.push('/projectList');
                } else {
                    dispatch(authenticateFail());
                }
            })
            .catch(error => {
                dispatch(authenticateFail());
            });
    }
};

function authenticateSuccess(user) {
    return {
        type: AUTHENTICATE_SUCCESS,
        payload: {
            ...user,
            errMessage: ''
        }
    };
}

function authenticateFail() {
    return {
        type: AUTHENTICATE_FAIL,
        payload: {errMessage: 'Username or password is incorrect.'}
    };
}

export function logoffUser(history) {
    return dispatch => {
        axios.get('/api/users/logout')
            .then(response => {
                if (response.status === 204) {
                    dispatch(logoffSuccess());
                    history.push('/');
                } else {
                    dispatch(logoffFailed());
                }
            })
            .catch(error => {
                dispatch(logoffFailed());
            });
    };
}

function logoffSuccess() {
    return {
        type: LOGOFF_SUCCESS
    };
}

function logoffFailed() {
    return {
        type: LOGOFF_FAIL
    };
}