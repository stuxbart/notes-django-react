import {
    SELECT_NOTE,
    DESELECT_NOTE,
    LOGOUT
} from '../actions/types'

export default (state=null, action) => {
    switch (action.type){
        case SELECT_NOTE: {
            return action.payload;
        }
        case DESELECT_NOTE: {
            return null;
        }
        case LOGOUT: {
            return null;
        }
        default: {
            return state;
        }
    }

}