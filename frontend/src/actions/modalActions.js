import {
    SHOW_DELETE_MODAL,
    HIDE_DELETE_MODAL
} from './types';

export const showDeleteModal = (redirect=null) => {
    return {
        type: SHOW_DELETE_MODAL,
        payload: redirect
    }
}

export const hideDeleteModal = () => {
    return {
        type: HIDE_DELETE_MODAL
    }
}