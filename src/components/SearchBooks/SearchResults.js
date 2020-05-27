import React from 'react';
import PropTypes from 'prop-types';
import BookListItem from '../BookListItem';
import SearchPrompt from './SearchPrompt';

/*stateless function is used since it only rertuns some UI of the search results*/
function SearchResults (props){
  return (
    <div className="search-books-results">
      {props.searchQuery ? (
        <ol className="books-grid">
          {props.searchResults.map(
              (book, index) => <BookListItem
                  book={book}
                  key={index}
                  handleSelect = {props.switchShelf}
              />
          )}
        </ol>) : <SearchPrompt/>}
        
        
       { props.searchHasError && <SearchPrompt/>}
    </div>
  )
}

SearchResults.propTypes = {
  searchResults: PropTypes.array.isRequired,
  switchShelf: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
  searchHasError: PropTypes.bool.isRequired
}

export default SearchResults;
