import './form.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { register, setError } from '../../actions';
import LoadingSpinner from '../LoadingSpinner';

class Register extends React.Component {
    state = {
        username: '',
        email: '',
        password: '',
        password2: ''
    }
    onChange = event => this.setState({ [event.target.name]: event.target.value })

    onSubmit = async event => {
        event.preventDefault();
        if (this.state.password===this.state.password2){
            const result = await this.props.register(
                this.state.username,
                this.state.email,
                this.state.password
            )
            if (result) {
                this.props.history.push("/");
            }
        } else {
            this.props.setError("Passwords didn't match");
        }
    }
    render() {
        if (this.props.loading) {
            return <LoadingSpinner />
        }
        return (
            <div className="col-md-6 m-auto">
                <div className="card card-body mt-4">
                    <h2 className="text-center">Register</h2>
                    <form className="form" onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Username</label>
                            <input
                                type="text"
                                className="form-control"
                                name="username"
                                onChange={this.onChange}
                                value={this.state.username}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                onChange={this.onChange}
                                value={this.state.email}
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                onChange={this.onChange}
                                value={this.state.password}
                            />
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password2"
                                onChange={this.onChange}
                                value={this.state.password2}
                            />
                        </div>
                        <button type="submit" className="btn btn-success">
                            Register
                        </button>
                        <p className="mt-5 mb-3 text-muted">
                            Already have an account?&nbsp;
                            <Link to="/auth/login">Login</Link>
                        </p>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({ loading: state.loading });

export default connect(mapStateToProps, {register, setError})(Register);