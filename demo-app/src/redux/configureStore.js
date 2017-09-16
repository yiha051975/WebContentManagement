import {createUsaaStore} from 'usaa-templates/lib/transactional';
//Import reducers to be used by application
import {reducer as formReducer} from 'redux-form';


export default function configureStore(initialState) {
    return createUsaaStore({
        initialState,
        reducers: {
            form: formReducer
        }
    });
}
