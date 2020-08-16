import React from 'react';
import { connect }from 'react-redux';
import { clearMessage } from '../actions';

const colors = {
    info: 'info',
    success: 'success',
    error: 'danger'
}

const MessageBar = ({ message, clearMessage }) => {
    if (message) {
        return (
            <div className={`alert alert-${colors[message.type]} alert-dismissible`}>
                <button onClick={clearMessage} className="close">&times;</button>
                {message.message}
            </div>
        );
    }
    return null;
    
}

const mapStateToProps = (state) => {
    return {
        message: state.message 
    };
}

export default connect(mapStateToProps, { clearMessage })(MessageBar);