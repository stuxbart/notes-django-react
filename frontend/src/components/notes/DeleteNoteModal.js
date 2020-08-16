import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { hideDeleteModal, deleteNote } from '../../actions';

class DeleteNoteModal extends React.Component {
    onHide = () => {
        this.props.hideDeleteModal();
    }

    onDelete = () => {
        this.props.deleteNote(this.props.note.id);
        if (this.props.redirectTo) {
            this.props.history.push(this.props.redirectTo);
        }
        this.props.hideDeleteModal();        
    }

    render() {
        if (this.props.note) {
                return (
                <Modal show={this.props.show} onHide={this.onHide}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Note</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to delete "<b>{this.props.note.title}</b>" ?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.onHide}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={this.onDelete}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
            );
        }
       return <div />;
    }
}
    
const mapStateToProps = (state) => {
    return {
        show: state.modals.deleteModal.show,
        redirectTo: state.modals.deleteModal.redirectTo,
        note: state.selectedNote
    }
}

export default connect(mapStateToProps, { hideDeleteModal,deleteNote })(withRouter(DeleteNoteModal));