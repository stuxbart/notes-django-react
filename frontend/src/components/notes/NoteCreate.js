import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { createNote, editNote, startEditNote, stopEditNote, fetchNote, selectNote } from '../../actions';
import { connect } from 'react-redux';

class NoteCreate extends React.Component {
    componentDidMount() {
        switch (this.props.history.location.pathname.slice(0,6)){
            case '/edit/': {                
                const slug = this.props.history.location.pathname.substr(6);
                if (!this.props.note) {
                    this.props.fetchNote(slug)
                    .then((res) => {
                        if (res) {
                            this.props.selectNote(this.props.note.id);
                            this.props.startEditNote();
                        } else {
                            this.props.history.push('/');
                        }
                    });
                }
                break;
            }
            case '/creat' : {
                this.props.stopEditNote();
                break;
            }
            default: {
                this.props.stopEditNote();
                break;
            }
        }
    }
    colorOptions = [
        ['primary',  'Blue'],
        ['secondary', 'Grey'],
        ['success',  'Green'],
        ['danger',    'Red'],
        ['warning',   'Yellow'],
        ['info',      'Cyan'],
        ['light',     'Lightgrey'],
        ['dark',      'Black']
    ]
    renderError({ error, touched }) {
        if (touched && error){
            return <div className="invalid-feedback">{error}</div>;
        } else {
            return null;
        }
    }
    renderTextInput = ({ input, label, meta }) => {
        const validClassName = meta.error ? 'is-invalid' : 'is-valid';
        
        return (
            <div className="form-group" >
                <label>{label}</label>
                <input {...input} className={`form-control ${meta.touched ? validClassName : ''}`} autoComplete="off" />
                {this.renderError(meta)}
            </div>
        );
    }

    renderTextArea = ({input, label, meta}) => {
        const validClassName = meta.error ? 'is-invalid' : 'is-valid';
        
        return (
            <div className="form-group">
                <label>{label}</label>
                <textarea {...input} className={`form-control ${meta.touched? validClassName: ''}`} style={{ height: "290px"}}/>
                {this.renderError(meta)}
            </div>
        );
    }

    renderCheckBoxInput = ({ input, label }) => {
        return (
            <div className="form-group">
                <input {...input} checked={input.value} type="checkbox" />
                <label>&nbsp;{label}</label>
            </div>
        );
    }

    renderColorSelector = ({ input, label }) => {
        const renderedOptions = this.colorOptions.map((color) => {
            return <option 
                    key={color[0]} 
                    value={color[0]} 
                    className={`bg-${color[0]}`}
                    >
                        {color[1]}
                    </option>
        })
        return (
            <div className="form-group">
                <label className="my-1 mr-2">{label}</label>
                <select {...input} className="custom-select my-1 mr-sm-2" >
                    <option>Choose color...</option>
                    {renderedOptions}
                </select>
            </div>
        )
    }
    onSubmit = (formValues) => {
        if (this.props.edit) {
            this.props.editNote(this.props.note, formValues)
            .then((res)=>{
                if (res){
                    this.props.history.push("/?page=1");
                }
            })
        }
        else {
            this.props.createNote(formValues)
            .then((res)=>{
                if (res){
                    this.props.history.push("/?page=1");
                }
            })
        }
    }

    render() {
        return (
            <div className="row mt-4">
                <div className="col-11 mx-auto">
                    <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                        <div className="row">
                            <div className="col-9">
                                <Field name="title" component={this.renderTextInput} label="Enter title:" />
                                <Field name="body" component={this.renderTextArea} label="Enter note body:" />
                            </div>
                            <div className="col-3 pt-4">
                                <Field name="important" component={this.renderCheckBoxInput} label="Important" />
                                <Field name="done" component={this.renderCheckBoxInput} label="Done" />
                                <Field name="color" component={this.renderColorSelector} label="Color" />
                                <div className="row mt-5">
                                    <div className="col-8 mx-auto">
                                        <button type="submit" className="btn btn-success btn-block my-4">
                                            {this.props.edit?'Edit':'Create'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </form>
                </div>
            </div>
            
        );
    }
};

const validate = (values) => {
    const errors = {};
    if (!values.title) {
        errors.title = 'You must enter a title'
    }
    if (!values.body) {
        errors.body = " You must enter a body"
    }
    return errors;
}

const mapStateToProps = state => {
    var initialValues = {}
    if (state.notes.edit){
        initialValues = {
            ...state.selectedNote
        }
    } 

    return { 
        edit: state.notes.edit,
        note: state.selectedNote,
        initialValues: initialValues,
        enableReinitialize: true
    };
}

export default connect(mapStateToProps, 
    {
        createNote, 
        editNote, 
        fetchNote, 
        startEditNote, 
        stopEditNote, 
        selectNote
    }
    )(reduxForm({
    form: 'noteCreate',
    validate: validate
})(NoteCreate));
