import {
    LOGIN,
    LOGOUT,
    LOADING_USER,
    USER_LOADED,
    AUTH_ERROR
} from '../actions/types'

const initialState = {
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: true
}
export default (state=initialState, action) => {
    switch (action.type) {
        case LOGIN: {
            return {
                user: action.payload.user,
                token: action.payload.token,
                isAuthenticated: true,
                isLoading: false
            }
        }

        case LOGOUT: {
            localStorage.removeItem('token');
            return {
                isAuthenticated:false,
                user: null,
                token: null
            };
        }

        case LOADING_USER: {
            return {
                ...state,
                isLoading: true
            }
        }

        case USER_LOADED : {
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
                isLoading: false
            }
        }

        case AUTH_ERROR: {
            localStorage.removeItem('token');
            return {
                isAuthenticated:false,
                user: null,
                token: null
            };
        }

        default: {
            return state
        }
    }
}