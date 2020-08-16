import React from 'react';
import { markDone, startEditNote, selectNote } from '../../actions';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

class NoteCard extends React.Component {
    onClick = event => {
        event.preventDefault();
        this.props.onSelect(this.props.note.id);
        this.props.history.push(`/notes/${this.props.note.slug}`);
    }

    onEditButtonClick = event => {
        event.preventDefault();
        this.props.startEditNote();
        this.props.selectNote(this.props.note.id);
        this.props.history.push(`/edit/${this.props.note.slug}`);
    }

    onMarkDoneButtonClick = event => {
        event.preventDefault();
        this.props.markDone(this.props.note.slug, !this.props.note.done);
    }

    onDeleteNoteButtonClick = event => {
        this.props.onDelete(this.props.note);
    }
    
    render(){
        const buttonColor = this.props.note.done ? 'lightgrey': this.props.note.color || 'light';
        const buttonTextColor = ['light', 'lightgrey'].includes(buttonColor) ? 'text-reset': 'text-white';
        const createdDate = new Date(this.props.note.created)
        const title = this.props.note.title.length < 30? this.props.note.title : this.props.note.title.slice(0, 30) + "...";
        const body = this.props.note.body.length < 54? this.props.note.body : this.props.note.body.slice(0, 50) + "...";
        console.log(createdDate.toLocaleString());
        return (
            <div key={this.props.note.id} className={`col-md-6 col-12 ${this.props.note.done ? 'text-muted':''}`}>
                <div className="card my-3">
                    <div className={`card-header bg-${this.props.note.done ? 'lightgrey' : this.props.note.color || 'light'} `}>
                        <div className="row">
                            <div className="col">

                                <button 
                                    id={`done-${ this.props.note.id }`} 
                                    className={`mark-done btn btn-${buttonColor} ${buttonTextColor}`}
                                    style={{ boxShadow:"none"}}
                                    onClick={this.onMarkDoneButtonClick}
                                >
                                    <i className="fas fa-check"></i>
                                </button>

                                <button
                                    className={`btn btn-${buttonColor} ${buttonTextColor}`} 
                                    style={{ boxShadow:"none"}}
                                    onClick={this.onEditButtonClick}
                                >
                                    <i className="far fa-edit"></i>
                                </button>

                            </div>
                            
                            <div className="col text-right">

                                <button
                                    className={`btn btn-${buttonColor} ${buttonTextColor}`} 
                                    style={{ boxShadow:"none"}}
                                    onClick={this.onDeleteNoteButtonClick}
                                >
                                    <i className="fas fa-times"></i>
                                </button>

                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <h3 className="card-title">{ title }</h3>
                        <h6 className="card-subtitle mb-2 text-muted">Created: { createdDate.toLocaleString() }</h6>
                        <p className="card-text">{ body }</p>
                        <div className="row">
                            <div className="col-6">
                                <button onClick={this.onClick} className={`btn ${this.props.note.done ? 'btn-secondary': 'btn-info'} mr-auto`}>More </button>
                            </div>                                
                            <div className="col-6 text-right" style={{fontSize: "25px"}}>
                                { this.props.note.done ?<i className="fas fa-check mr-3 text-success"></i> :''}
                                { this.props.note.important? <i className="fas fa-exclamation mr-3 text-warning"></i>: ''}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default connect(null,{markDone, startEditNote, selectNote})(withRouter(NoteCard));