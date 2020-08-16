import {
    ERROR_MESSAGE,
    INFO_MESSAGE,
    SUCCESS_MESSAGE,
    CLEAR_MESSAGE
} from '../actions/types'

export default (state=null, action) => {
    switch (action.type){

        case ERROR_MESSAGE: {
            return {
                type: 'error',
                message: action.payload
            };
        }

        case INFO_MESSAGE: {
            return {
                type: 'info',
                message: action.payload
            };
        }

        case SUCCESS_MESSAGE: {
            return {
                type: 'success',
                message: action.payload
            };
        }

        case CLEAR_MESSAGE: {
            return null;
        }

        default:
            return state;
    }
}