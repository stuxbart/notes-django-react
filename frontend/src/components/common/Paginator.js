import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { changePage,fetchNotes } from '../../actions';

class Paginator extends React.Component {
    onClick = (page) => {
        this.props.changePage(page);
        this.props.fetchNotes();
        this.props.history.push(`/?page=${page}`);
    }
    render() {
        const { page, count } = this.props;
        if (count<11){
            return null;
        }
        const lastPage = Math.trunc(count / 10) + 1;
        return (
            <nav>
                <ul className="pagination justify-content-center">

                    <li className={`page-item ${page===1?'disabled':''}`}>
                        <button
                            onClick={e => this.onClick(page-1)}
                            className="page-link" 
                            tabIndex="-1" 
                            aria-disabled={page===1?'true':'false'}
                        >
                            Previous
                        </button>
                    </li>

                    {page>2 ? 
                    <li className="page-item">
                        <button 
                            className="page-link" 
                            onClick={e => this.onClick(page-2)}
                        >
                            {page-2}
                        </button>
                    </li>
                    : ''}

                    {page!==1 ? 
                    <li className="page-item">
                        <button 
                            className="page-link" 
                            onClick={e => this.onClick(page-1)}
                        >
                            {page-1}
                        </button>
                    </li>
                    : ''}

                    <li className="page-item active" aria-current="page">
                        <button 
                            className="page-link"
                        >
                            {page}<span className="sr-only">(current)</span>
                        </button>
                    </li>

                    {page!==lastPage ? 
                    <li className="page-item">
                        <button 
                            className="page-link"
                            onClick={e => this.onClick(page+1)}
                        >
                            {page+1}
                        </button>
                    </li>
                    : ''}

                    {page+1<lastPage ? 
                    <li className="page-item">
                        <button 
                            className="page-link"
                            onClick={e => this.onClick(page+2)}
                        >
                            {page+2}
                        </button>
                    </li>
                    : ''}
                    
                    <li className={`page-item ${page===lastPage?'disabled':''}`}>
                        <button 
                            onClick={e => this.onClick(page+1)} 
                            className="page-link" 
                            tabIndex="-1" 
                            aria-disabled={page===lastPage?'true':'false'}
                        >
                            Next
                        </button>
                    </li>

                </ul>
            </nav>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        page: state.notes.page,
        count: state.notes.count
    }
}

export default connect(mapStateToProps, {changePage, fetchNotes})(withRouter(Paginator));