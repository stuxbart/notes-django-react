import _ from 'lodash';
import {
    FETCH_NOTES,
    FETCH_NOTE,
    START_EDIT_NOTE,
    STOP_EDIT_NOTE,
    EDIT_NOTE,
    DELETE_NOTE,
    CHANGE_PAGE,
    LOGOUT
} from '../actions/types'

const initialState = {
    objects:{}, 
    count: 0, 
    page:1,
    edit: false
}

export default (state=initialState, action) => {
    switch (action.type) {
        case FETCH_NOTES: {
            return {
                ...state,
                objects: _.mapKeys(action.payload.results, "id"),
                count: action.payload.count
            };
        }
        case FETCH_NOTE: {
            return {
                ...state,
                objects: {...state.objects, [action.payload.id]:action.payload}
            }
        }
        case START_EDIT_NOTE: {
            return {
                ...state,
                edit: true
            }
        }
        case STOP_EDIT_NOTE: {
            return {
                ...state,
                edit: false
            }
        }
        case EDIT_NOTE: {
            return {
                ...state,
                objects: {...state.objects, [action.payload.id]: action.payload},
                edit: false
            }
        }
        case DELETE_NOTE: {
            return {
                ...state,
                objects: _.omit(state.objects, action.payload)
            }
        }
        case CHANGE_PAGE: {
            return {
                ...state,
                page: action.payload
            }
        }
        case LOGOUT: {
            return initialState;
        }
        default: {
            return state;
        }
    }
}