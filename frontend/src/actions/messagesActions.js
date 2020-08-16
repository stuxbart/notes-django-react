import {
    ERROR_MESSAGE,
    SUCCESS_MESSAGE,
    CLEAR_MESSAGE
} from './types';

export const setError = (message) => {
    return {
        type: ERROR_MESSAGE,
        payload: message
    };
}

export const setSuccessMessage = message => {
    return {
        type: SUCCESS_MESSAGE,
        payload: message
    }
}

export const clearMessage = () => {
    return {
        type: CLEAR_MESSAGE
    };
}