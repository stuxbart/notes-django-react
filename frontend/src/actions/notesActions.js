import api from '../apis/api';
import {
    setError,
    setSuccessMessage
} from './messagesActions';
import {
    START_LOADING,
    STOP_LOADING,
    FETCH_NOTES,
    FETCH_NOTE,
    EDIT_NOTE,
    DELETE_NOTE,
    SELECT_NOTE,
    DESELECT_NOTE,
    START_EDIT_NOTE,
    STOP_EDIT_NOTE,
    CHANGE_PAGE

} from './types'


export const fetchNotes = () => async (dispatch, getState) => {
    dispatch({ type: START_LOADING });
    const page = getState().notes.page;
    const token = getState().auth.token;
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
    };

    const response = await api.get(`/api/notes/?page=${page}`,{ headers: headers })
    .then((response) => {
        dispatch({ type: FETCH_NOTES, payload: response.data });
        return true;
    })
    .catch((error) => {
        if( error.response ){
            dispatch(setError(error.response.data.detail));
        }
        return false;
    }); 
    dispatch({ type: STOP_LOADING });
    return response;
}

export const fetchNote = (slug, select=true) => async (dispatch, getState) => {
    dispatch({ type: START_LOADING });
    const token = getState().auth.token
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
    }

    const res = await api.get(`/api/notes/${slug}/`,{headers:headers})
    .then(response => {
        dispatch({
            type: FETCH_NOTE,
            payload: response.data
        });
        if (select) {
            dispatch({
                type: SELECT_NOTE,
                payload: response.data
            });
        }
        return true;
    })
    .catch(error => {
        console.log(error);
        return false;
    })
    dispatch({ type: STOP_LOADING });
    return res;
}

export const startEditNote = () => {
    return {
        type: START_EDIT_NOTE
    }
}

export const stopEditNote = () => {
    return {
        type: STOP_EDIT_NOTE
    }
}

export const editNote = (note, data) => async (dispatch, getState) => {
    const token = getState().auth.token;
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
    }

    const res = await api.patch(`/api/notes/${note.slug}/`, data, {headers:headers})
    .then(response => {
        dispatch({ type: DESELECT_NOTE });
        dispatch(setSuccessMessage("Note has been edited"));
        dispatch({ type: EDIT_NOTE, payload: response.data })
        return true;
    })
    .catch(error => {
        console.log(error);
        return false;
    })
    return res;
}

export const deleteNote = (id) => async (dispatch, getState) => {
    const token = getState().auth.token;
    const note = getState().notes.objects[id];
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
    }

    await api.delete(`/api/notes/${note.slug}/`,{headers:headers})
    .then(response => {
        dispatch({ type: DESELECT_NOTE });
        dispatch(setSuccessMessage("Note has been deleted"));
        dispatch({ type: DELETE_NOTE, payload: id })
    })
    .catch(error => {
        console.log(error);
    })
}

export const markDone = (slug, done) => async (dispatch, getState) => {
    const token = getState().auth.token
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
    }

    await api.patch(`/api/notes/${slug}/mark_done/`, {done:done},{headers:headers})
    .then(response => {
        dispatch({
            type: FETCH_NOTE,
            payload: response.data
        });
    })
    .catch(error => {
        console.log(error);
    })
}

export const createNote = (data) => async (dispatch, getState) => {
    const token = getState().auth.token
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
    }
    const res = await api.post(`/api/notes/`, data,{headers:headers})
    .then(response => {
        dispatch(setSuccessMessage("Note has been created"));
        return true;
    })
    .catch(error => {
        dispatch(setError("Server error, unable to create note"));
        return false;
    }) 
    return res;
}

export const selectNote = (id) => (dispatch, getState) => {
    const note = getState().notes.objects[id];

    dispatch({
        type: SELECT_NOTE,
        payload: note
    });
}

export const changePage = (page) => {
    return {
        type: CHANGE_PAGE,
        payload: parseInt(page)
    }
}