
// Notes Actions
import {
    fetchNotes,
    fetchNote,
    startEditNote,
    stopEditNote,
    editNote,
    deleteNote,
    markDone,
    createNote,
    selectNote,
    changePage
} from './notesActions';

// Messages Actions
import {
    setError,
    setSuccessMessage,
    clearMessage
} from './messagesActions';

//Auth Actions
import {
    register,
    login,
    logout,
    loadUser
} from './authActions';

//Modal Actions
import {
    showDeleteModal,
    hideDeleteModal
} from './modalActions';


export {
    fetchNotes,
    fetchNote,
    startEditNote,
    stopEditNote,
    editNote,
    deleteNote,
    markDone,
    createNote,
    selectNote,
    changePage
};

export {
    setError,
    setSuccessMessage,
    clearMessage
};

export {
    register,
    login,
    logout,
    loadUser
};

export {
    showDeleteModal,
    hideDeleteModal
};