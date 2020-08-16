import {
    SHOW_DELETE_MODAL,
    HIDE_DELETE_MODAL
} from '../actions/types'


const initialState = {
    deleteModal: {
        show: false,
        redirectTo: null
    }
}

export default (state=initialState, action) => {
    switch(action.type) {
        case SHOW_DELETE_MODAL: {
            return {
                ...state,
                deleteModal: {
                    show: true,
                    redirectTo: action.payload 
                }
            };
        }
        case HIDE_DELETE_MODAL: {
            return {
                ...state,
                deleteModal: {
                    show: false,
                    redirectTo: null
                }
            }
        }
        default: {
            return state;
        }
    }
}