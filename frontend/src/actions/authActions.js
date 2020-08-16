import api from '../apis/api';
import {
    setError,
    setSuccessMessage
} from './messagesActions';

import {
    START_LOADING,
    STOP_LOADING,
    LOGIN,
    AUTH_ERROR,
    LOGOUT,
    USER_LOADED,
    LOADING_USER
} from './types'

export const register = (username, email, password) => async dispatch => {
    dispatch({ type: START_LOADING });
    const result = await api.post('/api/auth/register', { username:username, email:email, password:password})
    .then((response) => {
        dispatch(setSuccessMessage("Account has been created"));
        return true;
    })
    .catch((error) => {
        if( error.response ){
            dispatch(setError("Register error"));
            return false;
        }
    });
    dispatch({ type: STOP_LOADING });
    return result;
}

export const login = (username, password, remember=false) => async dispatch => {
    dispatch({ type: START_LOADING });
    await api.post('/api/auth/login', { username:username, password:password})
    .then((response) => {
        dispatch({ 
            type: LOGIN, 
            payload: { 
                token: response.data.token, 
                user: response.data.user
            }
        });
        if (remember) {
            localStorage.setItem('token', response.data.token);
        }
    })
    .catch((error) => {
        if( error.response ){
            dispatch({
                type: AUTH_ERROR
            })
            dispatch(setError("Unable to login"));
        }
    }); 
    dispatch({ type: STOP_LOADING });
}

export const logout = () => async (dispatch, getState) => {
    const token = getState().auth.token
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
    }

    await api.post('/api/auth/logout',{}, { headers: headers })
    .then(() => dispatch({ type: LOGOUT }))
    .catch(() => dispatch(setError("Unable to logout")));

}

export const loadUser = () => (dispatch, getState) => {
    dispatch({
        type: LOADING_USER
    });

    const token = getState().auth.token
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
    }
    api.get('/api/auth/user', { headers:headers })
    .then(response => {
        dispatch({
            type: USER_LOADED,
            payload: response.data
        });
    })
    .catch(error => {
        if (token){
            dispatch(setError("Auth error"));
        }
        
        dispatch({
            type: AUTH_ERROR
        });
    });
}
