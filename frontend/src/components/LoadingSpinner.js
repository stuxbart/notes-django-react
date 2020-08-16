import React from 'react';

const LoadingSpinner = () => {
    return (
        <div className="row text-center" style={{ height: "85vh"}}>
            <div className="col-sm-12 my-auto">
                <div className="spinner-grow text-primary" role="status" style={{width: "7rem", height: "7rem"}}>
            <span className="sr-only">Loading...</span>
        </div></div></div>
    );
};

export default LoadingSpinner;