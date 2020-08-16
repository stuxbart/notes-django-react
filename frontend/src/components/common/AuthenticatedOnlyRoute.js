import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import LoadingSpinner from '../LoadingSpinner';

const AuthenticatedOnlyRoute = ({ component: Component, auth, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (auth.isLoading){
                    return <LoadingSpinner/>;
                } else if (!auth.isAuthenticated){
                    return <Redirect to="/auth/login" />
                }
                return <Component {...props} />
            }}
        />
    );
}

const mapStateToProps = state => ({ auth:state.auth, loading: state.loading });

export default  connect(mapStateToProps)(AuthenticatedOnlyRoute);