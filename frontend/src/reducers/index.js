import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import notesReducer from './notesReducer';
import authReducer from './authReducer';
import messageReducer from './messageReducer';
import selectNoteReducer from './selectNoteReducer';
import loadingReducer from './loadingReducer';
import modalReducer from './modalReducer';

export default combineReducers({
    notes: notesReducer,
    selectedNote: selectNoteReducer,
    auth: authReducer,
    message: messageReducer,
    form: formReducer,
    loading: loadingReducer,
    modals: modalReducer
})