import './App.css';
import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './auth/Login';
import Header from './Header';
import NotesHome from './notes/NotesHome';
import MessageBar from './MessageBar';
import NoteDetail from './notes/NoteDetail';
import NoteCreate from './notes/NoteCreate';
import Register from './auth/Register';
import AOR from './common/AuthenticatedOnlyRoute';

import { loadUser } from '../actions';


class App extends React.Component{
    componentDidMount() {
        this.props.loadUser();
    }

    render() {
        return (
            <BrowserRouter>
                <Header />
                <MessageBar />
                <div className="container">
                    <AOR path="/" exact component={NotesHome} />
                    <Route path="/auth/login" exact component={Login} />
                    <Route path="/auth/register" exact component={Register} />
                    <AOR path="/notes/" component={NoteDetail} />
                    <AOR path="/create" component={NoteCreate} />
                    <AOR path="/edit/" component={NoteCreate} edit={true} />
                </div>
            </BrowserRouter>
        );
    }
};

const mapStateToProps = (state) => {
    return { loading:state.loading };
}

export default connect(mapStateToProps, {loadUser})(App);