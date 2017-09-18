import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import userReducer from './reducers/user-reducers';
import userProjectRoleReducer from './reducers/user-project-role-reducers';
import projectReducer from './reducers/project-reducers';
import contentReducer from './reducers/content-reducers';
import contentHistoryReducer from './reducers/content-history-reducers';

export default combineReducers({
    form: formReducer,
    user: userReducer,
    userProjectRoles: userProjectRoleReducer,
    projects: projectReducer,
    contents: contentReducer,
    contentHistories: contentHistoryReducer
})