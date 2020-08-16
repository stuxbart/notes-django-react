import './form.css';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from "react-router-dom";

import { fetchNotes, login } from '../../actions';
import LoadingSpinner from '../LoadingSpinner';

class Login extends React.Component {
    state = { 
        username: '', 
        password: '',
        rememberMe: false
    }
    
    onButtonClick = (event) => {
        event.preventDefault();
        this.props.login(this.state.username, this.state.password, this.state.rememberMe);

    }
    render() {
        if (this.props.auth.isAuthenticated) {
            return <Redirect to="/" />
        } else if (this.props.loading) {
            return <LoadingSpinner />
        } else {
            return (
                <div className="col-md-6 m-auto">
                    <div className="card card-body mt-4">
                        <form className="form">
                            <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                            <div className="form-group">
                                <label>Username</label>
                                <input 
                                    type="text" 
                                    id="inputUsername" 
                                    className="form-control" 
                                    placeholder="Username" 
                                    required="" 
                                    autoFocus=""
                                    onChange={e => this.setState({ username: e.target.value })}
                                    value={this.state.username}
                                />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input 
                                    type="password" 
                                    id="inputPassword"
                                    className="form-control" 
                                    placeholder="Password" 
                                    required=""
                                    onChange={e => this.setState({ password: e.target.value })}
                                    value={this.state.password}
                                />
                            </div>
                            
                            <div className="form-group">
                                <div className="checkbox mb-3">
                                    <label>
                                    <input
                                        type="checkbox" 
                                        value={this.state.rememberMe} 
                                        onChange={e => this.setState({ rememberMe: e.target.value })}
                                    /> 
                                    &nbsp;Remember me
                                    </label>
                                </div>
                            </div>

                            <button 
                                className="btn btn-lg btn-primary btn-block"
                                onClick={e => this.onButtonClick(e)}
                            >
                                Sign in
                            </button>

                            <p className="mt-5 mb-3 text-muted">
                                Don't have account? &nbsp;
                                <Link to="/auth/register">Register</Link>
                            </p>
                        </form>
                    </div>
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return { auth: state.auth, loading:state.loading };
}

export default connect(mapStateToProps, { fetchNotes, login })(Login);