import React from 'react';
import { connect } from 'react-redux';
import LoadnigSpinner from '../LoadingSpinner';
import { fetchNote, markDone, selectNote, showDeleteModal, startEditNote } from '../../actions';
import DeleteNoteModal from './DeleteNoteModal';

class NoteDetail extends React.Component {
    componentDidMount(){
        const slug = this.props.history.location.pathname.substr(7);
        if (!this.props.note) {
            this.props.fetchNote(slug)
            .then((res) => {
                if (res) {
                    this.props.selectNote(this.props.note.id);
                } else {
                    this.props.history.push('/');
                } 
            });
        }
    }

    onMarkDoneButtonClick = event => {
        event.preventDefault();
        this.props.markDone(this.props.note.slug, !this.props.note.done)
        .then(() => this.props.selectNote(this.props.note.id));
    }

    onEditButtonClick = event => {
        event.preventDefault();
        this.props.startEditNote();
        this.props.selectNote(this.props.note.id);
        this.props.history.push(`/edit/${this.props.note.slug}`);
    }

    showDeleteNoteModal = () => {
        this.props.showDeleteModal("/");
    }

    renderDone({ done, important }) {
        return (
            <>
                {done ? <i id="done-mark" className="fas fa-check mr-3  text-success"></i>:''}
                {important ? <i className="fas fa-exclamation mr-3 text-warning"></i>: ''}
            </>
        )
    }
    render(){
        const { note } = this.props;
        if (note) {
            return (
                <>
                <div className="row">
                    <div className="col-10 mx-auto">
                        <div className={`row mb-3 border-${note.color? note.color:''}`} style={{ borderBottom:"4px solid"}}>
                            <div className="col-md-9 col-12">
                                <h1 className="ml-3 mt-4 mb-3">{ note.title }</h1>
                            </div>
                            <div className="col-12 col-md-3 text-right pr-5 mt-3">
                                <h2 className="mt-4 mb-3">
                                {this.renderDone(note)}
                                </h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <p className="ml-5 text-muted"><b>Created:</b> { new Date(note.created).toLocaleString() }</p>
                                <p className="ml-5 text-muted"><b>Updated:</b> { new Date(note.updated).toLocaleString() }</p>

                            </div>
                            <div className="col-6 text-right">
                                <div className="btn-group-vertical" role="group" aria-label="Basic example">
                                    <button 
                                        onClick={this.onMarkDoneButtonClick} 
                                        className="btn btn-success mark-done"
                                    >
                                        <i className="far fa-check-square"></i> Done
                                    </button>
                                    <button 
                                        onClick={this.onEditButtonClick} 
                                        className="btn btn-info"
                                    >
                                        <i className="far fa-edit"> Update</i>
                                    </button>
                                    <button 
                                        onClick={this.showDeleteNoteModal} 
                                        className="btn btn-danger"
                                    >
                                        <i className="fas fa-times"></i> Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <p className="my-5">{ note.body }</p>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <DeleteNoteModal />
                </>
            );
        }
        return <LoadnigSpinner/>;
    }
}

const mapStateToProps = state => {
    return {
        note: state.selectedNote
    }
}

export default connect(mapStateToProps, { fetchNote, markDone, selectNote, showDeleteModal, startEditNote })(NoteDetail);