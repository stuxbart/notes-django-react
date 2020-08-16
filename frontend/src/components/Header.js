import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions';
import { Link } from 'react-router-dom';

class Header extends React.Component {
    onLogoutButtonClick() {
        this.props.logout();
    }
    renderRightPanel() {
        if (this.props.isAuthenticated) {
            return (
                <>
                    <span className="navbar-text text-white mx-3">
                        {this.props.user.username}
                    </span>
                    <button onClick={e => this.onLogoutButtonClick()} className="btn btn-primary text-white">Logout</button>
                </>
            );
        }
        return (
            <div>
                <Link to='/auth/register' className="btn btn-primary text-white">Register</Link>
                <Link to='/auth/login' className="btn btn-primary text-white ml-2">Login</Link>
            </div>
        );
    }
    renderSearchBar() {
        return (
            <div className="ml-5 mr-auto" style={{ width:"100%"}}>
                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" style={{ width:"50%" }}/>
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
        )
    }
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link className="navbar-brand" to="/">Notes</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                        </li>
                        {this.props.isAuthenticated ?
                        <li className="nav-item">
                            <Link className="btn btn-success text-white mx-2" to="/create">New</Link>
                        </li>
                        :''}
                    </ul>
                    {/* {this.props.isAuthenticated ? this.renderSearchBar() :''} */}
                    {this.renderRightPanel()}
                </div>
            </nav>
        );
    }
};

const mapStateToProps = (state) => {
    if (state.auth.isAuthenticated) {
        return {
            isAuthenticated: state.auth.isAuthenticated,
            user: state.auth.user
        };
    }
    return {
        isAuthenticated: state.auth.isAuthenticated
    }

}

export default connect(mapStateToProps, { logout })(Header);