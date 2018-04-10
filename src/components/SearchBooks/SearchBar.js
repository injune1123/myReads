import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function SearchBar (props){
    return (
        <div className="search-books-bar">
            <Link className="close-search" to="/">Close</Link>
            <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" onChange={(e) => props.updateSearchQuery(e.target.value)} value={props.searchQuery}/>
            </div>
        </div>
    )
}

SearchBar.propTypes={
    updateSearchQuery: PropTypes.func.isRequired,
    searchQuery: PropTypes.string.isRequired
}
export default SearchBar;