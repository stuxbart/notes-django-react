import './NotesHome.css';
import React from 'react';
import { connect } from 'react-redux';
import { fetchNotes, selectNote, changePage, showDeleteModal } from '../../actions';
import NoteCard from './NoteCard';
import LoadingSpinner from '../LoadingSpinner';
import Paginator from '../common/Paginator';
import DeleteNoteModal from './DeleteNoteModal';
import { Link } from 'react-router-dom';

class NotesHome extends React.Component {
    componentDidMount(){
        const page = new URLSearchParams(this.props.location.search).get("page") || this.props.page;
        this.props.changePage(page);
        this.props.fetchNotes()
        .then(res => {
            if (!res) {
                this.props.history.push(`/?page=${1}`);
                this.props.changePage(1);
                this.props.fetchNotes();
            }
        });
    }

    selectNote = (id) => {
        this.props.selectNote(id);
    }

    showDeleteNoteModal = (note) => {
        this.props.selectNote(note.id);
        this.props.showDeleteModal();
    }

    renderList() {
        if (this.props.notes.length>0){
            return this.props.notes.map((note, index) => {
                return <NoteCard 
                        key={note.id} 
                        note={note} 
                        onSelect={this.selectNote} 
                        onDelete={this.showDeleteNoteModal}
                        />
            });
        }
        return (
            <div className="col text-center" style={{ top: "40vh"}}>
                You don't have any notes. <Link to="/create" className="text-success">Create one</Link>
            </div>
        )
    }

    render(){
        if (this.props.loading) {
            return <LoadingSpinner />
        }
        return (
            <>
            <div className="row">
                {this.renderList()}
                <DeleteNoteModal />
            </div>
            <div className="row">
                <div className="col">
                    <Paginator />
                </div>
            </div>
            </>
        );
    }
};

const mapStateToProps = (state) => {
    return { 
        notes: Object.values(state.notes.objects).sort((a,b)=>{
            const dateA = new Date(a.created);
            const dateB = new Date(b.created);
            return dateB - dateA;
        }), 
        loading: state.loading, 
        page:state.notes.page 
    };
}
export default connect(mapStateToProps, { fetchNotes, selectNote, changePage, showDeleteModal })(NotesHome);